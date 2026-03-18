import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, Heart } from 'lucide-react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Footer = () => {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'global'), (doc) => {
      if (doc.exists()) {
        setLogo(doc.data().logo || null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className="bg-charcoal border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {logo ? (
                <img src={logo} alt="Logo" className="h-14 w-auto object-contain" />
              ) : (
                <UtensilsCrossed className="text-gold w-10 h-10" />
              )}
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-serif font-bold tracking-tighter text-gold uppercase">Kebab</span>
                <span className="text-xl font-serif font-bold tracking-tighter text-gold uppercase">Lajawab</span>
              </div>
            </div>
            <p className="text-white/50 mb-6 font-medium uppercase tracking-[0.2em] text-[10px]">
              EVERY BITE PURE DELIGHT
            </p>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 inline-block">
              <span className="text-gold font-bold">4.9⭐</span>
              <span className="text-white/40 text-xs">223+ Google Reviews</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-white/50">
              <li><a href="#" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#menu" className="hover:text-gold transition-colors">Our Menu</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">Gallery</a></li>
              <li><a href="#reservation" className="hover:text-gold transition-colors">Reservations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Our Services</h4>
            <ul className="space-y-4 text-white/50">
              <li>Dine-in Experience</li>
              <li>Home Delivery</li>
              <li>Outdoor Catering</li>
              <li>Private Events</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact Info</h4>
            <ul className="space-y-4 text-white/50">
              <li className="flex gap-3">
                <span className="text-gold">Address:</span>
                629, Nai Bazar, Lohta, Kerakatpur, Near Lohta Police station, Infront of Ruby textiles, Varanasi
              </li>
              <li className="flex gap-3">
                <span className="text-gold">Phone:</span>
                +91 80042 65844
              </li>
              <li className="flex gap-3">
                <span className="text-gold">Email:</span>
                kebablajawab@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm">
            Copyright © 2025 Kebab Lajawab | All Rights Reserved
          </p>
          <p className="text-white/30 text-xs uppercase tracking-widest">
            designed by - <span className="text-red-600 font-bold">MD NISAR AHMAD</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
