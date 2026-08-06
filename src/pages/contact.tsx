import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, BookOpen, Heart, Landmark, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import StaticMap from '@/components/StaticMap';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const site = 'https://christslovechristianschool.info';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  // Support Form State & Loading State (Added default currency property field value)
  const [supportSending, setSupportSending] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportForm, setSupportForm] = useState({ 
    donorName: '', 
    currency: 'NAD', 
    amount: '', 
    reference: '' 
  });

  // The missing handler for the general contact form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Your international-compliant bank remittance worker
  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSending(true);

    const formData = new FormData();
    
    // Placed your Web3Forms access key straight into the pipeline variables
    formData.append("access_key", "22370a0d-46fa-49a7-b81d-959ab241401d");
    formData.append("subject", `New Bank Remittance Logged - ${supportForm.donorName}`);
    formData.append("from_name", "School Website Remittance Registry");
    
    // Dynamic Form Field Payload Strings mapping
    formData.append("Donor / Organization", supportForm.donorName);
    formData.append("Currency Selected", supportForm.currency);
    formData.append("Amount Transferred", supportForm.amount);
    formData.append("Payment Reference / SWIFT MT103 Ref", supportForm.reference);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSupportSubmitted(true);
        setSupportForm({ donorName: '', currency: 'NAD', amount: '', reference: '' });
      } else {
        console.error("Web3Forms API reject:", result);
        alert(result.message || "Submission failed. Please check details or email directly.");
      }
    } catch (error) {
      console.error("Web3Forms network failure:", error);
      alert("Connection lost. Please confirm your internet access and try again.");
    } finally {
      setSupportSending(false);
    }
  };

  const title = "Contact Us — Christ's Love Christian School";
  const description = "Get in touch with Christ's Love Christian School. Find our location, hours, phone number, and send us a message.";
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

      {/* SECTION: Support Us (2x2 Grid Layout with Dark Blue Background) */}
      <section className="py-20 bg-[#0B192C] text-white border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={stagger}
            className="mb-14 text-center max-w-2xl mx-auto"
          >
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-xs mb-2">Partner With Our Vision</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl text-white mb-4">Support Us</motion.h2>
            <motion.div variants={fadeUp} className="w-12 h-1 bg-primary mx-auto rounded" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* ROW 1, COL 1: Video of School Library */}
           <motion.div 
  initial={{ opacity: 0, x: -30 }} 
  whileInView={{ opacity: 1, x: 0 }} 
  viewport={{ once: true }} 
  transition={{ duration: 0.5, ease: 'easeOut' }}
  className="flex flex-col justify-center"
> 
  <div className="w-full h-[340px] rounded-xl overflow-hidden shadow-2xl bg-black relative border border-white/10"> 
    <video 
      src="/assets/media/libraryvid.mp4" 
      className="w-full h-full object-cover"
      controls 
      loop 
      autoPlay
      muted 
      playsInline 
    /> 
  </div> 
