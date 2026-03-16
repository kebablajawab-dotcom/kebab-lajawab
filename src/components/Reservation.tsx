import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const Reservation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    requests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare WhatsApp Message
      const message = encodeURIComponent(`*New Reservation Request*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Date:* ${formData.date}
*Time:* ${formData.time}
*Guests:* ${formData.guests}
${formData.requests ? `*Special Requests:* ${formData.requests}` : ''}`);
      
      // Redirect to WhatsApp
      const whatsappUrl = `https://wa.me/917651904243?text=${message}`;
      
      setIsSuccess(true);
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsSubmitting(false);

        // Reset form and state after 10 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: '',
            phone: '',
            date: '',
            time: '',
            guests: '2',
            requests: ''
          });
        }, 10000);
      }, 1500);

    } catch (error) {
      console.error('Reservation error:', error);
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="reservation" className="py-24 bg-charcoal/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 max-w-lg mx-auto border-gold/20"
          >
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-gold mb-4">Reservation Logged!</h2>
            <p className="text-white/80 mb-8">
              We've saved your request. Redirecting you to WhatsApp for instant confirmation...
            </p>
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="py-24 bg-charcoal/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gold">Reserve Your Table</h2>
            <p className="text-white/60 mb-8 text-lg">
              Planning a special evening? Book your table in advance to ensure a seamless dining experience at Kebab Lajawab.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Easy Booking</h4>
                  <p className="text-sm text-white/40">Select your preferred date and time.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Group Dining</h4>
                  <p className="text-sm text-white/40">Perfect for families and large groups.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-bold">WhatsApp Support</h4>
                  <p className="text-sm text-white/40">Quick confirmation via WhatsApp.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10 border-gold/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Time</label>
                  <input
                    type="time"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Guests</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n} className="bg-charcoal">{n} Guests</option>
                    ))}
                    <option value="9+" className="bg-charcoal">9+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Special Requests (Optional)</label>
                <textarea
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="Any allergies or special occasions?"
                  value={formData.requests}
                  onChange={(e) => setFormData({...formData, requests: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-gold hover:bg-amber-accent text-charcoal font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Processing...' : 'Reserve via WhatsApp'} <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
