
-- Create menu items table for admin management
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  volume VARCHAR(50),
  alcohol_percentage VARCHAR(20),
  additional_info TEXT,
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hotel rooms table for admin management
CREATE TABLE public.hotel_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_type VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert current hotel room data
INSERT INTO public.hotel_rooms (room_type, price, description) VALUES
('Einzelzimmer', 60.00, 'Einzelzimmer'),
('Zweibettzimmer', 90.00, 'Zweibettzimmer'),
('Doppelzimmer', 95.00, 'Doppelzimmer');

-- Create restaurant info table for admin management
CREATE TABLE public.restaurant_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert current restaurant info
INSERT INTO public.restaurant_info (section, content) VALUES
('about', 'Artemis die griechische Göttin der Jagd, der Natur und der Wildnis. Sie ist eine geschickte und zielsichere Jägerin. Sie gilt als unnahbar und auch als grausam. Ihre Mutter ist die Titanin Leto.

An heiligen Tieren hat die Göttin der Jagd gleich einige: Den Hirsch, den Eber, aber auch den Bär und den Hund. Besonders häufig wird die Göttin mit einem Hirsch abgebildet.

Die Göttin Artemis streift übrigens meist allein oder von ihren Nymphen begleitet durch die Wälder des antiken Griechenland. Manchmal wird sie von ihrem Zwillingsbruder, Apollon, begleitet.

Niemand darf sich ihr nähern, insbesondere Männer, die es auf ihre Jungfräulichkeit abgesehen haben, nicht. Und auch die Nymphen der Artemis müssen – wie die Göttin selbst – jungfräulich sein und bleiben.'),
('contact_address', 'Am Nussbaum 6, 67273 Weisenheim am Berg'),
('contact_phone', '06353 - 93 220 70'),
('hotel_booking_phone', '06353 507223'),
('opening_hours', 'Mo. - Sa.\n17:00 - 22:00\n\nSo. und Feiertage\n12:00 - 14:30\n17:00 - 22:00\n\n* Mittwoch Ruhetag');

-- Create guest reviews table
CREATE TABLE public.guest_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name VARCHAR(200) NOT NULL,
  email VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT NOT NULL,
  image_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create restaurant images table
CREATE TABLE public.restaurant_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption VARCHAR(300),
  category VARCHAR(100) DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_images ENABLE ROW LEVEL SECURITY;

-- Public read access for menu items, hotel rooms, and restaurant info
CREATE POLICY "Allow public read access to menu items" ON public.menu_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access to hotel rooms" ON public.hotel_rooms FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access to restaurant info" ON public.restaurant_info FOR SELECT TO anon, authenticated USING (true);

-- Public read access for approved reviews
CREATE POLICY "Allow public read access to approved reviews" ON public.guest_reviews FOR SELECT TO anon, authenticated USING (is_approved = true);

-- Allow anyone to insert reviews (they need approval)
CREATE POLICY "Allow anyone to insert reviews" ON public.guest_reviews FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Public read access for active images
CREATE POLICY "Allow public read access to active images" ON public.restaurant_images FOR SELECT TO anon, authenticated USING (is_active = true);

-- Admin policies (users with admin role can manage everything)
CREATE POLICY "Admins can manage menu items" ON public.menu_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage hotel rooms" ON public.hotel_rooms FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage restaurant info" ON public.restaurant_info FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage reviews" ON public.guest_reviews FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage images" ON public.restaurant_images FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('restaurant-images', 'restaurant-images', true);

-- Allow public access to view images
CREATE POLICY "Allow public access to restaurant images" ON storage.objects FOR SELECT USING (bucket_id = 'restaurant-images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'restaurant-images');

-- Allow admins to manage all images
CREATE POLICY "Allow admins to manage restaurant images" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'restaurant-images' AND public.has_role(auth.uid(), 'admin'));
