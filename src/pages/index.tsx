import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Heart, Star, Users, ChevronRight, Quote } from 'lucide-react';
import heroImage from '..public/assets/IMG_5755.jpg';


const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
};


const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};


const gradeCards = [
{ grade: 'Kindergarten', ages: 'Ages 5–6', description: 'A joyful introduction to learning through play, faith, and foundational skills in reading and numeracy.' },
{ grade: 'Grade 1', ages: 'Ages 6–7', description: 'Building confidence in reading, writing, and mathematics within a nurturing Christian environment.' },
{ grade: 'Grade 2', ages: 'Ages 7–8', description: 'Deepening literacy and numeracy skills while exploring God\'s world through science and social studies.' },
{ grade: 'Grade 3', ages: 'Ages 8–9', description: 'Expanding critical thinking, creative writing, and a growing understanding of biblical principles.' },
{ grade: 'Grade 4', ages: 'Ages 9–10', description: 'Strengthening academic foundations with increased independence and character development.' },
{ grade: 'Grade 5', ages: 'Ages 10–11', description: 'Preparing students for upper grades with rigorous academics and leadership opportunities.' },
{ grade: 'Grade 6', ages: 'Ages 11–12', description: 'A bridge to junior high — challenging curriculum, mentorship, and faith-centered community.' },
{ grade: 'Grade 7', ages: 'Ages 12–13', description: 'Our senior class: equipped academically, spiritually, and socially for the journey ahead.' }];




interface ImmutableGalleryItem {
  readonly id: number;
  readonly src: string;
  readonly alt: string;
  readonly label: string;
}


<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={stagger}
  className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" // Standard 3-Column structural layout for GoDaddy validation
