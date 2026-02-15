-- Drop the old function that depends on the old enum
DROP FUNCTION IF EXISTS public.register_user_with_company(uuid,text,text,company_category,text,text,text,text,text);;
