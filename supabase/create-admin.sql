-- Run this in Supabase SQL Editor to create/update admin account

-- First, run the trigger update
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role, status, plan)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
        'user',
        'pending', -- Set to pending so admin can approve
        'free'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update your existing account to be admin (replace with your actual email)
UPDATE public.profiles 
SET role = 'admin', status = 'approved', plan = 'pro' 
WHERE email = 'acodumic1260@gmail.com';

-- Check if the update worked
SELECT id, email, name, role, status, plan FROM public.profiles WHERE role = 'admin';