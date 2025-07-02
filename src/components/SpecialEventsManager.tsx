
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Euro, Phone, Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  is_active: boolean;
  requires_booking: boolean;
  booking_phone: string | null;
  created_at: string;
}

export const SpecialEventsManager = () => {
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<SpecialEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    price: '',
    max_participants: '',
    image_url: '',
    is_active: true,
    requires_booking: false,
    booking_phone: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('special_events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error('Error fetching events:', error);
      toast({
        title: "Fehler",
        description: "Events konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_date: '',
      start_time: '',
      end_time: '',
      price: '',
      max_participants: '',
      image_url: '',
      is_active: true,
      requires_booking: false,
      booking_phone: '',
    });
    setEditingEvent(null);
  };

  const handleEdit = (event: SpecialEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      event_date: event.event_date || '',
      start_time: event.start_time || '',
      end_time: event.end_time || '',
      price: event.price?.toString() || '',
      max_participants: event.max_participants?.toString() || '',
      image_url: event.image_url || '',
      is_active: event.is_active,
      requires_booking: event.requires_booking,
      booking_phone: event.booking_phone || '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const eventData = {
        title: formData.title,
        description: formData.description || null,
        event_date: formData.event_date || null,
        start_time: formData.start_time || null,
        end_time: formData.end_time || null,
        price: formData.price ? parseFloat(formData.price) : null,
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        image_url: formData.image_url || null,
        is_active: formData.is_active,
        requires_booking: formData.requires_booking,
        booking_phone: formData.booking_phone || null,
        updated_at: new Date().toISOString(),
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('special_events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;
        toast({
          title: "Event aktualisiert",
          description: "Das Event wurde erfolgreich aktualisiert.",
        });
      } else {
        const { error } = await supabase
          .from('special_events')
          .insert([eventData]);

        if (error) throw error;
        toast({
          title: "Event erstellt",
          description: "Das neue Event wurde erfolgreich erstellt.",
        });
      }

      fetchEvents();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Error saving event:', error);
      toast({
        title: "Fehler",
        description: "Event konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Event löschen möchten?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('special_events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Event gelöscht",
        description: "Das Event wurde erfolgreich gelöscht.",
      });
      fetchEvents();
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast({
        title: "Fehler",
        description: "Event konnte nicht gelöscht werden.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Lade Events...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-blue-900">Special Events</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Neues Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? 'Event bearbeiten' : 'Neues Event erstellen'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">Titel *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="event_date">Datum</Label>
                    <Input
                      id="event_date"
                      type="date"
                      value={formData.event_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, event_date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="start_time">Startzeit</Label>
                    <Input
                      id="start_time"
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_time">Endzeit</Label>
                    <Input
                      id="end_time"
                      type="time"
                      value={formData.end_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Preis (€)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="max_participants">Max. Teilnehmer</Label>
                    <Input
                      id="max_participants"
                      type="number"
                      value={formData.max_participants}
                      onChange={(e) => setFormData(prev => ({ ...prev, max_participants: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image_url">Bild URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label htmlFor="is_active">Aktiv</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requires_booking"
                      checked={formData.requires_booking}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, requires_booking: checked }))}
                    />
                    <Label htmlFor="requires_booking">Buchung erforderlich</Label>
                  </div>
                </div>

                {formData.requires_booking && (
                  <div>
                    <Label htmlFor="booking_phone">Buchungstelefon</Label>
                    <Input
                      id="booking_phone"
                      value={formData.booking_phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, booking_phone: e.target.value }))}
                      placeholder="06353 - 93 220 70"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Abbrechen
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingEvent ? 'Aktualisieren' : 'Erstellen'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold text-blue-900">{event.title}</h4>
                    <Badge variant={event.is_active ? "default" : "secondary"}>
                      {event.is_active ? "Aktiv" : "Inaktiv"}
                    </Badge>
                    {event.requires_booking && (
                      <Badge variant="outline">Buchung erforderlich</Badge>
                    )}
                  </div>
                  
                  {event.description && (
                    <p className="text-blue-700 mb-3">{event.description}</p>
                  )}
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    {event.event_date && (
                      <div className="flex items-center text-blue-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(event.event_date), 'dd.MM.yyyy', { locale: de })}
                      </div>
                    )}
                    
                    {event.start_time && (
                      <div className="flex items-center text-blue-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.start_time} {event.end_time && `- ${event.end_time}`}
                      </div>
                    )}
                    
                    {event.price && (
                      <div className="flex items-center text-blue-600">
                        <Euro className="w-4 h-4 mr-1" />
                        {event.price.toFixed(2)} €
                      </div>
                    )}
                    
                    {event.max_participants && (
                      <div className="flex items-center text-blue-600">
                        <Users className="w-4 h-4 mr-1" />
                        {event.current_participants}/{event.max_participants}
                      </div>
                    )}
                  </div>
                  
                  {event.booking_phone && (
                    <div className="flex items-center text-blue-600 mt-2">
                      <Phone className="w-4 h-4 mr-1" />
                      {event.booking_phone}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(event)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {events.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-blue-600">Noch keine Events vorhanden. Erstellen Sie Ihr erstes Event!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
