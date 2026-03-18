import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS, DETAILED_MENU } from '../constants';
import { Utensils, Image as ImageIcon, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { db, handleFirestoreError, OperationType, fileToBase64 } from '../firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

interface MenuProps {
  onSelectCategory: (category: string) => void;
  isAdmin: boolean;
}

const Menu: React.FC<MenuProps> = ({ onSelectCategory, isAdmin }) => {
  const categories = ['STARTER', 'KEBAB', 'RICE/BIRYANI', 'ROTI/BREAD', 'BEVERAGES', 'GRAVY CHICKEN', 'GRAVY MUTTON', 'ROLL'];
  const [displayItems, setDisplayItems] = useState(MENU_ITEMS);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(22);
    doc.setTextColor(184, 134, 11); // Gold color
    doc.text('Kebab Lajawab', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Full Menu', 105, 30, { align: 'center' });
    
    let currentY = 40;

    Object.keys(DETAILED_MENU).forEach((categoryKey) => {
      const categoryData = DETAILED_MENU[categoryKey];
      
      // Check if we need a new page before adding a new category
      if (currentY > 240) {
        doc.addPage();
        currentY = 20;
      }

      // Category Header
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(184, 134, 11);
      doc.text(categoryData.category, 14, currentY);
      currentY += 5;

      const tableHeaders = ['Item'];
      const hasQuarter = !!categoryData.headers?.quarter;
      const hasHalf = !!categoryData.headers?.half || !!categoryData.headers?.left;
      const hasFull = !!categoryData.headers?.full || !!categoryData.headers?.right;
      const hasSinglePrice = !categoryData.headers && categoryData.items.some(i => i.price !== undefined);

      if (hasQuarter) tableHeaders.push(categoryData.headers!.quarter!.replace('\n', ' '));
      if (hasHalf) tableHeaders.push((categoryData.headers?.half || categoryData.headers?.left)!.replace('\n', ' '));
      if (hasFull) tableHeaders.push((categoryData.headers?.full || categoryData.headers?.right)!.replace('\n', ' '));
      if (hasSinglePrice) tableHeaders.push('Price');

      const tableRows = categoryData.items
        .filter(item => !item.isHeader && item.name !== '')
        .map(item => {
          const row = [item.name];
          if (hasQuarter) row.push(item.quarterPrice?.toString() || '-');
          if (hasHalf) row.push(item.halfPrice?.toString() || '-');
          if (hasFull) row.push(item.fullPrice?.toString() || item.price?.toString() || '-');
          if (hasSinglePrice) row.push(item.price?.toString() || '-');
          return row;
        });

      autoTable(doc, {
        startY: currentY,
        head: [tableHeaders],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [184, 134, 11] },
        margin: { left: 14, right: 14 },
        styles: { fontSize: 10 },
      });
      
      currentY = (doc as any).lastAutoTable.finalY + 15;
    });

    doc.save('Kebab_Lajawab_Menu.pdf');
  };

  // Load saved images from Firestore on mount
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'menuItems'), (snapshot) => {
      const imagesMap: { [key: string]: string } = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.category && data.image) {
          imagesMap[data.category] = data.image;
        }
      });

      const updatedItems = MENU_ITEMS.map(item => ({
        ...item,
        image: imagesMap[item.category] || item.image
      }));
      setDisplayItems(updatedItems);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'menuItems');
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateImage = async (category: string, currentItem: any, file: File) => {
    if (!isAdmin) return;
    setErrorMessage(null);

    // Check file size (Firestore limit is 1MB per document)
    if (file.size > 800 * 1024) { // 800KB to be safe
      setErrorMessage('Image size must be less than 800KB. Please compress the image.');
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    setLoading(prev => ({ ...prev, [category]: true }));
    try {
      const base64 = await fileToBase64(file);
      // Use category as ID for simplicity in this mapping
      const docId = category.replace(/\//g, '_');
      await setDoc(doc(db, 'menuItems', docId), {
        name: currentItem.name,
        price: currentItem.price,
        category: category,
        image: base64,
        description: currentItem.description,
        isVeg: currentItem.isVeg
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'menuItems/' + category);
    } finally {
      setLoading(prev => ({ ...prev, [category]: false }));
    }
  };

  return (
    <section id="menu" className="py-24 bg-charcoal/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 relative"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gold">Our Signature Menu</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Explore our hand-crafted selection of authentic dishes, prepared with the finest ingredients and traditional spices.
          </p>
          <AnimatePresence>
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 font-bold text-sm mb-8"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {categories.map((category) => {
            const items = displayItems.filter(item => item.category === category);
            if (items.length === 0) return null;

            const displayItem = items[0];
            const displayImage = displayItem.image;

            return (
              <div key={category} id={`category-${category}`} className="text-left scroll-mt-24">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-gold whitespace-nowrap">
                    {category}
                  </h3>
                  <div className="h-px bg-gold/20 flex-grow"></div>
                </div>

                <div className="max-w-sm">
                  <motion.div
                    key={displayItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="glass-card overflow-hidden group hover:border-gold/30 transition-all duration-300"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={displayImage}
                        alt={displayItem.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <label
                          className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 flex items-center gap-2 ${
                            isAdmin && !loading[category]
                              ? 'bg-gold/80 text-charcoal hover:bg-gold cursor-pointer' 
                              : 'bg-white/10 text-white/40 cursor-not-allowed'
                          }`}
                          title={isAdmin ? 'Change Image' : 'Login as Admin to change image'}
                        >
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            disabled={!isAdmin || loading[category]}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUpdateImage(category, displayItem, file);
                            }}
                          />
                          {loading[category] ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <ImageIcon size={18} />
                          )}
                          {isAdmin && <span className="text-[10px] font-bold pr-1">ADD IMAGE</span>}
                        </label>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2 items-center">
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
                    <div className="p-4 text-left">
                      <h4 className="text-lg font-bold mb-1 group-hover:text-gold transition-colors uppercase tracking-tight">
                        {category}
                      </h4>
                      <p className="text-white/60 text-xs mb-3 line-clamp-2">{displayItem.description}</p>
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
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 text-gold font-bold hover:underline bg-transparent border-none cursor-pointer"
          >
            Download Full Menu (PDF) <Utensils size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
