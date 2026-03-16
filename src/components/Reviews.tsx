import React from 'react';
import { motion } from 'motion/react';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
  const displayReviews = REVIEWS;

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background Quote Icon */}
      <div className="absolute top-10 left-10 text-white/5 pointer-events-none">
        <Quote size={200} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <Star size={16} className="fill-gold text-gold" />
            <span className="text-gold font-bold text-sm">4.9 / 5 Google Rating</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">What Our Guests Say</h2>
          <p className="text-white/60">Join 223+ happy customers who love our authentic flavors.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card p-8 flex flex-col justify-between hover:border-gold/30 transition-all duration-300"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-white/80 italic leading-relaxed mb-8">"{review.text}"</p>
              </div>
              
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-gold/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <span className="text-white/40 text-xs">Verified Guest</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/search?q=Kebab+Lajawab+Varanasi+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold font-bold hover:underline"
          >
            Read all 223+ Google Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
