
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

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("restaurant");
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 relative overflow-hidden">
      {/* Enhanced Greek Pattern Background */}
      <div 
        className="absolute inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 18'%3E%3Cpath fill='%23005BAE' d='M0 0h27v2H0zM0 4h27v2H0zM0 8h27v2H0zM0 12h27v2H0zM0 16h27v2H0z'/%3E%3Cpath fill='%23FFFFFF' d='M0 2h27v2H0zM0 6h27v2H0zM0 10h27v2H0zM0 14h27v2H0z'/%3E%3Crect fill='%23005BAE' width='12' height='12'/%3E%3Cpath fill='%23FFFFFF' d='M5 0h2v12H5zM0 5h12v2H0z'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 260px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 text-6xl opacity-10 animate-pulse">🏛️</div>
      <div className="absolute top-1/3 right-10 text-6xl opacity-10 animate-pulse delay-1000">🍇</div>
      <div className="absolute bottom-1/4 left-1/4 text-6xl opacity-10 animate-pulse delay-2000">⚱️</div>
      
      <Header onShowAdminPanel={() => setShowAdminPanel(true)} />
      
      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
            <span className="text-3xl">🌟</span>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
              Willkommen bei Artemis
            </h2>
            <span className="text-3xl">🌟</span>
          </div>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Entdecken Sie die Geheimnisse der griechischen Küche in unserem familiengeführten Restaurant. 
            Seit Jahren verwöhnen wir unsere Gäste mit traditionellen Rezepten und herzlicher Gastfreundschaft.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Authentische Küche</h3>
            <p className="text-gray-600">Traditionelle griechische Gerichte mit frischen, regionalen Zutaten zubereitet</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🏨</div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Gemütliche Unterkunft</h3>
            <p className="text-gray-600">Komfortable Hotelzimmer für einen entspannten Aufenthalt</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Besondere Events</h3>
            <p className="text-gray-600">Feiern Sie Ihre besonderen Momente in unserem Restaurant</p>
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
