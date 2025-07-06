
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
    <header 
      className="relative z-10 bg-white/90 backdrop-blur-sm shadow-lg border-b-4"
      style={{ 
        borderBottomColor: settings.primary_color || '#1e40af',
        backgroundColor: settings.background_color ? `${settings.background_color}E6` : undefined
      }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Mobile Admin Button - Top Left */}
          <div className="md:hidden absolute top-4 left-4 z-20">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShowAdminPanel}
              className="border-primary-dynamic text-primary-dynamic hover:bg-primary-dynamic hover:text-white"
            >
              Admin
            </Button>
          </div>

          <div className="flex items-center space-x-4 flex-1 md:flex-none">
            {settings.logo_url && (
              <img 
                src={settings.logo_url} 
                alt="Logo" 
                className="h-6 w-6 md:h-8 md:w-8 object-contain"
              />
            )}
            <div className="text-center md:text-left">
              <h1 
                className="text-2xl md:text-4xl font-bold"
                style={{ 
                  fontFamily: `var(--header-font), serif`,
                  color: settings.primary_color || '#1e40af'
                }}
              >
                {settings.site_title || 'ARTEMIS'}
              </h1>
              <p 
                className="text-xs md:text-sm font-medium"
                style={{ color: settings.secondary_color || '#3b82f6' }}
              >
                {settings.site_subtitle || 'Griechisches Restaurant & Hotel'}
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
              <p 
                className="text-xs md:text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handlePhoneClick}
                title="Jetzt anrufen"
                style={{ color: settings.secondary_color || '#3b82f6' }}
              >
                ☎ 06353 - 93 220 70
              </p>
              <Button
                onClick={handlePhoneClick}
                className="mt-1 md:mt-2 text-white text-xs px-2 py-1 md:px-3 hover:opacity-90"
                style={{ backgroundColor: settings.primary_color || '#1e40af' }}
              >
                Buchen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
