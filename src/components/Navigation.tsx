
import { Button } from "@/components/ui/button";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { UtensilsCrossed, Hotel, Calendar, MapPin, Star, Images } from "lucide-react";

interface NavigationProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ selectedTab, onTabChange }: NavigationProps) => {
  const { settings } = useWebsiteSettings();

  const navItems = [
    { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
    { id: "hotel", label: "Hotel", icon: Hotel },
    { id: "events", label: "Events", icon: Calendar },
    { id: "location", label: "Lage", icon: MapPin },
    { id: "reviews", label: "Bewertungen", icon: Star },
    { id: "gallery", label: "Galerie", icon: Images },
  ];

  const borderRadius = settings.tab_border_radius ? `${settings.tab_border_radius}px` : '8px';

  return (
    <nav 
      className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b shadow-lg navigation"
      style={{ 
        fontFamily: `var(--navigation-font), sans-serif`,
        borderColor: 'hsl(var(--border))'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-3 py-6">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant={selectedTab === item.id ? "default" : "ghost"}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-3 px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-md ${
                  selectedTab === item.id 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-600 hover:text-primary'
                }`}
                style={{
                  backgroundColor: selectedTab === item.id ? settings.primary_color || 'hsl(var(--primary))' : 'transparent',
                  borderRadius: borderRadius,
                  color: selectedTab === item.id ? '#ffffff' : settings.text_color || 'hsl(var(--foreground))',
                  fontFamily: `var(--navigation-font), sans-serif`
                }}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
