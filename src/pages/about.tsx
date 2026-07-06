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
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: '88vh' }}> 
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}> 
          <img 
            src="https://airoapp.ai" 
            alt="Students lined up at Christ's Love Christian School" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} 
            fetchPriority="high" 
            loading="eager" 
          /> 
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/30" /> 
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-24 z-10"> 
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl"> 
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight font-medium tracking-tight mb-6 font-sans" > 
              Christ's Love<br /> <span className="text-primary">Christian School</span> 
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

          {/* View Full Curriculum Link Box */} 
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
            
            {/* Image Block with Gold Framing */} 
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

            {/* Text Content Block */} 
            {/* Text Content Block */} 
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}> 
              
              <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3"> 
                Our Mission 
              </motion.p> 
              
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight font-bold"> 
                Rooted in Faith,<br />Built for Life 
              </motion.h2> 
              
              <motion.p variants={fadeUp} className="text-white/80 text-lg leading-relaxed mb-6"> 
                At Christ's Love Christian School, we believe every child is uniquely created by God with gifts, purpose, and potential. Our mission is to provide an exceptional education that honors Christ in every subject, every interaction, and every moment of the school day. 
              </motion.p> 
              
              <motion.p variants={fadeUp} className="text-white/60 leading-relaxed mb-8"> 
                We partner with families to raise students who are academically prepared, spiritually grounded, and ready to serve their communities with integrity and compassion. 
              </motion.p> 

              {/* Core Values Sub-Grid */} 
              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"> 
                {[ 
                  { icon: BookOpen, label: 'Academic Excellence' }, 
                  { icon: Heart, label: 'Faith Formation' }, 
                  { icon: Star, label: 'Character Development' }, 
                  { icon: Users, label: 'Community & Family' } 
                ].map(({ icon: Icon, label }) => ( 
                  <motion.div key={label} variants={fadeUp} className="flex items-center gap-3"> 
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0"> 
                      <Icon size={16} className="text-primary" /> 
                    </div> 
                    <span className="text-white font-medium text-sm">{label}</span> 
                  </motion.div> 
                ))} 
              </motion.div> 

              {/* Our Story Button Link Call */} 
              <motion.div variants={fadeUp}> 
                <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"> 
                  Our Story <ChevronRight size={18} /> 
                </Link> 
              </motion.div> 
              
            </motion.div> 

          </div> 
        </div> 
      </section> 

      {/* ── COMMUNITY ── */} 
      <section className="py-20 bg-midnight text-white"> 
        <div className="container mx-auto px-4 lg:px-8"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"> 
            
            {/* Text Area Content Layout */} 
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}> 
              
              <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3"> 
                Our Community 
              </motion.p> 
              
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight font-bold"> 
                More Than a School —<br />A Family 
              </motion.h2> 
              
              <motion.p variants={fadeUp} className="text-white/80 text-lg leading-relaxed mb-6"> 
                When you join Christ's Love, you join a community of families who share your values and your vision for your children's future. From chapel mornings to school events, we grow together. 
              </motion.p> 
              
              <motion.p variants={fadeUp} className="text-white/70 leading-relaxed mb-8"> 
                Our small class sizes mean every student is known by name, celebrated for their strengths, and supported through every challenge. This is what Christian education looks like. 
              </motion.p> 
              
              <div className="flex flex-wrap gap-4"> 
                <Link to="/admissions" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"> 
                  Start Your Application <ChevronRight size={18} /> 
                </Link> 
              </div> 
              
            </motion.div> 

            {/* Image Grid with Offset Framing */} 
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, ease: 'easeOut' }} 
              className="relative" 
            > 
              <img 
                src="/airo-assets/images/pages/home/students-enjoying-community-time-at-chri-2" 
                alt="Students enjoying community time at Christ's Love Christian School" 
                className="w-full h-[440px] object-cover rounded-lg shadow-lg" 
                loading="lazy" 
                width={900} 
                height={440} 
              /> 
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/40 rounded-lg -z-10" /> 
            </motion.div> 
            
          </div> 
        </div> 
      </section>

      {/* ── ACHIEVEMENTS ── */} 
      <section className="py-20 bg-secondary text-white w-full border-t border-white/5"> 
        <div className="container mx-auto px-4 lg:px-8"> 
          
          <div className="text-center max-w-3xl mx-auto mb-16"> 
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mb-4">Our Recent Achievements</h2> 
            <p className="text-white/80 text-lg">Celebrating the milestones, academic triumphs, and sports victories of our outstanding students.</p> 
          </div> 
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"> 
              <h3 className="text-xl font-bold text-white mb-2">Academic Excellence</h3> 
              <p className="text-white/70 text-sm">Achieving top ranks in regional mathematics and language curriculum indices.</p> 
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
                  We welcome families who share our commitment to faith, learning, and community. Spaces are limited — apply today to secure your child's place. 
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

              {/* Decorative side */} 
              <div className="hidden lg:flex items-center justify-center p-16 bg-white/5 backdrop-blur-sm border-l border-white/5"> 
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
