
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Phone } from "lucide-react";

export const HotelInfo = () => {
  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'serif' }}>
          HOTEL ARTEMIS
        </h2>
        <p className="text-blue-700 max-w-2xl mx-auto">
          Übernachten Sie in unserem gemütlichen Hotel im Herzen von Weisenheim am Berg.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="text-xl text-blue-900">Einzelzimmer</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">60,00 €</div>
              <p className="text-blue-600 mb-4">pro Nacht</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Buchen: 06353 507223
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="text-xl text-blue-900">Zweibettzimmer</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">90,00 €</div>
              <p className="text-blue-600 mb-4">pro Nacht</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Buchen: 06353 507223
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="text-xl text-blue-900">Doppelzimmer</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">95,00 €</div>
              <p className="text-blue-600 mb-4">pro Nacht</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Buchen: 06353 507223
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
          <CardTitle className="text-2xl text-blue-900 flex items-center">
            <Clock className="w-6 h-6 mr-2" />
            Öffnungszeiten
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Restaurant</h4>
              <p className="text-blue-700 whitespace-pre-line">
                Mo. - Sa.{'\n'}17:00 - 22:00{'\n\n'}So. und Feiertage{'\n'}12:00 - 14:30{'\n'}17:00 - 22:00{'\n\n'}* Mittwoch Ruhetag
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Hotel Buchungen</h4>
              <p className="text-blue-700">
                <Phone className="w-4 h-4 inline mr-2" />
                06353 507223
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
