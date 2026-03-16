import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Clock, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-gold">
              Authentic Varanasi Flavors
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              Located in the heart of Varanasi, Kebab Lajawab is more than just a restaurant; it's a celebration of culinary heritage. We specialize in authentic non-vegetarian delicacies, crafted with passion and served with love.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-10">
              Our secret lies in the traditional slow-cooking methods and hand-picked spices that bring out the true essence of every dish. From sizzling tandoors to aromatic biryanis, every bite at Kebab Lajawab tells a story of tradition and taste.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 glass-card">
                <Utensils className="text-gold mb-3" size={32} />
                <h4 className="font-bold text-sm">Non-Veg Specialty</h4>
              </div>
              <div className="flex flex-col items-center text-center p-4 glass-card">
                <Clock className="text-gold mb-3" size={32} />
                <h4 className="font-bold text-sm">Fast Delivery</h4>
              </div>
              <div className="flex flex-col items-center text-center p-4 glass-card">
                <MapPin className="text-gold mb-3" size={32} />
                <h4 className="font-bold text-sm">Dine-in Experience</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
