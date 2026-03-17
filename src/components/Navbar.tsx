import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { loginWithGoogle, logout } from '../firebase';
import { User } from 'firebase/auth';

interface NavbarProps {
  user: User | null;
  isAdmin: boolean;
}

const Navbar = ({ user, isAdmin }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="text-gold w-8 h-8" />
            <span className="text-2xl font-serif font-bold tracking-tighter text-gold">
              Kebab Lajawab
            </span>
          </div>

          {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-gold transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
              
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full" />
                    ) : (
                      <UserIcon size={16} className="text-gold" />
                    )}
                    <span className="text-xs font-medium text-white/80">
                      {isAdmin ? 'Admin' : 'User'}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-white/60 hover:text-gold transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={loginWithGoogle}
                  className="flex items-center gap-2 text-sm font-medium hover:text-gold transition-colors"
                >
                  <LogIn size={18} />
                  Admin Login
                </button>
              )}

              <a
                href="tel:+918004265844"
                className="px-6 py-2 bg-gold hover:bg-amber-accent text-charcoal font-bold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Reserve via Call
              </a>
            </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gold focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium hover:bg-white/5 hover:text-gold rounded-md"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-4 border-t border-white/10">
                {user ? (
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-3">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
                      ) : (
                        <UserIcon size={24} className="text-gold" />
                      )}
                      <div>
                        <p className="text-sm font-bold text-white">{user.displayName || 'User'}</p>
                        <p className="text-xs text-gold">{isAdmin ? 'Administrator' : 'Guest'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="p-2 text-white/60 hover:text-gold"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { loginWithGoogle(); setIsOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-base font-medium hover:bg-white/5 hover:text-gold rounded-md"
                  >
                    <LogIn size={20} />
                    Admin Login
                  </button>
                )}
              </div>

              <a
                href="tel:+918004265844"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3 bg-gold text-charcoal font-bold rounded-full mt-4"
              >
                Reserve via Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
