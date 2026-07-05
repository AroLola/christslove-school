import { Helmet } from '@dr.pogodin/react-helmet'; 
import { Link } from 'react-router-dom'; 
import { motion } from 'motion/react'; 
import { ChevronRight, CheckCircle, FileText, Users, Calendar } from 'lucide-react'; 

const fadeUp = { 
  hidden: { opacity: 0, y: 28 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }, 
}; 

const stagger = { 
  hidden: {}, 
  visible: { transition: { staggerChildren: 0.1 } } 
}; 

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

  // Self-contained browser-native click tracking events 
  const handleFlyerClick = (src: any, label: any) => { 
    if (typeof document === 'undefined') return; 
    const modal = document.getElementById('tab-flyer-modal'); 
    const modalImg = document.getElementById('tab-flyer-modal-img') as any; 
    const modalTxt = document.getElementById('tab-flyer-modal-txt'); 
    
    if (modal && modalImg && modalTxt) { 
      modalImg.src = src; 
      modalTxt.innerText = label; 
      modal.style.display = 'flex'; 
    } 
  };

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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14" > 
            <motion.p variants={fadeUp} className="text-primary font-bold tracking-widest uppercase text-base sm:text-lg mb-3"> Enrol Now! </motion.p> 
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-[#0a2540] mb-4"> 2027 APPLICATIONS INTAKE </motion.h2> 
            <motion.div variants={fadeUp} className="w-16 h-1 bg-primary mx-auto rounded-full opacity-60"></motion.div> 
          </motion.div>

          {/* Responsive 2-Column Flyer Grid Container */} 
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full" > 
            {(() => { 
              const schoolFlyers = [ 
                { id: 1, src: "https://airoapp.ai", label: "2027 Admission Open" }, 
                { id: 2, src: "https://airoapp.ai", label: "2027 Admission & Enrollment Requirements" } 
              ]; 

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full col-span-full">
                  {schoolFlyers.map((flyer: any) => ( 
                    <motion.div key={flyer?.id} variants={fadeUp} onClick={() => handleFlyerClick(flyer?.src || '', flyer?.label || '')} className="group relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-secondary border border-secondary-foreground/10 p-4 w-full h-[450px] sm:h-[500px] md:h-[550px] cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300" > 
                      <div className="relative w-full h-full flex items-center justify-center pointer-events-none"> 
                        <img src={flyer?.src || ''} alt={flyer?.label || 'School Flyer'} style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }} className="transition-transform duration-300 group-hover:scale-[1.02]" /> 
                      </div> 
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
                </div>
              );
            })()} 
          </motion.div>
        </div> 
      </section>

      {/* Dedicated Tab Lightbox Frame */} 
      <div id="tab-flyer-modal" onClick={() => { const modal = document.getElementById('tab-flyer-modal'); if (modal) modal.style.display = 'none'; }} className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out select-none" style={{ display: 'none', backdropFilter: 'blur(8px)' }} > 
        <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center pointer-events-none"> 
          <img id="tab-flyer-modal-img" src="" alt="Expanded Flyer view" className="max-w-full max-h-[75vh] object-contain rounded-md" /> 
          <p id="tab-flyer-modal-txt" className="text-white font-heading text-lg font-semibold tracking-wide text-center mt-6 px-6 py-2 bg-white/5 border border-white/10 rounded-full"></p> 
        </div> 
        <button onClick={(e) => { e.stopPropagation(); const modal = document.getElementById('tab-flyer-modal'); if (modal) modal.style.display = 'none'; }} className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-11 h-11 flex items-center justify-center rounded-full font-semibold cursor-pointer transition-all border border-white/5 text-lg" > &#x2715; </button> 
      </div>

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
