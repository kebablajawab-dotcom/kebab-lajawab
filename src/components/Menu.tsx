import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MENU_ITEMS, DETAILED_MENU } from '../constants';
import { Utensils } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface MenuProps {
  onSelectCategory: (category: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectCategory }) => {
  const categories = ['STARTER', 'KEBAB', 'RICE/BIRYANI', 'ROTI/BREAD', 'BEVERAGES', 'GRAVY CHICKEN', 'GRAVY MUTTON', 'ROLL'];
  const [displayItems, setDisplayItems] = useState(MENU_ITEMS);

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

  // Load saved images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('menu_images');
    if (savedImages) {
      const imagesMap = JSON.parse(savedImages);
      const updatedItems = MENU_ITEMS.map(item => ({
        ...item,
        image: imagesMap[item.category] || item.image
      }));
      setDisplayItems(updatedItems);
    }
  }, []);

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
        </motion.div>

        {/* Menu Sections */}
        <div className="space-y-20">
          {categories.map((category) => {
            const items = displayItems.filter(item => item.category === category);
            if (items.length === 0) return null;

            const displayItem = items[0];
            const displayImage = displayItem.image;

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
