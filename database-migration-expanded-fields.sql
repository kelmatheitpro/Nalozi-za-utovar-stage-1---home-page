-- =====================================================
-- DATABASE MIGRATION: EXPANDED REGISTRATION FIELDS
-- Dodaje nova polja za lične kontakt podatke i proširene podatke o firmi
-- =====================================================

-- Dodaj nova polja u profiles tabelu za lične kontakt podatke
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS job_title TEXT,
ADD COLUMN IF NOT EXISTS direct_phone TEXT,
ADD COLUMN IF NOT EXISTS mobile_phone TEXT,
ADD COLUMN IF NOT EXISTS phone_country_code TEXT DEFAULT '+381',
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Dodaj nova polja u companies tabelu
ALTER TABLE public.companies 
ADD COLUMN IF NOT EXISTS phone_country_code TEXT DEFAULT '+381',
ADD COLUMN IF NOT EXISTS fax TEXT,
ADD COLUMN IF NOT EXISTS fax_country_code TEXT DEFAULT '+381',
ADD COLUMN IF NOT EXISTS website TEXT;

-- Ažuriraj company_category enum sa srpskim kategorijama
ALTER TYPE company_category RENAME TO company_category_old;

CREATE TYPE company_category AS ENUM (
    'Transportna firma / Autoprevoznik',
    'Špediterska firma / Špediter', 
    'Transportna / Špediterska firma / Logistička firma',
    'Trgovinska firma / Proizvođač',
    'Trgovinska firma / Uvoznik, izvoznik',
    'Firme za prevoz i selidbe robe',
    'Drugo'
);

-- Ažuriraj postojeće podatke da koriste nove kategorije
UPDATE public.companies SET category = 
    CASE 
        WHEN category::text = 'Transport Company / Carrier' THEN 'Transportna firma / Autoprevoznik'::company_category
        WHEN category::text = 'Freight Forwarder' THEN 'Špediterska firma / Špediter'::company_category
        WHEN category::text = 'Trading Company' THEN 'Trgovinska firma / Proizvođač'::company_category
        WHEN category::text = 'Other' THEN 'Drugo'::company_category
        ELSE 'Transportna firma / Autoprevoznik'::company_category
    END;

-- Promeni kolonu da koristi novi tip
ALTER TABLE public.companies ALTER COLUMN category TYPE company_category USING category::text::company_category;

-- Obriši stari tip
DROP TYPE company_category_old;

-- =====================================================
-- AŽURIRANA FUNKCIJA ZA REGISTRACIJU SA PROŠIRENIM PODACIMA
-- =====================================================
CREATE OR REPLACE FUNCTION public.register_user_with_company(
    user_id UUID,
    user_name TEXT DEFAULT NULL,
    user_job_title TEXT DEFAULT NULL,
    user_direct_phone TEXT DEFAULT NULL,
    user_mobile_phone TEXT DEFAULT NULL,
    user_phone_country_code TEXT DEFAULT '+381',
    company_name TEXT,
    registration_number TEXT,
    category company_category,
    country TEXT,
    city TEXT,
    address TEXT,
    phone TEXT,
    phone_country_code TEXT DEFAULT '+381',
    email TEXT,
    fax TEXT DEFAULT NULL,
    fax_country_code TEXT DEFAULT '+381',
    website TEXT DEFAULT NULL
)
RETURNS UUID AS $
BEGIN
    -- Ažuriraj profil sa ličnim kontakt podacima
    UPDATE public.profiles SET
        name = COALESCE(user_name, name),
        job_title = user_job_title,
        direct_phone = user_direct_phone,
        mobile_phone = user_mobile_phone,
        phone_country_code = user_phone_country_code
    WHERE id = user_id;
    
    -- Umetni podatke o firmi
    INSERT INTO public.companies (
        user_id,
        name,
        registration_number,
        category,
        country,
        city,
        address,
        phone,
        phone_country_code,
        email,
        fax,
        fax_country_code,
        website
    ) VALUES (
        user_id,
        company_name,
        registration_number,
        category,
        country,
        city,
        address,
        phone,
        phone_country_code,
        email,
        fax,
        fax_country_code,
        website
    );
    
    RETURN user_id;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- AŽURIRANA FUNKCIJA ZA AŽURIRANJE STATUS-A SA RAZLOGOM ODBIJANJA
-- =====================================================
CREATE OR REPLACE FUNCTION public.admin_update_user_status(
    target_user_id UUID,
    new_status user_status,
    admin_user_id UUID,
    rejection_reason TEXT DEFAULT NULL
)
RETURNS void AS $
BEGIN
    -- Proveri da li je korisnik admin
    IF NOT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = admin_user_id AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'Nemate dozvolu za ovu akciju';
    END IF;
    
    -- Ažuriraj status korisnika
    UPDATE public.profiles SET
        status = new_status,
        approved_by = CASE WHEN new_status = 'approved' THEN admin_user_id ELSE NULL END,
        approved_at = CASE WHEN new_status = 'approved' THEN NOW() ELSE NULL END,
        rejection_reason = CASE WHEN new_status = 'rejected' THEN rejection_reason ELSE NULL END
    WHERE id = target_user_id;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNKCIJA ZA POTPUNO BRISANJE KORISNIKA (AUTH + PROFILE)
-- =====================================================
CREATE OR REPLACE FUNCTION public.admin_delete_user(target_user_id UUID)
RETURNS boolean AS $
DECLARE
    admin_check boolean;
BEGIN
    -- Proveri da li je trenutni korisnik admin
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    ) INTO admin_check;
    
    IF NOT admin_check THEN
        RAISE EXCEPTION 'Nemate dozvolu za brisanje korisnika';
    END IF;
    
    -- Obriši iz auth.users tabele (ovo će automatski obrisati i profile zbog CASCADE)
    DELETE FROM auth.users WHERE id = target_user_id;
    
    RETURN true;
EXCEPTION
    WHEN OTHERS THEN
        RETURN false;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- RLS POLICY ZA BRISANJE KORISNIKA
-- =====================================================
CREATE POLICY "Admins can delete profiles" ON public.profiles
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =====================================================
-- ZAVRŠNE PORUKE
-- =====================================================
DO $
BEGIN
    RAISE NOTICE '🎉 MIGRACIJA USPEŠNO ZAVRŠENA!';
    RAISE NOTICE '';
    RAISE NOTICE '✨ DODANA POLJA:';
    RAISE NOTICE '• Lični kontakt podaci (pozicija, direktan telefon, mobilni)';
    RAISE NOTICE '• Pozivni brojevi za telefone i faks';
    RAISE NOTICE '• Web sajt firme';
    RAISE NOTICE '• Razlog odbijanja prijave';
    RAISE NOTICE '• Srpske kategorije firmi';
    RAISE NOTICE '';
    RAISE NOTICE '🔧 AŽURIRANE FUNKCIJE:';
    RAISE NOTICE '• register_user_with_company() - sada prima sve nove parametre';
    RAISE NOTICE '• admin_update_user_status() - sada prima razlog odbijanja';
    RAISE NOTICE '• admin_delete_user() - potpuno briše korisnika';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 REGISTRACIJA SADA PODRŽAVA SVE NOVE FUNKCIONALNOSTI!';
END $;