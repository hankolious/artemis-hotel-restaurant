
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Upload, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const GuestReviewForm = () => {
  const [formData, setFormData] = useState({
    guest_name: "",
    email: "",
    rating: 5,
    review_text: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let image_url = null;

      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('restaurant-images')
          .upload(`reviews/${fileName}`, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('restaurant-images')
          .getPublicUrl(`reviews/${fileName}`);
        
        image_url = publicUrl;
      }

      // Insert review
      const { error } = await supabase
        .from('guest_reviews')
        .insert({
          ...formData,
          image_url,
        });

      if (error) throw error;

      toast({
        title: "Bewertung eingereicht!",
        description: "Ihre Bewertung wurde erfolgreich eingereicht und wartet auf Freigabe.",
      });

      // Reset form
      setFormData({
        guest_name: "",
        email: "",
        rating: 5,
        review_text: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Fehler",
        description: "Beim Einreichen Ihrer Bewertung ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
        <CardTitle className="text-2xl text-blue-900 flex items-center">
          <MessageCircle className="w-6 h-6 mr-2" />
          Bewertung abgeben
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guest_name" className="text-blue-900 font-medium">
                Name *
              </Label>
              <Input
                id="guest_name"
                value={formData.guest_name}
                onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
                required
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-blue-900 font-medium">
                E-Mail (optional)
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <Label className="text-blue-900 font-medium">Bewertung *</Label>
            <div className="flex items-center space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= formData.rating 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, rating: star})}
                />
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="review_text" className="text-blue-900 font-medium">
              Ihre Bewertung *
            </Label>
            <Textarea
              id="review_text"
              value={formData.review_text}
              onChange={(e) => setFormData({...formData, review_text: e.target.value})}
              placeholder="Teilen Sie Ihre Erfahrung mit uns..."
              required
              rows={4}
              className="border-blue-200 focus:border-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="image" className="text-blue-900 font-medium">
              Foto hochladen (optional)
            </Label>
            <div className="mt-2 flex items-center space-x-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="border-blue-200 focus:border-blue-500"
              />
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          >
            {isSubmitting ? "Wird eingereicht..." : "Bewertung einreichen"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
