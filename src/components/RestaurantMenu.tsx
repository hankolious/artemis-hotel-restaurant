
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const RestaurantMenu = () => {
  const menuCategories = [
    {
      title: "Aperitifs",
      items: [
        { id: "001", name: "Martini Bianco / Rosso", price: "6,80 €", description: "4cl, 15% Vol." },
        { id: "002", name: "Aperol Spritz", price: "8,90 €", description: "1,10 - 4cl, 15% Vol. (mit Farbstoff und chininhaltig)" },
        { id: "003", name: "Campari Orange", price: "8,40 €", description: "4cl, 25% Vol. (mit Farbstoff)" },
        { id: "004", name: "Ouzo Artemis", price: "5,50 €", description: "mit Feige 4cl, 38% Vol." }
      ]
    },
    {
      title: "Suppen",
      items: [
        { id: "005", name: "Tomatensuppe", price: "4,90 €" },
        { id: "007", name: "Bohnensuppe", price: "4,90 €" }
      ]
    },
    {
      title: "Kalte Vorspeisen",
      items: [
        { id: "008", name: "Oliven und Peperoni", price: "7,50 €", description: "(mit Konservierungsstoff)" },
        { id: "009", name: "Tzatziki", price: "6,50 €", description: "Joghurt mit Gurken, Knoblauch und Olivenöl (Milch)" },
        { id: "010", name: "Tirokafteri", price: "6,80 €", description: "Pürierter Schafskäse, mit Peperoni, Knoblauch und Olivenöl (Milch)" },
        { id: "011", name: "Feta - griechischer Schafskäse", price: "8,50 €", description: "Mit Zwiebel und Olivenöl (Milch)" },
        { id: "012", name: "Rote Beete", price: "7,80 €", description: "nach griechischer Art mit Knoblauch" },
        { id: "013", name: "Taramas", price: "7,80 €", description: "Fischrogencreme (Fische)" }
      ]
    },
    {
      title: "Warme Vorspeisen",
      items: [
        { id: "014", name: "Peperonis gegrillt", price: "8,50 €", description: "mit spezial Knoblauchsauce" },
        { id: "015", name: "Auberginen gebraten", price: "7,80 €", description: "dazu Tzatziki" },
        { id: "016", name: "Zucchini Gebraten", price: "7,80 €", description: "dazu Tzatziki" },
        { id: "017", name: "Dolmadakia", price: "8,90 €", description: "gefüllte Weinblätter mit Reis und Hackfleisch, dazu Zitronensauce" },
        { id: "018", name: "Champignons aus dem Backofen", price: "9,80 €", description: "gefüllt mit Spinat und Schafskäse überbacken" },
        { id: "019", name: "Kalamaris", price: "9,80 €", description: "mit Tzatziki" },
        { id: "020", name: "Schafskäse aus dem Backofen", price: "9,50 €", description: "mit Tomatenscheibn, Zwiebeln, Peperoni und Olivenöl" },
        { id: "021", name: "Gigants \"Weiße Riesenbohnen\"", price: "9,50 €", description: "mit Tomatensauce und Schafskäse Überbacken" }
      ]
    },
    {
      title: "Special",
      items: [
        { id: "022", name: "Knoblauchbrot", price: "4,00 €" },
        { id: "023", name: "Haloumi", price: "8,90 €", description: "gegrillter zypriotischer Käse mit Olivenöl und Zitrone" },
        { id: "024", name: "Scampi aus dem Backofen", price: "12,90 €", description: "mit Knoblauch und Olivenöl" },
        { id: "025", name: "Saganaki", price: "8,90 €", description: "panierter Schafskäse" },
        { id: "006", name: "Kalte/Warme Vorspeisenplatte", price: "17,50 €", description: "verschiedene Vorspeisen" }
      ]
    },
    {
      title: "Salate",
      items: [
        { id: "026", name: "gemischer Salat - Beilagensalat", price: "5,50 €" },
        { id: "027", name: "griechischer Bauernsalat", price: "13,80 €", description: "mit Schafskäse" },
        { id: "028", name: "Artemis Salat", price: "15,50 €", description: "mit gebraten Hänchenbruststreifen und Hausdressing" },
        { id: "029", name: "Sommer Salat", price: "17,90 €", description: "mit gegrilltem Lachsfilet und Hausdressing" },
        { id: "030", name: "Scampi Salat", price: "18,50 €", description: "mit gebratenen Scampis und Hausdressing" },
        { id: "031", name: "Lammfilet Salat", price: "17,90 €", description: "mit gebratenem Lammfilet und Hausdressing" }
      ]
    },
    {
      title: "Schnitzel",
      items: [
        { id: "032", name: "Schweinschnitzel", price: "14,50 €", description: "paniert, dazu Pommes Frites" },
        { id: "033", name: "Schweineschnitzel Metax", price: "16,50 €", description: "mit Metaxsauce, dazu Pommes Frites" },
        { id: "035", name: "Schweinschnitzel Spezial", price: "19,50 €", description: "paniert, überbacken mit Edamer und Schafskäse, mit Sauce Bernies und Pommes Frites" }
      ]
    },
    {
      title: "Gyros Spezialitäten & Mixgrill Teller",
      items: [
        { id: "036", name: "Gyros mit Tzatziki", price: "17,50 €", description: "dazu Knoblauchkartoffeln" },
        { id: "037", name: "Gyros und Kalamaris", price: "19,50 €", description: "dazu Tzatziki und Knoblauchkartoffeln" },
        { id: "038", name: "Gyros Teller", price: "18,50 €", description: "Gyros, Souvlaki, Tzatziki und Pommes Frites" },
        { id: "039", name: "Athen Teller", price: "20,50 €", description: "Gyros, Schweinesteak, Suzuki, Tzatziki und Pommes Frites" },
        { id: "040", name: "Mykonos Teller", price: "20,90 €", description: "Gyros, Bifteki, Tzatziki und Pommes Frites" },
        { id: "041", name: "Alexander Teller", price: "21,50 €", description: "Gyros, Souvlaki, Suzuki, Schweinesteak, Tzatziki und Pommes Frites" },
        { id: "042", name: "Kreta Teller", price: "22,50 €", description: "Gyros, Kalbsleber, Souvlaki, Tzatziki und Pommes Frites" },
        { id: "043", name: "Rhodos Teller", price: "23,50 €", description: "Gyros, Souvlaki, Lammkotelett, Tzatziki und Pommes Frites" },
        { id: "044", name: "Samos Teller", price: "20,90 €", description: "Gyros, Souvlaki, Suzuki, Tzatziki und Pommes Frites" },
        { id: "045", name: "Artemis Platte ab 2 Personen", price: "44,00 €", description: "Gyros, 2 Souvlaki, 2 Suzuki, 2 Schweinensteaks, dazu Knoblauchkartoffeln, Tzatziki und 2 Bauernsalat" }
      ]
    },
    {
      title: "Grill Spezialitäten",
      items: [
        { id: "046", name: "Souvlaki", price: "15,80 €", description: "2 Schweinefleischspieße, dazu Beilage nach Wahl" },
        { id: "047", name: "Bifteki", price: "17,50 €", description: "gefülltes Hacksteak mit Schafskäse" }
      ]
    },
    {
      title: "Lamm Grillspezialitäten",
      items: [
        { id: "048", name: "Lammkarre", price: "27,90 €", description: "mit Knoblauchkartoffel" },
        { id: "049", name: "Lammfilet", price: "26,50 €", description: "mit Kräuterbutter und knoblauchkartoffel" },
        { id: "050", name: "Lammspieß (für den kleinen Hunger)", price: "16,90 €", description: "mit Kräuterbutter und Knoblauchkartoffel" },
        { id: "051", name: "Lammplatte", price: "28,90 €", description: "Lammfilet, Lammkoteletts, Lammsteakspieß mit Kräuterbutter und Knoblauchkartoffel" }
      ]
    },
    {
      title: "Lammhaxe",
      items: [
        { id: "053", name: "mit dicken weißen Bohnen", price: "22,90 €", description: "Geschmorte Lammhaxe mit geriebenem Schafskäse überbacken" },
        { id: "054", name: "mit grünen Bohnen", price: "22,90 €", description: "Geschmorte Lammhaxe mit geriebenem Schafskäse überbacken" }
      ]
    },
    {
      title: "Beilagen",
      items: [
        { id: "055", name: "Kroketten", price: "3,50 €" },
        { id: "056", name: "Buttereis", price: "3,50 €" },
        { id: "058", name: "Pommes Frites", price: "4,00 €" },
        { id: "059", name: "Knoblauchkartoffel", price: "5,50 €" },
        { id: "060", name: "Dicke weiße Bohnen", price: "4,90 €" },
        { id: "061", name: "Grüne Bohnen", price: "4,90 €" },
        { id: "062", name: "frisch gepresster Knoblauch", price: "2,00 €" }
      ]
    },
    {
      title: "Saucen / Extras",
      items: [
        { id: "063", name: "Metaxsauce", price: "4,50 €" },
        { id: "065", name: "Sauce Bernaise", price: "5,00 €" },
        { id: "066", name: "Spezialsauce", price: "5,50 €" },
        { id: "067", name: "Kräuterbutter", price: "2,50 €" },
        { id: "068", name: "tzatziki klein", price: "4,00 €" },
        { id: "069", name: "Knoblauchkartoffel", price: "3,50 €" },
        { name: "kleiner bauernsalat", price: "6,50 €" }
      ]
    },
    {
      title: "Haus Spezialitäten",
      items: [
        { id: "070", name: "Argentinisches Rumpsteak (ca. 250g)", price: "26,50 €", description: "mit Kräuterbutter" },
        { id: "071", name: "Argentinisches Rumpsteak (ca. 250g)", price: "27,90 €", description: "mit Pfeffersauce" },
        { id: "072", name: "Argentinisches Rumpsteak", price: "27,50 €", description: "mit gebratene Zwiebeln" },
        { id: "073", name: "Kalbsleber aus der Pfanne", price: "21,50 €", description: "mit frische Champignon und Zwiebeln, dazu Kartoffelscheiben" },
        { id: "074", name: "Bekri Mese Pfännchen", price: "22,50 €", description: "geschnetzeltes Schweinefilet mit Paprika, Zwiebeln und Spezialsauce, dazu Kartoffelscheiben" },
        { id: "075", name: "Flambierte Schweinefiletmedaillons", price: "22,50 €", description: "mit frischen Champignons, Zwiebeln und Paprika, mit Metaxa flambiert, dazu Kartoffelscheiben" },
        { id: "076", name: "Hähnchenbrustfilet gegrillt", price: "21,50 €", description: "mit zypriotischen Käse und Sauce Bernaise überbacken, dazu Kroketten" }
      ]
    },
    {
      title: "Fisch Spezialitäten",
      items: [
        { id: "077", name: "Kalamaris gebraten", price: "20,90 €", description: "mit Tzatziki, Butterreis und Brocoli" },
        { id: "078", name: "Frisches Lachsfilet gegrillt", price: "22,50 €", description: "mit Butterreis und Brocoli" },
        { id: "079", name: "frisches Zanderfilet gebraten", price: "22,50 €", description: "mit Butterreis und Brocoli" },
        { id: "080", name: "Scampis", price: "24,50 €", description: "mit Weißwein und Knoblauch verfeinert, dazu Butterreis und Brocoli" }
      ]
    },
    {
      title: "Pfännchen Spezialitäten",
      items: [
        { id: "081", name: "Artemis Pfännchen", price: "21,50 €", description: "Schweinefiletmedaillons in Weißweinsauce, mit Edamer überbacken, dazu Kartoffelscheiben" },
        { id: "082", name: "Preveza Pfännchen", price: "24,50 €", description: "Lammfilet in Weißweinsauce, mit Edamer überbacken, dazu Kartoffelscheiben" },
        { id: "083", name: "Santorini Pfännchen", price: "21,90 €", description: "Schweinefiletmedaillons in Metaxasauce mit Edamer überbacken, dazu Kartoffelscheiben" },
        { id: "084", name: "Gyros und Bifteki", price: "21,50 €", description: "mit Metaxasauce und Edamer überbacken, dazu Pommes Frites" },
        { id: "085", name: "Gyros", price: "19,50 €", description: "mit Metaxsauce und Edamer überbacken, dazu Pommes Frites" },
        { id: "086", name: "Schweinesteaks", price: "18,50 €", description: "mit Metaxasauce und Edamer überbacken, dazu Pommes Frites" },
        { id: "089", name: "Hähnchenbrustfilet", price: "20,90 €", description: "gegrillt mit Metazasauce und Edamer überbacken, dazu Pommes Frites" },
        { id: "090", name: "Schweinefiletmedaillons", price: "22,50 €", description: "mit Sauce Bernaise, geriebenen Schafskäse und Tomatenscheiben überbacken, dazu Kartoffelscheiben" }
      ]
    },
    {
      title: "Kindergerichte",
      items: [
        { id: "091", name: "Gyros", price: "7,90 €", description: "dazu Pommes Frites" },
        { id: "092", name: "Souvlaki", price: "7,90 €", description: "dazu Pommes Frites" },
        { id: "093", name: "Suzuki", price: "7,90 €", description: "dazu Pommes Frites" },
        { id: "094", name: "Schnitzel", price: "7,90 €", description: "dazu Pommes Frites" }
      ]
    },
    {
      title: "Dessert",
      items: [
        { id: "095", name: "Paniert Banane", price: "9,50 €", description: "in Vanillesauce mit Vanilleeis und Sahne" },
        { id: "096", name: "Griechischer Sahnejogurt", price: "8,90 €", description: "mit Waldhonig und Walnüssen" },
        { id: "097", name: "Sika", price: "8,90 €", description: "Feigen mit Vanillesauce, Vanilleeis und Sahne" },
        { id: "098", name: "Tarta Schokolade", price: "9,80 €", description: "Schokoladensouffle in Vanillesauce mit Vanilleeis und Sahne" },
        { id: "099", name: "Sauerkirschen mit Vanillesauce", price: "9,50 €", description: "Vanilleeis und Sahne" }
      ]
    },
    {
      title: "Für den kleinen Appetit",
      items: [
        { id: "200", name: "Frisches Lachsfilet gegrillt", price: "16,50 €", description: "mit Gemüse Reis und Broccoli und Salat mit Hausdressing" },
        { id: "201", name: "Frisches Zanderfilet gebraten", price: "16,50 €", description: "mit Gemüse Reis und Broccoli und Salat mit Hausdressing" },
        { id: "202", name: "Lamm Karre", price: "20,90 €", description: "mit Knoblauchkartoffeln und Salat mit Hausdressing" },
        { id: "203", name: "Lammfiles", price: "19,50 €", description: "mit Kräuterbutter und Knoblauchkartoffeln und Salat mit Hausdressing" },
        { id: "204", name: "Lammspieß", price: "16,90 €", description: "mit Kräuterbutter und Knoblauchkartoffeln und Salat mit Hausdressing" },
        { id: "205", name: "Biftekti", price: "14,50 €", description: "gefülltes Hacksteak mit Schafskäse, dazu Pommes Frites und Salat mit Hausdressing" },
        { id: "206", name: "Hähnchenbrustfilet gegrillt", price: "14,90 €", description: "mit Metaxsauce und Edamer überbacken, Pommes Frites und Salat mit Hausdressing" },
        { id: "207", name: "Schweinefilet Medaillons", price: "17,90 €", description: "mit Sauce béarnaise mit geriebenen Schafskäse und Tomatenscheiben überbacken, dazu Kartoffelscheiben und Salat mit Hausdressing" },
        { id: "208", name: "Gyros", price: "15,50 €", description: "mit Metaxasauce und Edamer überbacken, Pommes Frites und Salat mit Hausdressing" },
        { id: "209", name: "Schweinesteaks", price: "15,50 €", description: "mit Metaxasauce und Edamer überbacken, Pommes Frites und Salat mit Hausdressing" },
        { id: "212", name: "Kalbsleber aus der Pfanne", price: "16,90 €", description: "Frische Champignons mit Zwiebeln, Kartoffelscheiben und Salat mit Hausdressing" },
        { id: "213", name: "Gyros mit Zaziki", price: "14,50 €", description: "mit Knoblauchkartoffeln und Salat mit Hausdressing" }
      ]
    },
    {
      title: "Warme Getränke",
      items: [
        { id: "100", name: "Espresso", price: "3,50 €" },
        { id: "101", name: "Double Spresso", price: "5,50 €" },
        { id: "102", name: "griechischer Mocca", price: "4,00 €" },
        { id: "103", name: "Cappuccino", price: "3,00 €" },
        { id: "104", name: "Milchkaffee", price: "3,70 €" },
        { id: "106", name: "MoccaCino", price: "3,70 €" },
        { id: "107", name: "Kakaogetränk", price: "3,50 €" },
        { id: "108", name: "Tee (Verschiedene Sorten)", price: "3,00 €" }
      ]
    },
    {
      title: "Alkoholfrei Getränke",
      items: [
        { name: "Gerolsteiner Sprudel 0,25l", price: "3,00 €" },
        { name: "Gerolsteiner Sprudel 0,75l", price: "6,50 €" },
        { name: "Gerolsteiner Natur 0,25l", price: "3,00 €" },
        { name: "Gerolsteiner Natur 0,75l", price: "6,50 €" },
        { name: "Coca Cola 0,2l", price: "2,80 €" },
        { name: "Coca Cola 0,4l", price: "4,20 €" },
        { name: "Coca Cola Light 0,2l", price: "2,80 €" },
        { name: "Coca Cola Light 0,4l", price: "4,20 €" },
        { name: "Coca Cola Zero 0,2l", price: "2,80 €" },
        { name: "Coca Cola Zero 0,4l", price: "4,20 €" },
        { name: "Fanta, Sprite, Spezi 0,2l", price: "2,80 €" },
        { name: "Fanta, Sprite, Spezi 0,4l", price: "4,20 €" },
        { name: "Bitter Lemon 0,2l", price: "2,80 €" },
        { name: "Bitter Lemon 0,4l", price: "4,20 €" },
        { name: "Ginger Ale 0,2l", price: "2,80 €" },
        { name: "Ginger Ale 0,4l", price: "4,20 €" },
        { name: "Tonic Water 0,2l", price: "2,80 €" },
        { name: "Tonic Water 0,4l", price: "4,20 €" },
        { name: "Orangensaft 0,2l", price: "2,80 €" },
        { name: "Orangensaft 0,4l", price: "4,20 €" },
        { name: "Apfelsaft 0,2l", price: "2,50 €" },
        { name: "Apfelsaft 0,4l", price: "4,20 €" },
        { name: "Apfelschorle 0,2l", price: "2,50 €" },
        { name: "Apfelschorle 0,4l", price: "4,20 €" },
        { name: "Kirchsaft / Bananesaft 0,2l", price: "2,80 €" },
        { name: "Kirchsaft / Bananesaft 0,4l", price: "4,20 €" },
        { name: "Kiba 0,2l", price: "2,80 €" },
        { name: "Kiba 0,4l", price: "4,20 €" },
        { name: "Glas Milch 0,2l", price: "1,50 €" }
      ]
    },
    {
      title: "Biere vom Fass",
      items: [
        { name: "König Pilsner 0,3l", price: "3,50 €" },
        { name: "König Pilsner 0,4l", price: "4,20 €" },
        { name: "Köstritzer (schwarz Bier) 0,3l", price: "3,50 €" },
        { name: "Köstritzer (schwarz Bier) 0,4l", price: "4,20 €" },
        { name: "Radler 0,3l", price: "3,50 €" },
        { name: "Radler 0,4l", price: "4,00 €" },
        { name: "Benediktiner Weissbier vom Fass", price: "4,90 €" }
      ]
    },
    {
      title: "Flaschen Bier",
      items: [
        { name: "Hefeweizen vom Fass 0,5l", price: "4,50 €" },
        { name: "Benetikiner Alkohlfrei 0,5l", price: "4,20 €" },
        { name: "Bitburger Alkoholfrei 0,33l", price: "3,00 €" },
        { name: "Malzbier 0,33l", price: "2,50 €" }
      ]
    },
    {
      title: "Spirituosen",
      items: [
        { name: "Ouzo 2cl", price: "3,00 €" },
        { name: "Metaxa (5 Sterne) 2cl", price: "4,50 €" },
        { name: "Metaxa Grande Fine 2cl", price: "6,50 €" },
        { name: "Bailey´s 4cl", price: "5,50 €" },
        { name: "Korn 2cl", price: "3,00 €" },
        { name: "Jägermeister 2cl", price: "4,00 €" },
        { name: "Williams Birne 2cl", price: "4,00 €" },
        { name: "Fernet Branca 2cl", price: "4,00 €" },
        { name: "Sambuca 2cl", price: "3,50 €" },
        { name: "Whiskey 4cl", price: "7,50 €" },
        { name: "Ramazotti 2cl", price: "4,00 €" },
        { name: "Longdrinks 4cl", price: "7,50 €", description: "Jack Daniels, Vodka, Bacardi" },
        { name: "Sekt, Troken 0,75l", price: "21,00 €" },
        { name: "Piccolo Flasche 0,2l", price: "5,50 €" },
        { name: "Prossecco 0,75l", price: "25,00 €" },
        { name: "Prosseco 0,2l", price: "6,50 €" }
      ]
    },
    {
      title: "Griechische Rotweine",
      items: [
        { name: "Imiglikos (lieblich) 0,2l", price: "4,80 €" },
        { name: "Rot Trocken 0,2l", price: "4,80 €" },
        { name: "Merlot Bio 0,2l", price: "5,70 €" },
        { name: "Mavrodafni Likörwein 0,2l", price: "5,90 €" },
        { name: "Nausa 0,2l", price: "5,70 €" }
      ]
    },
    {
      title: "Griechische Weißweine",
      items: [
        { name: "Imiglikos (lieblich) 0,2l", price: "4,80 €" },
        { name: "Weiß Trocken 0,2l", price: "4,80 €" },
        { name: "Samos PDO. Likörwein 0,2l", price: "5,90 €" },
        { name: "Retsina Malamatina 0,5l", price: "9,50 €" }
      ]
    },
    {
      title: "Pfälzerweine",
      items: [
        { name: "Weißherbstschorle 0,25l", price: "3,00 €" },
        { name: "Weißherbstschorle 0,5l", price: "4,90 €" },
        { name: "Rieslingschorle 0,25l", price: "3,00 €" },
        { name: "Rieslingschorle 0,5l", price: "4,90 €" },
        { name: "Riesling Trocken 0,25l", price: "4,20 €" },
        { name: "Weissherbst 0,25l", price: "4,20 €" }
      ]
    },
    {
      title: "Flaschen",
      items: [
        { name: "Retsina Malamatina 0,5l", price: "9,50 €" },
        { name: "Biblia chora Weiß 0,75l", price: "31,90 €" },
        { name: "Biblia chora Rose 0,75l", price: "29,90 €" },
        { name: "Lafkiotis Agionymose 0,75l", price: "30,90 €" },
        { name: "Riesiling 1,0l", price: "18,50 €" },
        { name: "Weißherbst 1,0l", price: "18,50 €" }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'serif' }}>
          UNSERE KARTE
        </h2>
        <p className="text-blue-700 max-w-2xl mx-auto text-sm md:text-base">
          Genießen Sie authentische griechische Küche in unserem traditionellen Restaurant. 
          Alle Gerichte werden frisch zubereitet mit den besten Zutaten.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {menuCategories.map((category, index) => (
          <Card key={index} className="border-2 border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
              <CardTitle className="text-lg md:text-2xl text-blue-900" style={{ fontFamily: 'serif' }}>
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid gap-3 md:gap-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-start border-b border-blue-100 pb-2 last:border-b-0 last:pb-0">
                    <div className="flex-1 pr-2">
                      <h4 className="font-semibold text-blue-900 text-sm md:text-base">
                        {item.id && <span className="text-blue-600 mr-2">{item.id}</span>}
                        {item.name}
                      </h4>
                      {item.description && (
                        <p className="text-xs md:text-sm text-blue-600 mt-1">{item.description}</p>
                      )}
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs md:text-sm shrink-0">
                      {item.price}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
