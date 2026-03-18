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
import Gallery from './components/Gallery';
import FullGallery from './components/FullGallery';
import { motion, AnimatePresence } from 'motion/react';
import { auth, isUserAdmin } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const lastSelectedCategory = React.useRef<string | null>(null);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  const wasInFullView = React.useRef(false);

  // Force scroll to top on initial mount/refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Aggressive scroll to top
    window.scrollTo(0, 0);
    const timer = setTimeout(() => window.scrollTo(0, 0), 100);
    return () => clearTimeout(timer);
  }, []);

  // Track the last action to know where to scroll back to
  useEffect(() => {
    if (selectedCategory) {
      lastSelectedCategory.current = selectedCategory;
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (showFullGallery) {
      lastSelectedCategory.current = null; // Clear category if we went to gallery
    }
  }, [showFullGallery]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(isUserAdmin(currentUser));
    });
    return () => unsubscribe();
  }, []);

  // Scroll to top when entering a full view and track state
  useEffect(() => {
    if (selectedCategory || showFullGallery) {
      window.scrollTo(0, 0);
      wasInFullView.current = true;
    }
  }, [selectedCategory, showFullGallery]);

  // Set pending scroll ONLY when returning to main content from a full view
  useEffect(() => {
    if (!showFullGallery && !selectedCategory && wasInFullView.current) {
      if (lastSelectedCategory.current) {
        setPendingScroll(`category-${lastSelectedCategory.current}`);
      } else {
        setPendingScroll('gallery');
      }
      wasInFullView.current = false; // Reset after setting pending scroll
    }
  }, [showFullGallery, selectedCategory]);

  // Execute pending scroll with a more generous timeout for AnimatePresence
  useEffect(() => {
    if (pendingScroll && !showFullGallery && !selectedCategory) {
      // Wait for the exit animation of the previous view to complete (mode="wait")
      // and for the new view to be fully rendered.
      const timer = setTimeout(() => {
        const element = document.getElementById(pendingScroll);
        if (element) {
          // Using scrollIntoView with block: 'center' to ensure it's well-positioned
          element.scrollIntoView({ behavior: 'auto', block: 'center' });
          setPendingScroll(null);
          lastSelectedCategory.current = null;
        } else {
          // Fallback if specific element not found
          const fallbackId = pendingScroll.startsWith('category-') ? 'menu' : 'gallery';
          const fallbackElement = document.getElementById(fallbackId);
          if (fallbackElement) {
            fallbackElement.scrollIntoView({ behavior: 'auto', block: 'center' });
          }
          setPendingScroll(null);
          lastSelectedCategory.current = null;
        }
      }, 500); // 500ms to be safe with AnimatePresence exit animations
      return () => clearTimeout(timer);
    }
  }, [pendingScroll, showFullGallery, selectedCategory]);

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
            isAdmin={isAdmin}
          />
        ) : showFullGallery ? (
          <FullGallery 
            key="full-gallery"
            isAdmin={isAdmin} 
            onBack={() => setShowFullGallery(false)} 
          />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Navbar user={user} isAdmin={isAdmin} />
            <main>
              <Hero isAdmin={isAdmin} />
              <About />
              <Menu onSelectCategory={setSelectedCategory} isAdmin={isAdmin} />
              <Gallery isAdmin={isAdmin} onViewMore={() => setShowFullGallery(true)} />
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
