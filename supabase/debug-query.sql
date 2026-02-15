-- Run this in Supabase SQL Editor to check your data

-- Check what's in the profiles table
SELECT * FROM public.profiles;

-- Check what's in the companies table  
SELECT * FROM public.companies;

-- Check what's in auth.users (this might not work due to RLS)
-- SELECT id, email, email_confirmed_at FROM auth.users;