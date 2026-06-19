import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Supabase parses the recovery hash automatically and fires an event
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });
    // Also handle the case where the session is already restored
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Passwort zu kurz", description: "Mindestens 6 Zeichen.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwörter stimmen nicht überein", variant: "destructive" });
      return;
    }
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Passwort aktualisiert", description: "Du kannst dich jetzt einloggen." });
      setTimeout(() => { window.location.href = "/admin"; }, 1000);
    } catch (err: any) {
      toast({ title: "Fehler", description: err?.message ?? "Unbekannter Fehler", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-2" style={{ fontFamily: "serif" }}>ARTEMIS</h1>
          <p className="text-blue-700 text-sm font-medium">Neues Passwort setzen</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">Passwort zurücksetzen</CardTitle>
          </CardHeader>
          <CardContent>
            {!ready ? (
              <p className="text-sm text-gray-600">
                Lade Reset-Sitzung... Falls du diese Seite direkt geöffnet hast, klicke bitte auf den Link in der Reset-E-Mail.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="pw">Neues Passwort</Label>
                  <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pw2">Passwort bestätigen</Label>
                  <Input id="pw2" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Speichere..." : "Passwort speichern"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
