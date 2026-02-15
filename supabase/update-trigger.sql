-- Run this in Supabase SQL Editor to update the trigger for new user registration

-- Update the trigger function to create profiles with pending status
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $
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
$ LANGUAGE plpgsql SECURITY DEFINER;