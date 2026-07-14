import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react'; 
import { ChevronRight, BookOpen, Heart, Star, Shield } from 'lucide-react';


const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
};


const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};


const values = [
{
  icon: BookOpen,
  title: 'Academic Excellence',
  description: 'We hold our students to high academic standards, equipping them with the knowledge and skills to thrive in higher education and life.'
},
{
  icon: Heart,
  title: 'Faith Formation',
  description: 'Scripture, prayer, and chapel are woven into every school day — not as additions, but as the foundation of everything we do.'
},
{
  icon: Star,
  title: 'Character Development',
  description: 'We cultivate integrity, compassion, and servant leadership in every student, preparing them to make a difference in the world.'
},
{
  icon: Shield,
  title: 'Safe Community',
  description: 'Our school is a place where every child is known, valued, and protected — a true community of care and belonging.'
}];




const staff = [
{ name: 'DR. MEMOIR CHIMWAMUROMBE', role: 'Principal', imageUrl: "/assets/media/drmemoir.jpg" },
{ name: 'PATIENCE MAGOMO', role: 'Vice Principal, Department Head, Senior Primary, & Teacher, Grade 6', imageUrl: "/assets/media/patience.jpg" },
{ name: 'NAUYOMA HILENI', role: 'Department Head, Early Childhood Development & Teacher, Kindergarten, 4-5 Years', imageUrl: "/assets/media/hileni.jpg" },
{ name: 'SAUMA NDYULUWA', role: 'Department Head, Pre-Primary', imageUrl: "/assets/media/suama.jpg" },
{ name: 'LUDIANCE KATANANGA', role: 'Vice Department Head, Junior Primary', imageUrl: "/assets/media/ludiance.jpg" },
{ name: 'FRIEDA H. MUKOROKO', role: 'Teacher, Kindergarten, 2-3 Years', imageUrl: "/assets/media/frieda.jpg" },
{ name: 'FIINA HAMUKOTO', role: 'Teacher, Kindergarten, 4-5 Years', imageUrl: "/assets/media/fiina.jpg" },
{ name: 'ESTER MALAKIA', role: 'Teacher, Grade 1, Yellow', imageUrl: "/assets/media/estermalakia.jpg" },
{ name: 'AUGUSTE JOSEPH', role: 'Teacher, Pre-Primary, 6 Years', imageUrl: "/assets/media/auguste.jpg" },
{ name: 'MARGARIDA CHILOMBO', role: 'Teacher, Grade 2, Blue', imageUrl: "/assets/media/chilombo.JPG" },
{ name: 'VISTOLIA CHIWANZA', role: 'Teacher, Grade 2, Red', imageUrl: "/assets/media/vistolia.jpg" },
{ name: 'JUANITA SIMPSON', role: 'Teacher, Grade 3, Red', imageUrl: "/assets/media/juanita.jpg" },
{ name: 'JACOBINA SHIKONGO', role: 'Teacher, Early Childhood Development', imageUrl: "/assets/media/jacobina.jpg" },
{ name: 'ERASTUS SHANINGWA', role: 'Teacher, Grade 4, Green', imageUrl: "/assets/media/erastus.jpg" },
{ name: 'KENNETH OKEDI', role: 'Teacher, Grade 4, Red', imageUrl: "/assets/media/kenneth.jpg" },
{ name: 'JOSEPHINE CHINOUNYE', role: 'Teacher, Grade 4, Blue', imageUrl: "/assets/media/josephine.jpg" },
{ name: 'LYANE ZVEKARE', role: 'Teacher, Grade 5, Blue & Vice Sports Organizer, Deputy', imageUrl: "/assets/media/lyabe.jpg" },
{ name: 'DR. OLUFUNLOLA AROWOLO', role: 'Quality Assurance Officer', imageUrl: "/assets/media/drarowolo.jpg" },
{ name: 'CHARLES SIVEREGI', role: 'Teacher, Grade 7, Blue & Sports Organizer, Head', imageUrl: "/assets/media/charles.JPG" },
{ name: 'MARK MUMANYI', role: 'Deputy Department Head & Teacher, Grade 7, Red', imageUrl: "/assets/media/mark.jpg" },
{ name: 'MILDRED WOLF', role: 'Administrator', imageUrl: "/assets/media/mildred.jpg" },
{ name: 'ZECA SEGUNDA', role: 'Teacher, Religious Education, Portuguese & Life Skills', imageUrl: "/assets/media/zeca.jpg" },
{ name: 'IDALINA GENIS', role: 'Teacher, Afrikaans, Grade 1-2', imageUrl: "/assets/media/idalina.jpg" },
{ name: 'MAGRIETA BASSON', role: 'Teacher, Afrikaans, Grade 4-5', imageUrl: "/assets/media/basson.jpg" },
{ name: 'LUSTACIA UMATI', role: 'Teacher, Afrikaans, Grade 6-7', imageUrl: "/assets/media/lustacia.jpg" },
{ name: 'ISIDORE KAMBILO', role: 'Teacher, French, Grade 3-7', imageUrl: "/assets/media/kambilo.jpg" },
{ name: 'RACHEL SHIONA', role: 'Teacher, Early Childhood Development & Spirits Organizer, Kindergarten', imageUrl: "/assets/media/rachel.jpg" },
{ name: 'IRVIN MAYA', role: 'Teacher, Grade 3, Blue', imageUrl: "/assets/media/irvin.JPG" },
{ name: 'KUDAKWASHE MUTASA', role: 'Teacher, Information & Communication', imageUrl: "/assets/media/kuda.jpg" },
{ name: 'REGINA MANGUNDU', role: 'Front Desk', imageUrl: "/assets/media/regina.JPG" },
{ name: 'GENEFEFA GOTFRIED', role: 'Custodian', imageUrl: "/assets/media/genefifa.jpg" },
{ name: 'JEQUILINE LIVIMBA', role: 'Tuck Shop, Custodian', imageUrl: "/assets/media/jequline.jpg" },
{ name: 'MARIA AUKHUMES', role: 'Cashier', imageUrl: "/assets/media/maria.jpg" },
{ name: 'MARTHA NHEKAIRO', role: 'Teacher, Grade 3, Green', imageUrl: "/assets/media/martha2.jpg" },
{ name: 'NYASHA MUKOROKO', role: 'Driver, CareTaker, Handyman', imageUrl: "/assets/media/nyasha.jpg" },
{ name: 'SOPHIA HANSEN', role: 'Librarian', imageUrl: "/assets/media/sofia.jpg" },
{ name: 'BRASH NDARA', role: 'Teacher, Grade 6, Red', imageUrl: "/assets/media/ndara.jpg" },
{ name: 'PRISCA KOROMORA', role: 'Department Head, Junior Primary & Teacher, Grade 2, Green', imageUrl: "/assets/media/prisca.jpg" },
{ name: 'MAGANAEM ERASMUS', role: 'Teacher, Grade 5, Red', imageUrl: "/assets/media/maga.jpg" },
{ name: 'ESTER NAKUMBWATA', role: 'Custodian', imageUrl: "/assets/clcslogo.jpg" },  
{ name: 'LEENA JUNIAS', role: 'Teacher, Afrikaans, Grade 2-3', imageUrl: "/assets/clcslogo.jpg" },
{ name: 'SAMUEL LUMAI', role: 'Security, Assistant Caretaker', imageUrl: "/assets/clcslogo.jpg" }];






