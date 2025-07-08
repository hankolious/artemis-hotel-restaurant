
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Camera, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RestaurantImage {
  id: string;
  image_url: string;
  caption: string | null;
  category: string;
  is_active: boolean;
}

export const Gallery = () => {
  const [images, setImages] = useState<RestaurantImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurant_images')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pb-8">
        <div className="text-center text-blue-600">Bilder werden geladen...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'serif' }}>
          GALERIE
        </h2>
        <p className="text-blue-700">Impressionen aus unserem Restaurant und Hotel</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.length > 0 ? (
          images.map((image) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <Card className="border-2 border-blue-200 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={image.image_url}
                      alt={image.caption || "Restaurant Bild"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {image.caption && (
                    <div className="p-3">
                      <p className="text-sm text-blue-700">{image.caption}</p>
                    </div>
                  )}
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0">
                <div className="relative">
                  <img
                    src={image.image_url}
                    alt={image.caption || "Restaurant Bild"}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                      <p className="text-center">{image.caption}</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-2 border-blue-200 shadow-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Camera className="w-12 h-12 text-blue-400" />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
