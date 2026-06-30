
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Admins view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ updated_at trigger ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ MENU ITEMS ============
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100) NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  volume VARCHAR(50),
  alcohol_percentage VARCHAR(20),
  additional_info TEXT,
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.menu_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menu_items TO authenticated;
GRANT ALL ON public.menu_items TO service_role;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read menu" ON public.menu_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage menu" ON public.menu_items FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER tr_menu_items_updated BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ HOTEL ROOMS ============
CREATE TABLE public.hotel_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hotel_rooms TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hotel_rooms TO authenticated;
GRANT ALL ON public.hotel_rooms TO service_role;
ALTER TABLE public.hotel_rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read rooms" ON public.hotel_rooms FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage rooms" ON public.hotel_rooms FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER tr_hotel_rooms_updated BEFORE UPDATE ON public.hotel_rooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.hotel_rooms (room_type, price, description) VALUES
('Einzelzimmer', 60.00, 'Einzelzimmer'),
('Zweibettzimmer', 90.00, 'Zweibettzimmer'),
('Doppelzimmer', 95.00, 'Doppelzimmer');

-- ============ RESTAURANT INFO ============
CREATE TABLE public.restaurant_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.restaurant_info TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.restaurant_info TO authenticated;
GRANT ALL ON public.restaurant_info TO service_role;
ALTER TABLE public.restaurant_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read info" ON public.restaurant_info FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage info" ON public.restaurant_info FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ GUEST REVIEWS ============
CREATE TABLE public.guest_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name VARCHAR(200) NOT NULL,
  email VARCHAR(255),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  image_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.guest_reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.guest_reviews TO authenticated;
GRANT ALL ON public.guest_reviews TO service_role;
ALTER TABLE public.guest_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read approved reviews" ON public.guest_reviews FOR SELECT TO anon, authenticated USING (is_approved = true);
CREATE POLICY "Anyone insert review" ON public.guest_reviews FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins manage reviews" ON public.guest_reviews FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ RESTAURANT IMAGES ============
CREATE TABLE public.restaurant_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption VARCHAR(300),
  category VARCHAR(100) DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.restaurant_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.restaurant_images TO authenticated;
GRANT ALL ON public.restaurant_images TO service_role;
ALTER TABLE public.restaurant_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active images" ON public.restaurant_images FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admins manage images" ON public.restaurant_images FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ WEBSITE SETTINGS ============
CREATE TABLE public.website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  setting_type VARCHAR(50) NOT NULL DEFAULT 'text',
  display_name VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'general',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.website_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.website_settings TO authenticated;
GRANT ALL ON public.website_settings TO service_role;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.website_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage settings" ON public.website_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

INSERT INTO public.website_settings (setting_key, setting_value, setting_type, display_name, category) VALUES
('primary_color', '#8B6F47', 'color', 'Primary Color', 'colors'),
('secondary_color', '#A68A6D', 'color', 'Secondary Color', 'colors'),
('accent_color', '#D4AF7A', 'color', 'Accent Color', 'colors'),
('background_color', '#F5EFE0', 'color', 'Background Color', 'colors'),
('text_color', '#2C2418', 'color', 'Text Color', 'colors'),
('header_font', 'serif', 'font', 'Header Font', 'typography'),
('body_font', 'Inter', 'font', 'Body Font', 'typography'),
('logo_url', '/placeholder.svg', 'image', 'Logo URL', 'branding'),
('site_title', 'ARTEMIS', 'text', 'Site Title', 'branding'),
('site_subtitle', 'Griechisches Restaurant & Hotel', 'text', 'Site Subtitle', 'branding'),
('opening_hours', 'Mo, Di, Do, Fr, Sa: 17:30 - 22:00 Uhr\nSo & Feiertage: 12:00 - 14:30 & 17:30 - 22:00 Uhr\nMittwochs Ruhetag', 'text', 'Öffnungszeiten', 'contact');

-- ============ SPECIAL EVENTS ============
CREATE TABLE public.special_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_date DATE,
  start_time TIME,
  end_time TIME,
  price DECIMAL(10,2),
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  requires_booking BOOLEAN DEFAULT false,
  booking_phone VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.special_events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.special_events TO authenticated;
GRANT ALL ON public.special_events TO service_role;
ALTER TABLE public.special_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active events" ON public.special_events FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admins manage events" ON public.special_events FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER tr_special_events_updated BEFORE UPDATE ON public.special_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ ADMIN ROLE FUNCTIONS ============
CREATE OR REPLACE FUNCTION public.add_admin_role(_user_email text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _user_id uuid;
BEGIN
  SELECT id INTO _user_id FROM auth.users WHERE email = _user_email;
  IF _user_id IS NULL THEN RETURN false; END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END; $$;

CREATE OR REPLACE FUNCTION public.remove_admin_role(_user_email text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _user_id uuid;
BEGIN
  SELECT id INTO _user_id FROM auth.users WHERE email = _user_email;
  IF _user_id IS NULL THEN RETURN false; END IF;
  DELETE FROM public.user_roles WHERE user_id = _user_id AND role = 'admin';
  RETURN true;
END; $$;
