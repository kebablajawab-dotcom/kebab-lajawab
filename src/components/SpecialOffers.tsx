import React from 'react';
import { motion } from 'motion/react';
import { Tag, Clock } from 'lucide-react';
import { OFFERS } from '../constants';

const SpecialOffers = () => {
  return (
    <section id="offers" className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-gold mb-4"
          >
            Special Offers
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            className="h-1 bg-gold mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-gold/50 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-4">
                <div className="bg-gold text-charcoal font-bold px-4 py-1 rounded-full text-sm">
                  {offer.discount}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold/10 text-gold">
                  <Tag size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{offer.title}</h3>
                  <p className="text-gray-400 mb-6">{offer.description}</p>
                  
                  <div className="flex items-center gap-2 text-gold text-sm font-medium">
                    <Clock size={16} />
                    <span>Valid: {offer.validUntil}</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
