import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Euro, Phone, Star, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format, isAfter, parseISO } from "date-fns";
import { de } from "date-fns/locale";

interface Event {
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
  is_active: boolean;
}

export const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('special_events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        setError('Fehler beim Laden der Veranstaltungen');
        return;
      }

      console.log('Fetched events:', data);
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Fehler beim Laden der Veranstaltungen');
    } finally {
      setLoading(false);
    }
  };

  const formatEventDate = (dateString: string | null) => {
    if (!dateString) return null;
    try {
      return format(parseISO(dateString), 'EEEE, dd. MMMM yyyy', { locale: de });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return null;
    try {
      // Handle time format like "18:00:00" or "18:00"
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`;
    } catch {
      return timeString;
    }
  };

  const isEventUpcoming = (eventDate: string | null) => {
    if (!eventDate) return true; // Show events without dates
    try {
      const eventDateTime = parseISO(eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset to start of day
      return isAfter(eventDateTime, today) || eventDateTime.toDateString() === today.toDateString();
    } catch {
      return true; // Show if we can't parse the date
    }
  };

  // Filter events - show all events for now (for testing)
  const displayEvents = events.filter(event => {
    // Temporarily show all events to test the component
    return true; // event.is_active && isEventUpcoming(event.event_date);
  });

  const handleBookingCall = (phone: string) => {
    const cleanPhone = phone.replace(/\s|-/g, '');
    window.location.href = `tel:+49${cleanPhone}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pb-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600">Veranstaltungen werden geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pb-8">
        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <p className="text-red-600">{error}</p>
            <Button 
              onClick={fetchEvents} 
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Erneut versuchen
            </Button>
          </CardContent>
        </Card>
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

      {displayEvents.length === 0 ? (
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <Star className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Keine aktuellen Veranstaltungen
            </h3>
            <p className="text-blue-600 mb-4">
              Derzeit sind keine besonderen Veranstaltungen geplant.
            </p>
            <p className="text-sm text-blue-500">
              Schauen Sie bald wieder vorbei oder rufen Sie uns an für Informationen über kommende Events!
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center text-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-medium">06353 - 93 220 70</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayEvents.map((event) => (
            <Card key={event.id} className="border-2 border-blue-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {event.image_url && (
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200">
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
                <CardTitle className="text-xl text-blue-900 flex items-start justify-between">
                  <span>{event.title}</span>
                  {!isEventUpcoming(event.event_date) && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Vergangen
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                {event.description && (
                  <p className="text-blue-700 mb-4 text-sm leading-relaxed">
                    {event.description}
                  </p>
                )}
                
                <div className="space-y-3">
                  {event.event_date && (
                    <div className="flex items-center text-blue-600">
                      <Calendar className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="font-medium text-sm">
                        {formatEventDate(event.event_date)}
                      </span>
                    </div>
                  )}
                  
                  {event.start_time && (
                    <div className="flex items-center text-blue-600">
                      <Clock className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="text-sm">
                        {formatTime(event.start_time)}
                        {event.end_time && ` - ${formatTime(event.end_time)}`} Uhr
                      </span>
                    </div>
                  )}
                  
                  {event.price !== null && (
                    <div className="flex items-center text-blue-600">
                      <Euro className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="font-semibold text-sm">
                        {event.price === 0 ? 'Kostenlos' : `${event.price.toFixed(2)} € pro Person`}
                      </span>
                    </div>
                  )}
                  
                  {event.max_participants && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-600">
                        <Users className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="text-sm">
                          {event.current_participants}/{event.max_participants} Plätze
                        </span>
                      </div>
                      {event.max_participants - event.current_participants <= 5 && 
                       event.max_participants - event.current_participants > 0 && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                          Wenige Plätze!
                        </Badge>
                      )}
                      {event.current_participants >= event.max_participants && (
                        <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                          Ausgebucht
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                {event.requires_booking && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <p className="text-sm text-blue-800 font-medium">
                        Anmeldung erforderlich
                      </p>
                    </div>
                    {event.booking_phone && (
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-sm"
                        onClick={() => handleBookingCall(event.booking_phone!)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Jetzt anrufen: {event.booking_phone}
                      </Button>
                    )}
                  </div>
                )}
                
                {!event.requires_booking && event.price === 0 && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 font-medium text-center">
                      Keine Anmeldung erforderlich - Einfach vorbeikommen!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Debug info (remove in production) */}
      <div className="mt-8 text-xs text-gray-500 text-center">
        <p>Debug: {events.length} Veranstaltungen total, {displayEvents.length} aktive angezeigt</p>
      </div>
    </div>
  );
};