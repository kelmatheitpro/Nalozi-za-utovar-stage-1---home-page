console.log('🚀 Kreiranje SQL komandi za popravku baze podataka...\n');

console.log('📋 INSTRUKCIJE:');
console.log('1. Kopiraj SQL kod ispod');
console.log('2. Idi u Supabase Dashboard → SQL Editor');
console.log('3. Nalepi kod i klikni "Run"');
console.log('4. Vrati se ovde i javi da li je uspešno\n');

console.log('=' .repeat(60));
console.log('SQL KOD ZA KOPIRANJE:');
console.log('=' .repeat(60));

const sqlCode = `
-- Korak 1: Obriši stari trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Korak 2: Ažuriraj funkciju za kreiranje korisnika
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

-- Korak 3: Kreiraj nove trigger-e
CREATE TRIGGER on_auth_user_confirmed
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_created_confirmed
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
`;

console.log(sqlCode);

console.log('=' .repeat(60));
console.log('\n✨ Šta će ovaj kod da uradi:');
console.log('   • Obrisaće stari trigger koji kreira profile odmah');
console.log('   • Ažuriraće funkciju da kreira profile tek nakon email potvrde');
console.log('   • Kreaće nove trigger-e za email potvrdu');
console.log('\n🎯 Rezultat:');
console.log('   1. Registracija → "Proverite email" poruka');
console.log('   2. Email potvrda → "Email potvrđen" stranica');
console.log('   3. Profil se kreira sa statusom "pending"');
console.log('   4. Admin odobrava → korisnik može da se prijavi');
console.log('\n📍 SLEDEĆI KORAK: Kopiraj SQL kod i pokreni u Supabase!');