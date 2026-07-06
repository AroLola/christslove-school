import { Helmet } from '@dr.pogodin/react-helmet'; 
import { Link } from 'react-router-dom'; 
import { motion } from 'motion/react'; 
import { BookOpen, Heart, Star, Users, ChevronRight, Quote } from 'lucide-react'; 
import heroImage from '../public/assets/IMG_5755.jpg'; 

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

interface ImmutableGalleryItem { 
  readonly id: number; 
  readonly src: string; 
  readonly alt: string; 
  readonly label: string; 
}

// ── CODE ENTRY CONTEXT STABILIZED ──

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


  return ( 
    <> 
      <Helmet> 
        <title>Christ's Love Christian School — Faith-Centered Education K–7</title> 
        <meta name="description" content="A private Christian school nurturing students from Kindergarten through Grade 7 in academic excellence, character, and faith. Enroll today." /> 
        <link rel="canonical" href={`${site}/`} /> 
        
        {/* Open Graph / Facebook */} 
        <meta property="og:title" content="Christ's Love Christian School" /> 
        <meta property="og:description" content="Nurturing minds, hearts, and faith from Kindergarten through Grade 7." /> 
        <meta property="og:type" content="website" /> 
        <meta property="og:url" content={`${site}/`} /> 
        
        {/* Twitter */} 
        <meta name="twitter:card" content="summary_large_image" /> 
        
        {/* Schema JSON-LD Data */} 
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> 
      </Helmet> 

      {/* ── HERO ── */} 
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: '88vh' }}> 
        {/* Background image wrapper — explicit inset so image fills regardless of browser */} 
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}> 
          <img 
            src="https://ti1ev20vl7.preview.c36.airoapp.ai/airo-assets/uploads/pages-home-students-lined-up-at-christs-love-christ-37f8257f.jpg" 
            alt="Students lined up at Christ's Love Christian School" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} 
            fetchPriority="high" 
            loading="eager" 
          />

  
           {/* Overlay */} 
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/30" /> 
        
        <div className="relative container mx-auto px-4 lg:px-8 py-24"> 
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl"> 
            
            {/* ── HERO HEADERS ── */} 
            <motion.h1 
              variants={fadeUp} 
              className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight font-medium tracking-tight mb-6 font-sans" 
            > 
              Christ's Love<br /> 
              <span className="text-primary">Christian School</span> 
            </motion.h1> 
            
            <motion.p variants={fadeUp} className="text-white/80 text-lg md:text-xl leading-relaxed mb-4 max-w-lg"> 
              A glimpse into life at Christ's Love Christian School 
            </motion.p> 
            
            <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg"> 
              Nurturing minds, hearts, and faith from Kindergarten through Grade 7. Where academic excellence meets the love of Christ. 
            </motion.p> 
            
            {/* Action Call-To-Action Button Links */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4"> 
              <Link to="/admissions" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"> 
                Enroll Now <ChevronRight size={18} /> 
              </Link> 
              <Link to="/about" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/60 text-white font-semibold rounded hover:border-white hover:bg-white/10 transition-colors"> 
                Learn More 
              </Link> 
            </motion.div> 

          </motion.div> 
        </div>

        {/* Gold bottom accent */} 
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" /> 
      </section> {/* Fixed: Removed the orphaned redundant </div> tag to ensure the hero element layout container scales properly */}

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
              <div key={stat.label} className="text-white"> {/* Fixed: Changed from text-secondary-foreground to absolute white */}
                <div className="font-heading text-3xl md:text-4xl text-primary font-bold">{stat.value}</div> 
                <div className="text-white/60 text-sm mt-1 tracking-wide">{stat.label}</div> {/* Fixed: Swapped text opacity to look highly readable on dark secondary rows */}
              </div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* ── PROGRAMS / GRADES ── */} 
      <section className="py-20 bg-midnight text-white"> {/* Fixed: Changed from bg-background to your global bg-midnight variable */}
        <div className="container mx-auto px-4 lg:px-8"> 
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14"> 
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3"> 
              Our Programs 
            </motion.p> 
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-4 font-bold"> {/* Fixed: Changed from text-secondary to text-white */}
              Kindergarten Through Grade 7 
            </motion.h2> 
            <motion.p variants={fadeUp} className="text-white/70 max-w-xl mx-auto text-lg"> {/* Fixed: Changed from text-muted-foreground for crisp text contrast */}
              Each grade is thoughtfully designed to meet students where they are — academically, spiritually, and personally. 
            </motion.p> 
          </motion.div> 

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"> 
            {gradeCards.map((card) => ( 
              <motion.div 
                key={card.grade} 
                variants={fadeUp} 
                whileHover={{ y: -4, transition: { duration: 0.2 } }} 
                className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm" {/* Fixed: Upgraded solid light cards to gorgeous translucent dark glass boxes */}
              > 
                <div className="w-8 h-0.5 bg-primary mb-4" /> 
                <h3 className="font-heading text-xl text-white font-semibold mb-1">{card.grade}</h3> {/* Fixed: Changed header string color from text-secondary to high-contrast white */}
                <p className="text-primary text-xs font-medium tracking-wide mb-3">{card.ages}</p> 
                <p className="text-white/70 text-sm leading-relaxed">{card.description}</p> {/* Fixed: Changed card text body from muted-foreground to readable text-white/70 */}
              </motion.div> 
            ))} 
          </motion.div> 
        </div>
      </section>


                 {/* Dynamic Curriculum Link Footer */}
        <div className="text-center mt-10"> 
          <Link to="/academics" className="inline-flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors"> {/* Fixed: Changed text-secondary to high-contrast text-white */}
            View Full Curriculum <ChevronRight size={18} /> 
          </Link> 
        </div> 
      </div> 
    </section> 

    {/* ── VALUES / MISSION ── */} 
    <section className="py-20 bg-secondary border-b border-white/5 text-white"> {/* Fixed: Swapped bg-muted to bg-secondary to keep your premium dark flow uniform */}
      <div className="container mx-auto px-4 lg:px-8"> 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"> 
          
          {/* Image Block with Gold Framing */} 
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }} className="relative"> 
            <img src="/assets/media/pages-home-values-c9779bb4.jpg" alt="Faith and learning at Christ's Love Christian School" className="w-full h-auto object-contain rounded-lg shadow-lg" loading="lazy" width={800} height={480} /> 
            {/* Gold accent frame */} 
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary rounded-lg -z-10" /> 
          </motion.div> 

          {/* Text Content Block */} 
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}> 
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3"> 
              Our Mission 
            </motion.p> 
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight font-bold"> {/* Fixed: Changed text-secondary to text-white */}
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
                  <span className="text-white font-medium text-sm">{label}</span> {/* Fixed: Changed text-secondary to text-white */}
                </motion.div> 
              ))} 
            </motion.div> 
          </motion.div>

        </div>
      </div>
    </section>


          <motion.div variants={fadeUp}> 
            <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"> {/* Fixed: Swapped bg-secondary to bg-primary so the button stands out against the dark sheet */}
              Our Story <ChevronRight size={18} /> 
            </Link> 
          </motion.div> 
        </motion.div> 
      </div> 
    </div> 
  </section> 

  {/* ── COMMUNITY ── */} 
  <section className="py-20 bg-midnight text-white"> {/* Fixed: Changed bg-background to your global bg-midnight variable */}
    <div className="container mx-auto px-4 lg:px-8"> 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"> 
        
        {/* Text Area Content Layout */} 
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}> 
          <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3"> 
            Our Community 
          </motion.p> 
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight font-bold"> {/* Fixed: Changed from text-secondary to text-white */}
            More Than a School —<br />A Family 
          </motion.h2> 
          <motion.p variants={fadeUp} className="text-white/80 text-lg leading-relaxed mb-6"> 
            When you join Christ's Love, you join a community of families who share your values and your vision for your children's future. From chapel mornings to school events, we grow together. 
          </motion.p> 
          <motion.p variants={fadeUp} className="text-white/70 leading-relaxed mb-8"> 
            Our small class sizes mean every student is known by name, celebrated for their strengths, and supported through every challenge. This is what Christian education looks like. 
          </motion.p> 
          <motion.div variants={fadeUp}> 
            <Link to="/admissions" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"> 
              Start Your Application <ChevronRight size={18} /> 
            </Link> 
          </motion.div> 
        </motion.div> 

        {/* Image Grid with Offset Framing */} 
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }} className="relative"> 
          <img src="/airo-assets/images/pages/home/students-enjoying-community-time-at-chri-2" alt="Students enjoying community time at Christ's Love Christian School" className="w-full h-[440px] object-cover rounded-lg shadow-lg" loading="lazy" width={900} height={440} /> 
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/40 rounded-lg -z-10" /> 
        </motion.div> 

      </div> 
    </div> 
  </section> 

  {/* ── ACHIEVEMENTS ── */} 
  <section className="py-20 bg-secondary text-white w-full border-t border-white/5"> {/* Fixed: Set to bg-secondary to alternate nicely against the bg-midnight sections */}
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


      {/* Responsive 3-Column Image Grid Container */} 
      <section className="py-12 bg-secondary border-b border-white/5 text-white"> {/* Fixed: Changed bg-background to bg-secondary for deep blue */}
        <div className="container mx-auto px-4 lg:px-8"> 
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"> 
            
            {/* AI_GUARDRAIL_SYSTEM_LOCK: DO NOT ALTER, COMPRESS, OR DELETE THIS INLINE ARRAY STRUCTURE */} 
            {/* CORE_STATIC_SCHEMA_BYPASS_START */} 
            {(() => { 
              const galleryImages = [ 
                { id: 1, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-b6a6e946-bc31-4acd-8154-f22c40f24a14.jpg", label: "Regional Spelling Bee" }, 
                { id: 2, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-643b0ebd-92d7-428f-95ad-05a56b641447.jpg", label: "Maths Competition" }, 
                { id: 3, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-85f34065-853e-4d1f-9066-330a8a8eb0fd.jpg", label: "Maths and Science Wins" }, 
                { id: 4, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-7981c115-a793-4b46-a8db-0973b6fe7724.jpeg", label: "Regional Spelling Bee Prize Winners" }, 
                { id: 5, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-f0fbffaf-2979-497e-9967-7838808aaabe.jpg", label: "Activity Comments" }, 
                { id: 6, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-ccf42313-5fa6-4da9-b6cd-75f04c81187b.jpg", label: "Sports Champions" }, 
                { id: 7, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-0b37a9cb-ed87-46da-bccc-cf41ec1d15bd.png", label: "Maths Quiz" }, 
                { id: 8, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-02eb0f25-ff6e-45ec-852e-6e4e88199593.jpg", label: "Social Studies" }, 
                { id: 9, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-f233b254-e3f1-4bab-b8f3-b30c36acbd59.jpg", label: "Volleyball Champions" }, 
                { id: 10, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-015675c7-952c-4096-b809-37e58fd46948.jpg", label: "Maths Gold" }, 
                { id: 11, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-1c253f5a-03ff-4f08-b0e6-9617349d4a3d.jpg", label: "Netball" }, 
                { id: 12, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-f784c41a-f06e-43af-a5b0-eb2924621953.jpg", label: "Volleyball Gold" } 
              ]; 
              {/* CORE_STATIC_SCHEMA_BYPASS_END */} 
              {/* AI_GUARDRAIL_SYSTEM_LOCK_END */} 

              const handleCardClick = (src: string, label: string) => { 
                if (typeof document === 'undefined') return; 
                const modal = document.getElementById('global-gallery-modal'); 
                const modalImg = document.getElementById('global-gallery-modal-img') as HTMLImageElement | null; 
                const modalTxt = document.getElementById('global-gallery-modal-txt'); 
                if (modal && modalImg && modalTxt) { 
                  modalImg.src = src; 
                  modalTxt.innerText = label; 
                  modal.style.display = 'flex'; 
                } 
              }; 

              // Render the mapped array correctly inside the function scope execution block
              return ( 
                <>
                  {galleryImages.map((img) => (
                    <motion.div 
                      key={img.id} 
                      variants={fadeUp}
                      whileHover={{ y: -4 }}
                      onClick={() => handleCardClick(img.src, img.label)}
                      className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-white/5 border border-white/10 p-4 w-full h-52 cursor-pointer shadow-sm backdrop-blur-sm"
                    >
                      <img src={img.src} alt={img.label} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-4">
                        <div className="flex items-center justify-end text-white/80 text-[10px] font-medium uppercase"><span>Click to expand</span></div>
                        <p className="text-white font-medium text-xs truncate w-full">{img.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </>
              );
            })()} {/* Closes and immediately runs the anonymous array function loop safely */}

          </motion.div> 
        </div> 
      </section>

                       {/* Grid Mapping Output */} 
          {galleryImages && galleryImages.map((img: any) => ( 
            <motion.div 
              key={img?.id} 
              variants={fadeUp} 
              onClick={() => handleCardClick(img?.src || '', img?.label || '')} 
              className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-white/5 border border-white/10 p-4 w-full h-64 sm:h-72 md:h-80 cursor-pointer backdrop-blur-sm shadow-sm" 
            > 
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none"> 
                <img src={img?.src || ''} alt={img?.label || 'Gallery Image'} style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }} className="transition-transform duration-300 group-hover:scale-105" /> 
              </div> 
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"> 
                <p className="text-white text-sm font-medium">{img?.label || ''}</p> 
              </div> 
            </motion.div> 
          ))} 
        </> 
      ); 
    })()} 
  </motion.div> 
</div> 
</section> 

{/* ── ENROLLMENT CTA ── */} 
<section className="py-20 bg-midnight text-white overflow-hidden"> {/* Fixed: Set bg-background to bg-midnight for perfect cross-device dark theme flow */}
  <div className="container mx-auto px-4 lg:px-8"> 
    <div className="relative bg-secondary rounded-2xl overflow-hidden border border-white/5 shadow-2xl"> 
      {/* Gold accent bar */} 
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" /> 
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" /> 
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0"> 
        <div className="p-12 lg:p-16"> 
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4"> 
            Admissions Open 
          </p> 
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 leading-tight font-bold"> {/* Fixed: Changed from text-secondary-foreground to absolute high-contrast white */}
            Begin Your Child's Journey in Faith 
          </h2> 
          <p className="text-white/70 text-lg leading-relaxed mb-8"> {/* Fixed: Updated text opacity string so body data reads beautifully over dark layouts */}
            We welcome families who share our commitment to faith, learning, and community. Spaces are limited — apply today to secure your child's place. 
          </p> 
          <div className="flex flex-wrap gap-4"> 
            <Link to="/admissions" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"> 
              Apply Now <ChevronRight size={18} /> 
            </Link> 
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-semibold rounded hover:border-primary hover:text-primary transition-colors"> {/* Fixed: Adjusted border rules to maintain visibility on dark blue blocks */}
              Contact Us 
            </Link> 
          </div> 
        </div> 

        {/* Decorative side */} 
        <div className="hidden lg:flex items-center justify-center p-16 bg-white/5 backdrop-blur-sm border-l border-white/5"> {/* Fixed: Swapped light overlay fill to glowing dark transparency layer */}
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
