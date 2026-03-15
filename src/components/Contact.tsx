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
                  <p className="text-white/60">+91 98765 43210</p>
                  <p className="text-white/60">+91 98765 43211</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-gold/10 rounded-2xl text-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Opening Hours</h4>
                  <p className="text-white/60">Mon - Sun: 12:00 PM - 11:00 PM</p>
                  <p className="text-gold text-sm mt-1">Happy Hour: 4:00 PM - 7:00 PM</p>
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
            className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5 h-[500px]"
          >
            {/* Embedded Google Maps Placeholder */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.8123456789!2d82.9!3d25.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE4JzAwLjAiTiA4MsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
