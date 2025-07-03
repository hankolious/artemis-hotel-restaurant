
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WebsiteSettings {
  [key: string]: string;
}

export const useWebsiteSettings = () => {
  const [settings, setSettings] = useState<WebsiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
    
    // Subscribe to real-time changes
    const subscription = supabase
      .channel('website-settings-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'website_settings' 
        }, 
        () => {
          fetchSettings();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('setting_key, setting_value');

      if (error) throw error;

      const settingsMap: WebsiteSettings = {};
      data?.forEach((setting) => {
        settingsMap[setting.setting_key] = setting.setting_value;
      });

      setSettings(settingsMap);
      applyStyles(settingsMap);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyStyles = (settingsMap: WebsiteSettings) => {
    const root = document.documentElement;
    
    // Apply colors
    if (settingsMap.primary_color) {
      root.style.setProperty('--primary-color', settingsMap.primary_color);
    }
    if (settingsMap.secondary_color) {
      root.style.setProperty('--secondary-color', settingsMap.secondary_color);
    }
    if (settingsMap.accent_color) {
      root.style.setProperty('--accent-color', settingsMap.accent_color);
    }
    if (settingsMap.background_color) {
      root.style.setProperty('--background-color', settingsMap.background_color);
      // Apply to body background
      document.body.style.backgroundColor = settingsMap.background_color;
    }
    if (settingsMap.text_color) {
      root.style.setProperty('--text-color', settingsMap.text_color);
    }

    // Apply fonts
    if (settingsMap.header_font) {
      root.style.setProperty('--header-font', settingsMap.header_font);
    }
    if (settingsMap.body_font) {
      root.style.setProperty('--body-font', settingsMap.body_font);
    }

    // Apply layout settings
    if (settingsMap.tab_border_radius) {
      root.style.setProperty('--tab-border-radius', `${settingsMap.tab_border_radius}px`);
    }
    if (settingsMap.banner_border_radius) {
      root.style.setProperty('--banner-border-radius', `${settingsMap.banner_border_radius}px`);
    }
  };

  return { settings, loading, refetch: fetchSettings };
};
