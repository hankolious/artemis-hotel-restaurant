import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Camera, Users, Utensils } from "lucide-react";
import { GuestReviewForm } from "@/components/GuestReviewForm";
import { LocationMap } from "@/components/LocationMap";
import { AdminPanel } from "@/components/AdminPanel";
import { GuestReviews } from "@/components/GuestReviews";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("restaurant");
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Greek Flag Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 18'%3E%3Cpath fill='%23005BAE' d='M0 0h27v2H0zM0 4h27v2H0zM0 8h27v2H0zM0 12h27v2H0zM0 16h27v2H0z'/%3E%3Cpath fill='%23FFFFFF' d='M0 2h27v2H0zM0 6h27v2H0zM0 10h27v2H0zM0 14h27v2H0z'/%3E%3Crect fill='%23005BAE' width='12' height='12'/%3E%3Cpath fill='%23FFFFFF' d='M5 0h2v12H5zM0 5h12v2H0z'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 200px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Header with Logo */}
      <header className="relative z-10 bg-white/90 backdrop-blur-sm shadow-lg border-b-4 border-blue-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/placeholder.svg" 
                alt="Artemis Restaurant Logo" 
                className="h-16 w-16 object-contain"
              />
              <div>
                <h1 className="text-4xl font-bold text-blue-900" style={{ fontFamily: 'serif' }}>
                  ARTEMIS
                </h1>
                <p className="text-blue-700 text-sm font-medium">Griechisches Restaurant & Hotel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAdminPanel(true)}
                className="text-blue-700 border-blue-300 hover:bg-blue-50"
              >
                Admin
              </Button>
              <div className="text-right text-blue-800">
                <p className="text-sm font-medium">Am Nussbaum 6</p>
                <p className="text-sm">67273 Weisenheim am Berg</p>
                <p className="text-sm font-semibold">☎ 06353 - 93 220 70</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-blue-800 rounded-none border-b-2 border-blue-600">
              <TabsTrigger 
                value="restaurant" 
                className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
              >
                <Utensils className="w-4 h-4 mr-2" />
                Restaurant
              </TabsTrigger>
              <TabsTrigger 
                value="hotel" 
                className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
              >
                <Users className="w-4 h-4 mr-2" />
                Hotel
              </TabsTrigger>
              <TabsTrigger 
                value="location" 
                className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Standort
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
              >
                <Star className="w-4 h-4 mr-2" />
                Bewertungen
              </TabsTrigger>
              <TabsTrigger 
                value="gallery" 
                className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
              >
                <Camera className="w-4 h-4 mr-2" />
                Galerie
              </TabsTrigger>
            </TabsList>

            {/* Restaurant Menu */}
            <TabsContent value="restaurant" className="mt-8">
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

                  {/* Add more menu sections here - keeping it concise for now */}
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
            </TabsContent>

            {/* Hotel Tab */}
            <TabsContent value="hotel" className="mt-8">
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
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="mt-8">
              <LocationMap />
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-8">
              <div className="container mx-auto px-4 pb-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <GuestReviewForm />
                  <GuestReviews />
                </div>
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="mt-8">
              <div className="container mx-auto px-4 pb-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'serif' }}>
                    GALERIE
                  </h2>
                  <p className="text-blue-700">Impressionen aus unserem Restaurant und Hotel</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="border-2 border-blue-200 shadow-lg overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <Camera className="w-12 h-12 text-blue-400" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </nav>

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'serif' }}>ARTEMIS</h3>
              <p className="text-blue-200">
                Authentische griechische Küche{'\n'}
                Gemütliche Hotelzimmer{'\n'}
                Herzliche Gastfreundschaft
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <p className="text-blue-200 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Am Nussbaum 6, 67273 Weisenheim am Berg
              </p>
              <p className="text-blue-200">
                <Phone className="w-4 h-4 inline mr-2" />
                06353 - 93 220 70
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Über Artemis</h4>
              <p className="text-blue-200 text-sm">
                Artemis, die griechische Göttin der Jagd, der Natur und der Wildnis. 
                Erleben Sie die Tradition Griechenlands in unserem Restaurant.
              </p>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-6 text-center">
            <p className="text-blue-300">&copy; 2024 Restaurant Artemis. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