const site = 'https://christslovechristianschool.info';


export default function AboutPage() {
  const title = "About Us — Christ's Love Christian School";
  const description = "Learn about our mission, history, faith statement, and dedicated staff at Christ's Love Christian School — a private Christian school for Kindergarten through Grade 7.";
  const canonicalUrl = `${site}/about`;


  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${canonicalUrl}#webpage`,
    name: title,
    url: canonicalUrl,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` }
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
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>


      {/* ── PAGE HEADER ── */}
      <section className="bg-secondary py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl">
           
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
              Our Story
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-secondary-foreground mb-5">About CLCS


            </motion.h1>
            <motion.p variants={fadeUp} className="text-secondary-foreground/70 text-lg leading-relaxed">For over a decade, Christ's Love Christian School (CLCS) has been a place where faith and learning flourish together — one child, one family at a time.


            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </section>


      {/* ── MISSION ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}>
             
              <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
                Mission Statement
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary mb-6 leading-tight">
                Educating the Whole Child
              </motion.h2>
              <motion.p variants={fadeUp} className="text-foreground/80 text-lg leading-relaxed mb-5">
                Our mission is to provide a Christ-centered education that develops the whole child — mind, body, and spirit — equipping students to know God, pursue excellence, and serve others.
              </motion.p>
              <motion.p variants={fadeUp} className="text-foreground/70 leading-relaxed mb-5">
                We believe that true education begins with the fear of the Lord (Proverbs 1:7) and extends into every discipline — from mathematics to music, from science to Scripture. Every subject is an opportunity to discover more of who God is and what He has made.
              </motion.p>
              <motion.blockquote
                variants={fadeUp}
                className="border-l-4 border-primary pl-5 py-2 my-6">
               
                <p className="text-secondary font-heading text-xl italic">"The fear of the Lord is the beginning of wisdom."</p>
                <cite className="text-primary text-sm mt-2 block">— Proverbs 1:7</cite>
              </motion.blockquote>
            </motion.div>


            {/* History */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="bg-muted rounded-xl p-8 lg:p-10">
             
              <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
                Our History
              </motion.p>
              <motion.h3 variants={fadeUp} className="font-heading text-3xl text-secondary mb-5">
                10+ Years of Faithful Service
              </motion.h3>
              <motion.div variants={stagger} className="space-y-5">
                {[
                { year: 'Founded', detail: 'Christ\'s Love Christian School was established by a small group of families who believed their community needed a school where faith and academics were equally valued.' },
                { year: 'Growth', detail: 'Over the years, we have grown from a handful of students to a thriving school community, expanding our programs from Kindergarten through Grade 7.' },
                { year: 'Today', detail: 'We continue to serve families across our region, maintaining our founding commitment: to raise up the next generation in the knowledge and love of Jesus Christ.' }].
                map((item) =>
                <motion.div key={item.year} variants={fadeUp} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <span className="font-semibold text-secondary text-sm">{item.year}: </span>
                      <span className="text-foreground/70 text-sm leading-relaxed">{item.detail}</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── FAITH STATEMENT ── */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center">
           
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
              What We Believe
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary-foreground mb-8">
              Our Statement of Faith
            </motion.h2>
          </motion.div>


          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
           
            {[
            'We believe in one God — Father, Son, and Holy Spirit — the Creator of all things.',
            'We believe in the authority and sufficiency of the Holy Scriptures as the inspired Word of God.',
            'We believe in the Lord Jesus Christ, His virgin birth, atoning death, bodily resurrection, and coming return.',
            'We believe that salvation is by grace alone, through faith alone, in Christ alone.',
            'We believe in the importance of the local church and the community of believers.',
            'We believe that every person is created in the image of God with inherent dignity and worth.'].
            map((belief, i) =>
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex gap-3 bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-lg p-5">
             
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                </div>
                <p className="text-secondary-foreground/80 text-sm leading-relaxed">{belief}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>


      {/* ── CORE VALUES ── */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14">
           
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
              Core Values
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary">
              What Guides Us
            </motion.h2>
          </motion.div>


          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           
            {values.map(({ icon: Icon, title, description }) =>
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-card border border-border rounded-lg p-7 text-center shadow-sm hover:shadow-md transition-shadow">
             
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg text-secondary font-semibold mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

{/* ── STAFF MAP ── */} 
<section className="py-20 bg-background"> 
  {/* Added max-w-6xl to keep the grid content tightly centered with beautiful margins */}
  <div className="container mx-auto max-w-6xl px-6 lg:px-12"> 
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14"> 
      <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3"> Our Team </motion.p> 
      <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary mb-4"> Meet Our Faculty & Staff </motion.h2> 
      <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto"> Our educators are called to this work — dedicated professionals who bring both academic excellence and genuine Christian faith to the classroom every day. </motion.p> 
    </motion.div> 

    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
      {staff.map((member) => { 
        const displayName = member?.name || ''; 
        const displayRole = member?.role || ''; 
        
        // 1. DEFAULT IMAGE PATH: Keep the original asset URL 
        let finalImageUrl = member?.imageUrl || ''; 
        
        // 2. LOGO GROUP & CUSTOM PHOTO REPLACEMENTS 
        if (finalImageUrl.includes('layouts/footer') || finalImageUrl.includes('images/layouts')) { 
          if (displayName === 'JEQUILINE LIVIMBA') { 
            finalImageUrl = "https://airoapp.ai"; 
          } else if (displayName === 'MARIA O. AUKHUMES') { 
            finalImageUrl = "https://airoapp.ai"; 
          } else { 
            finalImageUrl = "/assets/media/layouts-footer-christs-love-christian-school-2658fcbe.png"; 
          } 
        } 
        
        // 3. BULLETPROOF INITIALS ENGINE 
        const nameParts = displayName.split(' '); 
        const firstInitial = nameParts[0] ? nameParts[0].charAt(0) : ''; 
        const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : ''; 
        
        return ( 
          <motion.div 
            key={displayName} 
            variants={fadeUp} 
            className="bg-card border-2 border-border/80 rounded-xl p-5 shadow-md shadow-black/20 flex items-stretch justify-between gap-4 relative overflow-hidden w-full mx-auto md:max-w-sm"
            style={{ minHeight: '160px' }}
          > 
            {/* ID Card Left Content Side */}
            <div className="flex flex-col justify-between flex-1 py-1 z-10"> 
               <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"> 
                <span className="text-secondary-foreground font-heading font-bold text-lg"> 
                  {`${firstInitial}${lastInitial}`} 
                </span> 
              </div> 
              
              {/* Middle & Bottom Info Container */}
              <div className="mt-4"> 
                <h3 className="font-heading text-base md:text-lg text-secondary font-bold leading-tight uppercase">
                  {displayName}
                </h3> 
                {/* Bottom: Staff Professional Title */}
                <p className="text-primary text-[11px] font-semibold tracking-wider uppercase mt-1">
                  {displayRole}
                </p> 
              </div> 
            </div> 

            {/* ID Card Right Side: Profile Picture Container */}
            <div className="relative flex items-center justify-center self-center flex-shrink-0 w-24 h-28 bg-muted/30 border border-border/50 rounded-lg overflow-hidden shadow-inner"> 
              <img 
                src={finalImageUrl} 
                alt={displayName} 
                className="w-full h-full object-cover object-center" 
              /> 
            </div> 
            
            {/* Top Accent Strip: Midnight Blue with original 40% (0.4) opacity */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#0f172a]/40" />
          </motion.div> 
        ); 
      })} 
    </motion.div> 
  </div> 
</section>
          {/* ── CTA ── */}
             
      {/* ── NEWLY ADDED MEDIA SECTION ── */}
      <section className="bg-background py-20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Featured News</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-secondary mb-4">
              In the Media
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Read about Christ's Love Christian School's community impact, academic achievements, and faith-based excellence in local news and publications.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <article className="flex flex-col bg-background rounded-lg border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="aspect-video w-full bg-muted relative overflow-hidden">
                <img
                  src="https://ti1ev20vl7.preview.c36.airoapp.ai/airo-assets/uploads/gallery/gallery-3d5bb981-706b-4276-81e5-ed182c595047.jpg"
                  alt="Feature article thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {e.currentTarget.style.display = 'none';}} />
               
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="font-semibold text-primary">Local Sports News</span>
                    <span>•</span>
                    <span>June 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2 line-clamp-2">
                    U13 Volleyball League
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    The Khomas Schools Sports Region (KSSR) U13 Volleyball League officially got underway on Saturday at Christ's Love Christian School in Windhoek,'with a record 16 teams competing in the opening round.
                  </p>
                </div>
                <a
                  href="https://www.sportwrap.com.na/other-sw/kssr-league-opener-draws-record-participation-nmh012575-11-15357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 mt-auto">
                 
                  Read Full Article →
                </a>
              </div>
            </article>


            {/* Article 2 */}
            {false &&
            <article className="flex flex-col bg-background rounded-lg border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="aspect-video w-full bg-muted relative overflow-hidden">
                <img
                  src="/assets/media-placeholder-2.jpg"
                  alt="Feature article thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {e.currentTarget.style.display = 'none';}} />
               
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="font-semibold text-primary">Community Gazette</span>
                    <span>•</span>
                    <span>May 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2 line-clamp-2">
                    Annual Faith-Based Academic Awards Highlights School Achievements
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    Celebrating our students' top placements in regional academic competitions and community service milestones.
                  </p>
                </div>
                <a
                  href="https://example-news-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 mt-auto">
                 
                  Read Full Article →
                </a>
              </div>
            </article>
            }


          </div>
        </div>
      </section>
      {/* ── END OF NEWLY ADDED MEDIA SECTION ── */}


      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}>
           
            <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-secondary mb-4">
              Ready to Join Our Community?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-8 max-w-md mx-auto">
              We'd love to meet your family. Reach out to schedule a tour or begin your application today.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors">
               
                Apply Now <ChevronRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-secondary text-secondary font-semibold rounded hover:bg-secondary hover:text-secondary-foreground transition-colors">
               
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>);


}
