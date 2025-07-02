
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";

export const Gallery = () => {
  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'serif' }}>
          GALERIE
        </h2>
        <p className="text-blue-700">Impressionen aus unserem Restaurant und Hotel</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-2 border-blue-200 shadow-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Camera className="w-12 h-12 text-blue-400" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
