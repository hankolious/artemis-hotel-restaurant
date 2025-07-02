
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, UserMinus, Users } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

export const AdminUserManager = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const { toast } = useToast();

  const fetchAdminUsers = async () => {
    try {
      setIsLoadingList(true);
      
      // First get admin user IDs
      const { data: adminRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      if (rolesError) throw rolesError;

      if (!adminRoles || adminRoles.length === 0) {
        setAdminUsers([]);
        return;
      }

      const adminUserIds = adminRoles.map(role => role.user_id);

      // Then get profiles for those user IDs
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at')
        .in('id', adminUserIds);

      if (profilesError) throw profilesError;

      setAdminUsers(profiles || []);
    } catch (error: any) {
      console.error('Error fetching admin users:', error);
      toast({
        title: "Fehler beim Laden",
        description: "Admin-Benutzer konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingList(false);
    }
  };

  const addAdminRole = async () => {
    if (!newAdminEmail.trim()) {
      toast({
        title: "Email erforderlich",
        description: "Bitte geben Sie eine E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Call the function using the rpc method
      const { data, error } = await supabase.rpc('add_admin_role', {
        _user_email: newAdminEmail.trim()
      });

      if (error) throw error;

      if (data) {
        toast({
          title: "Admin hinzugefügt",
          description: `${newAdminEmail} wurde erfolgreich als Admin hinzugefügt.`,
        });
        setNewAdminEmail("");
        await fetchAdminUsers();
      } else {
        toast({
          title: "Benutzer nicht gefunden",
          description: "Ein Benutzer mit dieser E-Mail-Adresse existiert nicht.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error adding admin role:', error);
      toast({
        title: "Fehler beim Hinzufügen",
        description: error.message || "Admin-Rolle konnte nicht hinzugefügt werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeAdminRole = async (email: string) => {
    try {
      // Call the function using the rpc method
      const { data, error } = await supabase.rpc('remove_admin_role', {
        _user_email: email
      });

      if (error) throw error;

      if (data) {
        toast({
          title: "Admin entfernt",
          description: `Admin-Rolle wurde von ${email} entfernt.`,
        });
        await fetchAdminUsers();
      } else {
        toast({
          title: "Fehler",
          description: "Admin-Rolle konnte nicht entfernt werden.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error removing admin role:', error);
      toast({
        title: "Fehler beim Entfernen",
        description: error.message || "Admin-Rolle konnte nicht entfernt werden.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center text-lg md:text-xl">
            <UserPlus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Neuen Admin hinzufügen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adminEmail" className="text-sm md:text-base">E-Mail-Adresse des Benutzers</Label>
            <Input
              id="adminEmail"
              type="email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="admin@example.com"
              className="border-blue-200 focus:border-blue-500"
            />
          </div>
          <Button 
            onClick={addAdminRole}
            disabled={isLoading}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Hinzufügen..." : "Admin-Rolle hinzufügen"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center text-lg md:text-xl">
            <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Aktuelle Admins ({adminUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingList ? (
            <p className="text-gray-500 text-sm md:text-base">Lade Admin-Benutzer...</p>
          ) : adminUsers.length === 0 ? (
            <p className="text-gray-500 text-sm md:text-base">Keine Admin-Benutzer gefunden.</p>
          ) : (
            <div className="space-y-3">
              {adminUsers.map((admin) => (
                <div 
                  key={admin.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 border border-blue-200 rounded-lg space-y-2 md:space-y-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-blue-900 text-sm md:text-base">{admin.email}</p>
                    {admin.full_name && (
                      <p className="text-sm text-gray-600">{admin.full_name}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Erstellt: {new Date(admin.created_at).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAdminRole(admin.email)}
                    className="text-red-600 border-red-300 hover:bg-red-50 w-full md:w-auto"
                  >
                    <UserMinus className="w-4 h-4 mr-1" />
                    Entfernen
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
