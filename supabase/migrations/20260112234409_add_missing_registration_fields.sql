-- Add missing fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS job_title TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS direct_phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mobile_phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone_country_code TEXT DEFAULT '+381';

-- Add missing fields to companies table
ALTER TABLE companies ADD COLUMN IF NOT EXISTS fax TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS fax_country_code TEXT DEFAULT '+381';
ALTER TABLE companies ADD COLUMN IF NOT EXISTS phone_country_code TEXT DEFAULT '+381';

-- Add comments
COMMENT ON COLUMN profiles.job_title IS 'Job title/position of the contact person';
COMMENT ON COLUMN profiles.direct_phone IS 'Direct phone number of contact person';
COMMENT ON COLUMN profiles.mobile_phone IS 'Mobile phone number of contact person';
COMMENT ON COLUMN companies.fax IS 'Company fax number';
COMMENT ON COLUMN companies.website IS 'Company website URL';;
