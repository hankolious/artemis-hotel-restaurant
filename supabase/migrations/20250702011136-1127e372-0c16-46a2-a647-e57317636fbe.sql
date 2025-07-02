
-- Create the missing add_admin_role function
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

-- Create the missing remove_admin_role function
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
