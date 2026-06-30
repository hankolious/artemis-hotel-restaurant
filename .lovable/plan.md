# Datenbank-Wiederherstellung aus Backup

## Ausgangslage
- Die App zeigt weiße/Standard-Farben, weil **alle Tabellen** aus der angeschlossenen Datenbank fehlen.
- Konsole bestätigt: `PGRST205: Could not find the table 'public.website_settings'` (gilt analog für alle anderen Tabellen).
- `src/integrations/supabase/client.ts` zeigt noch auf das **alte externe Supabase-Projekt**, während `.env` bereits auf ein **leeres Lovable Cloud Projekt** zeigt. Beide haben aktuell keine Nutzdaten.
- Betroffen sind: `website_settings`, `menu_items`, `hotel_rooms`, `guest_reviews`, `special_events`, `restaurant_images`, `profiles`, `user_roles`.

## Vorgehen

### 1. Backup-Datei entgegennehmen
Du lädst den vorhandenen Export (JSON aus dem Admin-Daten-Export, oder SQL-Dump) im Chat hoch. Ich prüfe Format und Vollständigkeit (welche Tabellen enthalten sind, wie viele Zeilen, ob die Spalten zum bisherigen Schema passen).

### 2. Schema in Lovable Cloud neu anlegen
Über eine Migration werden in der korrekten Reihenfolge angelegt:
1. `app_role` Enum + `user_roles` Tabelle + `has_role()` Security-Definer-Funktion
2. `profiles`
3. `website_settings`
4. `menu_items`
5. `hotel_rooms`
6. `restaurant_images`
7. `special_events`
8. `guest_reviews`

Für jede Tabelle:
- passende Spalten (aus `src/integrations/supabase/types.ts` rekonstruiert),
- `GRANT` an `authenticated` / `service_role` (und `anon SELECT` nur für öffentlich lesbare Tabellen wie Menü, Zimmer, Bilder, veröffentlichte Bewertungen, Events, Settings),
- `ENABLE ROW LEVEL SECURITY`,
- RLS-Policies: öffentlicher Lesezugriff für Webseiten-Inhalte, Schreibzugriff nur für Admins via `has_role(auth.uid(),'admin')`,
- `updated_at`-Trigger.

### 3. Client auf Lovable Cloud umstellen
Sicherstellen, dass die App tatsächlich gegen die wiederhergestellte Cloud-DB läuft (richtige URL + Anon-Key). Falls `client.ts` noch das alte Projekt nutzt, wird es automatisch regeneriert sobald die Migration durchläuft.

### 4. Daten aus dem Backup importieren
- JSON-Backup → ich konvertiere zu `INSERT`-Statements und spiele sie pro Tabelle ein (über das Insert-Tool, in der richtigen FK-Reihenfolge).
- SQL-Dump → ich extrahiere nur die `INSERT`-Blöcke der relevanten Tabellen und spiele sie ein.
- Wenn `website_settings` im Backup einen Beige-Wert für `background_color` enthält, ist deine ursprüngliche Hintergrundfarbe damit automatisch wieder da. Falls nicht, setze ich `background_color` explizit auf den Beige-Wert, den du nennst.

### 5. Admin-Zugang wiederherstellen
- `aron68307@gmail.com` muss in `auth.users` existieren (einmal über „Registrieren" oder „Passwort vergessen" anlegen).
- Danach Eintrag in `user_roles` mit Rolle `admin` setzen, damit du wieder ins Admin-Panel kommst.

### 6. Verifizierung
- `SELECT count(*)` pro Tabelle, um Zeilenanzahl mit dem Backup zu vergleichen.
- App neu laden, prüfen: Hintergrund beige, Speisekarte/Hotel/Events/Bilder/Bewertungen sichtbar, Admin-Login funktioniert.

## Was ich von dir brauche
1. **Die Backup-Datei** (Upload im Chat).
2. Falls im Backup keine `website_settings` enthalten sind: den genauen **Beige-Hex-Code**, den du als Hintergrund hattest.
3. Bestätigung, dass es ok ist, wenn die Passwörter der Admin-User **nicht** wiederhergestellt werden (Passwort-Hashes liegen in `auth.users` und sind im Daten-Export nicht enthalten — du setzt dein Passwort über „Passwort vergessen" einmal neu).
