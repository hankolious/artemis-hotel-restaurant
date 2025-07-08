
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Phone } from "lucide-react";

export const HotelInfo = () => {
  const handleBookingClick = () => {
    window.location.href = "tel:+4963535072233";
  };

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'serif' }}>
          HOTEL ARTEMIS
        </h2>
        <p className="text-blue-700 max-w-2xl mx-auto text-sm md:text-base">
          Übernachten Sie in unserem gemütlichen Hotel im Herzen von Weisenheim am Berg.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="text-lg md:text-xl text-blue-900">Einzelzimmer</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">60,00 €</div>
              <p className="text-blue-600 mb-4 text-sm md:text-base">pro Nacht</p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-sm md:text-base"
                onClick={handleBookingClick}
              >
                Buchen: 06353 507223
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="text-lg md:text-xl text-blue-900">Zweibettzimmer</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">90,00 €</div>
              <p className="text-blue-600 mb-4 text-sm md:text-base">pro Nacht</p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-sm md:text-base"
                onClick={handleBookingClick}
              >
                Buchen: 06353 507223
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="text-lg md:text-xl text-blue-900">Doppelzimmer</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">95,00 €</div>
              <p className="text-blue-600 mb-4 text-sm md:text-base">pro Nacht</p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-sm md:text-base"
                onClick={handleBookingClick}
              >
                Buchen: 06353 507223
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
          <CardTitle className="text-xl md:text-2xl text-blue-900 flex items-center">
            <Clock className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            Öffnungszeiten
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">Restaurant</h4>
              <p className="text-blue-700 whitespace-pre-line text-xs md:text-sm">
                Mo. - Sa.{'\n'}17:30 - 22:00{'\n\n'}So. und Feiertage{'\n'}12:00 - 14:30{'\n'}17:30 - 22:00{'\n\n'}* Mittwoch Ruhetag
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">Hotel Buchungen</h4>
              <p className="text-blue-700 text-xs md:text-sm">
                <Phone className="w-3 h-3 md:w-4 md:h-4 inline mr-2" />
                <span 
                  className="cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={handleBookingClick}
                >
                  06353 507223
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
