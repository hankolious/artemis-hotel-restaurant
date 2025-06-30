
import { useState } from 'react';
import { Phone, MapPin, Clock, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('ueber-uns');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-blue-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
              Hotel Restaurant Artemis
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-2 text-blue-600 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Am Nussbaum 6, 67273 Weisenheim am Berg</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>Tel: 06353 - 93 220 70</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-blue-50">
            <TabsTrigger 
              value="ueber-uns" 
              className="text-black data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
            >
              Über uns
            </TabsTrigger>
            <TabsTrigger 
              value="hotel" 
              className="text-black data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
            >
              Hotel
            </TabsTrigger>
            <TabsTrigger 
              value="restaurant" 
              className="text-black data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
            >
              Restaurant
            </TabsTrigger>
            <TabsTrigger 
              value="kontakt" 
              className="text-black data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
            >
              Kontakt
            </TabsTrigger>
          </TabsList>

          {/* Über uns Tab */}
          <TabsContent value="ueber-uns" className="space-y-6">
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-2xl text-blue-600 text-center">
                  Die Geschichte der Artemis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-black leading-relaxed">
                <p>
                  Artemis die griechische Göttin der Jagd, der Natur und der Wildnis. Sie ist eine 
                  geschickte und zielsichere Jägerin. Sie gilt als unnahbar und auch als grausam. 
                  Ihre Mutter ist die Titanin Leto.
                </p>
                <p>
                  An heiligen Tieren hat die Göttin der Jagd gleich einige: Den Hirsch, den Eber, 
                  aber auch den Bär und den Hund. Besonders häufig wird die Göttin mit einem Hirsch abgebildet.
                </p>
                <p>
                  Die Göttin Artemis streift übrigens meist allein oder von ihren Nymphen begleitet 
                  durch die Wälder des antiken Griechenland. Manchmal wird sie von ihrem Zwillingsbruder, 
                  Apollon, begleitet.
                </p>
                <p>
                  Niemand darf sich ihr nähern, insbesondere Männer, die es auf ihre Jungfräulichkeit 
                  abgesehen haben, nicht. Und auch die Nymphen der Artemis müssen – wie die Göttin 
                  selbst – jungfräulich sein und bleiben.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hotel Tab */}
          <TabsContent value="hotel" className="space-y-6">
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-2xl text-blue-600 text-center">
                  Hotel Preise
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-bold text-black mb-2">Zimmerpreise</h3>
                      <div className="space-y-2 text-black">
                        <div className="flex justify-between">
                          <span>Einzelzimmer</span>
                          <span className="font-bold text-blue-600">60,00€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Zweibettzimmer</span>
                          <span className="font-bold text-blue-600">90,00€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Doppelzimmer</span>
                          <span className="font-bold text-blue-600">95,00€</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between text-black">
                        <span>Frühstück pro Person</span>
                        <span className="font-bold text-blue-600">9,50€</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
                    <Phone className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">NUR TELEFONISCH BUCHBAR!</h3>
                    <p className="text-xl font-bold">06353 507223</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Restaurant Tab */}
          <TabsContent value="restaurant" className="space-y-6">
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-2xl text-blue-600 text-center">
                  Restaurant Artemis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-black text-lg">
                  Erleben Sie griechische Gastfreundschaft und authentische Küche in unserem Restaurant.
                </p>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-black">
                    Weitere Informationen zu unserem Speisenangebot erhalten Sie telefonisch oder vor Ort.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Kontakt Tab */}
          <TabsContent value="kontakt" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Location & Hours */}
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Wo sind wir
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="text-black">
                    <p className="font-semibold">Am Nussbaum 6,</p>
                    <p>67273 Weisenheim am Berg</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-bold text-blue-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Öffnungszeiten
                    </h4>
                    <div className="text-black space-y-1">
                      <p><span className="font-semibold">Mo. - Sa.</span></p>
                      <p>17:00 - 22:00</p>
                      <p><span className="font-semibold">So. und Feiertage</span></p>
                      <p>12:00 - 14:30</p>
                      <p>17:00 - 22:00</p>
                      <p className="text-blue-600 font-semibold">* Mittwoch Ruhetag</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Kontakt
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="vorname" className="text-black">Vorname</Label>
                      <Input id="vorname" className="mt-1 border-blue-200 focus:border-blue-600" />
                    </div>
                    <div>
                      <Label htmlFor="nachname" className="text-black">Nachname</Label>
                      <Input id="nachname" className="mt-1 border-blue-200 focus:border-blue-600" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-black">E-Mail-Adresse</Label>
                    <Input id="email" type="email" className="mt-1 border-blue-200 focus:border-blue-600" />
                  </div>
                  <div>
                    <Label htmlFor="telefon" className="text-black">Telefon</Label>
                    <Input id="telefon" className="mt-1 border-blue-200 focus:border-blue-600" />
                  </div>
                  <div>
                    <Label htmlFor="service" className="text-black">Service auswählen</Label>
                    <select 
                      id="service" 
                      className="w-full mt-1 p-2 border border-blue-200 rounded-md focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Service wählen...</option>
                      <option value="hotel">Hotel</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="allgemein">Allgemeine Anfrage</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="kommentar" className="text-black">Kommentar</Label>
                    <Textarea 
                      id="kommentar" 
                      rows={3} 
                      className="mt-1 border-blue-200 focus:border-blue-600" 
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Angebot anfordern
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-bold text-lg mb-2">Hotel Restaurant Artemis</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Am Nussbaum 6, 67273 Weisenheim am Berg</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>Tel: 06353 - 93 220 70</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
