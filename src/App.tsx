import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CategoryMenu from './components/CategoryMenu';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Scroll to top when category is selected
  useEffect(() => {
    if (selectedCategory) {
      window.scrollTo(0, 0);
    }
  }, [selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen selection:bg-gold/30 selection:text-gold"
    >
      <AnimatePresence mode="wait">
        {selectedCategory ? (
          <CategoryMenu 
            key="category-menu"
            category={selectedCategory} 
            onBack={() => setSelectedCategory(null)} 
          />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Menu onSelectCategory={setSelectedCategory} />
              <Reviews />
              <Reservation />
              <Contact />
            </main>
            <Footer />
            <WhatsAppButton />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
