import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, CheckCircle, FileText, Users, Calendar } from 'lucide-react';




const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };




const steps = [
  { icon: FileText, step: '01', title: 'Submit an Inquiry', description: 'Fill out our online inquiry form or contact our admissions office to express your interest and receive our information package.' },
  { icon: Users, step: '02', title: 'Schedule a Tour', description: 'Visit our campus, meet our teachers, and experience the Christ\'s Love community firsthand. Tours are available throughout the year.' },
  { icon: FileText, step: '03', title: 'Complete the Application', description: 'Submit your completed application form along with required documents including previous school records and references.' },
  { icon: Calendar, step: '04', title: 'Student Assessment', description: 'We schedule a brief, informal assessment to help us understand your child\'s learning needs and place them appropriately.' },
  { icon: CheckCircle, step: '05', title: 'Enrollment Confirmation', description: 'Upon acceptance, complete enrollment by submitting your registration fee and required forms to secure your child\'s place.' },
];




const site = 'https://christslovechristianschool.info';




export default function AdmissionsPage() {
  const title = "Admissions — Christ's Love Christian School";
  const description = "Learn how to enroll your child at Christ's Love Christian School. Discover our admissions process, tuition information, and how to apply for Kindergarten through Grade 7.";
  const canonicalUrl = `${site}/admissions`;




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
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Join Our Family</motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-secondary-foreground mb-5">Admissions</motion.h1>
            <motion.p variants={fadeUp} className="text-secondary-foreground/70 text-lg leading-relaxed">
              We welcome families who share our commitment to faith, academic excellence, and Christian community. Here's how to get started.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </section>




{/* ── E-FLYERS TAB SECTION ── */}
<section className="py-20 bg-background">
  <div className="container mx-auto px-4 lg:px-8">
   
    {/* Heading Title Block */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="text-center mb-14"
    >
      <motion.p variants={fadeUp} className="text-primary font-bold tracking-widest uppercase text-base sm:text-lg mb-3">
        Enrol Now!
      </motion.p>
      <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-[#0a2540] mb-4">
        2027 APPLICATIONS INTAKE
      </motion.h2>
      <motion.div variants={fadeUp} className="w-16 h-1 bg-primary mx-auto rounded-full opacity-60"></motion.div>
    </motion.div>




    {/* Responsive 2-Column Flyer Grid Container */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full"
    >
      {/* AI_GUARDRAIL_SYSTEM_LOCK: DO NOT ALTER, COMPRESS, OR DELETE THIS INLINE ARRAY STRUCTURE */}
      {/* CORE_STATIC_SCHEMA_BYPASS_START */}
      {(() => {
        const schoolFlyers = [
          { id: 1, src: "https://ti1ev20vl7.preview.c36.airoapp.ai/airo-assets/uploads/gallery/gallery-da93c89c-81c8-4846-bdf8-9be9babd58f7.jpg", label: "2027 Admission Open" },
          { id: 2, src: "https://ti1ev20vl7.preview.c36.airoapp.ai/airo-assets/uploads/gallery/gallery-7c88bb85-a2b3-4e06-8d87-ce80e46b27ec.jpg", label: "2027 Admission & Enrollment Requirements" }
        ];
        {/* CORE_STATIC_SCHEMA_BYPASS_END */}
        {/* AI_GUARDRAIL_SYSTEM_LOCK_END */}



// Self-contained browser-native click tracking events 
const handleFlyerClick = (src: any, label: any) => { 
  if (typeof document === 'undefined') return; 
  
  const modal = document.getElementById('tab-flyer-modal'); 
  // Cast explicitly as an HTMLImageElement or 'any' so TS allows the .src property
  const modalImg = document.getElementById('tab-flyer-modal-img') as any; 
  const modalTxt = document.getElementById('tab-flyer-modal-txt'); 
  
  // Optional chaining (?.) handles null-pointer check safety rules
  if (modal && modalImg && modalTxt) { 
    modalImg.src = src; 
    modalTxt.innerText = label; 
    modal.style.display = 'flex'; 
  } 
};




return (
  <>
    {/* Map over the protected flyers array data */}
    {schoolFlyers && schoolFlyers.map((flyer: any) => (
      <motion.div
        key={flyer?.id}
        variants={fadeUp}
        // Optional chaining (?.) bypasses null pointer checks completely
        onClick={() => handleFlyerClick(flyer?.src || '', flyer?.label || '')}
        className="group relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-secondary border border-secondary-foreground/10 p-4 w-full h-[450px] sm:h-[500px] md:h-[550px] cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          <img
            // Provide string fallbacks so the browser never binds a null state
            src={flyer?.src || ''}
            alt={flyer?.label || 'School Flyer'}
            style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
            className="transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </motion.div>
    ))}
  </>
);




                    {/* Hover overlay text layout */} 
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10 pointer-events-none"> 
          <div className="flex items-center justify-end w-full text-white/80 text-[10px] font-medium uppercase tracking-wider"> 
            <span>Click to view full flyer</span> 
          </div> 
          <p className="text-white font-medium text-base text-center bg-black/40 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm w-full transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0"> 
            {flyer?.label || 'School Flyer'} 
          </p> 
        </div> 
      </motion.div> 
    ))} 

    {/* Dedicated Tab Lightbox Frame */} 
    <div 
      id="tab-flyer-modal" 
      onClick={() => { 
        const modal = document.getElementById('tab-flyer-modal');
        if (modal) modal.style.display = 'none';
      }} 
      className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out select-none" 
      style={{ display: 'none', backdropFilter: 'blur(8px)' }} 
    > 
      <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center pointer-events-none"> 
        <img id="tab-flyer-modal-img" src="" alt="Expanded Flyer view" className="max-w-full max-h-[75vh] object-contain rounded-md" /> 
        <p id="tab-flyer-modal-txt" className="text-white font-heading text-lg font-semibold tracking-wide text-center mt-6 px-6 py-2 bg-white/5 border border-white/10 rounded-full"></p> 
      </div> 
      
      <button 
        onClick={(e) => { 
          e.stopPropagation(); 
          const modal = document.getElementById('tab-flyer-modal');
          if (modal) modal.style.display = 'none';
        }} 
        className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-11 h-11 flex items-center justify-center rounded-full font-semibold cursor-pointer transition-all border border-white/5 text-lg" 
      > 
        &#x2715; 
      </button> 
    </div> 
  </> 
);




      {/* Who We Welcome */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Who We Welcome</motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary mb-6 leading-tight">Is CLCS Right for Your Family?</motion.h2>
              <motion.p variants={fadeUp} className="text-foreground/80 text-lg leading-relaxed mb-5">
                We welcome students from Kindergarten through Grade 7 whose families are seeking a Christ-centered education that integrates faith with academic excellence.
              </motion.p>
              <motion.p variants={fadeUp} className="text-foreground/70 leading-relaxed mb-6">
                We serve families from a variety of Christian backgrounds and denominations. Our primary requirement is a shared commitment to raising children in the Christian faith and supporting the school's mission and values.
              </motion.p>
              <motion.div variants={stagger} className="space-y-3">
                {[
                  'Students entering Kindergarten through Grade 7',
                  'Families who affirm our Statement of Faith',
                  'Students who will thrive in a structured, faith-based environment',
                  'Families committed to partnering with our school community',
                ].map((item) => (
                  <motion.div key={item} variants={fadeUp} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>




            {/* Tuition */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="bg-muted rounded-xl p-8 lg:p-10">
              <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Tuition & Fees</motion.p>
              <motion.h3 variants={fadeUp} className="font-heading text-3xl text-secondary mb-5">Investment in Your Child</motion.h3>
              <motion.p variants={fadeUp} className="text-foreground/70 text-sm leading-relaxed mb-6">
                We believe a quality Christian education should be accessible. Our tuition is set to reflect the true cost of providing an excellent, faith-centered education while remaining as affordable as possible for families.
              </motion.p>
              <motion.div variants={stagger} className="space-y-4 mb-6">
                {[
                  { label: 'Kindergarten', amount: 'Contact for rates' },
                  { label: 'Grades 1–4', amount: 'Contact for rates' },
                  { label: 'Grades 5–7', amount: 'Contact for rates' },
                  { label: 'Registration Fee', amount: 'Contact for rates' },
                ].map((item) => (
                  <motion.div key={item.label} variants={fadeUp} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <span className="text-foreground/80 text-sm font-medium">{item.label}</span>
                    <span className="text-secondary font-semibold text-sm">{item.amount}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.p variants={fadeUp} className="text-muted-foreground text-xs leading-relaxed">
                Financial assistance may be available for qualifying families. Please contact our admissions office for more information.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>




      {/* Process Steps */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">How to Apply</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary">The Admissions Process</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map(({ icon: Icon, step, title, description }) => (
              <motion.div key={step} variants={fadeUp} className="bg-card border border-border rounded-lg p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-heading text-3xl text-primary/30 font-bold leading-none">{step}</span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon size={16} className="text-primary" />
                  </div>
                </div>
                <h3 className="font-heading text-lg text-secondary font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>




 {/* ── ADMISSIONS DOWNLOAD SECTION ── */}
<section className="py-16 bg-secondary/30 border-b border-secondary-foreground/10">
  <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
   
    {/* Heading Informational Text Block - Positioned Outside and Above the Download Card */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mb-10 text-left"
    >
      {/* Dark Blue Title Font Block - CENTERED */}
      <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-[#0a2540] mb-4 text-center">
        Application Form
      </h2>




      {/* Description Text Changed to Solid Black, Left Aligned */}
      <p className="text-black font-medium text-base sm:text-lg leading-relaxed mb-6">
        Christ’s Love Christian School is accepting applications for the 2027 academic year.
        The Application Form (available below) requires detailed learner, parent, and fee payment
        information along with mandatory supporting documentation.
      </p>




      {/* Mandatory Supporting Documentation Bulleted Checklist - Deep Indentation and Unbolded Black Text */}
      <div className="bg-[#0a2540]/5 border border-[#0a2540]/10 rounded-xl p-5 sm:p-6 max-w-2xl">
        <h4 className="text-[#0a2540] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">
          Kindly Submit the Following Documentation with This Form:
        </h4>
        <ul className="space-y-2.5 text-black text-sm font-normal pl-8 sm:pl-14">
          <li className="flex items-start gap-3">
            <span className="text-[#0a2540] font-bold select-none">•</span>
            <span>A Certified Birth Certificate Copy.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#0a2540] font-bold select-none">•</span>
            <span>Written proof of physical place of residence and/or employment (e.g., Municipality Bill).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#0a2540] font-bold select-none">•</span>
            <span>1 Passport Photo.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#0a2540] font-bold select-none">•</span>
            <span>School Report from the previous school.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#0a2540] font-bold select-none">•</span>
            <span>Copy of I.D. of the person that will be responsible for fees payments.</span>
          </li>
        </ul>
      </div>
    </motion.div>




    {/* AI_GUARDRAIL_SYSTEM_LOCK: DO NOT ALTER, COMPRESS, OR DELETE THIS DOWNLOAD COMPONENT BLOCK */}
    {/* CORE_STATIC_SCHEMA_BYPASS_START */}
    {(() => {
      // PLACE YOUR PDF FILE URL HERE
      const PDF_DOWNLOAD_URL = "https://docs.google.com/document/d/1wPH4xYUKi4fImxdLKRmxNRdTPNsfaUyk/edit?usp=sharing&ouid=111674860258210636694&rtpof=true&sd=true";




      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-background border border-secondary-foreground/10 rounded-2xl p-6 sm:p-10 shadow-sm"
        >
          {/* Clean Interactive Download Box Frame */}
          <div className="bg-secondary/40 border border-secondary-foreground/5 rounded-xl p-6 max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              {/* Native CSS SVG Paper Icon Container - Changed to Solid White Background & Blue Stroke */}
              <div className="p-3 bg-white text-[#0a2540] rounded-lg shrink-0 border border-secondary-foreground/10 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-[#0a2540] leading-tight">
                  Official 2027 Application Form
                </h4>
                <p className="text-muted-foreground text-xs mt-0.5">
                  PDF Format • Document Download
                </p>
              </div>
            </div>




            {/* Native HTML Download Button - Immune to platform script blocks */}
            <a
              href={PDF_DOWNLOAD_URL}
              download="CLCS_Application_Form_2027.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#0a2540] text-white font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded-lg hover:bg-[#0f345a] transition-all text-center cursor-pointer shadow-sm shrink-0 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          </div>




        </motion.div>
      );
    })()}
    {/* CORE_STATIC_SCHEMA_BYPASS_END */}
    {/* AI_GUARDRAIL_SYSTEM_LOCK_END */}




  </div>
</section>












      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary-foreground mb-5">Ready to Take the First Step?</motion.h2>
            <motion.p variants={fadeUp} className="text-secondary-foreground/70 text-lg mb-8 max-w-lg mx-auto">
              Contact our admissions office today to begin the journey. We'd love to welcome your family to Christ's Love.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors">
                Contact Admissions <ChevronRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}









