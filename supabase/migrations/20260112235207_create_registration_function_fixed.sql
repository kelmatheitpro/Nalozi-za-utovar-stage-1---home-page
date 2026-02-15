-- Updated registration function with expanded fields (fixed parameter order)
CREATE OR REPLACE FUNCTION public.register_user_with_company(
    user_id UUID,
    company_name TEXT,
    registration_number TEXT,
    category company_category,
    country TEXT,
    city TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    user_name TEXT DEFAULT NULL,
    user_job_title TEXT DEFAULT NULL,
    user_direct_phone TEXT DEFAULT NULL,
    user_mobile_phone TEXT DEFAULT NULL,
    user_phone_country_code TEXT DEFAULT '+381',
    phone_country_code TEXT DEFAULT '+381',
    fax TEXT DEFAULT NULL,
    fax_country_code TEXT DEFAULT '+381',
    website TEXT DEFAULT NULL
)
RETURNS UUID AS
$$
BEGIN
    -- Update profile with personal contact data
    UPDATE public.profiles SET
        name = COALESCE(user_name, name),
        job_title = user_job_title,
        direct_phone = user_direct_phone,
        mobile_phone = user_mobile_phone,
        phone_country_code = user_phone_country_code
    WHERE id = user_id;
    
    -- Insert company data
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
$$
LANGUAGE plpgsql SECURITY DEFINER;;
