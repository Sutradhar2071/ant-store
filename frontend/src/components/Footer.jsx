import React from "react";
import { Link } from "react-router-dom";
import siteConfig from "../siteConfig";

const Footer = () => (
  <footer className="border-t border-ink/10 mt-20 bg-white">
    <div className="container-x py-12 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
      <div>
        <div className="flex items-center gap-2">
          <img 
            src="https://i.ibb.co.com/BdNRwJv/Messenger-creation-983-F7088-0-A31-4316-848-D-12-F9-FD43-A584.jpg" 
            alt={siteConfig.storeName}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="font-display font-semibold text-lg">{siteConfig.storeName}</span>
        </div>
        <p className="text-sm text-muted mt-3 leading-relaxed max-w-sm">
          সেরা মানের গ্যাজেট ও ইলেকট্রনিক্স পণ্য, সাশ্রয়ী দামে আপনার দোরগোড়ায়।
        </p>
        <div className="flex gap-3 mt-4">
          <a
            href={siteConfig.facebook}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
            </svg>
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.63.07 4.81 0 3.19-.01 3.56-.07 4.81-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.62.07-4.85.07-3.2 0-3.58 0-4.81-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.25-.07-1.62-.07-4.81 0-3.18.02-3.56.07-4.81.15-3.23 1.67-4.77 4.92-4.92C8.42 2.2 8.8 2.2 12 2.2zM12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.35 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1012 18.16 6.16 6.16 0 0012 5.84zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">দ্রুত লিংক</h3>
        <ul className="space-y-2 text-sm text-muted">
          <li><Link to="/" className="hover:text-accent transition-colors">হোম</Link></li>
          <li><Link to="/about" className="hover:text-accent transition-colors">আমাদের সম্পর্কে</Link></li>
          <li><Link to="/contact" className="hover:text-accent transition-colors">যোগাযোগ</Link></li>
          <li><Link to="/cart" className="hover:text-accent transition-colors">কার্ট</Link></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">যোগাযোগ</h3>
        <ul className="space-y-2 text-sm text-muted">
          <li>📞 {siteConfig.phone}</li>
          <li>✉️ {siteConfig.email}</li>
          <li>📍 {siteConfig.address}</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-ink/10 py-5 text-center text-sm text-muted">
      © {new Date().getFullYear()} {siteConfig.storeName}. সব অধিকার সংরক্ষিত।
    </div>
  </footer>
);

export default Footer;