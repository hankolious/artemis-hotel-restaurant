
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onShowAdminPanel: () => void;
}

export const Header = ({ onShowAdminPanel }: HeaderProps) => {
  const handlePhoneClick = () => {
    window.location.href = "tel:+4963539322070";
  };

  return (
    <header className="relative z-10 bg-white/90 backdrop-blur-sm shadow-lg border-b-4 border-blue-600">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Mobile Admin Button - Top Left */}
          <div className="md:hidden absolute top-4 left-4 z-20">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShowAdminPanel}
              className="text-blue-700 border-blue-300 hover:bg-blue-50"
            >
              Admin
            </Button>
          </div>

          <div className="flex items-center space-x-4 flex-1 md:flex-none">
            <img 
              src="/placeholder.svg" 
              alt="Artemis Restaurant Logo" 
              className="h-12 w-12 md:h-16 md:w-16 object-contain"
            />
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold text-blue-900" style={{ fontFamily: 'serif' }}>
                ARTEMIS
              </h1>
              <p className="text-blue-700 text-xs md:text-sm font-medium">Griechisches Restaurant & Hotel</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop Admin Button */}
            <div className="hidden md:block">
              <Button 
                variant="outline" 
                onClick={onShowAdminPanel}
                className="text-blue-700 border-blue-300 hover:bg-blue-50"
              >
                Admin
              </Button>
            </div>
            
            <div className="text-right text-blue-800">
              <p className="text-xs md:text-sm font-medium">Am Nussbaum 6</p>
              <p className="text-xs md:text-sm">67273 Weisenheim am Berg</p>
              <p 
                className="text-xs md:text-sm font-semibold cursor-pointer hover:text-blue-600 transition-colors"
                onClick={handlePhoneClick}
                title="Jetzt anrufen"
              >
                ☎ 06353 - 93 220 70
              </p>
              <Button
                onClick={handlePhoneClick}
                className="mt-1 md:mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 md:px-3"
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
