
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
                  Unsere Karte
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-black">
                <div className="space-y-8">
                  
                  {/* Aperitifs */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Aperitifs</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>001 Martini Bianco / Rosso (4cl, 15% Vol.)</span><span className="font-bold text-blue-600">6,80 €</span></div>
                      <div className="flex justify-between"><span>002 Aperol Spritz (1,10 - 4cl, 15% Vol.)</span><span className="font-bold text-blue-600">8,90 €</span></div>
                      <div className="flex justify-between"><span>003 Campari Orange (4cl, 25% Vol.)</span><span className="font-bold text-blue-600">8,40 €</span></div>
                      <div className="flex justify-between"><span>004 Ouzo Artemis mit Feige (4cl, 38% Vol.)</span><span className="font-bold text-blue-600">5,50 €</span></div>
                    </div>
                  </div>

                  {/* Suppen */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Suppen</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>005 Tomatensuppe</span><span className="font-bold text-blue-600">4,90 €</span></div>
                      <div className="flex justify-between"><span>007 Bohnensuppe</span><span className="font-bold text-blue-600">4,90 €</span></div>
                    </div>
                  </div>

                  {/* Kalte Vorspeisen */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Kalte Vorspeisen</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>008 Oliven und Peperoni</span><span className="font-bold text-blue-600">7,50 €</span></div>
                      <div className="flex justify-between"><span>009 Tzatziki - Joghurt mit Gurken, Knoblauch und Olivenöl</span><span className="font-bold text-blue-600">6,50 €</span></div>
                      <div className="flex justify-between"><span>010 Tirokafteri - Pürierter Schafskäse mit Peperoni, Knoblauch und Olivenöl</span><span className="font-bold text-blue-600">6,80 €</span></div>
                      <div className="flex justify-between"><span>011 Feta - griechischer Schafskäse mit Zwiebel und Olivenöl</span><span className="font-bold text-blue-600">8,50 €</span></div>
                      <div className="flex justify-between"><span>012 Rote Beete nach griechischer Art mit Knoblauch</span><span className="font-bold text-blue-600">7,80 €</span></div>
                      <div className="flex justify-between"><span>013 Taramas - Fischrogencreme</span><span className="font-bold text-blue-600">-</span></div>
                    </div>
                  </div>

                  {/* Warme Vorspeisen */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Warme Vorspeisen</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>014 Peperonis gegrillt mit spezial Knoblauchsauce</span><span className="font-bold text-blue-600">8,50 €</span></div>
                      <div className="flex justify-between"><span>015 Auberginen gebraten dazu Tzatziki</span><span className="font-bold text-blue-600">7,80 €</span></div>
                      <div className="flex justify-between"><span>016 Zucchini Gebraten dazu Tzatziki</span><span className="font-bold text-blue-600">7,80 €</span></div>
                      <div className="flex justify-between"><span>017 Dolmadakia - gefüllte Weinblätter mit Reis und Hackfleisch, dazu Zitronensauce</span><span className="font-bold text-blue-600">8,90 €</span></div>
                      <div className="flex justify-between"><span>018 Champignons aus dem Backofen gefüllt mit Spinat und Schafskäse überbacken</span><span className="font-bold text-blue-600">9,80 €</span></div>
                      <div className="flex justify-between"><span>019 Kalamaris mit Tzatziki</span><span className="font-bold text-blue-600">9,80 €</span></div>
                      <div className="flex justify-between"><span>020 Schafskäse aus dem Backofen mit Tomatenscheiben, Zwiebeln, Peperoni und Olivenöl</span><span className="font-bold text-blue-600">9,50 €</span></div>
                      <div className="flex justify-between"><span>021 Gigants "Weiße Riesenbohnen" mit Tomatensauce und Schafskäse Überbacken</span><span className="font-bold text-blue-600">9,50 €</span></div>
                    </div>
                  </div>

                  {/* Special */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Special</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>022 Knoblauchbrot</span><span className="font-bold text-blue-600">4,00 €</span></div>
                      <div className="flex justify-between"><span>023 Haloumi - gegrillter zypriotischer Käse mit Olivenöl und Zitrone</span><span className="font-bold text-blue-600">-</span></div>
                      <div className="flex justify-between"><span>024 Scampi aus dem Backofen mit Knoblauch und Olivenöl</span><span className="font-bold text-blue-600">12,90 €</span></div>
                      <div className="flex justify-between"><span>025 Saganaki - panierter Schafskäse</span><span className="font-bold text-blue-600">8,90 €</span></div>
                      <div className="flex justify-between"><span>006 Kalte/Warme Vorspeisenplatte - verschiedene Vorspeisen</span><span className="font-bold text-blue-600">17,50 €</span></div>
                    </div>
                  </div>

                  {/* Salate */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Salate</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>026 gemischter Salat - Beilagensalat</span><span className="font-bold text-blue-600">5,50 €</span></div>
                      <div className="flex justify-between"><span>027 griechischer Bauernsalat mit Schafskäse</span><span className="font-bold text-blue-600">13,80 €</span></div>
                      <div className="flex justify-between"><span>028 Artemis Salat mit gebratenen Hähnchenbruststreifen und Hausdressing</span><span className="font-bold text-blue-600">15,50 €</span></div>
                      <div className="flex justify-between"><span>029 Sommer Salat mit gegrilltem Lachsfilet und Hausdressing</span><span className="font-bold text-blue-600">17,90 €</span></div>
                      <div className="flex justify-between"><span>030 Scampi Salat mit gebratenen Scampis und Hausdressing</span><span className="font-bold text-blue-600">18,50 €</span></div>
                      <div className="flex justify-between"><span>031 Lammfilet Salat mit gebratenem Lammfilet und Hausdressing</span><span className="font-bold text-blue-600">17,90 €</span></div>
                    </div>
                  </div>

                  {/* Schnitzel */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Schnitzel</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>032 Schweinschnitzel paniert, dazu Pommes Frites</span><span className="font-bold text-blue-600">14,50 €</span></div>
                      <div className="flex justify-between"><span>033 Schweineschnitzel Metaxa mit Metaxsauce, dazu Pommes Frites</span><span className="font-bold text-blue-600">16,50 €</span></div>
                      <div className="flex justify-between"><span>035 Schweinschnitzel Spezial paniert, überbacken mit Edamer und Schafskäse, mit Sauce Bernaise und Pommes Frites</span><span className="font-bold text-blue-600">19,50 €</span></div>
                    </div>
                  </div>

                  {/* Gyros Spezialitäten & Mixgrill Teller */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Gyros Spezialitäten & Mixgrill Teller</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>036 Gyros mit Tzatziki dazu Knoblauchkartoffeln</span><span className="font-bold text-blue-600">17,50 €</span></div>
                      <div className="flex justify-between"><span>037 Gyros und Kalamaris dazu Tzatziki und Knoblauchkartoffeln</span><span className="font-bold text-blue-600">19,50 €</span></div>
                      <div className="flex justify-between"><span>038 Gyros Teller - Gyros, Souvlaki, Tzatziki und Pommes Frites</span><span className="font-bold text-blue-600">18,50 €</span></div>
                      <div className="flex justify-between"><span>039 Athen Teller - Gyros, Schweinesteak, Suzuki, Tzatziki und Pommes Frites</span><span className="font-bold text-blue-600">20,50 €</span></div>
                      <div className="flex justify-between"><span>040 Mykonos Teller - Gyros, Bifteki, Tzatziki und Pommes Frites</span><span className="font-bold text-blue-600">20,90 €</span></div>
                      <div className="flex justify-between"><span>041 Alexander Teller - Gyros, Souvlaki, Suzuki, Schweinesteak, Tzatziki und Pommes Frites</span><span className="font-bold text-blue-600">21,50 €</span></div>
                      <div className="flex justify-between"><span>042 Kreta Teller - Gyros, Kalbsleber, Souvlaki, Tzatziki und Pommes Frites</span><span className="font-bold text-blue-600">22,50 €</span></div>
                      <div className="flex justify-between"><span>043 Rhodos Teller - Gyros, Souvlaki, Lammkotelett, Tzatziki und Pommes Frites</span><span className="font-bold text-blue-600">23,50 €</span></div>
                      <div className="flex justify-between"><span>044 Samos Teller - Gyros, Souvlaki, Suzuki, Tzatziki und Pommes Frites</span><span className="font-bold text-blue-600">20,90 €</span></div>
                      <div className="flex justify-between"><span>045 Artemis Platte ab 2 Personen - Gyros, 2 Souvlaki, 2 Suzuki, 2 Schweinensteaks, dazu Knoblauchkartoffeln, Tzatziki und 2 Bauernsalat</span><span className="font-bold text-blue-600">44,00 €</span></div>
                    </div>
                  </div>

                  {/* Grill Spezialitäten */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Grill Spezialitäten</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>046 Souvlaki - 2 Schweinefleischspieße, dazu Beilage nach Wahl</span><span className="font-bold text-blue-600">15,80 €</span></div>
                      <div className="flex justify-between"><span>047 Bifteki - gefülltes Hacksteak mit Schafskäse</span><span className="font-bold text-blue-600">17,50 €</span></div>
                    </div>
                  </div>

                  {/* Lamm Grillspezialitäten */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Lamm Grillspezialitäten</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>048 Lammkarre mit Knoblauchkartoffel</span><span className="font-bold text-blue-600">27,90 €</span></div>
                      <div className="flex justify-between"><span>049 Lammfilet mit Kräuterbutter und Knoblauchkartoffel</span><span className="font-bold text-blue-600">26,50 €</span></div>
                      <div className="flex justify-between"><span>050 Lammspieß (für den kleinen Hunger) mit Kräuterbutter und Knoblauchkartoffel</span><span className="font-bold text-blue-600">16,90 €</span></div>
                      <div className="flex justify-between"><span>051 Lammplatte - Lammfilet, Lammkoteletts, Lammsteakspieß mit Kräuterbutter und Knoblauchkartoffel</span><span className="font-bold text-blue-600">28,90 €</span></div>
                    </div>
                  </div>

                  {/* Lammhaxe */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Lammhaxe</h3>
                    <p className="text-sm mb-2">Geschmorte Lammhaxe mit geriebenem Schafskäse überbacken, mit verschiedenen Beilagen zur Auswahl</p>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>053 mit dicken weißen Bohnen</span><span className="font-bold text-blue-600">22,90 €</span></div>
                      <div className="flex justify-between"><span>054 mit grünen Bohnen</span><span className="font-bold text-blue-600">22,90 €</span></div>
                    </div>
                  </div>

                  {/* Haus Spezialitäten */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Haus Spezialitäten</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>070 Argentinisches Rumpsteak (ca. 250g) mit Kräuterbutter</span><span className="font-bold text-blue-600">26,50 €</span></div>
                      <div className="flex justify-between"><span>071 Argentinisches Rumpsteak (ca. 250g) mit Pfeffersauce</span><span className="font-bold text-blue-600">27,90 €</span></div>
                      <div className="flex justify-between"><span>072 Argentinisches Rumpsteak mit gebratene Zwiebeln</span><span className="font-bold text-blue-600">27,50 €</span></div>
                      <div className="flex justify-between"><span>073 Kalbsleber aus der Pfanne mit frische Champignon und Zwiebeln, dazu Kartoffelscheiben</span><span className="font-bold text-blue-600">21,50 €</span></div>
                      <div className="flex justify-between"><span>074 Bekri Mese Pfännchen - geschnetzeltes Schweinefilet mit Paprika, Zwiebeln und Spezialsauce, dazu Kartoffelscheiben</span><span className="font-bold text-blue-600">22,50 €</span></div>
                      <div className="flex justify-between"><span>075 Flambierte Schweinefiletmedaillons mit frischen Champignons, Zwiebeln und Paprika, mit Metaxa flambiert, dazu Kartoffelscheiben</span><span className="font-bold text-blue-600">22,50 €</span></div>
                      <div className="flex justify-between"><span>076 Hähnchenbrustfilet gegrillt mit zypriotischen Käse und Sauce Bernaise überbacken, dazu Kroketten</span><span className="font-bold text-blue-600">21,50 €</span></div>
                    </div>
                  </div>

                  {/* Fisch Spezialitäten */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Fisch Spezialitäten</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>077 Kalamaris gebraten mit Tzatziki, Butterreis und Brocoli</span><span className="font-bold text-blue-600">20,90 €</span></div>
                      <div className="flex justify-between"><span>078 Frisches Lachsfilet gegrillt mit Butterreis und Brocoli</span><span className="font-bold text-blue-600">22,50 €</span></div>
                      <div className="flex justify-between"><span>079 frisches Zanderfilet gebraten mit Butterreis und Brocoli</span><span className="font-bold text-blue-600">22,50 €</span></div>
                      <div className="flex justify-between"><span>080 Scampis mit Weißwein und Knoblauch verfeinert, dazu Butterreis und Brocoli</span><span className="font-bold text-blue-600">24,50 €</span></div>
                    </div>
                  </div>

                  {/* Pfännchen Spezialitäten */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Pfännchen Spezialitäten</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>081 Artemis Pfännchen - Schweinefiletmedaillons in Weißweinsauce, mit Edamer überbacken, dazu Kartoffelscheiben</span><span className="font-bold text-blue-600">21,50 €</span></div>
                      <div className="flex justify-between"><span>082 Preveza Pfännchen - Lammfilet in Weißweinsauce, mit Edamer überbacken, dazu Kartoffelscheiben</span><span className="font-bold text-blue-600">24,50 €</span></div>
                      <div className="flex justify-between"><span>083 Santorini Pfännchen - Schweinefiletmedaillons in Metaxasauce mit Edamer überbacken, dazu Kartoffelscheiben</span><span className="font-bold text-blue-600">21,90 €</span></div>
                      <div className="flex justify-between"><span>084 Gyros und Bifteki mit Metaxasauce und Edamer überbacken, dazu Pommes Frites</span><span className="font-bold text-blue-600">21,50 €</span></div>
                      <div className="flex justify-between"><span>085 Gyros mit Metaxsauce und Edamer überbacken, dazu Pommes Frites</span><span className="font-bold text-blue-600">19,50 €</span></div>
                      <div className="flex justify-between"><span>086 Schweinesteaks mit Metaxasauce und Edamer überbacken, dazu Pommes Frites</span><span className="font-bold text-blue-600">18,50 €</span></div>
                      <div className="flex justify-between"><span>089 Hähnchenbrustfilet gegrillt mit Metaxasauce und Edamer überbacken, dazu Pommes Frites</span><span className="font-bold text-blue-600">20,90 €</span></div>
                      <div className="flex justify-between"><span>090 Schweinefiletmedaillons mit Sauce Bernaise, geriebenen Schafskäse und Tomatenscheiben überbacken, dazu Kartoffelscheiben</span><span className="font-bold text-blue-600">22,50 €</span></div>
                    </div>
                  </div>

                  {/* Kindergerichte */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Kindergerichte</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>091 Gyros dazu Pommes Frites</span><span className="font-bold text-blue-600">7,90 €</span></div>
                      <div className="flex justify-between"><span>092 Souvlaki dazu Pommes Frites</span><span className="font-bold text-blue-600">7,90 €</span></div>
                      <div className="flex justify-between"><span>093 Suzuki dazu Pommes Frites</span><span className="font-bold text-blue-600">7,90 €</span></div>
                      <div className="flex justify-between"><span>094 Schnitzel dazu Pommes Frites</span><span className="font-bold text-blue-600">7,90 €</span></div>
                    </div>
                  </div>

                  {/* Dessert */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Dessert</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>095 Panierte Banane in Vanillesauce mit Vanilleeis und Sahne</span><span className="font-bold text-blue-600">9,50 €</span></div>
                      <div className="flex justify-between"><span>096 Griechischer Sahnejogurt mit Waldhonig und Walnüssen</span><span className="font-bold text-blue-600">8,90 €</span></div>
                      <div className="flex justify-between"><span>097 Sika - Feigen mit Vanillesauce, Vanilleeis und Sahne</span><span className="font-bold text-blue-600">8,90 €</span></div>
                      <div className="flex justify-between"><span>098 Tarta Schokolade - Schokoladensouffle in Vanillesauce mit Vanilleeis und Sahne</span><span className="font-bold text-blue-600">9,80 €</span></div>
                      <div className="flex justify-between"><span>099 Sauerkirschen mit Vanillesauce, Vanilleeis und Sahne</span><span className="font-bold text-blue-600">9,50 €</span></div>
                    </div>
                  </div>

                  {/* Für den kleinen Appetit */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Für den kleinen Appetit</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>200 Frisches Lachsfilet gegrillt mit Gemüse Reis und Broccoli und Salat mit Hausdressing</span><span className="font-bold text-blue-600">16,50 €</span></div>
                      <div className="flex justify-between"><span>201 Frisches Zanderfilet gebraten mit Gemüse Reis und Broccoli und Salat mit Hausdressing</span><span className="font-bold text-blue-600">16,50 €</span></div>
                      <div className="flex justify-between"><span>202 Lamm Karre mit Knoblauchkartoffeln und Salat mit Hausdressing</span><span className="font-bold text-blue-600">20,90 €</span></div>
                      <div className="flex justify-between"><span>203 Lammfilet mit Kräuterbutter und Knoblauchkartoffeln und Salat mit Hausdressing</span><span className="font-bold text-blue-600">19,50 €</span></div>
                      <div className="flex justify-between"><span>204 Lammspieß mit Kräuterbutter und Knoblauchkartoffeln und Salat mit Hausdressing</span><span className="font-bold text-blue-600">16,90 €</span></div>
                      <div className="flex justify-between"><span>205 Bifteki - gefülltes Hacksteak mit Schafskäse, dazu Pommes Frites und Salat mit Hausdressing</span><span className="font-bold text-blue-600">14,50 €</span></div>
                      <div className="flex justify-between"><span>206 Hähnchenbrustfilet gegrillt mit Metaxsauce und Edamer überbacken, Pommes Frites und Salat mit Hausdressing</span><span className="font-bold text-blue-600">14,90 €</span></div>
                      <div className="flex justify-between"><span>207 Schweinefilet Medaillons mit Sauce béarnaise mit geriebenen Schafskäse und Tomatenscheiben überbacken, dazu Kartoffelscheiben und Salat mit Hausdressing</span><span className="font-bold text-blue-600">17,90 €</span></div>
                      <div className="flex justify-between"><span>208 Gyros mit Metaxasauce und Edamer überbacken, Pommes Frites und Salat mit Hausdressing</span><span className="font-bold text-blue-600">15,50 €</span></div>
                      <div className="flex justify-between"><span>209 Schweinesteaks mit Metaxasauce und Edamer überbacken, Pommes Frites und Salat mit Hausdressing</span><span className="font-bold text-blue-600">15,50 €</span></div>
                      <div className="flex justify-between"><span>212 Kalbsleber aus der Pfanne - Frische Champignons mit Zwiebeln, Kartoffelscheiben und Salat mit Hausdressing</span><span className="font-bold text-blue-600">16,90 €</span></div>
                      <div className="flex justify-between"><span>213 Gyros mit Tzatziki mit Knoblauchkartoffeln und Salat mit Hausdressing</span><span className="font-bold text-blue-600">14,50 €</span></div>
                    </div>
                  </div>

                  {/* Beilagen */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Beilagen</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>055 Kroketten</span><span className="font-bold text-blue-600">3,50 €</span></div>
                      <div className="flex justify-between"><span>056 Butterreis</span><span className="font-bold text-blue-600">3,50 €</span></div>
                      <div className="flex justify-between"><span>058 Pommes Frites</span><span className="font-bold text-blue-600">4,00 €</span></div>
                      <div className="flex justify-between"><span>059 Knoblauchkartoffel</span><span className="font-bold text-blue-600">5,50 €</span></div>
                      <div className="flex justify-between"><span>060 Dicke weiße Bohnen</span><span className="font-bold text-blue-600">4,90 €</span></div>
                      <div className="flex justify-between"><span>061 Grüne Bohnen</span><span className="font-bold text-blue-600">4,90 €</span></div>
                      <div className="flex justify-between"><span>062 frisch gepresster Knoblauch</span><span className="font-bold text-blue-600">2,00 €</span></div>
                    </div>
                  </div>

                  {/* Saucen / Extras */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Saucen / Extras</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>063 Metaxsauce</span><span className="font-bold text-blue-600">4,50 €</span></div>
                      <div className="flex justify-between"><span>065 Sauce Bernaise</span><span className="font-bold text-blue-600">5,00 €</span></div>
                      <div className="flex justify-between"><span>066 Spezialsauce</span><span className="font-bold text-blue-600">5,50 €</span></div>
                      <div className="flex justify-between"><span>067 Kräuterbutter</span><span className="font-bold text-blue-600">2,50 €</span></div>
                      <div className="flex justify-between"><span>068 Tzatziki klein</span><span className="font-bold text-blue-600">4,00 €</span></div>
                      <div className="flex justify-between"><span>069 Knoblauchkartoffel</span><span className="font-bold text-blue-600">3,50 €</span></div>
                      <div className="flex justify-between"><span>Kleiner Bauernsalat</span><span className="font-bold text-blue-600">6,50 €</span></div>
                    </div>
                  </div>

                  {/* Warme Getränke */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Warme Getränke</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>100 Espresso</span><span className="font-bold text-blue-600">3,50 €</span></div>
                      <div className="flex justify-between"><span>101 Double Espresso</span><span className="font-bold text-blue-600">5,50 €</span></div>
                      <div className="flex justify-between"><span>102 griechischer Mocca</span><span className="font-bold text-blue-600">4,00 €</span></div>
                      <div className="flex justify-between"><span>103 Cappuccino</span><span className="font-bold text-blue-600">3,00 €</span></div>
                      <div className="flex justify-between"><span>104 Milchkaffee</span><span className="font-bold text-blue-600">3,70 €</span></div>
                      <div className="flex justify-between"><span>106 MoccaCino</span><span className="font-bold text-blue-600">3,70 €</span></div>
                      <div className="flex justify-between"><span>107 Kakaogetränk</span><span className="font-bold text-blue-600">3,50 €</span></div>
                      <div className="flex justify-between"><span>108 Tee (Verschiedene Sorten)</span><span className="font-bold text-blue-600">3,00 €</span></div>
                    </div>
                  </div>

                  {/* Alkoholfreie Getränke */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Alkoholfreie Getränke</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>109 Gerolsteiner Sprudel 0,25l / 0,75l</span><span className="font-bold text-blue-600">3,00 € / 6,50 €</span></div>
                      <div className="flex justify-between"><span>110 Gerolsteiner Natur 0,25l / 0,75l</span><span className="font-bold text-blue-600">3,00 € / 6,50 €</span></div>
                      <div className="flex justify-between"><span>111 Coca Cola 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,80 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>112 Coca Cola Light 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,80 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>113 Coca Cola Zero 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,80 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>114 Fanta, Sprite, Spezi 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,80 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>115 Bitter Lemon 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,80 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>116 Ginger Ale 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,80 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>117 Tonic Water 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,80 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>118 Orangensaft 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,80 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>119 Apfelsaft 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,50 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>120 Apfelschorle 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,50 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>121 Kirschsaft / Bananensaft 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,80 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>122 Kiba 0,2l / 0,4l</span><span className="font-bold text-blue-600">2,80 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>123 Glas Milch 0,2l</span><span className="font-bold text-blue-600">1,50 €</span></div>
                    </div>
                  </div>

                  {/* Biere vom Fass */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Biere vom Fass</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>124 König Pilsner 0,3l / 0,4l</span><span className="font-bold text-blue-600">3,50 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>125 Köstritzer (schwarz Bier) 0,3l / 0,4l</span><span className="font-bold text-blue-600">3,50 € / 4,20 €</span></div>
                      <div className="flex justify-between"><span>126 Radler 0,3l / 0,4l</span><span className="font-bold text-blue-600">3,50 € / 4,00 €</span></div>
                      <div className="flex justify-between"><span>Benediktiner Weissbier vom Fass</span><span className="font-bold text-blue-600">4,90 €</span></div>
                    </div>
                  </div>

                  {/* Flaschen Bier */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Flaschen Bier</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>127 Hefeweizen vom Fass 0,5l</span><span className="font-bold text-blue-600">4,50 €</span></div>
                      <div className="flex justify-between"><span>128 Benediktiner Alkoholfrei 0,5l</span><span className="font-bold text-blue-600">4,20 €</span></div>
                      <div className="flex justify-between"><span>129 Bitburger Alkoholfrei 0,33l</span><span className="font-bold text-blue-600">3,00 €</span></div>
                      <div className="flex justify-between"><span>130 Malzbier 0,33l</span><span className="font-bold text-blue-600">2,50 €</span></div>
                    </div>
                  </div>

                  {/* Spirituosen */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Spirituosen</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>131 Ouzo 2cl</span><span className="font-bold text-blue-600">3,00 €</span></div>
                      <div className="flex justify-between"><span>132 Metaxa (5 Sterne) 2cl</span><span className="font-bold text-blue-600">4,50 €</span></div>
                      <div className="flex justify-between"><span>133 Metaxa Grande Fine 2cl</span><span className="font-bold text-blue-600">6,50 €</span></div>
                      <div className="flex justify-between"><span>134 Bailey´s 4cl</span><span className="font-bold text-blue-600">5,50 €</span></div>
                      <div className="flex justify-between"><span>135 Korn 2cl</span><span className="font-bold text-blue-600">3,00 €</span></div>
                      <div className="flex justify-between"><span>136 Jägermeister 2cl</span><span className="font-bold text-blue-600">4,00 €</span></div>
                      <div className="flex justify-between"><span>137 Williams Birne 2cl</span><span className="font-bold text-blue-600">4,00 €</span></div>
                      <div className="flex justify-between"><span>138 Fernet Branca 2cl</span><span className="font-bold text-blue-600">4,00 €</span></div>
                      <div className="flex justify-between"><span>139 Sambuca 2cl</span><span className="font-bold text-blue-600">3,50 €</span></div>
                      <div className="flex justify-between"><span>140 Whiskey 4cl</span><span className="font-bold text-blue-600">7,50 €</span></div>
                      <div className="flex justify-between"><span>141 Ramazotti 2cl</span><span className="font-bold text-blue-600">4,00 €</span></div>
                      <div className="flex justify-between"><span>142 Longdrinks 4cl (Jack Daniels, Vodka, Bacardi)</span><span className="font-bold text-blue-600">7,50 €</span></div>
                      <div className="flex justify-between"><span>143 Sekt, Trocken 0,75l</span><span className="font-bold text-blue-600">21,00 €</span></div>
                      <div className="flex justify-between"><span>144 Piccolo Flasche 0,2l</span><span className="font-bold text-blue-600">5,50 €</span></div>
                      <div className="flex justify-between"><span>145 Prosecco 0,75l</span><span className="font-bold text-blue-600">25,00 €</span></div>
                      <div className="flex justify-between"><span>146 Prosecco 0,2l</span><span className="font-bold text-blue-600">6,50 €</span></div>
                    </div>
                  </div>

                  {/* Griechische Rotweine */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Griechische Rotweine</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>Imiglikos (lieblich) 0,2l</span><span className="font-bold text-blue-600">4,80 €</span></div>
                      <div className="flex justify-between"><span>Rot Trocken 0,2l</span><span className="font-bold text-blue-600">4,80 €</span></div>
                      <div className="flex justify-between"><span>Merlot Bio 0,2l</span><span className="font-bold text-blue-600">5,70 €</span></div>
                      <div className="flex justify-between"><span>Mavrodafni Likörwein 0,2l</span><span className="font-bold text-blue-600">5,90 €</span></div>
                      <div className="flex justify-between"><span>Nausa 0,2l</span><span className="font-bold text-blue-600">5,70 €</span></div>
                    </div>
                  </div>

                  {/* Griechische Weißweine */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Griechische Weißweine</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>Imiglikos (lieblich) 0,2l</span><span className="font-bold text-blue-600">4,80 €</span></div>
                      <div className="flex justify-between"><span>Weiß Trocken 0,2l</span><span className="font-bold text-blue-600">4,80 €</span></div>
                      <div className="flex justify-between"><span>Samos PDO. Likörwein 0,2l</span><span className="font-bold text-blue-600">5,90 €</span></div>
                      <div className="flex justify-between"><span>Retsina Malamatina 0,5l</span><span className="font-bold text-blue-600">9,50 €</span></div>
                    </div>
                  </div>

                  {/* Pfälzerweine */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Pfälzerweine</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>Weißherbstschorle 0,25l / 0,5l</span><span className="font-bold text-blue-600">3,00 € / 4,90 €</span></div>
                      <div className="flex justify-between"><span>Rieslingschorle 0,25l / 0,5l</span><span className="font-bold text-blue-600">3,00 € / 4,90 €</span></div>
                      <div className="flex justify-between"><span>Riesling Trocken 0,25l</span><span className="font-bold text-blue-600">4,20 €</span></div>
                      <div className="flex justify-between"><span>Weißherbst 0,25l</span><span className="font-bold text-blue-600">4,20 €</span></div>
                    </div>
                  </div>

                  {/* Flaschen */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4 border-b border-blue-200 pb-2">Flaschen</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>Retsina Malamatina 0,5l</span><span className="font-bold text-blue-600">9,50 €</span></div>
                      <div className="flex justify-between"><span>Biblia chora Weiß 0,75l</span><span className="font-bold text-blue-600">31,90 €</span></div>
                      <div className="flex justify-between"><span>Biblia chora Rose 0,75l</span><span className="font-bold text-blue-600">29,90 €</span></div>
                      <div className="flex justify-between"><span>Lafkiotis Agionymose 0,75l</span><span className="font-bold text-blue-600">30,90 €</span></div>
                      <div className="flex justify-between"><span>Riesling 1,0l</span><span className="font-bold text-blue-600">18,50 €</span></div>
                      <div className="flex justify-between"><span>Weißherbst 1,0l</span><span className="font-bold text-blue-600">18,50 €</span></div>
                    </div>
                  </div>

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
