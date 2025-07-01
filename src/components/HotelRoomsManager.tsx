
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface HotelRoom {
  id: string;
  room_type: string;
  price: number;
  description: string | null;
  is_available: boolean;
}

export const HotelRoomsManager = () => {
  const [rooms, setRooms] = useState<HotelRoom[]>([]);
  const [editingRoom, setEditingRoom] = useState<HotelRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const defaultRoom: Partial<HotelRoom> = {
    room_type: "",
    price: 0,
    description: "",
    is_available: true,
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('hotel_rooms')
        .select('*')
        .order('price', { ascending: true });

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast({
        title: "Fehler",
        description: "Hotelzimmer konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingRoom) return;

    try {
      if (editingRoom.id) {
        // Update existing room
        const { error } = await supabase
          .from('hotel_rooms')
          .update(editingRoom)
          .eq('id', editingRoom.id);

        if (error) throw error;
      } else {
        // Create new room
        const { error } = await supabase
          .from('hotel_rooms')
          .insert([editingRoom]);

        if (error) throw error;
      }

      toast({
        title: "Gespeichert",
        description: "Hotelzimmer wurde erfolgreich gespeichert.",
      });

      fetchRooms();
      setEditingRoom(null);
    } catch (error) {
      console.error('Error saving room:', error);
      toast({
        title: "Fehler",
        description: "Beim Speichern ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Hotelzimmer löschen möchten?')) return;

    try {
      const { error } = await supabase
        .from('hotel_rooms')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Gelöscht",
        description: "Hotelzimmer wurde erfolgreich gelöscht.",
      });

      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
      toast({
        title: "Fehler",
        description: "Beim Löschen ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center p-8 text-blue-600">Lade Hotelzimmer...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-blue-900">Hotelzimmer verwalten</h3>
        <Button 
          onClick={() => setEditingRoom(defaultRoom as HotelRoom)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Neues Zimmer
        </Button>
      </div>

      {editingRoom && (
        <Card className="border-2 border-blue-300">
          <CardHeader>
            <CardTitle className="text-blue-900">
              {editingRoom.id ? 'Zimmer bearbeiten' : 'Neues Zimmer'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Zimmertyp</Label>
                <Input
                  value={editingRoom.room_type}
                  onChange={(e) => setEditingRoom({...editingRoom, room_type: e.target.value})}
                />
              </div>
              <div>
                <Label>Preis pro Nacht (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingRoom.price}
                  onChange={(e) => setEditingRoom({...editingRoom, price: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div>
              <Label>Beschreibung</Label>
              <Textarea
                value={editingRoom.description || ''}
                onChange={(e) => setEditingRoom({...editingRoom, description: e.target.value})}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={editingRoom.is_available}
                onCheckedChange={(checked) => setEditingRoom({...editingRoom, is_available: checked})}
              />
              <Label>Verfügbar</Label>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Speichern
              </Button>
              <Button variant="outline" onClick={() => setEditingRoom(null)}>
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {rooms.map((room) => (
          <Card key={room.id} className="border border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900">{room.room_type}</h4>
                  {room.description && (
                    <p className="text-sm text-blue-600 mt-1">{room.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-lg font-medium text-blue-800">
                      {room.price.toFixed(2)} € / Nacht
                    </span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      room.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {room.is_available ? 'Verfügbar' : 'Nicht verfügbar'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingRoom(room)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(room.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
