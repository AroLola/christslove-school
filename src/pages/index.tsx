import { Helmet } from '@dr.pogodin/react-helmet'; 
import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 
import { BookOpen, Heart, Star, Users, ChevronRight } from 'lucide-react'; 

const fadeUp = { 
  hidden: { opacity: 0, y: 28 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } } 
}; 

const stagger = { 
  hidden: {}, 
  visible: { transition: { staggerChildren: 0.1 } } 
}; 

const site = 'https://christslovechristianschool.info'; 

const gradeCards = [ 
  { grade: 'Kindergarten', ages: 'Ages 5–6', description: 'A joyful introduction to learning through play, faith, and foundational skills in reading and numeracy.' }, 
  { grade: 'Grade 1', ages: 'Ages 6–7', description: 'Building confidence in reading, writing, and mathematics within a nurturing Christian environment.' }, 
  { grade: 'Grade 2', ages: 'Ages 7–8', description: 'Deepening literacy and numeracy skills while exploring God\'s world through science and social studies.' }, 
  { grade: 'Grade 3', ages: 'Ages 8–9', description: 'Expanding critical thinking, creative writing, and a growing understanding of biblical principles.' }, 
  { grade: 'Grade 4', ages: 'Ages 9–10', description: 'Strengthening academic foundations with increased independence and character development.' }, 
  { grade: 'Grade 5', ages: 'Ages 10–11', description: 'Preparing students for upper grades with rigorous academics and leadership opportunities.' }, 
  { grade: 'Grade 6', ages: 'Ages 11–12', description: 'A bridge to junior high — challenging curriculum, mentorship, and faith-centered community.' }, 
  { grade: 'Grade 7', ages: 'Ages 12–13', description: 'Our senior class: equipped academically, spiritually, and socially for the journey ahead.' } 
]; 

