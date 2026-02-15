-- Add rejection reason field to profiles table
ALTER TABLE profiles ADD COLUMN rejection_reason TEXT;

-- Add comment
COMMENT ON COLUMN profiles.rejection_reason IS 'Reason provided by admin when rejecting user application';;
