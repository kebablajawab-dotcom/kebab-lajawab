import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { DETAILED_MENU } from '../constants';
import { CategoryMenuData } from '../types';

interface CategoryMenuProps {
  category: string;
  onBack: () => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ category, onBack }) => {
  const [menuData, setMenuData] = useState<CategoryMenuData | null>(null);

  useEffect(() => {
    const baseData = DETAILED_MENU[category] || null;
    if (baseData) {
      const savedImages = localStorage.getItem(`category_images_${category}`);
      if (savedImages) {
        const imagesMap = JSON.parse(savedImages);
        const updatedItems = baseData.items.map((item, idx) => ({
          ...item,
          image: imagesMap[idx] || item.image
        }));
        setMenuData({ ...baseData, items: updatedItems });
      } else {
        setMenuData(baseData);
      }
    }
  }, [category]);

  if (!menuData) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Menu not found for {category}</h2>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:underline"
        >
          <ArrowLeft size={20} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#f4f1ea] text-[#2c241a] font-sans selection:bg-gold/30"
    >
      {/* Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]"></div>
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>

      <div className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-[#2c241a]/60 hover:text-[#2c241a] transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="font-medium">Back to Menu</span>
        </button>

        <div className="border-b-2 border-[#2c241a]/10 pb-8 mb-12">
          <div className="flex justify-between items-end">
            <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight uppercase">
              {menuData.category}
            </h1>
            {menuData.headers && (
              <div className="flex gap-8 md:gap-12 text-right justify-end">
                {menuData.headers.quarter && (
                  <div className="flex flex-col">
                    <span className="text-lg md:text-xl font-black uppercase tracking-tight whitespace-pre-line leading-tight">{menuData.headers.quarter}</span>
                  </div>
                )}
                {(menuData.headers.half || menuData.headers.left) && (
                  <div className="flex flex-col">
                    <span className="text-lg md:text-xl font-black uppercase tracking-tight whitespace-pre-line leading-tight">{menuData.headers.half || menuData.headers.left}</span>
                  </div>
                )}
                {(menuData.headers.full || menuData.headers.right) && (
                  <div className="flex flex-col">
                    <span className="text-lg md:text-xl font-black uppercase tracking-tight whitespace-pre-line leading-tight">{menuData.headers.full || menuData.headers.right}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {menuData.items.map((item, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex flex-col group ${item.isHeader ? 'mt-8 mb-2' : ''}`}
              >
                <div className="flex justify-between items-baseline">
                  <div className="flex-grow flex items-baseline gap-2">
                    <span className={`${item.isHeader ? 'text-xl font-black' : 'text-xl md:text-2xl font-bold'} uppercase tracking-tight group-hover:text-gold transition-colors duration-300`}>
                      {item.name}
                    </span>
                    {!item.isHeader && <div className="flex-grow border-b border-dotted border-[#2c241a]/20 mx-2"></div>}
                  </div>
                  
                  <div className="flex gap-8 md:gap-12 text-right justify-end">
                    {item.isHeader && item.subHeaders ? (
                      <>
                        {item.subHeaders.quarter && (
                          <span className="text-lg font-black w-16 md:w-20 uppercase">{item.subHeaders.quarter}</span>
                        )}
                        {item.subHeaders.half && (
                          <span className="text-lg font-black w-16 md:w-20 uppercase">{item.subHeaders.half}</span>
                        )}
                        {item.subHeaders.full && (
                          <span className="text-lg font-black w-16 md:w-20 uppercase">{item.subHeaders.full}</span>
                        )}
                      </>
                    ) : (
                      <>
                        {item.quarterPrice !== undefined && (
                          <span className="text-xl md:text-2xl font-black w-16 md:w-20">
                            {typeof item.quarterPrice === 'number' ? `₹${item.quarterPrice}` : item.quarterPrice}
                          </span>
                        )}
                        {item.halfPrice !== undefined && (
                          <span className="text-xl md:text-2xl font-black w-16 md:w-20">
                            {typeof item.halfPrice === 'number' ? `₹${item.halfPrice}` : item.halfPrice}
                          </span>
                        )}
                        {item.fullPrice !== undefined && (
                          <span className="text-xl md:text-2xl font-black w-16 md:w-20">
                            {typeof item.fullPrice === 'number' ? `₹${item.fullPrice}` : item.fullPrice}
                          </span>
                        )}
                        {item.price !== undefined && (
                          <span className="text-xl md:text-2xl font-black w-16 md:w-20">
                            {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Image Preview if custom */}
                <AnimatePresence>
                  {item.image && item.image.startsWith('data:') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 relative inline-block"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-24 w-32 object-cover rounded-md shadow-sm border border-gold/20"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24 text-center opacity-30">
          <div className="w-12 h-1 bg-[#2c241a] mx-auto mb-4"></div>
          <p className="text-sm font-bold uppercase tracking-[0.3em]">KEBAB LAJAWAB • AUTHENTIC TASTE</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryMenu;
