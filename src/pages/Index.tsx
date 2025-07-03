
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { RestaurantMenu } from "@/components/RestaurantMenu";
import { HotelInfo } from "@/components/HotelInfo";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { GuestReviewForm } from "@/components/GuestReviewForm";
import { LocationMap } from "@/components/LocationMap";
import { AdminPanel } from "@/components/AdminPanel";
import { GuestReviews } from "@/components/GuestReviews";
import { SpecialEventsDisplay } from "@/components/SpecialEventsDisplay";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("restaurant");
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { settings } = useWebsiteSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Greek Flag Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 18'%3E%3Cpath fill='%23005BAE' d='M0 0h27v2H0zM0 4h27v2H0zM0 8h27v2H0zM0 12h27v2H0zM0 16h27v2H0z'/%3E%3Cpath fill='%23FFFFFF' d='M0 2h27v2H0zM0 6h27v2H0zM0 10h27v2H0zM0 14h27v2H0z'/%3E%3Crect fill='%23005BAE' width='12' height='12'/%3E%3Cpath fill='%23FFFFFF' d='M5 0h2v12H5zM0 5h12v2H0z'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 200px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <Header onShowAdminPanel={() => setShowAdminPanel(true)} />
      
      {/* Hero Banner Section */}
      <div className="relative w-full h-96 overflow-hidden">
        <img 
          src={settings.banner_image || "/lovable-uploads/8ed39435-b5e1-4e3f-acbd-d04a4e84f4bc.png"}
          alt="Restaurant Banner" 
          className="w-full h-full object-cover"
          style={{
            borderRadius: settings.banner_border_radius ? `${settings.banner_border_radius}px` : '0px'
          }}
        />
        <div 
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
          style={{
            borderRadius: settings.banner_border_radius ? `${settings.banner_border_radius}px` : '0px'
          }}
        >
          <div className="text-center text-white">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ 
                fontFamily: `var(--header-font), serif`,
                color: settings.banner_text_color || '#ffffff'
              }}
            >
              {settings.banner_title || 'Willkommen bei ARTEMIS'}
            </h1>
            <p 
              className="text-lg md:text-xl max-w-2xl mx-auto px-4"
              style={{ color: settings.banner_subtitle_color || '#ffffff' }}
            >
              {settings.banner_subtitle || 'Erleben Sie authentische griechische Küche und Gastfreundschaft in unserem Restaurant & Hotel'}
            </p>
          </div>
        </div>
      </div>
      
      <Navigation selectedTab={selectedTab} onTabChange={setSelectedTab} />

      <div className="container mx-auto px-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsContent value="restaurant" className="mt-8">
            <RestaurantMenu />
          </TabsContent>

          <TabsContent value="hotel" className="mt-8">
            <HotelInfo />
          </TabsContent>

          <TabsContent value="events" className="mt-8">
            <SpecialEventsDisplay />
          </TabsContent>

          <TabsContent value="location" className="mt-8">
            <LocationMap />
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="container mx-auto px-4 pb-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <GuestReviewForm />
                <GuestReviews />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-8">
            <Gallery />
          </TabsContent>
        </Tabs>
      </div>

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}

      <Footer />
    </div>
  );
};

export default Index;
