-- Add new fields to profiles table for personal contact data
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS job_title TEXT,
ADD COLUMN IF NOT EXISTS direct_phone TEXT,
ADD COLUMN IF NOT EXISTS mobile_phone TEXT,
ADD COLUMN IF NOT EXISTS phone_country_code TEXT DEFAULT '+381',
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Add new fields to companies table
ALTER TABLE public.companies 
ADD COLUMN IF NOT EXISTS phone_country_code TEXT DEFAULT '+381',
ADD COLUMN IF NOT EXISTS fax TEXT,
ADD COLUMN IF NOT EXISTS fax_country_code TEXT DEFAULT '+381',
ADD COLUMN IF NOT EXISTS website TEXT;;
