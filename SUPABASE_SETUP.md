# Supabase Setup Instructions for TeretLink

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 2: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire content from `supabase/schema.sql`
3. Paste it into the SQL Editor and click **Run**

This will create:
- All necessary tables (profiles, companies, loads, trucks)
- Row Level Security policies
- Triggers for automatic profile creation
- Helper functions

## Step 4: Create Admin User

1. Go to **Authentication** → **Users** in your Supabase dashboard
2. Click **Add User**
3. Create an admin user with:
   - Email: `admin@teretlink.com` (or your preferred admin email)
   - Password: `demo123` (or your preferred password)
   - Confirm email: ✅ (check this box)

4. After creating the user, go to **SQL Editor** and run:

```sql
-- Update the user to be an admin (replace the email with your admin email)
UPDATE public.profiles 
SET role = 'admin', status = 'approved', plan = 'pro'
WHERE email = 'admin@teretlink.com';
```

## Step 5: Test the Application

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000`
3. Try registering a new user - they should be created with "pending" status
4. Login with your admin account and approve the user in the Admin Panel
5. Login with the approved user and test creating loads/trucks

## Step 6: Optional - Create Demo Users

You can create additional demo users for testing:

```sql
-- Insert demo carrier user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
VALUES (
    gen_random_uuid(),
    'carrier@teretlink.com',
    crypt('demo123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"name": "Demo Prevoznik"}'::jsonb
);

-- The profile will be created automatically by the trigger
-- Then update the profile to be approved
UPDATE public.profiles 
SET status = 'approved', plan = 'standard'
WHERE email = 'carrier@teretlink.com';

-- Insert company for the carrier
INSERT INTO public.companies (user_id, name, registration_number, category, country, city, address, phone, email)
SELECT 
    p.id,
    'Demo Transport DOO',
    '12345678',
    'Transport Company / Carrier',
    'Serbia',
    'Belgrade',
    'Glavna 123',
    '+381 11 123 4567',
    'info@demotransport.com'
FROM public.profiles p 
WHERE p.email = 'carrier@teretlink.com';
```

## Authentication Flow

### User Registration Flow:
1. User registers → Profile created with `status: 'pending'`
2. User redirected to "Pending Approval" page
3. Admin approves user → `status: 'approved'`
4. User can now access full platform

### User Access Levels:
- **Pending Users**: Can only see pending approval page
- **Approved Users**: Can view and create loads/trucks
- **Admin Users**: Can approve users + full access

## Database Structure

### Tables Created:
- `profiles` - User profiles (extends auth.users)
- `companies` - Company information
- `loads` - Cargo listings
- `trucks` - Vehicle listings

### Key Features:
- Row Level Security (RLS) enabled
- Automatic profile creation on user signup
- Admin approval workflow
- Real-time subscriptions ready
- Optimized queries with proper indexes

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check your `.env` file has the correct values
   - Restart your dev server after changing `.env`

2. **"User not found" on login**
   - Make sure you created the user in Supabase Auth
   - Check the email matches exactly

3. **"Permission denied" errors**
   - Check RLS policies are set up correctly
   - Ensure user has proper approval status

4. **Admin panel shows "No permission"**
   - Make sure admin user has `role: 'admin'` in profiles table

### Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check the Supabase logs in your dashboard
3. Verify your database schema matches the SQL file
4. Ensure environment variables are correct

## Production Deployment

Before deploying to production:

1. **Remove demo data** from schema.sql
2. **Change default passwords**
3. **Set up proper email templates** in Supabase Auth
4. **Configure custom SMTP** for emails
5. **Set up proper backup strategy**
6. **Review and tighten RLS policies** if needed

Your TeretLink platform is now fully integrated with Supabase! 🚀