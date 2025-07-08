import { MapPin, Phone } from "lucide-react";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
export const Footer = () => {
  const {
    settings
  } = useWebsiteSettings();
  return <footer className="text-white py-8 mt-16" style={{
    backgroundColor: settings.footer_color || '#2694e8'
  }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 text-white">
          <div>
            <h3 style={{
            fontFamily: `var(--header-font), serif`,
            color: '#ffffff'
          }} className="text-xl font-bold mb-4 text-slate-50">
              {settings.site_title || 'ARTEMIS'}
            </h3>
            <p className="mb-4" style={{
            color: settings.footer_text_color || '#93c5fd',
            fontFamily: settings.footer_text_font ? `${settings.footer_text_font}, sans-serif` : 'inherit',
            whiteSpace: 'pre-line'
          }}>
              {settings.footer_text_line1 || 'Authentische griechische Küche'}{'\n'}
              {settings.footer_text_line2 || 'Gemütliche Hotelzimmer'}{'\n'}
              {settings.footer_text_line3 || 'Herzliche Gastfreundschaft'}
            </p>
            <SocialMediaLinks />
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{
            color: '#ffffff'
          }}>Kontakt</h4>
            <p className="mb-2" style={{
            color: settings.footer_text_color || '#93c5fd',
            fontFamily: settings.footer_text_font ? `${settings.footer_text_font}, sans-serif` : 'inherit'
          }}>
              <MapPin className="w-4 h-4 inline mr-2" />
              Am Nussbaum 6, 67273 Weisenheim am Berg
            </p>
            <p style={{
            color: settings.footer_text_color || '#93c5fd',
            fontFamily: settings.footer_text_font ? `${settings.footer_text_font}, sans-serif` : 'inherit'
          }} className="text-slate-50">
              <Phone className="w-4 h-4 inline mr-2" />
              06353 - 93 220 70
            </p>
            {settings.opening_hours && (
              <p style={{
                color: settings.footer_text_color || '#93c5fd',
                fontFamily: settings.footer_text_font ? `${settings.footer_text_font}, sans-serif` : 'inherit'
              }} className="text-slate-50 mt-2">
                Öffnungszeiten: ab {settings.opening_hours} Uhr
              </p>
            )}
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{
            color: '#940505'
          }}>Über Artemis</h4>
            <p className="text-sm" style={{
            color: settings.footer_text_color || '#93c5fd',
            fontFamily: settings.footer_text_font ? `${settings.footer_text_font}, sans-serif` : 'inherit'
          }}>
              Artemis, die griechische Göttin der Jagd, der Natur und der Wildnis. 
              Erleben Sie die Tradition Griechenlands in unserem Restaurant.
            </p>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-6 text-center">
          <p style={{
          color: settings.footer_text_color || '#93c5fd',
          fontFamily: settings.footer_text_font ? `${settings.footer_text_font}, sans-serif` : 'inherit'
        }}>
            {settings.copyright_text || '© 2024 Restaurant Artemis. Alle Rechte vorbehalten.'}
          </p>
        </div>
      </div>
    </footer>;
};