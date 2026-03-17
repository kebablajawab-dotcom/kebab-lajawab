import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-gold">Get In Touch</h2>
            <p className="text-white/60 mb-10 text-lg">
              Visit us for an unforgettable dining experience or contact us for home delivery and catering services.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-gold/10 rounded-2xl text-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Our Location</h4>
                  <p className="text-white/60">629, Nai Bazar Lohta, In front of Ruby Textiles, Varanasi, Uttar Pradesh</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-gold/10 rounded-2xl text-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Phone Number</h4>
                  <p className="text-white/60">+91 80042 65844</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-gold/10 rounded-2xl text-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Opening Hours</h4>
                  <p className="text-white/60">Mon - Sun: 12:00 PM - 11:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="font-bold mb-6">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram />, href: '#' },
                  { icon: <Facebook />, href: '#' },
                  { icon: <Youtube />, href: '#' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5 h-[500px] relative group"
          >
            {/* Embedded Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.8123456789!2d82.9157262!3d25.3023242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2df899999999%3A0x9999999999999999!2sKebab%20Lajawab!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Overlay Link to Official Google Maps */}
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Kebab+Lajawab+Lohta+Varanasi"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-all duration-300 flex items-center justify-center"
            >
              <div className="bg-gold text-charcoal px-6 py-3 rounded-full font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                Open in Google Maps
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
