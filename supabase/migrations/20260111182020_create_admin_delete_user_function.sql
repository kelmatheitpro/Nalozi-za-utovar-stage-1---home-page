-- Create a function that allows admins to completely delete users (auth + profile)
CREATE OR REPLACE FUNCTION admin_delete_user(target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  calling_user_id UUID;
  is_admin BOOLEAN;
BEGIN
  -- Get the calling user's ID
  calling_user_id := auth.uid();
  
  -- Check if calling user is admin
  SELECT (role = 'admin' AND status = 'approved') INTO is_admin
  FROM profiles 
  WHERE id = calling_user_id;
  
  -- Only allow admins to delete users
  IF NOT is_admin THEN
    RAISE EXCEPTION 'Only approved admins can delete users';
  END IF;
  
  -- Don't allow admins to delete themselves
  IF calling_user_id = target_user_id THEN
    RAISE EXCEPTION 'Admins cannot delete themselves';
  END IF;
  
  -- Delete related data first (in correct order)
  DELETE FROM companies WHERE user_id = target_user_id;
  DELETE FROM loads WHERE user_id = target_user_id;
  DELETE FROM trucks WHERE user_id = target_user_id;
  
  -- Delete profile
  DELETE FROM profiles WHERE id = target_user_id;
  
  -- Delete auth user (this requires SECURITY DEFINER)
  DELETE FROM auth.users WHERE id = target_user_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error and re-raise
    RAISE EXCEPTION 'Error deleting user: %', SQLERRM;
END;
$$;;
