
import { Facebook, Instagram } from "lucide-react";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";

export const SocialMediaLinks = () => {
  const { settings } = useWebsiteSettings();

  const socialLinks = [
    {
      name: 'Facebook',
      url: settings.facebook_url || 'https://facebook.com',
      icon: Facebook,
    },
    {
      name: 'Instagram', 
      url: settings.instagram_url || 'https://instagram.com',
      icon: Instagram,
    },
    {
      name: 'TikTok',
      url: settings.tiktok_url || 'https://tiktok.com',
      icon: null, // TikTok icon as text
    }
  ];

  return (
    <div className="flex space-x-6 mt-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url.startsWith('http') ? social.url : `https://${social.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm"
          title={social.name}
        >
          {social.icon ? (
            <social.icon className="w-5 h-5" />
          ) : (
            <span className="text-sm font-bold">TT</span>
          )}
        </a>
      ))}
    </div>
  );
};
