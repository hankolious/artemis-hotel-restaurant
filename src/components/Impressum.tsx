import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, FileText } from "lucide-react";

export const Impressum = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <FileText className="w-8 h-8" />
            Impressum
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center border-b pb-4">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">
              Angaben gemäß § 5 TMG
            </h2>
            <h3 className="text-2xl font-semibold text-primary mb-2">
              Hotel Restaurant Artemis
            </h3>
            <p className="text-lg text-muted-foreground">
              Inhaberin: Panagiota Goga
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Adresse</h3>
                <p className="text-muted-foreground">
                  Am Nussbaum 6<br />
                  67273 Weisenheim am Berg
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Kontakt</h3>
                <p className="text-muted-foreground">
                  Telefon: 06353 507223<br />
                  E-Mail: restaurant-artemis68@web.de
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Umsatzsteuer-ID</h3>
                <p className="text-muted-foreground">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
                  DE62483005917
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
                <p className="text-muted-foreground">
                  Panagiota Goga<br />
                  Am Nussbaum 6<br />
                  67273 Weisenheim am Berg
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-foreground mb-3">Öffnungszeiten</h3>
              <div className="text-muted-foreground space-y-1">
                <p>Mo, Di, Do, Fr, Sa: 17:30 - 22:00 Uhr</p>
                <p>So & Feiertage: 12:00 - 14:30 Uhr & 17:30 - 22:00 Uhr</p>
                <p className="font-medium">Mittwochs Ruhetag</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};