## Problem

1. **Reset-E-Mail enthält `localhost`-Link**: Beim Aufruf von `resetPasswordForEmail` wird aktuell `window.location.origin` als `redirectTo` mitgegeben. Wenn du den Login im Lovable Preview / lokal testest, ist das eine Sandbox- oder Localhost-URL. Zusätzlich nutzt Supabase Auth die in den Auth-Einstellungen hinterlegte **Site URL** als Default, wenn keine gültige Redirect-URL gewhitelistet ist — und genau die steht aktuell offenbar auf `localhost`.

2. **Kein Augen-Toggle**: Die Passwortfelder im Admin-Login und auf der Reset-Seite sind reine `type="password"`-Inputs, ohne Möglichkeit das Passwort kurz anzuzeigen.

## Lösung

### 1. Reset-Link auf Produktions-Domain zwingen

Im `AdminAuth.tsx` den `redirectTo`-Parameter so anpassen, dass er **immer** auf die Live-Domain zeigt, egal von wo aus die Reset-Mail angefordert wird:

```ts
const PROD_URL = "https://hotelrestaurant-artemis.com";
const redirectTo = `${PROD_URL}/reset-password`;
```

Damit landet der Link in der Mail garantiert auf der echten Seite und nicht mehr auf `localhost:xxxx`.

**Zusätzlich nötig (du, im Cloud-Backend):** In den Auth-Einstellungen müssen:
- **Site URL** = `https://hotelrestaurant-artemis.com`
- **Additional Redirect URLs** = `https://hotelrestaurant-artemis.com/reset-password` (und ggf. die Lovable Preview-URL, falls du dort weiter testen willst)

Sonst lehnt Supabase die Redirect-URL ab und fällt auf die (falsche) Site URL zurück. Ich erkläre dir nach dem Build, wo genau du das setzt.

### 2. Augen-Toggle für Passwort

Eine kleine wiederverwendbare `PasswordInput`-Komponente erstellen (`src/components/ui/password-input.tsx`), die:
- Standardmäßig `type="password"` rendert
- Rechts im Input einen `Eye` / `EyeOff` Lucide-Icon-Button hat (kein Emoji, passt zur „Icons-only"-Regel)
- Beim Klick zwischen sichtbar/unsichtbar umschaltet

Diese Komponente dann einsetzen in:
- `src/components/AdminAuth.tsx` (Passwort-Feld beim Login)
- `src/pages/ResetPassword.tsx` (beide Felder: Neues Passwort + Bestätigen)

## Geänderte / neue Dateien

- **neu**: `src/components/ui/password-input.tsx`
- **edit**: `src/components/AdminAuth.tsx` — Passwortfeld durch `PasswordInput` ersetzen, `redirectTo` auf Produktion festsetzen
- **edit**: `src/pages/ResetPassword.tsx` — beide Passwortfelder durch `PasswordInput` ersetzen

Keine Backend-/DB-Änderungen, keine Edge Functions.
