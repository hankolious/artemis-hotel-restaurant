import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Palette } from 'lucide-react';

interface ColorSetting {
  key: string;
  label: string;
  defaultValue: string;
  description?: string;
}

const colorSettings: ColorSetting[] = [
  { key: 'primary_color', label: 'Primärfarbe', defaultValue: '#1e40af', description: 'Haupttitel & Navigation' },
  { key: 'secondary_color', label: 'Sekundärfarbe', defaultValue: '#3b82f6', description: 'Untertitel & Links' },
  { key: 'accent_color', label: 'Akzentfarbe', defaultValue: '#60a5fa', description: 'Buttons & Highlights' },
  { key: 'background_color', label: 'Hintergrundfarbe', defaultValue: '#f8fafc', description: 'Seitenhintergrund' },
  { key: 'text_color', label: 'Textfarbe', defaultValue: '#1e293b', description: 'Haupttext' },
  { key: 'footer_color', label: 'Footer Hintergrund', defaultValue: '#1e3a8a', description: 'Footer Hintergrundfarbe' },
  { key: 'footer_text_color', label: 'Footer Text', defaultValue: '#93c5fd', description: 'Footer Textfarbe' },
  { key: 'menu_text_color', label: 'Menü Text', defaultValue: '#374151', description: 'Menütextfarbe' },
];

export const AdminColorEditor = () => {
  const [colors, setColors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('setting_key, setting_value')
        .in('setting_key', colorSettings.map(s => s.key));

      if (error) throw error;

      const colorMap: Record<string, string> = {};
      colorSettings.forEach(setting => {
        const dbSetting = data?.find(d => d.setting_key === setting.key);
        colorMap[setting.key] = dbSetting?.setting_value || setting.defaultValue;
      });

      setColors(colorMap);
    } catch (error) {
      console.error('Error loading colors:', error);
      toast({
        title: 'Fehler',
        description: 'Farben konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateColor = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('website_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
          category: 'colors',
          display_name: colorSettings.find(s => s.key === key)?.label || key,
          setting_type: 'color',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      setColors(prev => ({ ...prev, [key]: value }));
      
      toast({
        title: 'Gespeichert',
        description: 'Farbe wurde erfolgreich aktualisiert.',
      });
    } catch (error) {
      console.error('Error updating color:', error);
      toast({
        title: 'Fehler',
        description: 'Farbe konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Lade Farben...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Farben bearbeiten
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {colorSettings.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <Label htmlFor={setting.key}>
                {setting.label}
                {setting.description && (
                  <span className="text-sm text-muted-foreground ml-1">
                    ({setting.description})
                  </span>
                )}
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={colors[setting.key] || setting.defaultValue}
                  onChange={(e) => updateColor(setting.key, e.target.value)}
                  className="w-16 h-10 p-1 border rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={colors[setting.key] || setting.defaultValue}
                  onChange={(e) => updateColor(setting.key, e.target.value)}
                  className="flex-1 font-mono text-sm"
                  placeholder={setting.defaultValue}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};