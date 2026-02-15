-- Fix email confirmation flow
-- Run this in Supabase SQL Editor

-- Drop the old trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Update the trigger function to only create profiles after email confirmation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $
BEGIN
    -- Only create profile if email is confirmed
    IF NEW.email_confirmed_at IS NOT NULL AND (OLD IS NULL OR OLD.email_confirmed_at IS NULL) THEN
        INSERT INTO public.profiles (id, email, name, role, status, plan)
        VALUES (
            NEW.id, 
            NEW.email, 
            COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
            'user',
            'pending', -- Set to pending so admin can approve
            'free'
        );
    END IF;
    RETURN NEW;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create new trigger for email confirmation
CREATE TRIGGER on_auth_user_confirmed
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Also create trigger for INSERT in case someone confirms immediately
CREATE TRIGGER on_auth_user_created_confirmed
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();