-- Add opening hours setting to website_settings
INSERT INTO website_settings (setting_key, setting_value, display_name, category, setting_type) 
VALUES ('opening_hours', '17:30', 'Öffnungszeiten', 'contact', 'text')
ON CONFLICT (setting_key) DO UPDATE SET setting_value = '17:30';