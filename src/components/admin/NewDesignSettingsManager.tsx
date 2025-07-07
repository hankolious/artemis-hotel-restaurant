import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Palette, Type, Share2, FileText } from 'lucide-react';
import { AdminColorEditor } from './AdminColorEditor';
import { AdminTextEditor } from './AdminTextEditor';
import { AdminSocialEditor } from './AdminSocialEditor';
import { AdminFontEditor } from './AdminFontEditor';

export const NewDesignSettingsManager = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-blue-900">
          <Settings className="w-5 h-5 mr-2" />
          Design-Einstellungen (Neu)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors" className="flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Farben
            </TabsTrigger>
            <TabsTrigger value="fonts" className="flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Schriften
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Texte
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Social Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="mt-6">
            <AdminColorEditor />
          </TabsContent>

          <TabsContent value="fonts" className="mt-6">
            <AdminFontEditor />
          </TabsContent>

          <TabsContent value="text" className="mt-6">
            <AdminTextEditor />
          </TabsContent>

          <TabsContent value="social" className="mt-6">
            <AdminSocialEditor />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};