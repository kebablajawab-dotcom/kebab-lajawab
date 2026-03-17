import React from 'react';
import { UtensilsCrossed, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <UtensilsCrossed className="text-gold w-8 h-8" />
              <span className="text-2xl font-serif font-bold tracking-tighter text-gold">
                Kebab Lajawab
              </span>
            </div>
            <p className="text-white/50 mb-6 italic">
              "Every Bites, Pure Delite"
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
                629, Nai Bazar Lohta, Varanasi
              </li>
              <li className="flex gap-3">
                <span className="text-gold">Phone:</span>
                +91 80042 65844
              </li>
              <li className="flex gap-3">
                <span className="text-gold">Email:</span>
                hello@kebablajawab.com
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm">
            Copyright © 2025 Kebab Lajawab | All Rights Reserved
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-ember-red fill-ember-red" /> for Varanasi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
