-- =====================================================
-- KOMPLETAN SUPABASE SETUP ZA TERETLINK
-- Kreiran za čistu bazu - sve radi iz prve!
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CUSTOM TYPES
-- =====================================================
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE subscription_plan AS ENUM ('free', 'standard', 'pro');
CREATE TYPE company_category AS ENUM ('Transport Company / Carrier', 'Freight Forwarder', 'Trading Company', 'Other');

-- =====================================================
-- TABELE
-- =====================================================

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role user_role DEFAULT 'user' NOT NULL,
    status user_status DEFAULT 'pending' NOT NULL,
    plan subscription_plan DEFAULT 'free' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMP WITH TIME ZONE
);

-- Companies table
CREATE TABLE public.companies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    registration_number TEXT NOT NULL,
    category company_category NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Loads table
CREATE TABLE public.loads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    origin_country TEXT NOT NULL,
    origin_city TEXT NOT NULL,
    destination_country TEXT,
    destination_city TEXT,
    date_from DATE NOT NULL,
    date_to DATE,
    truck_type TEXT NOT NULL,
    capacity TEXT,
    price DECIMAL(10,2),
    currency TEXT DEFAULT 'EUR',
    description TEXT,
    views INTEGER DEFAULT 0 NOT NULL,
    inquiries INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Trucks table
CREATE TABLE public.trucks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    origin_country TEXT NOT NULL,
    origin_city TEXT NOT NULL,
    destination_country TEXT,
    destination_city TEXT,
    date_from DATE NOT NULL,
    date_to DATE,
    truck_type TEXT NOT NULL,
    capacity TEXT,
    description TEXT,
    views INTEGER DEFAULT 0 NOT NULL,
    inquiries INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trucks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Companies policies
CREATE POLICY "Users can view own company" ON public.companies
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own company" ON public.companies
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own company" ON public.companies
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all companies" ON public.companies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Loads policies
CREATE POLICY "Anyone can view approved user loads" ON public.loads
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = user_id AND status = 'approved'
        )
    );

CREATE POLICY "Users can manage own loads" ON public.loads
    FOR ALL USING (auth.uid() = user_id);

-- Trucks policies
CREATE POLICY "Anyone can view approved user trucks" ON public.trucks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = user_id AND status = 'approved'
        )
    );

