
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Camera, Users, Utensils, Calendar, Star } from "lucide-react";

interface NavigationProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
}

export const Navigation = ({ selectedTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <Tabs value={selectedTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-blue-800 rounded-none border-b-2 border-blue-600">
            <TabsTrigger 
              value="restaurant" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
            >
              <Utensils className="w-4 h-4 mr-2" />
              Restaurant
            </TabsTrigger>
            <TabsTrigger 
              value="hotel" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
            >
              <Users className="w-4 h-4 mr-2" />
              Hotel
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger 
              value="location" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Standort
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
            >
              <Star className="w-4 h-4 mr-2" />
              Bewertungen
            </TabsTrigger>
            <TabsTrigger 
              value="gallery" 
              className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3 font-medium"
            >
              <Camera className="w-4 h-4 mr-2" />
              Galerie
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </nav>
  );
};
