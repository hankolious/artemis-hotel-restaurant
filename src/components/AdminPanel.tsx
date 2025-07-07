
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Settings, Utensils, Users, Image, MessageSquare, Palette, Calendar, UserCog } from "lucide-react";
import { AdminAuth } from "./AdminAuth";
import { MenuItemsManager } from "./MenuItemsManager";
import { HotelRoomsManager } from "./HotelRoomsManager";
import { ReviewsManager } from "./ReviewsManager";
import { ImagesManager } from "./ImagesManager";
import { NewDesignSettingsManager } from "./admin/NewDesignSettingsManager";
import { SpecialEventsManager } from "./SpecialEventsManager";
import { AdminUserManager } from "./AdminUserManager";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-blue-200">
          <h2 className="text-xl md:text-2xl font-bold text-blue-900 flex items-center">
            <Settings className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            Admin Panel
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-blue-600 hover:text-blue-800"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>

        <div className="p-2 md:p-6 overflow-y-auto max-h-[calc(95vh-5rem)]">
          <Tabs defaultValue="menu" className="w-full">
            {/* Mobile-friendly tab layout */}
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 gap-1 h-auto p-1 bg-blue-50 mb-4 md:mb-6">
              <TabsTrigger 
                value="menu" 
                className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Utensils className="w-4 h-4 mb-1 md:mb-0 md:mr-2" />
                <span className="hidden sm:block">Menü</span>
              </TabsTrigger>
              <TabsTrigger 
                value="hotel" 
                className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Users className="w-4 h-4 mb-1 md:mb-0 md:mr-2" />
                <span className="hidden sm:block">Hotel</span>
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Calendar className="w-4 h-4 mb-1 md:mb-0 md:mr-2" />
                <span className="hidden sm:block">Events</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <MessageSquare className="w-4 h-4 mb-1 md:mb-0 md:mr-2" />
                <span className="hidden sm:block">Reviews</span>
              </TabsTrigger>
              <TabsTrigger 
                value="images" 
                className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Image className="w-4 h-4 mb-1 md:mb-0 md:mr-2" />
                <span className="hidden sm:block">Bilder</span>
              </TabsTrigger>
              <TabsTrigger 
                value="design" 
                className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Palette className="w-4 h-4 mb-1 md:mb-0 md:mr-2" />
                <span className="hidden sm:block">Design</span>
              </TabsTrigger>
              <TabsTrigger 
                value="admins" 
                className="flex flex-col md:flex-row items-center text-xs md:text-sm p-2 md:p-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <UserCog className="w-4 h-4 mb-1 md:mb-0 md:mr-2" />
                <span className="hidden sm:block">Admins</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="mt-0">
              <MenuItemsManager />
            </TabsContent>

            <TabsContent value="hotel" className="mt-0">
              <HotelRoomsManager />
            </TabsContent>

            <TabsContent value="events" className="mt-0">
              <SpecialEventsManager />
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <ReviewsManager />
            </TabsContent>

            <TabsContent value="images" className="mt-0">
              <ImagesManager />
            </TabsContent>

            <TabsContent value="design" className="mt-0">
              <NewDesignSettingsManager />
            </TabsContent>

            <TabsContent value="admins" className="mt-0">
              <AdminUserManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
