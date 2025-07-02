
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const RestaurantMenu = () => {
  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'serif' }}>
          UNSERE KARTE
        </h2>
        <p className="text-blue-700 max-w-2xl mx-auto">
          Genießen Sie authentische griechische Küche in unserem traditionellen Restaurant. 
          Alle Gerichte werden frisch zubereitet mit den besten Zutaten.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Aperitifs */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="text-2xl text-blue-900" style={{ fontFamily: 'serif' }}>
              Aperitifs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                <div>
                  <h4 className="font-semibold text-blue-900">Martini Bianco / Rosso</h4>
                  <p className="text-sm text-blue-600">4cl, 15% Vol.</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">6,80 €</Badge>
              </div>
              <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                <div>
                  <h4 className="font-semibold text-blue-900">Aperol Spritz</h4>
                  <p className="text-sm text-blue-600">1,10 - 4cl, 15% Vol. (mit Farbstoff und chininhaltig)</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">8,90 €</Badge>
              </div>
              <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                <div>
                  <h4 className="font-semibold text-blue-900">Campari Orange</h4>
                  <p className="text-sm text-blue-600">4cl, 25% Vol. (mit Farbstoff)</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">8,40 €</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-blue-900">Ouzo Artemis</h4>
                  <p className="text-sm text-blue-600">mit Feige 4cl, 38% Vol.</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">5,50 €</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hauptgerichte */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
            <CardTitle className="text-2xl text-blue-900" style={{ fontFamily: 'serif' }}>
              Hauptgerichte
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                <div>
                  <h4 className="font-semibold text-blue-900">Gyros mit Tzatziki</h4>
                  <p className="text-sm text-blue-600">dazu Knoblauchkartoffeln</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">17,50 €</Badge>
              </div>
              <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                <div>
                  <h4 className="font-semibold text-blue-900">Lammkarre</h4>
                  <p className="text-sm text-blue-600">mit Knoblauchkartoffeln</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">27,90 €</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-blue-900">Artemis Platte (ab 2 Personen)</h4>
                  <p className="text-sm text-blue-600">Gyros, 2 Souvlaki, 2 Suzuki, 2 Schweinensteaks, dazu Knoblauchkartoffeln, Tzatziki und 2 Bauernsalat</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">44,00 €</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
