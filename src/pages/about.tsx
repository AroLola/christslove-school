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
{ name: 'DR. MEMOIR CHIMWAMUROMBE', role: 'Principal', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-b614cea3-8e98-4357-aada-880703c8d86e.jpg" },
{ name: 'PATIENCE MAGOMO', role: 'Vice Principal, Department Head, Senior Primary, & Teacher, Grade 6', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-8212f591-1a43-43d6-b97c-0c2bbb40607e.jpg" },
{ name: 'NAUYOMA HILENI', role: 'Department Head, Early Childhood Development & Teacher, Kindergarten, 4-5 Years', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-eea3cb21-da44-4145-8588-ada22b651857.jpg" },
{ name: 'SAUMA NDYULUWA', role: 'Department Head, Pre-Primary', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-4ca725c4-af6f-4d98-82cd-33b23fb5cb04.jpg" },
{ name: 'LUDIANCE KATANANGA', role: 'Vice Department Head, Junior Primary', imageUrl: "https://ti1ev20vl7.preview.c36.airoapp.ai/airo-assets/uploads/gallery/gallery-f8fea870-ae29-414d-af7e-c5a9cc59bd53.jpg" },
{ name: 'FRIEDA H. MUKOROKO', role: 'Teacher, Kindergarten, 2-3 Years', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-147efbf4-f01e-427e-8a66-c10a3cee4b94.jpg" },
{ name: 'FIINA HAMUKOTO', role: 'Teacher, Kindergarten, 4-5 Years', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-b30f5d0c-c686-481c-8c5a-0d99067982b3.jpg" },
{ name: 'ESTER MALAKIA', role: 'Teacher, Grade 1, Yellow', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-1a39a518-2b80-4823-9464-aaf53659839e.jpg" },
{ name: 'AUGUSTE JOSEPH', role: 'Teacher, Pre-Primary, 6 Years', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-eb1886d3-da6c-4e15-9949-88bb05fd8fc7.jpg" },
{ name: 'MARGARIDA CHILOMBO', role: 'Teacher, Grade 2, Blue', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-eb32798c-780b-48a4-8d2a-2fb7c7dade3a.JPG" },
{ name: 'VISTOLIA CHIWANZA', role: 'Teacher, Grade 2, Red', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-19659689-92a8-42fe-917e-01a6f8dd5c57.jpg" },
{ name: 'JUANITA SIMPSON', role: 'Teacher, Grade 3, Red', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-4834ae3a-1a57-444b-b9d2-ca8f95076511.jpg" },
{ name: 'JACOBINA SHIKONGO', role: 'Teacher, Early Childhood Development', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-331c1b67-bc6a-4211-9c40-55d1b407859b.jpg" },
{ name: 'ERASTUS SHANINGWA', role: 'Teacher, Grade 4, Green', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-41ce3c54-9cdf-4397-a9c1-a46233bf8a07.jpg" },
{ name: 'KENNETH OKEDI', role: 'Teacher, Grade 4, Red', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-5ee6fac6-c6d6-4d0c-8a62-de91b68ba3b6.jpg" },
{ name: 'JOSEPHINE CHINOUNYE', role: 'Teacher, Grade 4, Blue', imageUrl: "https://ti1ev20vl7.preview.c36.airoapp.ai/airo-assets/uploads/gallery/gallery-b5380486-77e8-4bee-9235-c8186d2f052a.jpg" },
{ name: 'LYANE ZVEKARE', role: 'Teacher, Grade 5, Blue & Vice Sports Organizer, Deputy', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-3155f9b3-1668-40b0-ad0c-02cfb149d50e.jpg" },
{ name: 'DR. OLUFUNLOLA AROWOLO', role: 'Quality Assurance Officer', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-5fd535dd-3989-4848-815a-6019cf210105.jpg" },
{ name: 'CHARLES SIVEREGI', role: 'Teacher, Grade 7, Blue & Sports Organizer, Head', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-2df981c5-70a1-46aa-9402-a41457d6f0b8.JPG" },
{ name: 'MARK MUMANYI', role: 'Deputy Department Head & Teacher, Grade 7, Red', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-b155b087-62d4-41bc-bf56-a215017b69ec.jpg" },
{ name: 'MILDRED WOLF', role: 'Administrator', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-629adb36-c8e4-4adc-adf3-077578123190.jpg" },
{ name: 'ZECA SEGUNDA', role: 'Teacher, Religious Education, Portuguese & Life Skills', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-0a7de329-810a-4db4-b679-d047bbbb3eac.jpg" },
{ name: 'IDALINA GENIS', role: 'Teacher, Afrikaans, Grade 1-2', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-d6a06584-ddd4-4a9b-b153-c59b62b9e119.jpg" },
{ name: 'MAGRIETA BASSON', role: 'Teacher, Afrikaans, Grade 4-5', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-1d6c3eaf-c1f6-4a7a-bb12-04122194bcba.jpg" },
{ name: 'LUSTACIA UMATI', role: 'Teacher, Afrikaans, Grade 6-7', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-a24f59b0-f058-462a-97a4-b77cda991183.jpg" },
{ name: 'ISIDORE KAMBILO', role: 'Teacher, French, Grade 3-7', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-a15a6a9e-fdcc-41c8-b436-7011acf2a72b.jpg" },
{ name: 'RACHEL SHIONA', role: 'Teacher, Early Childhood Development & Spirits Organizer, Kindergarten', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-b46fa55e-919b-43af-b9b1-299577c1e1be.jpg" },
{ name: 'KUDAKWASHE MUTASA', role: 'Teacher, Information & Communication', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-bb393c38-0792-41c9-94e4-2797ab38d943.jpg" },
{ name: 'REGINA MANGUNDU', role: 'Front Desk', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-357fb164-a36e-436d-9d28-eec8ddf03881.JPG" },
{ name: 'GENEFEFA GOTFRIED', role: 'Custodian', imageUrl: "https://christslovechristianschool.info/airo-assets/uploads/gallery/gallery-66546a9a-f7e7-4652-a3a7-ab72a2c98e13.jpg" },
{ name: 'JEQUILINE LIVIMBA', role: 'Tuck Shop, Custodian', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'MARIA O. AUKHUMES', role: 'Cashier', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'NYASHA MUKOROKO', role: 'Driver, CareTaker, Handyman', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'PRISCA KOROMORA', role: 'Department Head, Junior Primary & Teacher, Grade 2, Green', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'EMMERENTIA K. SHIONA', role: 'Teacher & Sports Organizer, Kindergarten, 3-4 Years', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'BRASH NDARA', role: 'Teacher, Grade 6, Red', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'MARTHA NHEKAIRO', role: 'Teacher, Grade 3, Green', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'IRVIN MAYA', role: 'Teacher, Grade 3, Blue', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'SOPHIA HANSEN', role: 'Librarian', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'ESTER NAKUMBWATA', role: 'Librarian', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'MAGANAEM ERASMUS', role: 'Teacher, Grade 5, Red', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'LEENA JUNIAS', role: 'Teacher, Afrikaans, Grade 2-3', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" },
{ name: 'SAMUEL LUMAI', role: 'Security, Assistant Caretaker', imageUrl: "https://christslovechristianschool.info/airo-assets/images/layouts/footer/christs-love-christian-school" }];






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


      {/* ── STAFF ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14">
           
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
              Our Team
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary mb-4">
              Meet Our Faculty & Staff
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
              Our educators are called to this work — dedicated professionals who bring both academic excellence and genuine Christian faith to the classroom every day.
            </motion.p>
          </motion.div>


{(() => {
  // 1. FILTER STAFF INTO TWO DISTINCT GROUPS BEFORE RENDERING
  const staffWithPics = staff.filter(member => {
    if (!member) return false;
    const upperName = member.name ? member.name.toUpperCase() : '';
    
    // EXPLICIT BYPASS: Force Jequiline and Maria out of the working array so they go to the placeholder/upload loop
    if (upperName.includes('JEQUILINE') || upperName.includes('MARIA')) {
      return false;
    }
    
    return typeof member.imageUrl === 'string' && member.imageUrl.includes('uploads/gallery');
  });

  const staffWithLogos = staff.filter(member => {
    if (!member) return true;
    const upperName = member.name ? member.name.toUpperCase() : '';
    
    // EXPLICIT MATCH: Force Jequiline and Maria straight into the logo loop for their real image overlays
    if (upperName.includes('JEQUILINE') || upperName.includes('MARIA')) {
      return true;
    }
    
    return typeof member.imageUrl !== 'string' || !member.imageUrl.includes('uploads/gallery');
  });

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
      
      {/* LOOP 1: YOUR ORIGINAL WORKING VERSION FOR PROFILES WITH PICTURES */}
      {staffWithPics.map((member) => <motion.div key={member.name} variants={fadeUp} className="bg-card border border-border rounded-lg p-7 shadow-sm"> <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4"> <span class="text-secondary-foreground font-heading font-bold text-lg"> {`${member.name.split(' ')?.charAt(0)}${member.name.split(' ').pop()?.charAt(0)}`} </span> </div> <h3 className="font-heading text-lg text-secondary font-semibold">{member.name}</h3> <p className="text-primary text-xs font-medium tracking-wide mt-1 mb-3">{member.role}</p> <img src={member.imageUrl} alt={member.name} className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden mt-2 mr-auto self-start flex items-center justify-center" /> </motion.div> )}

      {/* LOOP 2: DEDICATED FRAMEWORK FOR PROFILES WITH LOGOS AND CUSTOM UPLOADS */}
      {staffWithLogos.map((member) => {
        let cleanUrl = "/assets/media/layouts-footer-christs-love-christian-school-2658fcbe.png";
        
        if (member && member.name) {
          const upperName = member.name.toUpperCase();
          if (upperName.includes('JEQUILINE')) {
            cleanUrl = "/assets/media/jequiline-livimba.jpg";
          } else if (upperName.includes('MARIA')) {
            cleanUrl = "/assets/media/maria-aukhumes.jpg";
          }
        }

        return (
          <motion.div key={member.name} variants={fadeUp} className="bg-card border border-border rounded-lg p-7 shadow-sm"> 
            <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4"> 
              <span class="text-secondary-foreground font-heading font-bold text-lg"> 
                {`${member.name.split(' ')?.charAt(0)}${member.name.split(' ').pop()?.charAt(0)}`} 
              </span> 
            </div> 
            <h3 className="font-heading text-lg text-secondary font-semibold">{member.name}</h3> 
            <p className="text-primary text-xs font-medium tracking-wide mt-1 mb-3">{member.role}</p> 
            <img src={cleanUrl} alt={member.name} className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden mt-2 mr-auto self-start flex items-center justify-center" /> 
          </motion.div>
        );
      })}

    </motion.div>
  );
})()}
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

