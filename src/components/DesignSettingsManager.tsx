import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type, Image, Settings, Layout, FileImage, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WebsiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
  display_name: string;
  category: string;
}

export const DesignSettingsManager = () => {
  const [settings, setSettings] = useState<WebsiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setSettings(data || []);
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Fehler",
        description: "Einstellungen konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (settingKey: string, value: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('website_settings')
        .update({ 
          setting_value: value,
          updated_at: new Date().toISOString()
        })
        .eq('setting_key', settingKey);

      if (error) throw error;

      // Update local state
      setSettings(prev => prev.map(setting => 
        setting.setting_key === settingKey 
          ? { ...setting, setting_value: value }
          : setting
      ));

      toast({
        title: "Erfolgreich gespeichert",
        description: "Einstellung wurde aktualisiert.",
      });
    } catch (error: any) {
      console.error('Error updating setting:', error);
      toast({
        title: "Fehler",
        description: "Einstellung konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getSettingsByCategory = (category: string) => {
    return settings.filter(setting => setting.category === category);
  };

  const getSetting = (key: string) => {
    return settings.find(setting => setting.setting_key === key)?.setting_value || '';
  };

  const fontOptions = [
    { value: 'serif', label: 'Serif (Times)' },
    { value: 'sans-serif', label: 'Sans-serif (Arial)' },
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Playfair Display', label: 'Playfair Display' },
    { value: 'Dancing Script', label: 'Dancing Script' },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Lade Einstellungen...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-blue-900">
          <Settings className="w-5 h-5 mr-2" />
          Design-Einstellungen
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="colors" className="flex items-center">
              <Palette className="w-4 h-4 mr-1" />
              Farben
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center">
              <Type className="w-4 h-4 mr-1" />
              Schrift
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex items-center">
              <Image className="w-4 h-4 mr-1" />
              Logo
            </TabsTrigger>
            <TabsTrigger value="banner" className="flex items-center">
              <FileImage className="w-4 h-4 mr-1" />
              Banner
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center">
              <Layout className="w-4 h-4 mr-1" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center">
              <Share2 className="w-4 h-4 mr-1" />
              Social
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primary_color">Primärfarbe (Haupttitel)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={getSetting('primary_color') || '#1e40af'}
                    onChange={(e) => updateSetting('primary_color', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={getSetting('primary_color')}
                    onChange={(e) => updateSetting('primary_color', e.target.value)}
                    className="flex-1"
                    placeholder="#1e40af"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary_color">Sekundärfarbe (Untertitel)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={getSetting('secondary_color') || '#3b82f6'}
                    onChange={(e) => updateSetting('secondary_color', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={getSetting('secondary_color')}
                    onChange={(e) => updateSetting('secondary_color', e.target.value)}
                    className="flex-1"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="background_color">Hintergrundfarbe</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={getSetting('background_color') || '#f8fafc'}
                    onChange={(e) => updateSetting('background_color', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={getSetting('background_color')}
                    onChange={(e) => updateSetting('background_color', e.target.value)}
                    className="flex-1"
                    placeholder="#f8fafc"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="text_color">Textfarbe</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={getSetting('text_color') || '#1e293b'}
                    onChange={(e) => updateSetting('text_color', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={getSetting('text_color')}
                    onChange={(e) => updateSetting('text_color', e.target.value)}
                    className="flex-1"
                    placeholder="#1e293b"
                  />
                </div>
              </div>

              {getSettingsByCategory('colors').map((setting) => (
                <div key={setting.id} className="space-y-2">
                  <Label htmlFor={setting.setting_key}>{setting.display_name}</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id={setting.setting_key}
                      type="color"
                      value={setting.setting_value}
                      onChange={(e) => updateSetting(setting.setting_key, e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={setting.setting_value}
                      onChange={(e) => updateSetting(setting.setting_key, e.target.value)}
                      className="flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="header_font">Überschriften-Schriftart</Label>
                <Select
                  value={getSetting('header_font') || 'serif'}
                  onValueChange={(value) => updateSetting('header_font', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body_font">Text-Schriftart</Label>
                <Select
                  value={getSetting('body_font') || 'Inter'}
                  onValueChange={(value) => updateSetting('body_font', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  type="url"
                  value={getSetting('logo_url')}
                  onChange={(e) => updateSetting('logo_url', e.target.value)}
                  placeholder="/lovable-uploads/e38ae609-807b-42a5-b52d-27d67134bffc.png"
                />
                {getSetting('logo_url') && (
                  <img 
                    src={getSetting('logo_url')} 
                    alt="Logo Preview" 
                    className="w-20 h-20 object-contain border rounded"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_title">Website-Titel</Label>
                <Input
                  id="site_title"
                  type="text"
                  value={getSetting('site_title')}
                  onChange={(e) => updateSetting('site_title', e.target.value)}
                  placeholder="ARTEMIS"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_subtitle">Website-Untertitel</Label>
                <Input
                  id="site_subtitle"
                  type="text"
                  value={getSetting('site_subtitle')}
                  onChange={(e) => updateSetting('site_subtitle', e.target.value)}
                  placeholder="Griechisches Restaurant & Hotel"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="banner" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="banner_image">Banner Bild URL</Label>
                <Input
                  id="banner_image"
                  type="url"
                  value={getSetting('banner_image')}
                  onChange={(e) => updateSetting('banner_image', e.target.value)}
                  placeholder="/lovable-uploads/8ed39435-b5e1-4e3f-acbd-d04a4e84f4bc.png"
                />
                {getSetting('banner_image') && (
                  <img 
                    src={getSetting('banner_image')} 
                    alt="Banner Preview" 
                    className="w-full h-32 object-cover border rounded"
                  />
                )}
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="banner_title">Banner Titel</Label>
                  <Input
                    id="banner_title"
                    type="text"
                    value={getSetting('banner_title')}
                    onChange={(e) => updateSetting('banner_title', e.target.value)}
                    placeholder="Willkommen bei ARTEMIS"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="banner_subtitle">Banner Untertitel</Label>
                  <Input
                    id="banner_subtitle"
                    type="text"
                    value={getSetting('banner_subtitle')}
                    onChange={(e) => updateSetting('banner_subtitle', e.target.value)}
                    placeholder="Erleben Sie authentische griechische Küche"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="banner_text_color">Banner Titel Farbe</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={getSetting('banner_text_color') || '#ffffff'}
                      onChange={(e) => updateSetting('banner_text_color', e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={getSetting('banner_text_color')}
                      onChange={(e) => updateSetting('banner_text_color', e.target.value)}
                      className="flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="banner_subtitle_color">Banner Untertitel Farbe</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={getSetting('banner_subtitle_color') || '#ffffff'}
                      onChange={(e) => updateSetting('banner_subtitle_color', e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={getSetting('banner_subtitle_color')}
                      onChange={(e) => updateSetting('banner_subtitle_color', e.target.value)}
                      className="flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="banner_border_radius">Banner Ecken-Rundung (px)</Label>
                <Input
                  id="banner_border_radius"
                  type="number"
                  min="0"
                  max="50"
                  value={getSetting('banner_border_radius')}
                  onChange={(e) => updateSetting('banner_border_radius', e.target.value)}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tab_border_radius">Tab Ecken-Rundung (px)</Label>
                <Input
                  id="tab_border_radius"
                  type="number"
                  min="0"
                  max="25"
                  value={getSetting('tab_border_radius')}
                  onChange={(e) => updateSetting('tab_border_radius', e.target.value)}
                  placeholder="8"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  type="url"
                  value={getSetting('facebook_url')}
                  onChange={(e) => updateSetting('facebook_url', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input
                  id="instagram_url"
                  type="url"
                  value={getSetting('instagram_url')}
                  onChange={(e) => updateSetting('instagram_url', e.target.value)}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok_url">TikTok URL</Label>
                <Input
                  id="tiktok_url"
                  type="url"
                  value={getSetting('tiktok_url')}
                  onChange={(e) => updateSetting('tiktok_url', e.target.value)}
                  placeholder="https://tiktok.com/@yourprofile"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Hinweis:</strong> Änderungen werden automatisch gespeichert. 
            Aktualisieren Sie die Seite, um alle Änderungen zu sehen.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