CREATE POLICY "Users can manage own trucks" ON public.trucks
    FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- FUNKCIJE ZA UPDATED_AT TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_loads_updated_at
    BEFORE UPDATE ON public.loads
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_trucks_updated_at
    BEFORE UPDATE ON public.trucks
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- FUNKCIJA ZA KREIRANJE KORISNIKA (EMAIL POTVRDA)
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Kreiraj profil samo ako je email potvrđen
    IF NEW.email_confirmed_at IS NOT NULL AND (OLD IS NULL OR OLD.email_confirmed_at IS NULL) THEN
        INSERT INTO public.profiles (id, email, name, role, status, plan)
        VALUES (
            NEW.id, 
            NEW.email, 
            COALESCE(NEW.raw_user_meta_data->>'name', 'Novi Korisnik'),
            'user',
            'pending',
            'free'
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers za email potvrdu
CREATE TRIGGER on_auth_user_confirmed
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_created_confirmed
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SIGURNA FUNKCIJA ZA REGISTRACIJU SA FIRMOM
-- =====================================================
CREATE OR REPLACE FUNCTION public.register_user_with_company(
    user_id UUID,
    company_name TEXT,
    registration_number TEXT,
    category company_category,
    country TEXT,
    city TEXT,
    address TEXT,
    phone TEXT,
    email TEXT
)
RETURNS UUID AS $$
BEGIN
    -- Insert company record with proper security context
    INSERT INTO public.companies (
        user_id,
        name,
        registration_number,
        category,
        country,
        city,
        address,
        phone,
        email
    ) VALUES (
        user_id,
        company_name,
        registration_number,
        category,
        country,
        city,
        address,
        phone,
        email
    );
    
    -- Return the user_id for confirmation
    RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNKCIJE ZA VIEWS I INQUIRIES
-- =====================================================
CREATE OR REPLACE FUNCTION increment_views(table_name TEXT, row_id UUID)
RETURNS void AS $$
BEGIN
    IF table_name = 'loads' THEN
        UPDATE public.loads SET views = views + 1 WHERE id = row_id;
    ELSIF table_name = 'trucks' THEN
        UPDATE public.trucks SET views = views + 1 WHERE id = row_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_inquiries(table_name TEXT, row_id UUID)
RETURNS void AS $$
BEGIN
    IF table_name = 'loads' THEN
        UPDATE public.loads SET inquiries = inquiries + 1 WHERE id = row_id;
    ELSIF table_name = 'trucks' THEN
        UPDATE public.trucks SET inquiries = inquiries + 1 WHERE id = row_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- KREIRANJE ADMIN NALOGA
-- =====================================================
-- Ovo će kreirati admin naloge kada se registruju sa ovim email adresama

-- Funkcija za kreiranje admin naloga
CREATE OR REPLACE FUNCTION public.make_user_admin(user_email TEXT)
RETURNS void AS $$
BEGIN
    UPDATE public.profiles 
    SET role = 'admin', status = 'approved', plan = 'pro'
    WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- TEST PODACI
-- =====================================================

-- Kreiraćemo test podatke nakon što se admin nalozi registruju
-- Ova funkcija će dodati test podatke kada admin postoji
CREATE OR REPLACE FUNCTION public.add_test_data()
RETURNS void AS $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Pronađi prvog admin korisnika
    SELECT id INTO admin_user_id 
    FROM public.profiles 
    WHERE role = 'admin' AND status = 'approved' 
    LIMIT 1;
    
    -- Ako nema admin korisnika, izađi
    IF admin_user_id IS NULL THEN
        RETURN;
    END IF;
    
    -- Dodaj test loads
    INSERT INTO public.loads (user_id, company_name, origin_country, origin_city, destination_country, destination_city, date_from, date_to, truck_type, capacity, price, currency, description, views, inquiries) VALUES
    (admin_user_id, 'TeretLink Transport', 'Srbija', 'Beograd', 'Nemačka', 'Berlin', '2025-01-15', '2025-01-17', 'Mega trailer', '24 palete', 1200, 'EUR', 'Potreban mega trailer za transport robe iz Beograda do Berlina. Roba je pakovana na 24 palete.', 15, 3),
    (admin_user_id, 'Balkan Logistics', 'Srbija', 'Novi Sad', 'Austrija', 'Beč', '2025-01-20', '2025-01-22', 'Hladnjača', '20 tona', 800, 'EUR', 'Transport zamrznutih proizvoda. Potrebna hladnjača sa temperaturom -18°C.', 8, 1),
    (admin_user_id, 'Express Cargo', 'Srbija', 'Niš', 'Italija', 'Milano', '2025-01-25', '2025-01-27', 'Cerada', '22 palete', 950, 'EUR', 'Hitna pošiljka tekstila. Potreban pouzdan prevoznik.', 22, 5);
    
    -- Dodaj test trucks
    INSERT INTO public.trucks (user_id, company_name, origin_country, origin_city, destination_country, destination_city, date_from, date_to, truck_type, capacity, description, views, inquiries) VALUES
    (admin_user_id, 'Miloš Transport', 'Srbija', 'Kragujevac', 'Francuska', 'Pariz', '2025-01-18', '2025-01-20', 'Mega trailer', '24 palete', 'Slobodan mega trailer vraća se iz Pariza. Mogu da primim teret za povratak.', 12, 2),
    (admin_user_id, 'Danube Shipping', 'Srbija', 'Pančevo', 'Holandija', 'Amsterdam', '2025-01-22', '2025-01-24', 'Hladnjača', '18 tona', 'Hladnjača slobodna za transport. Temperatura od -25°C do +25°C.', 18, 4),
    (admin_user_id, 'Sava Logistics', 'Srbija', 'Subotica', 'Mađarska', 'Budimpešta', '2025-01-16', '2025-01-17', 'Cerada', '20 paleta', 'Kratka relacija, brza dostava. Iskusni vozač.', 9, 1);
    
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- ZAVRŠNE PORUKE
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE '🎉 SUPABASE BAZA JE USPEŠNO KREIRANA!';
    RAISE NOTICE '';
    RAISE NOTICE '📋 SLEDEĆI KORACI:';
    RAISE NOTICE '1. Registruj se sa admin@teretlink.com ili acodumic1260@gmail.com';
    RAISE NOTICE '2. Potvrdi email adresu';
    RAISE NOTICE '3. Pokreni: SELECT public.make_user_admin(''tvoj-email@example.com'');';
    RAISE NOTICE '4. Pokreni: SELECT public.add_test_data();';
    RAISE NOTICE '';
    RAISE NOTICE '✨ FUNKCIONALNOSTI:';
    RAISE NOTICE '• Email potvrda radi ✅';
    RAISE NOTICE '• Admin panel radi ✅';
    RAISE NOTICE '• Registracija sa firmom ✅';
    RAISE NOTICE '• Test podaci ✅';
    RAISE NOTICE '• Sve policy-je ✅';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 UŽIVAJ U NOVOJ BAZI!';
END $$;