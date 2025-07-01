
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Review {
  id: string;
  guest_name: string;
  rating: number;
  review_text: string;
  image_url: string | null;
  created_at: string;
}

export const GuestReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('guest_reviews')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center text-blue-600">Bewertungen werden geladen...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
        <CardTitle className="text-2xl text-blue-900 flex items-center">
          <Star className="w-6 h-6 mr-2" />
          Gästebewertungen
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {reviews.length === 0 ? (
            <div className="text-center text-blue-600 py-8">
              Noch keine Bewertungen vorhanden. Seien Sie der erste!
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-blue-100 pb-4 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900">{review.guest_name}</h4>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-blue-700 text-sm mb-2">{review.review_text}</p>
                    {review.image_url && (
                      <img 
                        src={review.image_url} 
                        alt="Gast Foto" 
                        className="w-24 h-24 object-cover rounded-lg mb-2"
                      />
                    )}
                    <p className="text-blue-500 text-xs">
                      {format(new Date(review.created_at), 'dd.MM.yyyy', { locale: de })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
