
-- First, let's ensure we have a user to promote to admin
-- This will create a default admin user if none exists
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@artemis.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Now promote the first user (or the admin we just created) to admin
SELECT promote_first_admin();

-- Create a function to add admin role to existing users
CREATE OR REPLACE FUNCTION public.add_admin_role(_user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _user_id uuid;
BEGIN
  -- Find user by email
  SELECT id INTO _user_id
  FROM auth.users
  WHERE email = _user_email;
  
  -- Return false if user not found
  IF _user_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Add admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN true;
END;
$$;

-- Create a function to remove admin role from users
CREATE OR REPLACE FUNCTION public.remove_admin_role(_user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _user_id uuid;
BEGIN
  -- Find user by email
  SELECT id INTO _user_id
  FROM auth.users
  WHERE email = _user_email;
  
  -- Return false if user not found
  IF _user_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Remove admin role
  DELETE FROM public.user_roles
  WHERE user_id = _user_id AND role = 'admin';
  
  RETURN true;
END;
$$;
