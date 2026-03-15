import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../constants';
import { Utensils, ImagePlus } from 'lucide-react';

interface MenuProps {
  onSelectCategory: (category: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectCategory }) => {
  const categories = ['STARTER', 'KEBAB', 'RICE/BIRYANI', 'ROTI/BREAD', 'BEVERAGES', 'GRAVY CHICKEN', 'GRAVY MUTTON', 'ROLL'];
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const savedImages = localStorage.getItem('kebab_lajawab_custom_images');
    if (savedImages) {
      try {
        setCustomImages(JSON.parse(savedImages));
      } catch (e) {
        console.error('Failed to parse saved images', e);
      }
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && activeCategory) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newCustomImages = { ...customImages, [activeCategory]: base64String };
        setCustomImages(newCustomImages);
        localStorage.setItem('kebab_lajawab_custom_images', JSON.stringify(newCustomImages));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (category: string) => {
    setActiveCategory(category);
    fileInputRef.current?.click();
  };

  return (
    <section id="menu" className="py-24 bg-charcoal/50">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageUpload} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gold">Our Signature Menu</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-white/60 max-w-2xl mx-auto">
            Explore our hand-crafted selection of authentic dishes, prepared with the finest ingredients and traditional spices.
          </p>
        </motion.div>

        {/* Menu Sections */}
        <div className="space-y-20">
          {categories.map((category) => {
            const items = MENU_ITEMS.filter(item => item.category === category);
            if (items.length === 0) return null;

            // Only take the first item to represent the category
            const displayItem = items[0];
            const displayImage = customImages[category] || displayItem.image;

            return (
              <div key={category} className="text-left">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-gold whitespace-nowrap">
                    {category}
                  </h3>
                  <div className="h-px bg-gold/20 flex-grow"></div>
                </div>

                <div className="max-w-md">
                  <motion.div
                    key={displayItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="glass-card overflow-hidden group hover:border-gold/30 transition-all duration-300"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={displayImage}
                        alt={displayItem.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 flex gap-2 items-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerUpload(category);
                          }}
                          className="p-1.5 bg-gold text-charcoal rounded-md hover:bg-amber-accent transition-colors shadow-lg flex items-center justify-center"
                          title="Add Image"
                        >
                          <ImagePlus size={16} />
                        </button>
                        <div className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center ${displayItem.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                          <div className={`w-2 h-2 rounded-full ${displayItem.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal to-transparent">
                        <span className="text-gold font-serif font-bold text-2xl tracking-widest uppercase">
                          {category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 text-left">
                      <h4 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors uppercase tracking-tight">
                        {category}
                      </h4>
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">{displayItem.description}</p>
                      <button 
                        onClick={() => onSelectCategory(category)}
                        className="w-full py-2 border border-gold/30 rounded-lg text-gold text-sm font-bold hover:bg-gold hover:text-charcoal transition-all duration-300"
                      >
                        View Menu
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gold font-bold hover:underline"
          >
            Download Full Menu (PDF) <Utensils size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Menu;
