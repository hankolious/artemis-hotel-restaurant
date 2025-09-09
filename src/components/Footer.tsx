import { MapPin, Phone, Settings, FileText } from "lucide-react";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { Button } from "@/components/ui/button";

interface FooterProps {
  onShowAdminPanel: () => void;
  onTabChange: (tab: string) => void;
}

export const Footer = ({ onShowAdminPanel, onTabChange }: FooterProps) => {
  const { settings } = useWebsiteSettings();
  return <footer className="text-white py-8 mt-16" style={{
    backgroundColor: settings.footer_color || '#2694e8'
  }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 text-white" style={{ color: '#ffffff' }}>
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
              Am Nussbaum 6,
              67273 Weisenheim am Berg
            </p>
            <p style={{
            color: settings.footer_text_color || '#93c5fd',
            fontFamily: settings.footer_text_font ? `${settings.footer_text_font}, sans-serif` : 'inherit'
          }} className="text-slate-50">
              <Phone className="w-4 h-4 inline mr-2" />
              06353 - 93 220 70
            </p>
            {settings.opening_hours && (
              <div style={{
                color: settings.footer_text_color || '#93c5fd',
                fontFamily: settings.footer_text_font ? `${settings.footer_text_font}, sans-serif` : 'inherit'
              }} className="text-slate-50 mt-4">
                <h5 className="font-semibold mb-2" style={{ color: '#ffffff' }}>Öffnungszeiten</h5>
                <div className="text-sm space-y-1">
                  <p>Mo, Di, Do, Fr, Sa: 17:30 - 22:00 Uhr</p>
                  <p>So & Feiertage: 12:00 - 14:30 Uhr & 17:30 - 22:00 Uhr</p>
                  <p className="font-medium">Mittwochs Ruhetag</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{
            color: '#ffffff'
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
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p style={{
              color: settings.footer_text_color || '#e2e8f0',
              fontFamily: settings.footer_text_font ? `${settings.footer_text_font}, sans-serif` : 'inherit'
            }} className="text-center md:text-left">
              {settings.copyright_text || '© 2024 Restaurant Artemis. Alle Rechte vorbehalten.'}
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTabChange('impressum')}
                className="text-white hover:text-primary hover:bg-white/10 transition-all duration-300"
              >
                <FileText className="w-4 h-4 mr-2" />
                Impressum
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onShowAdminPanel}
                className="text-white hover:text-primary hover:bg-white/10 transition-all duration-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
