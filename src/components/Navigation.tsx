
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Camera, Users, Utensils, Calendar, Star } from "lucide-react";

interface NavigationProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
}

export const Navigation = ({ selectedTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-2 md:px-4">
        <Tabs value={selectedTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-blue-800 rounded-none border-b-2 border-blue-600 h-16 md:h-auto">
            <TabsTrigger 
              value="restaurant" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-2 md:py-3 font-medium text-xs md:text-sm px-1 md:px-3 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 min-h-[60px] md:min-h-auto"
            >
              <Utensils className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-sm leading-tight">Restaurant</span>
            </TabsTrigger>
            <TabsTrigger 
              value="hotel" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-2 md:py-3 font-medium text-xs md:text-sm px-1 md:px-3 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 min-h-[60px] md:min-h-auto"
            >
              <Users className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-sm leading-tight">Hotel</span>
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-2 md:py-3 font-medium text-xs md:text-sm px-1 md:px-3 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 min-h-[60px] md:min-h-auto"
            >
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-sm leading-tight">Events</span>
            </TabsTrigger>
            <TabsTrigger 
              value="location" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-2 md:py-3 font-medium text-xs md:text-sm px-1 md:px-3 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 min-h-[60px] md:min-h-auto"
            >
              <MapPin className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-sm leading-tight">Standort</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-2 md:py-3 font-medium text-xs md:text-sm px-1 md:px-3 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 min-h-[60px] md:min-h-auto"
            >
              <Star className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-sm leading-tight">Bewertungen</span>
            </TabsTrigger>
            <TabsTrigger 
              value="gallery" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-2 md:py-3 font-medium text-xs md:text-sm px-1 md:px-3 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 min-h-[60px] md:min-h-auto"
            >
              <Camera className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-sm leading-tight">Galerie</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </nav>
  );
};
