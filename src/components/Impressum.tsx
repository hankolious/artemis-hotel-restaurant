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
        <CardContent className="space-y-6">
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Hotel Restaurant Artemis
            </h2>
            <p className="text-lg text-muted-foreground">
              Inhaberin: Panagiota Goga
            </p>
          </div>

          <div className="space-y-4">
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
                <h3 className="font-semibold text-foreground">Telefon</h3>
                <p className="text-muted-foreground">06353 507223</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">E-Mail</h3>
                <p className="text-muted-foreground">restaurant-artemis68@web.de</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Steuer-ID</h3>
                <p className="text-muted-foreground">IdNr: 62483005917</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};