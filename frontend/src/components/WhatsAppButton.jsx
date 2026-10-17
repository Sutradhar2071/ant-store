import React from "react";
import siteConfig from "../siteConfig";

const WhatsAppButton = () => {
  const link = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "আসসালামু আলাইকুম, আমি ANT STORE থেকে একটা প্রোডাক্ট সম্পর্কে জানতে চাই।"
  )}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp এ যোগাযোগ করুন"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/20 flex items-center justify-center hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
        <path d="M16.001 3C9.376 3 4 8.373 4 15c0 2.31.638 4.474 1.746 6.32L4 29l7.86-1.687A11.93 11.93 0 0016 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.75c-1.99 0-3.85-.55-5.44-1.51l-.39-.23-4.66 1 1.02-4.54-.25-.4A9.7 9.7 0 016.25 15c0-5.38 4.37-9.75 9.75-9.75S25.75 9.62 25.75 15 21.38 24.75 16.001 24.75zm5.34-7.3c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.19 2.06 3.14 5 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
