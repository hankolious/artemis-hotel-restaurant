import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Type } from 'lucide-react';

interface TextSetting {
  key: string;
  label: string;
  type: 'text' | 'textarea';
  defaultValue: string;
  description?: string;
}

const textSettings: TextSetting[] = [
  { key: 'site_title', label: 'Website Titel', type: 'text', defaultValue: 'ARTEMIS', description: 'Haupttitel der Website' },
  { key: 'site_subtitle', label: 'Website Untertitel', type: 'text', defaultValue: 'Griechisches Restaurant & Hotel', description: 'Untertitel in der Navigation' },
  { key: 'banner_title', label: 'Banner Titel', type: 'text', defaultValue: 'Willkommen bei ARTEMIS', description: 'Titel im Hero-Banner' },
  { key: 'banner_subtitle', label: 'Banner Untertitel', type: 'text', defaultValue: 'Erleben Sie authentische griechische Küche', description: 'Untertitel im Hero-Banner' },
  { key: 'restaurant_description', label: 'Restaurant Beschreibung', type: 'textarea', defaultValue: 'Willkommen im ARTEMIS - Ihrem griechischen Restaurant mit authentischer Küche und herzlicher Gastfreundschaft.', description: 'Hauptbeschreibung des Restaurants' },
  { key: 'about_text', label: 'Über uns Text', type: 'textarea', defaultValue: 'Seit über 20 Jahren verwöhnen wir unsere Gäste mit traditionellen griechischen Spezialitäten in familiärer Atmosphäre.', description: 'Text für die Über uns Sektion' },
  { key: 'contact_info', label: 'Kontakt Information', type: 'textarea', defaultValue: 'Besuchen Sie uns oder reservieren Sie telefonisch einen Tisch für ein unvergessliches kulinarisches Erlebnis.', description: 'Kontakt und Reservierungstext' },
  { key: 'footer_text', label: 'Footer Text', type: 'textarea', defaultValue: '© 2024 ARTEMIS Restaurant. Alle Rechte vorbehalten.', description: 'Text im Footer-Bereich' },
];

export const AdminTextEditor = () => {
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadTexts();
  }, []);

  const loadTexts = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('setting_key, setting_value')
        .in('setting_key', textSettings.map(s => s.key));

      if (error) throw error;

      const textMap: Record<string, string> = {};
      textSettings.forEach(setting => {
        const dbSetting = data?.find(d => d.setting_key === setting.key);
        textMap[setting.key] = dbSetting?.setting_value || setting.defaultValue;
      });

      setTexts(textMap);
    } catch (error) {
      console.error('Error loading texts:', error);
      toast({
        title: 'Fehler',
        description: 'Texte konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateText = async (key: string, value: string) => {
    setSaving(key);
    try {
      const { error } = await supabase
        .from('website_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
          category: 'content',
          display_name: textSettings.find(s => s.key === key)?.label || key,
          setting_type: 'text',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      setTexts(prev => ({ ...prev, [key]: value }));
      
      toast({
        title: 'Gespeichert',
        description: 'Text wurde erfolgreich aktualisiert.',
      });
    } catch (error) {
      console.error('Error updating text:', error);
      toast({
        title: 'Fehler',
        description: 'Text konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    } finally {
      setSaving(null);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setTexts(prev => ({ ...prev, [key]: value }));
  };

  const handleBlur = (key: string) => {
    const currentValue = texts[key];
    const originalValue = textSettings.find(s => s.key === key)?.defaultValue || '';
    
    // Only update if value has actually changed
    updateText(key, currentValue);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Lade Texte...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Type className="w-5 h-5 mr-2" />
          Texte bearbeiten
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {textSettings.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <Label htmlFor={setting.key}>
                {setting.label}
                {setting.description && (
                  <span className="text-sm text-muted-foreground ml-1">
                    ({setting.description})
                  </span>
                )}
                {saving === setting.key && (
                  <span className="text-sm text-blue-600 ml-2">Speichert...</span>
                )}
              </Label>
              {setting.type === 'textarea' ? (
                <Textarea
                  id={setting.key}
                  value={texts[setting.key] || setting.defaultValue}
                  onChange={(e) => handleInputChange(setting.key, e.target.value)}
                  onBlur={() => handleBlur(setting.key)}
                  placeholder={setting.defaultValue}
                  className="min-h-[100px] resize-y"
                  disabled={saving === setting.key}
                />
              ) : (
                <Input
                  id={setting.key}
                  type="text"
                  value={texts[setting.key] || setting.defaultValue}
                  onChange={(e) => handleInputChange(setting.key, e.target.value)}
                  onBlur={() => handleBlur(setting.key)}
                  placeholder={setting.defaultValue}
                  disabled={saving === setting.key}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};