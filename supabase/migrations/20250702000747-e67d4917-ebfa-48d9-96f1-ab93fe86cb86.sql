
-- Create table for website customization settings
CREATE TABLE public.website_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  setting_type VARCHAR(50) NOT NULL DEFAULT 'text', -- 'text', 'color', 'font', 'image', 'number'
  display_name VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'general',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default website settings
INSERT INTO public.website_settings (setting_key, setting_value, setting_type, display_name, category) VALUES
('primary_color', '#1e40af', 'color', 'Primary Color', 'colors'),
('secondary_color', '#3b82f6', 'color', 'Secondary Color', 'colors'),
('accent_color', '#60a5fa', 'color', 'Accent Color', 'colors'),
('background_color', '#f8fafc', 'color', 'Background Color', 'colors'),
('text_color', '#1e293b', 'color', 'Text Color', 'colors'),
('header_font', 'serif', 'font', 'Header Font', 'typography'),
('body_font', 'Inter', 'font', 'Body Font', 'typography'),
('logo_url', '/placeholder.svg', 'image', 'Logo URL', 'branding'),
('site_title', 'ARTEMIS', 'text', 'Site Title', 'branding'),
('site_subtitle', 'Griechisches Restaurant & Hotel', 'text', 'Site Subtitle', 'branding');

-- Create table for special events
CREATE TABLE public.special_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
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
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert some sample special events
INSERT INTO public.special_events (title, description, event_date, start_time, end_time, price, max_participants, requires_booking, booking_phone) VALUES
('Griechischer Abend', 'Traditioneller griechischer Abend mit Live-Musik und Tanz', '2024-08-15', '19:00', '23:00', 45.00, 50, true, '06353 - 93 220 70'),
('Weinverkostung', 'Probieren Sie die besten griechischen Weine mit passenden Häppchen', '2024-08-22', '18:00', '21:00', 35.00, 25, true, '06353 - 93 220 70'),
('Familien-Sonntag', 'Spezielles Familienmenü mit Kinderanimation', '2024-08-25', '12:00', '16:00', 25.00, 40, false, null);

-- Enable RLS on new tables
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.special_events ENABLE ROW LEVEL SECURITY;

-- Public read access for website settings and special events
CREATE POLICY "Allow public read access to website settings" ON public.website_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access to active special events" ON public.special_events FOR SELECT TO anon, authenticated USING (is_active = true);

-- Admin policies
CREATE POLICY "Admins can manage website settings" ON public.website_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage special events" ON public.special_events FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
