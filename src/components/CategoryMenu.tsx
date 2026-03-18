import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import { DETAILED_MENU } from '../constants';
import { CategoryMenuData } from '../types';
import { db, handleFirestoreError, OperationType, fileToBase64 } from '../firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

interface CategoryMenuProps {
  category: string;
  onBack: () => void;
  isAdmin: boolean;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ category, onBack, isAdmin }) => {
  const [menuData, setMenuData] = useState<CategoryMenuData | null>(null);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const baseData = DETAILED_MENU[category] || null;
    if (!baseData) return;

    const unsubscribe = onSnapshot(collection(db, 'menuItems'), (snapshot) => {
      const imagesMap: { [key: string]: string } = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Check if it's a category image or an item image
        // We'll use a naming convention for IDs: category_itemName
        if (data.image) {
          imagesMap[doc.id] = data.image;
        }
      });

      const updatedItems = baseData.items.map((item) => {
        const docId = `${category}_${item.name}`.replace(/\//g, '_').replace(/\s+/g, '_');
        return {
          ...item,
          image: imagesMap[docId] || item.image
        };
      });

      setMenuData({ ...baseData, items: updatedItems });
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'menuItems');
    });

    return () => unsubscribe();
  }, [category]);

  const handleUpdateItemImage = async (itemName: string, currentImage: string | undefined, file: File) => {
    if (!isAdmin || !menuData) return;
    setErrorMessage(null);

    // Check file size (Firestore limit is 1MB per document)
    if (file.size > 800 * 1024) { // 800KB to be safe
      setErrorMessage('Image size must be less than 800KB. Please compress the image.');
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    const docId = `${category}_${itemName}`.replace(/\//g, '_').replace(/\s+/g, '_');
    setLoading(prev => ({ ...prev, [docId]: true }));

    try {
      const base64 = await fileToBase64(file);
      await setDoc(doc(db, 'menuItems', docId), {
        category: category,
        itemName: itemName,
        image: base64,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `menuItems/${docId}`);
    } finally {
      setLoading(prev => ({ ...prev, [docId]: false }));
    }
  };

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
          <AnimatePresence>
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-600 font-bold text-sm mt-4 text-center bg-red-50 p-2 rounded border border-red-200"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
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
                    <div className="flex items-center gap-2">
                      <span className={`${item.isHeader ? 'text-xl font-black' : 'text-xl md:text-2xl font-bold'} uppercase tracking-tight group-hover:text-gold transition-colors duration-300`}>
                        {item.name}
                      </span>
                      {isAdmin && !item.isHeader && item.name && (
                        <label
                          className={`p-1 transition-colors ${
                            loading[`${category}_${item.name}`.replace(/\//g, '_').replace(/\s+/g, '_')]
                              ? 'text-gold/50 cursor-not-allowed'
                              : 'text-[#2c241a]/30 hover:text-gold cursor-pointer'
                          }`}
                          title="Add/Change Item Image"
                        >
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            disabled={loading[`${category}_${item.name}`.replace(/\//g, '_').replace(/\s+/g, '_')]}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUpdateItemImage(item.name, item.image, file);
                            }}
                          />
                          {loading[`${category}_${item.name}`.replace(/\//g, '_').replace(/\s+/g, '_')] ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <ImageIcon size={14} />
                          )}
                        </label>
                      )}
                    </div>
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

                {/* Image Preview */}
                <AnimatePresence>
                  {item.image && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 relative inline-block"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-32 w-48 object-cover rounded-md shadow-md border border-[#2c241a]/10"
                        referrerPolicy="no-referrer"
                      />
                      {isAdmin && (
                        <div className="absolute top-2 right-2">
                           <div className="bg-gold text-charcoal text-[8px] font-bold px-1 rounded">CUSTOM</div>
                        </div>
                      )}
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
