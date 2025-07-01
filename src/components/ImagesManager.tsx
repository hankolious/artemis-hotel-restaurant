
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RestaurantImage {
  id: string;
  image_url: string;
  caption: string | null;
  category: string;
  is_active: boolean;
  created_at: string;
}

export const ImagesManager = () => {
  const [images, setImages] = useState<RestaurantImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("general");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const categories = [
    { value: "general", label: "Allgemein" },
    { value: "restaurant", label: "Restaurant" },
    { value: "hotel", label: "Hotel" },
    { value: "food", label: "Essen" },
    { value: "drinks", label: "Getränke" },
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurant_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        title: "Fehler",
        description: "Bilder konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('restaurant-images')
        .upload(`gallery/${fileName}`, selectedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('restaurant-images')
        .getPublicUrl(`gallery/${fileName}`);

      const { error: insertError } = await supabase
        .from('restaurant_images')
        .insert({
          image_url: publicUrl,
          caption: caption || null,
          category,
          is_active: true,
        });

      if (insertError) throw insertError;

      toast({
        title: "Hochgeladen",
        description: "Bild wurde erfolgreich hochgeladen.",
      });

      // Reset form
      setSelectedFile(null);
      setCaption("");
      setCategory("general");
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Fehler",
        description: "Beim Hochladen ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('restaurant_images')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: isActive ? "Aktiviert" : "Deaktiviert",
        description: `Bild wurde ${isActive ? 'aktiviert' : 'deaktiviert'}.`,
      });

      fetchImages();
    } catch (error) {
      console.error('Error toggling image:', error);
      toast({
        title: "Fehler",
        description: "Beim Ändern ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Bild löschen möchten?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('restaurant_images')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Extract file path from URL and delete from storage
      const filePath = imageUrl.split('/').pop();
      if (filePath) {
        await supabase.storage
          .from('restaurant-images')
          .remove([`gallery/${filePath}`]);
      }

      toast({
        title: "Gelöscht",
        description: "Bild wurde erfolgreich gelöscht.",
      });

      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Fehler",
        description: "Beim Löschen ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center p-8 text-blue-600">Lade Bilder...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-blue-900">Bilder verwalten</h3>
      </div>

      {/* Upload Form */}
      <Card className="border-2 border-blue-300">
        <CardHeader>
          <CardTitle className="text-blue-900">Neues Bild hochladen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Bild auswählen</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Beschriftung (optional)</Label>
              <Input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Bildbeschreibung..."
              />
            </div>
            <div>
              <Label>Kategorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? "Wird hochgeladen..." : "Hochladen"}
          </Button>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="border border-blue-200">
            <div className="relative">
              <img
                src={image.image_url}
                alt={image.caption || "Restaurant Bild"}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {!image.is_active && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                  <span className="text-white font-medium">Deaktiviert</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                {image.caption && (
                  <p className="text-sm text-blue-700">{image.caption}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded">
                    {categories.find(c => c.value === image.category)?.label || image.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={image.is_active}
                      onCheckedChange={(checked) => handleToggleActive(image.id, checked)}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(image.id, image.image_url)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center p-8 text-blue-600">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-blue-300" />
          <p>Noch keine Bilder hochgeladen.</p>
        </div>
      )}
    </div>
  );
};
