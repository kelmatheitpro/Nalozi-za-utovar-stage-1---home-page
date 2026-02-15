-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE subscription_plan AS ENUM ('free', 'standard', 'pro');
CREATE TYPE company_category AS ENUM ('Transport Company / Carrier', 'Freight Forwarder', 'Trading Company', 'Other');

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role user_role DEFAULT 'user' NOT NULL,
    status user_status DEFAULT 'pending' NOT NULL,
    plan subscription_plan DEFAULT 'free' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMP WITH TIME ZONE
);

-- Companies table
CREATE TABLE public.companies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    registration_number TEXT NOT NULL,
    category company_category NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Loads table
CREATE TABLE public.loads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    origin_country TEXT NOT NULL,
    origin_city TEXT NOT NULL,
    destination_country TEXT,
    destination_city TEXT,
    date_from DATE NOT NULL,
    date_to DATE,
    truck_type TEXT NOT NULL,
    capacity TEXT,
    price DECIMAL(10,2),
    currency TEXT DEFAULT 'EUR',
    description TEXT,
    views INTEGER DEFAULT 0 NOT NULL,
    inquiries INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Trucks table
CREATE TABLE public.trucks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    origin_country TEXT NOT NULL,
    origin_city TEXT NOT NULL,
    destination_country TEXT,
    destination_city TEXT,
    date_from DATE NOT NULL,
    date_to DATE,
    truck_type TEXT NOT NULL,
    capacity TEXT,
    description TEXT,
    views INTEGER DEFAULT 0 NOT NULL,
    inquiries INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trucks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Companies policies
CREATE POLICY "Users can view own company" ON public.companies
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own company" ON public.companies
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own company" ON public.companies
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all companies" ON public.companies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Loads policies
CREATE POLICY "Anyone can view approved user loads" ON public.loads
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = user_id AND status = 'approved'
        )
    );

CREATE POLICY "Users can manage own loads" ON public.loads
    FOR ALL USING (auth.uid() = user_id);

-- Trucks policies
CREATE POLICY "Anyone can view approved user trucks" ON public.trucks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = user_id AND status = 'approved'
        )
    );

CREATE POLICY "Users can manage own trucks" ON public.trucks
    FOR ALL USING (auth.uid() = user_id);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_loads_updated_at
    BEFORE UPDATE ON public.loads
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_trucks_updated_at
    BEFORE UPDATE ON public.trucks
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', 'New User'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

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

-- Insert initial admin user (you'll need to update this with your actual admin email)
-- This will be created after you sign up manually in Supabase
-- INSERT INTO public.profiles (id, email, name, role, status, plan)
-- VALUES (
--     'your-admin-user-id-here',
--     'admin@teretlink.com',
--     'System Administrator',
--     'admin',
--     'approved',
--     'pro'
-- );

-- Function to increment views
CREATE OR REPLACE FUNCTION increment_views(table_name TEXT, row_id UUID)
RETURNS void AS $$
BEGIN
    IF table_name = 'loads' THEN
        UPDATE public.loads SET views = views + 1 WHERE id = row_id;
    ELSIF table_name = 'trucks' THEN
        UPDATE public.trucks SET views = views + 1 WHERE id = row_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment inquiries
CREATE OR REPLACE FUNCTION increment_inquiries(table_name TEXT, row_id UUID)
RETURNS void AS $$
BEGIN
    IF table_name = 'loads' THEN
        UPDATE public.loads SET inquiries = inquiries + 1 WHERE id = row_id;
    ELSIF table_name = 'trucks' THEN
        UPDATE public.trucks SET inquiries = inquiries + 1 WHERE id = row_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert sample data (for testing - remove in production)
-- You can run this after setting up your Supabase project

-- Sample admin user (replace with your actual admin email after signup)
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
-- VALUES (
--     gen_random_uuid(),
--     'admin@teretlink.com',
--     crypt('demo123', gen_salt('bf')),
--     NOW(),
--     NOW(),
--     NOW()
-- );

-- Sample profiles and companies will be created automatically via triggers