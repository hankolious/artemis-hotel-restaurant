# Daten-Export für Blockchain-Migration

## Ziel

Alle Daten deines Projekts (Menü, Hotelzimmer, Reviews, Bilder, Events, Website-Settings, User-Rollen, Profile) sollen als strukturierter Export verfügbar sein, damit dein Kunde sie auf eine Blockchain-Lösung migrieren kann. Der Export läuft serverseitig mit Admin-Rechten – du brauchst dafür keinen Service Role Key in der Hand.

## Lösung: Admin-Export Edge Function

Eine neue Edge Function `admin-export-data`, die:

1. Prüft, dass der aufrufende User eingeloggt **und** Admin ist (über die bestehende `user_roles`-Tabelle und `has_role`-Funktion).
2. Mit dem `SUPABASE_SERVICE_ROLE_KEY` (automatisch in der Edge-Function-Umgebung verfügbar) **alle Tabellen** ausliest – RLS wird dadurch umgangen, du bekommst wirklich alles.
3. Die Daten als eine einzige JSON-Datei zurückgibt, strukturiert pro Tabelle:

```text
{
  "exported_at": "2026-06-17T...",
  "tables": {
    "menu_items": [...],
    "hotel_rooms": [...],
    "reviews": [...],
    "images": [...],
    "special_events": [...],
    "website_settings": [...],
    "profiles": [...],
    "user_roles": [...]
  }
}
```

## Neuer Button im Admin Panel

Im bestehenden Admin Panel (`AdminPanel.tsx`) kommt im Tab „Admins" ein zusätzlicher Bereich **„Daten-Export"** mit einem Button **„Vollständigen Export herunterladen"**. Klick darauf:

- Ruft die Edge Function auf
- Lädt die JSON-Datei automatisch als `artemis-export-YYYY-MM-DD.json` herunter

Optional zusätzlich: Export pro Tabelle als CSV (falls dein Kunde / die Blockchain-Tooling-Seite das lieber will).

## Was du dadurch NICHT brauchst

- Keinen Zugriff aufs native Supabase-Dashboard
- Keinen Service Role Key in deiner Hand
- Keine Migration weg von Lovable Cloud

## Technische Details

**Neue Datei:** `supabase/functions/admin-export-data/index.ts`
- CORS Headers
- JWT-Validierung via `getClaims()`
- Admin-Check via `has_role(userId, 'admin')`
- Service-Role-Client für Tabellen-Reads
- Liste der zu exportierenden Tabellen wird in der Function gepflegt

**Geänderte Datei:** `src/components/AdminUserManager.tsx` (oder neue Komponente `DataExportPanel.tsx` darin eingebunden)
- Neuer Card-Bereich mit Download-Button
- Aufruf via `supabase.functions.invoke('admin-export-data')`
- Browser-Download via Blob + `<a download>`

## Sicherheit

- Nur eingeloggte Admins können die Function aufrufen (doppelte Prüfung: JWT + Rolle)
- Service Role Key bleibt serverseitig, taucht nie im Frontend oder Netzwerk auf
- Export wird nicht persistiert – nur on-demand generiert

## Optional / spätere Erweiterung

Falls dein Kunde laufende Sync-Updates Richtung Blockchain braucht (nicht nur einmaliger Export), können wir die Edge Function um einen Filter `?since=<timestamp>` erweitern, sodass nur geänderte Datensätze geliefert werden.
