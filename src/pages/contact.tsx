import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import StaticMap from '@/components/StaticMap';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const site = 'https://christslovechristianschool.info';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const title = "Contact Us — Christ's Love Christian School";
  const description = "Get in touch with Christ's Love Christian School. Find our location, hours, phone number, and send us a message. We'd love to hear from your family.";
  const canonicalUrl = `${site}/contact`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Page Header */}
      <section className="bg-secondary py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Get in Touch</motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-secondary-foreground mb-5">Contact Us</motion.h1>
            <motion.p variants={fadeUp} className="text-secondary-foreground/70 text-lg leading-relaxed">
              We'd love to hear from you. Whether you have questions about admissions, curriculum, or our community — we're here to help.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-heading text-3xl text-secondary mb-8">School Information</motion.h2>

              <motion.div variants={stagger} className="space-y-6 mb-10">
                <motion.div variants={fadeUp} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary text-sm mb-1">Address</p>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      Erf 283 Gemini Street, Dorado Park<br />
                      P.O. Box 8149, Bachbrecht<br />
                      Windhoek
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary text-sm mb-1">Phone</p>
                    <a href="tel:+264613042333" className="text-foreground/70 text-sm hover:text-primary transition-colors block">Tel: +264 61 304233</a>
                    <a href="tel:+264817531121" className="text-foreground/70 text-sm hover:text-primary transition-colors block">Cell: +264 81 7531121</a>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary text-sm mb-1">Email</p>
                    <a href="mailto:info@christslovechristianschool.info" className="text-foreground/70 text-sm hover:text-primary transition-colors">inquiries@christslovechristianschool.info</a>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary text-sm mb-1">Office Hours</p>
                    <p className="text-foreground/70 text-sm leading-relaxed">Monday – Friday: 8:00 AM – 5:00 PM<br />Saturday &amp; Sunday: Closed


                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Map */}
              <motion.div variants={fadeUp} className="rounded-lg overflow-hidden border border-border">
                <StaticMap
                  location="Erf 283 Gemini Street, Dorado Park, Windhoek, Namibia"
                  height={280}
                  zoom={16} />
                
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-heading text-3xl text-secondary mb-8">Send Us a Message</motion.h2>

              {submitted ?
              <div
                className="bg-primary/10 border border-primary/30 rounded-xl p-10 text-center">
                
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl text-secondary mb-3">Message Received!</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Thank you for reaching out. A member of our team will be in touch with you shortly. We look forward to connecting with your family.
                  </p>
                </div> :

              <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <motion.div variants={fadeUp}>
                      <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1.5">Full Name <span className="text-primary">*</span></label>
                      <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                      placeholder="Your name" />
                    
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1.5">Email Address <span className="text-primary">*</span></label>
                      <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                      placeholder="your@email.com" />
                    
                    </motion.div>
                  </div>

                  <motion.div variants={fadeUp}>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-1.5">Phone Number</label>
                    <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                    placeholder="(555) 000-0000" />
                  
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-1.5">Subject <span className="text-primary">*</span></label>
                    <select
                    id="subject"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors">
                    
                      <option value="">Select a subject…</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="tour">Schedule a Tour</option>
                      <option value="academics">Academics Question</option>
                      <option value="tuition">Tuition & Fees</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary mb-1.5">Message <span className="text-primary">*</span></label>
                    <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your family and how we can help…" />
                  
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors">
                    
                      Send Message
                    </button>
                  </motion.div>
                </form>
              }
            </motion.div>
          </div>
        </div>
      </section>
    </>);

}