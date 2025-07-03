
import { MapPin, Phone } from "lucide-react";
import { SocialMediaLinks } from "./SocialMediaLinks";

export const Footer = () => {
  return (
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
            <SocialMediaLinks />
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
  );
};
