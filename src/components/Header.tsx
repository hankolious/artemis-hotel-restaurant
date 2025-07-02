
import { Button } from "@/components/ui/button";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";

interface HeaderProps {
  onShowAdminPanel: () => void;
}

export const Header = ({ onShowAdminPanel }: HeaderProps) => {
  const { settings } = useWebsiteSettings();
  
  const handlePhoneClick = () => {
    window.location.href = "tel:+4963539322070";
  };

  return (
    <div className="relative">
      {/* Top Banner Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src="/lovable-uploads/da507885-27f0-4278-9a7b-a4851aa98c24.png"
          alt="Hotel Restaurant Artemis - Griechische Spezialitäten"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Mobile Admin Button - Top Left */}
        <div className="md:hidden absolute top-4 left-4 z-20">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onShowAdminPanel}
            className="border-white text-white hover:bg-white hover:text-black backdrop-blur-sm bg-black/20"
          >
            Admin
          </Button>
        </div>

        {/* Welcome Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl"
              style={{ 
                fontFamily: `var(--header-font), serif`,
                textShadow: '3px 3px 6px rgba(0,0,0,0.7)'
              }}
            >
              {settings.site_title || 'ARTEMIS'}
            </h1>
            <p 
              className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 drop-shadow-lg"
              style={{ 
                color: '#ffd700',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              {settings.site_subtitle || 'Griechisches Restaurant & Hotel'}
            </p>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Erleben Sie authentische griechische Küche und gemütliche Gastfreundschaft 
              in unserem traditionellen Restaurant & Hotel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handlePhoneClick}
                size="lg"
                className="text-white font-semibold px-8 py-4 text-lg shadow-xl hover:scale-105 transition-all duration-300"
                style={{ 
                  backgroundColor: settings.primary_color || '#1e40af',
                  borderRadius: '25px'
                }}
              >
                📞 Jetzt Reservieren
              </Button>
              <div className="text-white text-center">
                <p className="text-sm opacity-90">oder rufen Sie uns an:</p>
                <p 
                  className="text-xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handlePhoneClick}
                  style={{ color: '#ffd700' }}
                >
                  06353 - 93 220 70
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Bar */}
      <header 
        className="relative z-10 bg-white/95 backdrop-blur-sm shadow-lg border-b-4"
        style={{ 
          borderBottomColor: settings.primary_color || '#1e40af',
          backgroundColor: settings.background_color ? `${settings.background_color}F2` : undefined
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 md:flex-none">
              <img 
                src={settings.logo_url || "/placeholder.svg"} 
                alt="Artemis Restaurant Logo" 
                className="h-12 w-12 md:h-16 md:w-16 object-contain"
              />
              <div className="text-center md:text-left">
                <h2 
                  className="text-xl md:text-2xl font-bold"
                  style={{ 
                    fontFamily: `var(--header-font), serif`,
                    color: settings.primary_color || '#1e40af'
                  }}
                >
                  {settings.site_title || 'ARTEMIS'}
                </h2>
                <p 
                  className="text-xs md:text-sm font-medium"
                  style={{ color: settings.secondary_color || '#3b82f6' }}
                >
                  Authentische griechische Küche
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Desktop Admin Button */}
              <div className="hidden md:block">
                <Button 
                  variant="outline" 
                  onClick={onShowAdminPanel}
                  className="border-primary-dynamic text-primary-dynamic hover:bg-primary-dynamic hover:text-white"
                >
                  Admin
                </Button>
              </div>
              
              <div 
                className="text-right"
                style={{ color: settings.text_color || '#1e293b' }}
              >
                <p className="text-xs md:text-sm font-medium">Am Nussbaum 6</p>
                <p className="text-xs md:text-sm">67273 Weisenheim am Berg</p>
                <div className="flex items-center justify-end space-x-2 mt-1">
                  <span className="text-2xl">🇬🇷</span>
                  <p 
                    className="text-xs md:text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={handlePhoneClick}
                    title="Jetzt anrufen"
                    style={{ color: settings.secondary_color || '#3b82f6' }}
                  >
                    ☎ 06353 - 93 220 70
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
