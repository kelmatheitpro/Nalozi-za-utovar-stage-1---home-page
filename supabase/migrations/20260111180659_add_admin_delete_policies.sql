-- Add DELETE policies for admin users

-- Allow admins to delete profiles
CREATE POLICY "Admins can delete profiles" ON profiles
  FOR DELETE
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin_profile 
      WHERE admin_profile.id = auth.uid() 
      AND admin_profile.role = 'admin'
      AND admin_profile.status = 'approved'
    )
  );

-- Allow admins to delete companies
CREATE POLICY "Admins can delete companies" ON companies
  FOR DELETE
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin_profile 
      WHERE admin_profile.id = auth.uid() 
      AND admin_profile.role = 'admin'
      AND admin_profile.status = 'approved'
    )
  );

-- Allow admins to delete loads
CREATE POLICY "Admins can delete loads" ON loads
  FOR DELETE
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin_profile 
      WHERE admin_profile.id = auth.uid() 
      AND admin_profile.role = 'admin'
      AND admin_profile.status = 'approved'
    )
  );

-- Allow admins to delete trucks
CREATE POLICY "Admins can delete trucks" ON trucks
  FOR DELETE
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin_profile 
      WHERE admin_profile.id = auth.uid() 
      AND admin_profile.role = 'admin'
      AND admin_profile.status = 'approved'
    )
  );;
