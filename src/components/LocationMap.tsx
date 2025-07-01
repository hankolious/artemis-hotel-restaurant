
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LocationMap = () => {
  const address = "Am Nussbaum 6, 67273 Weisenheim am Berg";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'serif' }}>
          SO FINDEN SIE UNS
        </h2>
        <p className="text-blue-700 max-w-2xl mx-auto">
          Restaurant Artemis liegt im Herzen von Weisenheim am Berg, 
          umgeben von den wunderschönen Weinbergen der Pfalz.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map Placeholder */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="text-xl text-blue-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Karte
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-blue-600 font-medium">Interaktive Karte</p>
                <p className="text-blue-500 text-sm">Am Nussbaum 6</p>
                <p className="text-blue-500 text-sm">67273 Weisenheim am Berg</p>
                <Button 
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open(googleMapsUrl, '_blank')}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  In Google Maps öffnen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
              <CardTitle className="text-xl text-blue-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Adresse
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-blue-700 font-medium">Restaurant Artemis</p>
              <p className="text-blue-600">Am Nussbaum 6</p>
              <p className="text-blue-600">67273 Weisenheim am Berg</p>
              <p className="text-blue-600">Deutschland</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
              <CardTitle className="text-xl text-blue-900 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Kontakt
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-blue-700 font-medium">Restaurant</p>
                  <p className="text-blue-600">☎ 06353 - 93 220 70</p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Hotel Buchungen</p>
                  <p className="text-blue-600">☎ 06353 507223</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
              <CardTitle className="text-xl text-blue-900 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Öffnungszeiten
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-blue-700 font-medium">Montag - Samstag</p>
                  <p className="text-blue-600">17:00 - 22:00</p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Sonntag und Feiertage</p>
                  <p className="text-blue-600">12:00 - 14:30</p>
                  <p className="text-blue-600">17:00 - 22:00</p>
                </div>
                <div>
                  <p className="text-red-600 font-medium">Mittwoch Ruhetag</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
