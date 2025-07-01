
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Check, X, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Review {
  id: string;
  guest_name: string;
  email: string | null;
  rating: number;
  review_text: string;
  image_url: string | null;
  is_approved: boolean;
  created_at: string;
}

export const ReviewsManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('guest_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Fehler",
        description: "Bewertungen konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('guest_reviews')
        .update({ is_approved: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Freigegeben",
        description: "Bewertung wurde erfolgreich freigegeben.",
      });

      fetchReviews();
    } catch (error) {
      console.error('Error approving review:', error);
      toast({
        title: "Fehler",
        description: "Beim Freigeben ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diese Bewertung ablehnen möchten?')) return;

    try {
      const { error } = await supabase
        .from('guest_reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Abgelehnt",
        description: "Bewertung wurde erfolgreich abgelehnt.",
      });

      fetchReviews();
    } catch (error) {
      console.error('Error rejecting review:', error);
      toast({
        title: "Fehler",
        description: "Beim Ablehnen ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'pending') return !review.is_approved;
    if (filter === 'approved') return review.is_approved;
    return true;
  });

  if (isLoading) {
    return <div className="text-center p-8 text-blue-600">Lade Bewertungen...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-blue-900">Bewertungen verwalten</h3>
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            Alle ({reviews.length})
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
            size="sm"
          >
            Ausstehend ({reviews.filter(r => !r.is_approved).length})
          </Button>
          <Button
            variant={filter === 'approved' ? 'default' : 'outline'}
            onClick={() => setFilter('approved')}
            size="sm"
          >
            Freigegeben ({reviews.filter(r => r.is_approved).length})
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center p-8 text-blue-600">
            Keine Bewertungen in dieser Kategorie.
          </div>
        ) : (
          filteredReviews.map((review) => (
            <Card key={review.id} className="border border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
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
                      <Badge variant={review.is_approved ? 'default' : 'secondary'}>
                        {review.is_approved ? 'Freigegeben' : 'Ausstehend'}
                      </Badge>
                    </div>
                    
                    <p className="text-blue-700 mb-2">{review.review_text}</p>
                    
                    {review.image_url && (
                      <img 
                        src={review.image_url} 
                        alt="Gast Foto" 
                        className="w-24 h-24 object-cover rounded-lg mb-2"
                      />
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-blue-500">
                      <span>{format(new Date(review.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}</span>
                      {review.email && <span>{review.email}</span>}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    {!review.is_approved && (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(review.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(review.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
