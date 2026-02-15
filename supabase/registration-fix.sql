-- Run this SQL in your Supabase SQL Editor to fix the registration issue

-- Secure function for user registration with company
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
RETURNS UUID AS $
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
$ LANGUAGE plpgsql SECURITY DEFINER;