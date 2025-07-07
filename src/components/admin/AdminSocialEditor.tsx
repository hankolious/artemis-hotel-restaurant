import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Share2, Facebook, Instagram, Twitter, Youtube, Globe } from 'lucide-react';

interface SocialSetting {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
}

const socialSettings: SocialSetting[] = [
  { key: 'facebook_url', label: 'Facebook URL', icon: Facebook, placeholder: 'https://facebook.com/yourpage' },
  { key: 'instagram_url', label: 'Instagram URL', icon: Instagram, placeholder: 'https://instagram.com/yourprofile' },
  { key: 'twitter_url', label: 'Twitter URL', icon: Twitter, placeholder: 'https://twitter.com/yourprofile' },
  { key: 'youtube_url', label: 'YouTube URL', icon: Youtube, placeholder: 'https://youtube.com/yourchannel' },
  { key: 'website_url', label: 'Website URL', icon: Globe, placeholder: 'https://your-website.com' },
];

export const AdminSocialEditor = () => {
  const [socialUrls, setSocialUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSocialUrls();
  }, []);

  const loadSocialUrls = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('setting_key, setting_value')
        .in('setting_key', socialSettings.map(s => s.key));

      if (error) throw error;

      const urlMap: Record<string, string> = {};
      socialSettings.forEach(setting => {
        const dbSetting = data?.find(d => d.setting_key === setting.key);
        urlMap[setting.key] = dbSetting?.setting_value || '';
      });

      setSocialUrls(urlMap);
    } catch (error) {
      console.error('Error loading social URLs:', error);
      toast({
        title: 'Fehler',
        description: 'Social Media URLs konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSocialUrl = async (key: string, value: string) => {
    setSaving(key);
    try {
      const { error } = await supabase
        .from('website_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
          category: 'social',
          display_name: socialSettings.find(s => s.key === key)?.label || key,
          setting_type: 'url',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      setSocialUrls(prev => ({ ...prev, [key]: value }));
      
      toast({
        title: 'Gespeichert',
        description: 'Social Media URL wurde erfolgreich aktualisiert.',
      });
    } catch (error) {
      console.error('Error updating social URL:', error);
      toast({
        title: 'Fehler',
        description: 'Social Media URL konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    } finally {
      setSaving(null);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setSocialUrls(prev => ({ ...prev, [key]: value }));
  };

  const handleBlur = (key: string) => {
    const currentValue = socialUrls[key] || '';
    updateSocialUrl(key, currentValue);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Lade Social Media URLs...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Share2 className="w-5 h-5 mr-2" />
          Social Media Links
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {socialSettings.map((setting) => {
            const IconComponent = setting.icon;
            return (
              <div key={setting.key} className="space-y-2">
                <Label htmlFor={setting.key} className="flex items-center">
                  <IconComponent className="w-4 h-4 mr-2" />
                  {setting.label}
                  {saving === setting.key && (
                    <span className="text-sm text-blue-600 ml-2">Speichert...</span>
                  )}
                </Label>
                <Input
                  id={setting.key}
                  type="url"
                  value={socialUrls[setting.key] || ''}
                  onChange={(e) => handleInputChange(setting.key, e.target.value)}
                  onBlur={() => handleBlur(setting.key)}
                  placeholder={setting.placeholder}
                  disabled={saving === setting.key}
                />
                {socialUrls[setting.key] && (
                  <div className="text-sm text-muted-foreground">
                    <a 
                      href={socialUrls[setting.key]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Link testen →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};