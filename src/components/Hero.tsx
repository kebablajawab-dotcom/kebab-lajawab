import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronDown, Image as ImageIcon, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType, fileToBase64, updateSettings } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface HeroProps {
  isAdmin: boolean;
}

const Hero = ({ isAdmin }: HeroProps) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'global'), (doc) => {
      if (doc.exists()) {
        setHeroImage(doc.data().heroImage || null);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/global');
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (file: File) => {
    if (!isAdmin) return;
    if (file.size > 800 * 1024) {
      alert('Image size must be less than 800KB. Please compress the image.');
      return;
    }

    setLoading(true);
    try {
      const base64 = await fileToBase64(file);
      await updateSettings({ heroImage: base64 });
    } catch (error) {
      console.error('Hero image upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultHeroImage = "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1920&q=80";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImage || defaultHeroImage}
          alt="Sizzling Kebabs"
          className="w-full h-full object-cover object-top blur-[3px] scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/60 to-charcoal"></div>
      </div>

      {/* Admin Upload Button */}
      {isAdmin && (
        <div className="absolute top-24 right-8 z-20">
          <label className="flex items-center gap-2 px-4 py-2 bg-gold/90 backdrop-blur-sm text-charcoal font-bold rounded-full cursor-pointer hover:bg-gold transition-all shadow-xl border border-white/20">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              disabled={loading}
            />
            {loading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
            Change Background
          </label>
        </div>
      )}

      {/* Smoke Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="smoke-particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-20px',
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-gold text-gold" />
            ))}
          </div>
          <span className="text-sm font-medium">4.9 Rated | 223+ Happy Customers</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-9xl font-serif font-bold mb-6 pb-4 text-gold-gradient drop-shadow-[0_5px_15px_rgba(212,175,55,0.4)] tracking-tight leading-tight"
        >
          Kebab Lajawab
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-3xl text-white/90 font-light italic mb-10 tracking-wide"
        >
          "EVERY BITE PURE DELIGHT"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="tel:+918004265844"
            className="w-full sm:w-auto px-10 py-4 bg-gold hover:bg-amber-accent text-charcoal font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gold/20"
          >
            Reserve via Call
          </a>
          <a
            href="#menu"
            className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 font-bold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            View Menu
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={32} className="text-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
