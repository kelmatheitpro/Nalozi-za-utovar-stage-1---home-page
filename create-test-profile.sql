-- Kreiraj profil za test korisnika
-- Zameni 'acodumic1262@gmail.com' sa email-om koji si registrovao

-- Prvo pronađi user ID iz auth.users tabele
SELECT id, email, email_confirmed_at FROM auth.users WHERE email = 'acodumic1262@gmail.com';

-- Zatim kreiraj profil (zameni USER_ID_OVDE sa stvarnim ID-om)
INSERT INTO public.profiles (id, email, name, role, status, plan)
VALUES (
    'USER_ID_OVDE', -- Zameni sa stvarnim UUID
    'acodumic1262@gmail.com',
    'Test Korisnik',
    'user',
    'pending',
    'free'
);

-- Ili ako želiš da budeš admin odmah:
-- UPDATE public.profiles SET role = 'admin', status = 'approved', plan = 'pro' 
-- WHERE email = 'acodumic1262@gmail.com';