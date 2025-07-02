
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Settings, Utensils, Users, Image, MessageSquare, Palette, Calendar } from "lucide-react";
import { AdminAuth } from "./AdminAuth";
import { MenuItemsManager } from "./MenuItemsManager";
import { HotelRoomsManager } from "./HotelRoomsManager";
import { ReviewsManager } from "./ReviewsManager";
import { ImagesManager } from "./ImagesManager";
import { DesignSettingsManager } from "./DesignSettingsManager";
import { SpecialEventsManager } from "./SpecialEventsManager";

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <AdminAuth 
            onAuthenticated={() => setIsAuthenticated(true)}
            onClose={onClose}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center">
            <Settings className="w-6 h-6 mr-2" />
            Admin Panel
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-blue-600 hover:text-blue-800"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-5rem)]">
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="menu" className="flex items-center">
                <Utensils className="w-4 h-4 mr-2" />
                Menü
              </TabsTrigger>
              <TabsTrigger value="hotel" className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Hotel
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Bewertungen
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center">
                <Image className="w-4 h-4 mr-2" />
                Bilder
              </TabsTrigger>
              <TabsTrigger value="design" className="flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Design
              </TabsTrigger>
            </TabsList>

            <TabsContent value="menu">
              <MenuItemsManager />
            </TabsContent>

            <TabsContent value="hotel">
              <HotelRoomsManager />
            </TabsContent>

            <TabsContent value="events">
              <SpecialEventsManager />
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewsManager />
            </TabsContent>

            <TabsContent value="images">
              <ImagesManager />
            </TabsContent>

            <TabsContent value="design">
              <DesignSettingsManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