export default function HomePage() { 
  const jsonLd = { 
    '@context': 'https://schema.org', 
    '@graph': [ 
      { '@type': 'WebSite', '@id': `${site}/#website`, name: "Christ's Love Christian School", url: `${site}/` }, 
      { '@type': 'EducationalOrganization', '@id': `${site}/#organization`, name: "Christ's Love Christian School", url: `${site}/`, description: 'Private Christian school offering Kindergarten through Grade 7 education rooted in faith and academic excellence.' }, 
      { '@type': 'WebPage', '@id': `${site}/#webpage`, url: `${site}/`, name: "Christ's Love Christian School — Faith-Centered Education K–7", isPartOf: { '@id': `${site}/#website` }, about: { '@id': `${site}/#organization` }, datePublished: '2026-06-16', dateModified: '2026-06-16' } 
    ] 
  }; 

  return ( 
    <> 
      <Helmet> 
        <title>Christ's Love Christian School — Faith-Centered Education K–7</title> 
        <meta name="description" content="A private Christian school nurturing students from Kindergarten through Grade 7 in academic excellence, character, and faith. Enroll today." /> 
        <link rel="canonical" href={`${site}/`} /> 
        <meta property="og:title" content="Christ's Love Christian School" /> 
        <meta property="og:description" content="Nurturing minds, hearts, and faith from Kindergarten through Grade 7." /> 
        <meta property="og:type" content="website" /> 
        <meta property="og:url" content={`${site}/`} /> 
        <meta name="twitter:card" content="summary_large_image" /> 
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> 
      </Helmet> 

      {/* ── HERO ── */} 
      <section className="relative flex items-center overflow-hidden bg-midnight" style={{ minHeight: '88vh' }}> 
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}> 
          <img 
            src="/airo-assets/uploads/pages-home-students-lined-up-at-christs-love-christ-37f8257f.jpg" 
            alt="Students lined up at Christ's Love Christian School" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} 
            fetchPriority="high" 
            loading="eager" 
          /> 
        </div> 
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent" /> 

        <div className="relative container mx-auto px-4 lg:px-8 py-24 z-10"> 
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl"> 
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4"> 
              Private Christian Education 
            </p> 

            <motion.h1 
              variants={fadeUp} 
              className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 font-sans tracking-wide" 
              style={{ fontWeight: 200 }}
            > 
              Christ's Love<br /> 
              <span className="text-primary" style={{ fontWeight: 300 }}>Christian School</span> 
            </motion.h1> 

            <motion.p variants={fadeUp} className="text-white/80 text-lg md:text-xl leading-relaxed mb-4 max-w-lg"> 
              A glimpse into life at Christ's Love Christian School 
            </motion.p> 
            <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg"> 
              Nurturing minds, hearts, and faith from Kindergarten through Grade 7. Where academic excellence meets the love of Christ. 
            </motion.p> 
            <div className="flex flex-wrap gap-4"> 
              <Link to="/admissions" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"> 
                Enroll Now <ChevronRight size={18} /> 
              </Link> 
              <Link to="/about" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/60 text-white font-semibold rounded hover:border-white hover:bg-white/10 transition-colors"> 
                Learn More 
              </Link> 
            </div> 
          </motion.div> 
        </div> 
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" /> 
      </section> 

      {/* ── QUICK STATS ── */} 
      <section className="bg-secondary py-10 border-b border-white/5"> 
        <div className="container mx-auto px-4 lg:px-8"> 
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"> 
            {[ 
              { value: 'K–7', label: 'Grade Levels' }, 
              { value: '10+', label: 'Years of Excellence' }, 
              { value: '100%', label: 'Faith-Centered' }, 
              { value: 'Small', label: 'Class Sizes' } 
            ].map((stat) => ( 
              <div key={stat.label} className="text-white"> 
                <div className="font-heading text-3xl md:text-4xl text-primary font-bold">{stat.value}</div> 
                <div className="text-white/60 text-sm mt-1 tracking-wide">{stat.label}</div> 
              </div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* ── PROGRAMS / GRADES ── */} 
      <section className="py-20 bg-midnight text-white"> 
        <div className="container mx-auto px-4 lg:px-8"> 
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14"> 
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3"> Our Programs </motion.p> 
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-4 font-bold"> Kindergarten Through Grade 7 </motion.h2> 
            <motion.p variants={fadeUp} className="text-white/70 max-w-xl mx-auto text-lg"> Each grade is thoughtfully designed to meet students where they are — academically, spiritually, and personally. </motion.p> 
          </motion.div> 
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"> 
            {gradeCards.map((card) => ( 
              <motion.div key={card.grade} variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm" > 
                <div className="w-8 h-0.5 bg-primary mb-4" /> 
                <h3 className="font-heading text-xl text-white font-semibold mb-1">{card.grade}</h3> 
                <p className="text-primary text-xs font-medium tracking-wide mb-3">{card.ages}</p> 
                <p className="text-white/70 text-sm leading-relaxed">{card.description}</p> 
              </motion.div> 
            ))} 
          </motion.div> 

          <div className="text-center mt-10"> 
            <Link to="/academics" className="inline-flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors"> 
              View Full Curriculum <ChevronRight size={18} /> 
            </Link> 
          </div> 
        </div> 
      </section> 

           {/* ── VALUES / MISSION ── */} 
      <section className="py-20 bg-secondary border-b border-white/5 text-white"> 
        <div className="container mx-auto px-4 lg:px-8"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"> 
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, ease: 'easeOut' }} 
              className="relative" 
            > 
              <img 
                src="/assets/media/pages-home-values-c9779bb4.jpg" 
                alt="Faith and learning at Christ's Love Christian School" 
                className="w-full h-auto object-contain rounded-lg shadow-lg" 
                loading="lazy" 
                width={800} 
                height={480} 
              /> 
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary rounded-lg -z-10" /> 
            </motion.div> 

            <div className="flex flex-col justify-center"> 
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3"> 
                Our Mission 
              </p> 
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight font-bold"> 
                Rooted in Faith,<br />Built for Life 
              </h2> 
              <p className="text-white/80 text-lg leading-relaxed mb-6"> 
                At Christ's Love Christian School, we believe every child is uniquely created by God with gifts, purpose, and potential. Our mission is to provide an exceptional education that honors Christ in every subject, every interaction, and every moment of the school day. 
              </p> 
              <p className="text-white/60 leading-relaxed mb-8"> 
                We partner with families to raise students who are academically prepared, spiritually grounded, and ready to serve their communities with integrity and compassion. 
              </p> 

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"> 
                {[ 
                  { icon: BookOpen, label: 'Academic Excellence' }, 
                  { icon: Heart, label: 'Faith Formation' }, 
                  { icon: Star, label: 'Character Development' }, 
                  { icon: Users, label: 'Community & Family' } 
                ].map((val) => {
                  const Icon = val.icon;
                  return (
                    <div key={val.label} className="flex items-center gap-3"> 
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0"> 
                        <Icon size={16} className="text-primary" /> 
                      </div> 
                      <span className="text-white font-medium text-sm">{val.label}</span> 
                    </div> 
                  );
                })} 
              </div> 

              <div> 
                <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"> 
                  Our Story <ChevronRight size={18} /> 
                </Link> 
              </div> 
            </div> 
          </div> 
        </div> 
      </section> 

      {/* ── COMMUNITY ── */} 
      <section className="py-20 bg-midnight text-white"> 
        <div className="container mx-auto px-4 lg:px-8"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"> 
            <div className="flex flex-col justify-center"> 
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3"> 
                Our Community 
              </p> 
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight font-bold"> 
                More Than a School —<br />A Family 
              </h2> 
              <p className="text-white/80 text-lg leading-relaxed mb-6"> 
                When you join Christ's Love, you join a community of families who share your values and your vision for your children's future. From chapel mornings to school events, we grow together. 
              </p> 
              <p className="text-white/70 leading-relaxed mb-8"> 
                Our small class sizes mean every student is known by name, celebrated for their strengths, and supported through every challenge. This is what Christian education looks like. 
              </p> 
              <div className="flex flex-wrap gap-4"> 
                <Link to="/admissions" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"> 
                  Start Your Application <ChevronRight size={18} /> 
                </Link> 
              </div> 
            </div> 

            <div className="relative"> 
              <img 
                src="/airo-assets/images/pages/home/students-enjoying-community-time-at-chri-2" 
                alt="Students enjoying community time at Christ's Love Christian School" 
                className="w-full h-[440px] object-cover rounded-lg shadow-lg" 
                loading="lazy" 
                width={900} 
                height={440} 
              /> 
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/40 rounded-lg -z-10" /> 
            </div> 
          </div> 
        </div> 
      </section>

           {/* ── ACHIEVEMENTS & AWARDS ── */} 
      <section className="py-20 bg-secondary border-t border-white/5 text-white"> 
        <div className="container mx-auto px-4 lg:px-8"> 
          
          <div className="text-center mb-14" > 
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3"> 
              Student Achievements 
            </p> 
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold uppercase tracking-wide"> 
              AWARDS 
            </h2> 
          </div> 

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full" > 
            {galleryImages.map((img) => ( 
              <div 
                key={img.id} 
                onClick={() => handleCardClick(img.src, img.label)} 
                className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-midnight/80 border border-white/10 p-4 w-full h-64 sm:h-72 md:h-80 cursor-pointer shadow-md" 
              > 
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none"> 
                  <img src={img.src} alt={img.label} style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }} className="transition-transform duration-300 group-hover:scale-105" /> 
                </div> 
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none"> 
                  <div className="flex items-center justify-end w-full text-white/80 text-[10px] font-medium uppercase tracking-wider"> 
                    <span>Click to expand</span> 
                  </div> 
                  <p className="text-white font-medium text-sm truncate w-full transform translate-y-1 transition-transform duration-300 group-hover:translate-y-0"> 
                    {img.label} 
                  </p> 
                </div> 
              </div> 
            ))} 

            <div 
              id="global-gallery-modal" 
              onClick={() => { 
                const modal = document.getElementById('global-gallery-modal'); 
                if (modal) modal.style.display = 'none'; 
              }} 
              className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out select-none" 
              style={{ display: 'none', backdropFilter: 'blur(8px)' }} 
            > 
              <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center pointer-events-none"> 
                <img id="global-gallery-modal-img" src="" alt="Expanded view" className="max-w-full max-h-[75vh] object-contain rounded-md" /> 
                <p id="global-gallery-modal-txt" className="text-white font-heading text-lg font-semibold tracking-wide text-center mt-6 px-6 py-2 bg-white/5 border border-white/10 rounded-full"></p> 
              </div> 
              <button 
                onClick={() => { 
                  const modal = document.getElementById('global-gallery-modal'); 
                  if (modal) modal.style.display = 'none'; 
                }} 
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-11 h-11 flex items-center justify-center rounded-full font-semibold cursor-pointer transition-all border border-white/5 text-lg" 
              > 
                &#x2715; 
              </button> 
            </div> 
          </div> 
        </div> 
      </section> 


      {/* ── ENROLLMENT CTA ── */} 
      <section className="py-20 bg-midnight text-white overflow-hidden"> 
        <div className="container mx-auto px-4 lg:px-8"> 
          <div className="relative bg-secondary rounded-2xl overflow-hidden border border-white/5 shadow-2xl"> 
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" /> 
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" /> 
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0"> 
              <div className="p-12 lg:p-16"> 
                <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4"> 
                  Admissions Open 
                </p> 
                <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight font-bold"> 
                  Begin Your Child's Journey in Faith 
                </h2> 
                <p className="text-white/70 text-lg leading-relaxed mb-8"> 
                  Start your child's journey with CLCS. Partner with us to build a strong spiritual and academic foundation. Spaces are limited — apply today to secure your child's place. 
                </p> 
                <div className="flex flex-wrap gap-4"> 
                  <Link to="/admissions" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"> 
                    Apply Now <ChevronRight size={18} /> 
                  </Link> 
                  <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-semibold rounded hover:border-primary hover:text-primary transition-colors"> 
                    Contact Us 
                  </Link> 
                </div> 
              </div> 

              <div className="hidden lg:flex items-center justify-center p-16 bg-white/12 backdrop-blur-md border-l border-primary"> 
                <div className="text-center"> 
                  <div className="font-heading text-8xl text-primary/20 font-bold leading-none mb-2">K–7</div> 
                  <p className="text-white/50 text-sm tracking-widest uppercase">Kindergarten through Grade 7</p> 
                  <div className="mt-6 w-16 h-0.5 bg-primary mx-auto" /> 
                  <p className="mt-4 text-white/40 text-xs italic">"Train up a child in the way he should go…"</p> 
                  <p className="text-primary/60 text-xs">Proverbs 22:6</p> 
                </div> 
              </div> 
            </div> 

          </div> 
        </div> 
      </section> 
    </> 
  ); 
}