</motion.div>

            {/* ROW 1, COL 2: Book Donation Text Request */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white/[0.03] backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10 flex flex-col justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5 text-primary">
                <BookOpen size={24} />
              </div>
              <h3 className="font-heading text-2xl text-white mb-3">Enrich Our School Library</h3>
              <p className="text-white/80 leading-relaxed mb-4 text-sm md:text-base">
                Books open worlds of potential for our learners. We are actively expanding our academic and storytelling resources and graciously accept new or gently used educational literature, reference encyclopedias, and children's storybooks.
              </p>
              <p className="text-sm font-semibold text-primary flex items-center gap-2">
                <Heart size={16} className="fill-primary" /> Drop off items directly at our administration office.
              </p>
            </motion.div>

                {/* ROW 2, COL 1: Financial Support Request (With International SWIFT Profile) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white/[0.03] backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10 flex flex-col justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5 text-primary">
                <Landmark size={24} />
              </div>
              <h3 className="font-heading text-2xl text-white mb-3">Support Our Expansion</h3>
              <p className="text-white/80 leading-relaxed mb-4 text-sm md:text-base">
                We are actively working to expand our facilities. Your direct generosity helps fund building projects; supplement learning resource grants; subsidize student tuition pathways; and, modernize vital classroom facilities. To secure our operations, all web contributions are routed into a dedicated, isolated development account.
              </p>
              <div className="bg-black/30 p-4 rounded-lg text-xs font-mono space-y-1.5 border border-white/10 text-white/90">
                <p className="font-bold text-sm text-primary mb-1.5 font-sans">Official Donation Account Details:</p>
                <p><span className="text-white/50">Bank:</span> First National Bank (FNB) Namibia</p>
                <p><span className="text-white/50">Account Name:</span> Christ's Love Christian School - Donations</p>
                <p><span className="text-white/50">Account No:</span> #####</p>
                <p><span className="text-white/50">Branch Code:</span> ##### (Windhoek Main)</p>
                
                {/* Global Wire Routing Additions */}
                <div className="pt-2 mt-2 border-t border-white/10 space-y-1.5">
                  <p className="font-bold text-primary font-sans">International Wire (SWIFT) Routing:</p>
                  <p><span className="text-white/50">SWIFT / BIC:</span> FIRNNANXXXX</p>
                  <p><span className="text-white/50">Bank Country:</span> Namibia</p>
                  <p><span className="text-white/50">Bank Physical Address:</span> Floor 3, FNB Freedom Plaza, Independence Avenue, Windhoek, Namibia</p>
                </div>
              </div>
            </motion.div>

            {/* ROW 2, COL 2: Expanded Account Form Setup for Global Currencies */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white/[0.03] backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10 flex flex-col justify-center"
            >
              {supportSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    ✓
                  </div>
                  <h4 className="font-heading text-xl text-white mb-2">Remittance Logged</h4>
                  <p className="text-white/70 text-sm">Thank you for notifying us of your contribution. Our financial department will cross-verify your transfer reference shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <h3 className="font-heading text-xl text-white mb-1">Log Global Remittance</h3>
                  <p className="text-xs text-white/60 mb-3">Submit your local or international bank transfer details directly to our registry desk.</p>
                  
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Donor Name / Organization</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-black/20 border border-white/10 p-2.5 rounded text-sm text-white focus:outline-none focus:border-primary placeholder-white/30"
                      placeholder="Your name or company"
                      value={supportForm.donorName}
                      onChange={(e) => setSupportForm({...supportForm, donorName: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-white/80 mb-1">Currency</label>
                      <select 
                        required
                        className="w-full bg-[#111c2e] border border-white/10 p-2.5 rounded text-sm text-white focus:outline-none focus:border-primary"
                        value={supportForm.currency || 'NAD'}
                        onChange={(e) => setSupportForm({...supportForm, currency: e.target.value})}
                      >
                        <option value="NAD">NAD (Kina)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="ZAR">ZAR (R)</option>
                      </select>
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-white/80 mb-1">Amount Transferred</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-black/20 border border-white/10 p-2.5 rounded text-sm text-white focus:outline-none focus:border-primary placeholder-white/30"
                        placeholder="e.g. 2500"
                        value={supportForm.amount}
                        onChange={(e) => setSupportForm({...supportForm, amount: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Transaction Reference / Swift MT103 Ref</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-black/20 border border-white/10 p-2.5 rounded text-sm text-white focus:outline-none focus:border-primary placeholder-white/30"
                      placeholder="EFT reference or wire tracing string"
                      value={supportForm.reference}
                      onChange={(e) => setSupportForm({...supportForm, reference: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={supportSending}
                    className="w-full bg-primary text-black font-semibold text-sm py-2.5 rounded hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {supportSending ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Transmitting Remittance Log...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Remittance Data
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
                    

          </div>
        </div>
      </section>

      {/* Contact Contents Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            
            {/* Info Column */}
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
                    <p className="text-foreground/70 text-sm leading-relaxed">Monday – Friday: 8:00 AM – 5:00 PM<br />Saturday &amp; Sunday: Closed </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Map Layout Block */}
              <motion.div variants={fadeUp} className="rounded-lg overflow-hidden border border-border"> 
                <StaticMap location="Erf 283 Gemini Street, Dorado Park, Windhoek, Namibia" height={280} zoom={16} /> 
              </motion.div>
            </motion.div> 

            {/* General Message Form Container */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}> 
              <motion.h2 variants={fadeUp} className="font-heading text-3xl text-secondary mb-8">Send Us a Message</motion.h2> 
              {submitted ? (
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-10 text-center"> 
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"> 
                    <Mail size={24} className="text-primary" /> 
                  </div> 
                  <h3 className="font-heading text-2xl text-secondary mb-3">Message Received!</h3> 
                  <p className="text-foreground/70 leading-relaxed"> Thank you for reaching out. A member of our team will be in touch with you shortly. We look forward to connecting with your family. </p> 
                </div> 
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5"> 
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"> 
                    <motion.div variants={fadeUp}> 
                      <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1.5">Full Name <span className="text-primary">*</span></label> 
                      <input id="name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors" placeholder="Your name" /> 
                    </motion.div> 
                    <motion.div variants={fadeUp}> 
                      <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1.5">Email Address <span className="text-primary">*</span></label> 
                      <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors" placeholder="your@email.com" /> 
                    </motion.div> 
                  </div> 
                  <motion.div variants={fadeUp}> 
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-1.5">Phone Number</label> 
                    <input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors" placeholder="(555) 000-0000" /> 
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-1.5">Subject <span className="text-primary">*</span></label>
                    <select 
                      id="subject" 
                      required 
                      value={form.subject} 
                      onChange={(e) => setForm({ ...form, subject: e.target.value })} 
                      className="w-full px-4 py-2.5 border border-border rounded bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                    >
                      <option value="">Select a subject…</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="tour">Schedule a Tour</option>
                      <option value="academics">Academics Question</option>
                      <option value="tuition">Tuition &amp; Fees</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary mb-1.5">Message <span className="text-primary">*</span></label>
                   <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none" placeholder="Tell us about your family and how we can help…" />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <button 
                      type="submit" 
                      className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors shadow"
                    >
                      Send Message
                    </button>
                  </motion.div>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
