
import { Facebook, Instagram } from "lucide-react";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";

export const SocialMediaLinks = () => {
  const { settings } = useWebsiteSettings();

  const socialLinks = [
    {
      name: 'Facebook',
      url: settings.facebook_url,
      icon: Facebook,
    },
    {
      name: 'Instagram', 
      url: settings.instagram_url,
      icon: Instagram,
    },
    {
      name: 'TikTok',
      url: settings.tiktok_url,
      icon: null, // TikTok icon as text
    }
  ];

  return (
    <div className="flex space-x-4 mt-4">
      {socialLinks.map((social) => {
        if (!social.url) return null;
        
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 hover:text-white transition-colors"
            title={social.name}
          >
            {social.icon ? (
              <social.icon className="w-6 h-6" />
            ) : (
              <span className="text-xl font-bold">TT</span>
            )}
          </a>
        );
      })}
    </div>
  );
};
