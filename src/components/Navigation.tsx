
import { Button } from "@/components/ui/button";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";

interface NavigationProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ selectedTab, onTabChange }: NavigationProps) => {
  const { settings } = useWebsiteSettings();

  const navItems = [
    { id: "restaurant", label: "Restaurant", icon: "🍽️" },
    { id: "hotel", label: "Hotel", icon: "🏨" },
    { id: "events", label: "Events", icon: "🎉" },
    { id: "location", label: "Lage", icon: "📍" },
    { id: "reviews", label: "Bewertungen", icon: "⭐" },
    { id: "gallery", label: "Galerie", icon: "📸" },
  ];

  const borderRadius = settings.tab_border_radius ? `${settings.tab_border_radius}px` : '8px';

  return (
    <nav 
      className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm navigation"
      style={{ fontFamily: `var(--navigation-font), sans-serif` }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 py-4">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={selectedTab === item.id ? "default" : "ghost"}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 transition-all duration-200 hover:scale-105 ${
                selectedTab === item.id 
                  ? 'text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                backgroundColor: selectedTab === item.id ? settings.primary_color || '#1e40af' : 'transparent',
                borderRadius: borderRadius,
                color: selectedTab === item.id ? '#ffffff' : settings.text_color || '#374151',
                fontFamily: `var(--navigation-font), sans-serif`
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};
