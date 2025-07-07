import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Type } from 'lucide-react';

interface FontSetting {
  key: string;
  label: string;
  defaultValue: string;
  description: string;
}

const fontSettings: FontSetting[] = [
  { key: 'header_font', label: 'Titel Schriftart', defaultValue: 'serif', description: 'Für H1, H2, H3 etc.' },
  { key: 'body_font', label: 'Fließtext Schriftart', defaultValue: 'Inter', description: 'Für normalen Text' },
  { key: 'navigation_font', label: 'Navigation Schriftart', defaultValue: 'Inter', description: 'Für Menüs und Navigation' },
  { key: 'footer_text_font', label: 'Footer Schriftart', defaultValue: 'Inter', description: 'Für Footer-Texte' },
  { key: 'menu_text_font', label: 'Menü Schriftart', defaultValue: 'Inter', description: 'Für Restaurant-Menü' },
];

const fontOptions = [
  { value: 'serif', label: 'Serif (Times)', preview: 'Times New Roman' },
  { value: 'sans-serif', label: 'Sans-serif (Arial)', preview: 'Arial' },
  { value: 'Inter', label: 'Inter', preview: 'Inter' },
  { value: 'Roboto', label: 'Roboto', preview: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans', preview: 'Open Sans' },
  { value: 'Lato', label: 'Lato', preview: 'Lato' },
  { value: 'Montserrat', label: 'Montserrat', preview: 'Montserrat' },
  { value: 'Playfair Display', label: 'Playfair Display', preview: 'Playfair Display' },
  { value: 'Dancing Script', label: 'Dancing Script', preview: 'Dancing Script' },
  { value: 'Poppins', label: 'Poppins', preview: 'Poppins' },
  { value: 'Nunito', label: 'Nunito', preview: 'Nunito' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro', preview: 'Source Sans Pro' },
];

export const AdminFontEditor = () => {
  const [fonts, setFonts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('setting_key, setting_value')
        .in('setting_key', fontSettings.map(s => s.key));

      if (error) throw error;

      const fontMap: Record<string, string> = {};
      fontSettings.forEach(setting => {
        const dbSetting = data?.find(d => d.setting_key === setting.key);
        fontMap[setting.key] = dbSetting?.setting_value || setting.defaultValue;
      });

      setFonts(fontMap);
    } catch (error) {
      console.error('Error loading fonts:', error);
      toast({
        title: 'Fehler',
        description: 'Schriftarten konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFont = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('website_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
          category: 'typography',
          display_name: fontSettings.find(s => s.key === key)?.label || key,
          setting_type: 'select',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      setFonts(prev => ({ ...prev, [key]: value }));
      
      toast({
        title: 'Gespeichert',
        description: 'Schriftart wurde erfolgreich aktualisiert.',
      });
    } catch (error) {
      console.error('Error updating font:', error);
      toast({
        title: 'Fehler',
        description: 'Schriftart konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Lade Schriftarten...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Type className="w-5 h-5 mr-2" />
          Schriftarten bearbeiten
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {fontSettings.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <Label htmlFor={setting.key}>
                {setting.label}
                <span className="text-sm text-muted-foreground ml-1">
                  ({setting.description})
                </span>
              </Label>
              <Select
                value={fonts[setting.key] || setting.defaultValue}
                onValueChange={(value) => updateFont(setting.key, value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.preview }}>
                        {font.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div 
                className="text-lg p-2 border rounded bg-gray-50"
                style={{ fontFamily: fonts[setting.key] || setting.defaultValue }}
              >
                Vorschau: Beispieltext in {setting.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};