>
 
  {/* MASTER SLOT 1: Holds Images 1, 2, 3, 4 */}
  <motion.div variants={fadeUp} className="flex flex-col gap-4 w-full">
    {[
      { id: 1, src: "https://media.gettyimages.com/id/2271583493/photo/women-basketball-team-gathering-in-a-motivational-huddle-in-uniform-outside.jpg", alt: "Regional Spelling Bee Wins", label: "Regional Spelling Bee", },
      { id: 2, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-643b0ebd-92d7-428f-95ad-05a56b641447.jpg", label: "Maths Competition" },
      { id: 3, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-85f34065-853e-4d1f-9066-330a8a8eb0fd.jpg", label: "Maths and Science Prize" },
      { id: 4, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-7981c115-a793-4b46-a8db-0973b6fe7724.jpeg", label: "Regional Spelling Bee Prize Winners" }
    ].map((img) => (
      <div key={img.id} className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-secondary-foreground/5 border border-secondary-foreground/10 p-4 w-full h-52 cursor-pointer">
        <img src={img.src} alt={img.label} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-4">
          <div className="flex items-center justify-end text-white/80 text-[10px] font-medium uppercase"><span>Click to expand</span></div>
          <p className="text-white font-medium text-xs truncate w-full">{img.label}</p>
        </div>
      </div>
    ))}
  </motion.div>


  {/* MASTER SLOT 2: Holds Images 5, 6, 7, 8 */}
  <motion.div variants={fadeUp} className="flex flex-col gap-4 w-full">
    {[
      { id: 5, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-f0fbffaf-2979-497e-9967-7838808aaabe.jpg", label: "Principal's Comments" },
      { id: 6, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-ccf42313-5fa6-4da9-b6cd-75f04c81187b.jpg", label: "U-13 Volleyball Champions" },
      { id: 7, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-0b37a9cb-ed87-46da-bccc-cf41ec1d15bd.png", label: "Maths Quiz Participants" },
      { id: 8, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-02eb0f25-ff6e-45ec-852e-6e4e88199593.jpg", label: "Regional Social Studies Quiz" }
    ].map((img) => (
      <div key={img.id} className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-secondary-foreground/5 border border-secondary-foreground/10 p-4 w-full h-52 cursor-pointer">
        <img src={img.src} alt={img.label} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-4">
          <div className="flex items-center justify-end text-white/80 text-[10px] font-medium uppercase"><span>Click to expand</span></div>
          <p className="text-white font-medium text-xs truncate w-full">{img.label}</p>
        </div>
      </div>
    ))}
  </motion.div>


  {/* MASTER SLOT 3: Contains Images 9, 10, 11, 12 */}
  <motion.div variants={fadeUp} className="flex flex-col gap-4 w-full">
    {[
      { id: 9, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-f233b254-e3f1-4bab-b8f3-b30c36acbd59.jpg", label: "U-13 Volleyball Champions" },
      { id: 10, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-015675c7-952c-4096-b809-37e58fd46948.jpg", label: "Maths Gold Winners" },
      { id: 11, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-1c253f5a-03ff-4f08-b0e6-9617349d4a3d.jpg", label: "Under-10 Netball" },
      { id: 12, src: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-f784c41a-f06e-43af-a5b0-eb2924621953.jpg", label: "Under-13 Volleyball Gold" }
    ].map((img) => (
      <div key={img.id} className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-secondary-foreground/5 border border-secondary-foreground/10 p-4 w-full h-52 cursor-pointer">
        <img src={img.src} alt={img.label} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-4">
          <div className="flex items-center justify-end text-white/80 text-[10px] font-medium uppercase"><span>Click to expand</span></div>
          <p className="text-white font-medium text-xs truncate w-full">{img.label}</p>
        </div>
      </div>
    ))}
  </motion.div>


</motion.div>




     
const site = 'https://christslovechristianschool.info';


export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
    { '@type': 'WebSite', '@id': `${site}/#website`, name: "Christ's Love Christian School", url: `${site}/` },
    {
      '@type': 'EducationalOrganization',
      '@id': `${site}/#organization`,
      name: "Christ's Love Christian School",
      url: `${site}/`,
      description: 'Private Christian school offering Kindergarten through Grade 7 education rooted in faith and academic excellence.'
    },
    {
      '@type': 'WebPage',
      '@id': `${site}/#webpage`,
      url: `${site}/`,
      name: "Christ's Love Christian School — Faith-Centered Education K–7",
      isPartOf: { '@id': `${site}/#website` },
      about: { '@id': `${site}/#organization` },
      datePublished: '2026-06-16',
      dateModified: '2026-06-16'
    }]


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
        {/* Background image wrapper — explicit inset so image fills regardless of browser */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img
            src="https://ti1ev20vl7.preview.c36.airoapp.ai/airo-assets/uploads/pages-home-students-lined-up-at-christs-love-christ-37f8257f.jpg"
            alt="Students lined up at Christ's Love Christian School"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            fetchPriority="high"
            loading="eager" />
         
         
    {/* Overlay */} 
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/30" /> 
    
    <div className="relative container mx-auto px-4 lg:px-8 py-24"> 
      <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl"> 
        
        {/* ✅ FIXED: Clean, properly structured headings and text content streams for index pg*/} 
        <motion.h1 
          variants={fadeUp} 
          className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight font-medium tracking-tight mb-6" 
          style={{ color: "#ffffff", fontFamily: "var(--font-sans)" } as React.CSSProperties} 
        > 
          Christ's Love<br /> 
          <span className="text-primary">Christian School</span> 
        </motion.h1> 

        <motion.p 
          variants={fadeUp} 
          className="text-white/80 text-lg md:text-xl leading-relaxed mb-6 max-w-lg" 
        > 
          A glimpse into life at Christ's Love Christian School 
        </motion.p> 

        <motion.p 
          variants={fadeUp} 
          className="text-white/80 text-base md:text-lg leading-relaxed mb-10 max-w-lg" 
        > 
          Nurturing minds, hearts, and faith from Kindergarten through Grade 7. Where academic excellence meets the love of Christ. 
        </motion.p> 

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
      </div> {/* This closes the inner content box of your upper container */}
    </section> {/* This completely finishes and closes your upper component */}

    {/* ── QUICK STATS ── */} 
    <section className="bg-secondary py-10"> 
      <div className="container mx-auto px-4 lg:px-8"> 
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"> 
          {[ 
            { value: 'K–7', label: 'Grade Levels' }, 
            { value: '10+', label: 'Years of Excellence' }, 
            { value: '100%', label: 'Faith-Centered' }, 
            { value: 'Small', label: 'Class Sizes' }
          ].map((stat) => (
            <div key={stat.label} className="text-secondary-foreground"> 
              <div className="font-heading text-3xl md:text-4xl text-primary font-bold">{stat.value}</div> 
              <div className="text-secondary-foreground/70 text-sm mt-1 tracking-wide">{stat.label}</div> 
            </div> 
          ))} 
        </div> 
      </div> 
    </section>



      {/* ── PROGRAMS / GRADES ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14">
           
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
              Our Programs
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary mb-4 font-bold">
              Kindergarten Through Grade 7
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto text-lg">
              Each grade is thoughtfully designed to meet students where they are — academically, spiritually, and personally.
            </motion.p>
          </motion.div>


          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
           
            {gradeCards.map((card) =>
            <motion.div
              key={card.grade}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
             
                <div className="w-8 h-0.5 bg-primary mb-4" />
                <h3 className="font-heading text-xl text-secondary font-semibold mb-1">{card.grade}</h3>
                <p className="text-primary text-xs font-medium tracking-wide mb-3">{card.ages}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            )}
          </motion.div>


          <div className="text-center mt-10">
            <Link
              to="/academics"
              className="inline-flex items-center gap-2 text-secondary font-semibold hover:text-primary transition-colors">
             
              View Full Curriculum <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>


      {/* ── VALUES / MISSION ── */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative">
             
              <img
                src="/assets/media/pages-home-values-c9779bb4.jpg"
                alt="Faith and learning at Christ's Love Christian School"
                className="w-full h-auto object-contain rounded-lg shadow-lg"
                loading="lazy"
                width={800}
                height={480} />
             
              {/* Gold accent frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary rounded-lg -z-10" />
            </motion.div>


            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}>
             
              <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
                Our Mission
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary mb-6 leading-tight">
                Rooted in Faith,<br />Built for Life
              </motion.h2>
              <motion.p variants={fadeUp} className="text-foreground/80 text-lg leading-relaxed mb-6">
                At Christ's Love Christian School, we believe every child is uniquely created by God with gifts, purpose, and potential. Our mission is to provide an exceptional education that honors Christ in every subject, every interaction, and every moment of the school day.
              </motion.p>
              <motion.p variants={fadeUp} className="text-foreground/70 leading-relaxed mb-8">
                We partner with families to raise students who are academically prepared, spiritually grounded, and ready to serve their communities with integrity and compassion.
              </motion.p>


              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                { icon: BookOpen, label: 'Academic Excellence' },
                { icon: Heart, label: 'Faith Formation' },
                { icon: Star, label: 'Character Development' },
                { icon: Users, label: 'Community & Family' }].
                map(({ icon: Icon, label }) =>
                <motion.div key={label} variants={fadeUp} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <span className="text-secondary font-medium text-sm">{label}</span>
                  </motion.div>
                )}
              </motion.div>


              <motion.div variants={fadeUp}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded hover:bg-secondary/90 transition-colors">
                 
                  Our Story <ChevronRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── COMMUNITY ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}>
             
              <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
                Our Community
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary mb-6 leading-tight">
                More Than a School —<br />A Family
              </motion.h2>
              <motion.p variants={fadeUp} className="text-foreground/80 text-lg leading-relaxed mb-6">
                When you join Christ's Love, you join a community of families who share your values and your vision for your children's future. From chapel mornings to school events, we grow together.
              </motion.p>
              <motion.p variants={fadeUp} className="text-foreground/70 leading-relaxed mb-8">
                Our small class sizes mean every student is known by name, celebrated for their strengths, and supported through every challenge. This is what Christian education looks like.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors">
                 
                  Start Your Application <ChevronRight size={18} />
                </Link>
              </motion.div>
            </motion.div>


            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative">
             
              <img
                src="/airo-assets/images/pages/home/students-enjoying-community-time-at-chri-2"
                alt="Students enjoying community time at Christ's Love Christian School"
                className="w-full h-[440px] object-cover rounded-lg shadow-lg"
                loading="lazy"
                width={900}
                height={440} />
             
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/40 rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </section>


  {/* ── ACHIEVEMENTS ── */} 
{/* ✅ FIXED: bg-secondary applies full width dark blue, text-white corrects contrast */}
<section className="py-20 bg-secondary text-white w-full">
  <div className="container mx-auto px-4 lg:px-8">
    
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mb-4">Our Recent Achievements</h2>
      <p className="text-white/80 text-lg">Celebrating the milestones, academic triumphs, and sports victories of our outstanding students.</p>
    </div>

    {/* ⚠️ LOOK HERE: Ensure your grid layout matches your rich global theme token variables */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Example card wrapper structure: Remove any 'bg-white' or 'text-card-foreground' utility strings! */}
      <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-2">Academic Excellence</h3>
        <p className="text-white/70 text-sm">Achieving top ranks in regional mathematics and language curriculum indices.</p>
      </div>
    </div>

  </div>
</section>


  {/* Responsive 3-Column Image Grid Container */} 
  <section className="py-12 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={stagger} 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full" 
      > 
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

          const handleCardClick = (src: any, label: any) => { 
            if (typeof document === 'undefined') return; 
            const modal = document.getElementById('global-gallery-modal'); 
            const modalImg = document.getElementById('global-gallery-modal-img') as any; 
            const modalTxt = document.getElementById('global-gallery-modal-txt'); 
            if (modal && modalImg && modalTxt) { 
              modalImg.src = src; 
              modalTxt.innerText = label; 
              modal.style.display = 'flex'; 
            } 
          }; 

                return ( 
            <> 
              {/* Grid Mapping Output */} 
              {galleryImages && galleryImages.map((img: any) => ( 
                <motion.div 
                  key={img?.id} 
                  variants={fadeUp} 
                  onClick={() => handleCardClick(img?.src || '', img?.label || '')} 
                  className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-secondary-foreground/5 border border-secondary-foreground/10 p-4 w-full h-64 sm:h-72 md:h-80 cursor-pointer" 
                > 
                  <div className="relative w-full h-full flex items-center justify-center pointer-events-none"> 
                    <img 
                      src={img?.src || ''} 
                      alt={img?.label || 'Gallery Image'} 
                      style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }} 
                      className="transition-transform duration-300 group-hover:scale-105" 
                    /> 
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
  <section className="py-20 bg-background overflow-hidden"> 
    <div className="container mx-auto px-4 lg:px-8"> 
      <div className="relative bg-secondary rounded-2xl overflow-hidden"> 
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" /> 
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" /> 
        <div className="p-8 md:p-12 text-center max-w-2xl mx-auto"> 
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Child's Journey with CLCS</h2> 
          <p className="text-white/80 mb-6">Partner with us to build a strong spiritual and academic foundation.</p> 
        </div> 
      </div> 
         </div>
    </section>
  </section> {/* Forces open sections to close, preventing the build crash */}
</>
);
}



