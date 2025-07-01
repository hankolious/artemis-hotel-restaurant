
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string | null;
  price: number;
  volume: string | null;
  alcohol_percentage: string | null;
  additional_info: string | null;
  is_available: boolean;
  sort_order: number;
}

export const MenuItemsManager = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const defaultItem: Partial<MenuItem> = {
    category: "",
    name: "",
    description: "",
    price: 0,
    volume: "",
    alcohol_percentage: "",
    additional_info: "",
    is_available: true,
    sort_order: 0,
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast({
        title: "Fehler",
        description: "Menüpunkte konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      if (editingItem.id) {
        // Update existing item
        const { error } = await supabase
          .from('menu_items')
          .update(editingItem)
          .eq('id', editingItem.id);

        if (error) throw error;
      } else {
        // Create new item
        const { error } = await supabase
          .from('menu_items')
          .insert([editingItem]);

        if (error) throw error;
      }

      toast({
        title: "Gespeichert",
        description: "Menüpunkt wurde erfolgreich gespeichert.",
      });

      fetchMenuItems();
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast({
        title: "Fehler",
        description: "Beim Speichern ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Menüpunkt löschen möchten?')) return;

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Gelöscht",
        description: "Menüpunkt wurde erfolgreich gelöscht.",
      });

      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast({
        title: "Fehler",
        description: "Beim Löschen ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center p-8 text-blue-600">Lade Menüpunkte...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-blue-900">Menü verwalten</h3>
        <Button 
          onClick={() => setEditingItem(defaultItem as MenuItem)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Neuer Menüpunkt
        </Button>
      </div>

      {editingItem && (
        <Card className="border-2 border-blue-300">
          <CardHeader>
            <CardTitle className="text-blue-900">
              {editingItem.id ? 'Menüpunkt bearbeiten' : 'Neuer Menüpunkt'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Kategorie</Label>
                <Input
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                />
              </div>
              <div>
                <Label>Name</Label>
                <Input
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label>Beschreibung</Label>
              <Textarea
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Preis (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label>Volumen</Label>
                <Input
                  value={editingItem.volume || ''}
                  onChange={(e) => setEditingItem({...editingItem, volume: e.target.value})}
                />
              </div>
              <div>
                <Label>Alkohol %</Label>
                <Input
                  value={editingItem.alcohol_percentage || ''}
                  onChange={(e) => setEditingItem({...editingItem, alcohol_percentage: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingItem.is_available}
                  onCheckedChange={(checked) => setEditingItem({...editingItem, is_available: checked})}
                />
                <Label>Verfügbar</Label>
              </div>
              <div>
                <Label>Reihenfolge</Label>
                <Input
                  type="number"
                  value={editingItem.sort_order}
                  onChange={(e) => setEditingItem({...editingItem, sort_order: parseInt(e.target.value) || 0})}
                  className="w-20"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Speichern
              </Button>
              <Button variant="outline" onClick={() => setEditingItem(null)}>
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="border border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="text-blue-700">
                      {item.category}
                    </Badge>
                    {!item.is_available && (
                      <Badge variant="destructive">Nicht verfügbar</Badge>
                    )}
                  </div>
                  <h4 className="font-semibold text-blue-900">{item.name}</h4>
                  {item.description && (
                    <p className="text-sm text-blue-600 mt-1">{item.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-sm text-blue-700">
                    <span className="font-medium">{item.price.toFixed(2)} €</span>
                    {item.volume && <span>{item.volume}</span>}
                    {item.alcohol_percentage && <span>{item.alcohol_percentage}% Vol.</span>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
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
