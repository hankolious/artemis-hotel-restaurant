
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Euro, Phone, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface SpecialEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  start_time: string | null;
  end_time: string | null;
  price: number | null;
  max_participants: number | null;
  current_participants: number;
  image_url: string | null;
  requires_booking: boolean;
  booking_phone: string | null;
}

export const SpecialEventsDisplay = () => {
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('special_events')
        .select('*')
        .eq('is_active', true)
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pb-8">
        <div className="text-center text-blue-600">Events werden geladen...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'serif' }}>
          BESONDERE VERANSTALTUNGEN
        </h2>
        <p className="text-blue-700 max-w-2xl mx-auto">
          Erleben Sie besondere Momente in unserem Restaurant mit exklusiven Events und Veranstaltungen.
        </p>
      </div>

      {events.length === 0 ? (
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <Star className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <p className="text-blue-600">
              Derzeit sind keine besonderen Veranstaltungen geplant. 
              Schauen Sie bald wieder vorbei!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="border-2 border-blue-200 shadow-lg overflow-hidden">
              {event.image_url && (
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200">
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
                <CardTitle className="text-xl text-blue-900">
                  {event.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                {event.description && (
                  <p className="text-blue-700 mb-4">{event.description}</p>
                )}
                
                <div className="space-y-3">
                  {event.event_date && (
                    <div className="flex items-center text-blue-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">
                        {format(new Date(event.event_date), 'EEEE, dd. MMMM yyyy', { locale: de })}
                      </span>
                    </div>
                  )}
                  
                  {event.start_time && (
                    <div className="flex items-center text-blue-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>
                        {event.start_time} {event.end_time && `- ${event.end_time}`} Uhr
                      </span>
                    </div>
                  )}
                  
                  {event.price && (
                    <div className="flex items-center text-blue-600">
                      <Euro className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{event.price.toFixed(2)} € pro Person</span>
                    </div>
                  )}
                  
                  {event.max_participants && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Plätze: {event.current_participants}/{event.max_participants}</span>
                      </div>
                      {event.max_participants - event.current_participants <= 5 && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Nur noch wenige Plätze!
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                {event.requires_booking && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 mb-2 font-medium">
                      Anmeldung erforderlich
                    </p>
                    {event.booking_phone && (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                        <a href={`tel:${event.booking_phone.replace(/\s/g, '')}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Jetzt anrufen: {event.booking_phone}
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
