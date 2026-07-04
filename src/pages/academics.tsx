import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, BookOpen, Music, Globe, Calculator, Leaf, Palette } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const grades = [
  { grade: 'Kindergarten', ages: 'Ages 5–6', focus: 'Foundational literacy, numeracy, and faith basics through play-based learning and structured routines.' },
  { grade: 'Grade 1', ages: 'Ages 6–7', focus: 'Reading fluency, phonics, addition and subtraction, and introduction to biblical stories and prayer.' },
  { grade: 'Grade 2', ages: 'Ages 7–8', focus: 'Reading comprehension, writing sentences, multiplication foundations, and exploring God\'s creation through science.' },
  { grade: 'Grade 3', ages: 'Ages 8–9', focus: 'Chapter books, creative writing, multiplication and division, and social studies exploring communities and cultures.' },
  { grade: 'Grade 4', ages: 'Ages 9–10', focus: 'Research skills, essay writing, fractions and decimals, Namibian history, and deepening Bible study.' },
  { grade: 'Grade 5', ages: 'Ages 10–11', focus: 'Literary analysis, persuasive writing, pre-algebra concepts, world geography, and servant leadership.' },
  { grade: 'Grade 6', ages: 'Ages 11–12', focus: 'Advanced literacy, introduction to algebra, physical science, world history, and apologetics.' },
  { grade: 'Grade 7', ages: 'Ages 12–13', focus: 'Rigorous academics across all subjects, critical thinking, leadership development, and preparation for high school.' },
];

const subjects = [
  { icon: BookOpen, name: 'Bible & Faith', description: 'Daily Scripture, chapel, and applied Christian living woven through every grade.' },
  { icon: Calculator, name: 'Mathematics', description: 'Rigorous, sequential math curriculum from counting to pre-algebra and beyond.' },
  { icon: Globe, name: 'Language Arts', description: 'Phonics, reading, writing, grammar, and literature from Kindergarten through Grade 7.' },
  { icon: Leaf, name: 'Science', description: 'Hands-on exploration of God\'s creation — biology, earth science, chemistry, and physics.' },
  { icon: Globe, name: 'Social Studies', description: 'Local community, Namibian history, world geography, and global citizenship.' },
  { icon: Music, name: 'Music & Arts', description: 'Creative expression through music, visual arts, and drama — celebrating God-given gifts.' },
  { icon: Palette, name: 'Physical Education', description: 'Healthy bodies, teamwork, and sportsmanship through structured physical activity.' },
  { icon: Palette, name: 'Afrikaans', description: 'Structured to assist learners to develop local language skills.' },
  { icon: Palette, name: 'Physical Education', description: 'Early stage introduction to Portuguese lexicon and culture.' },
  { icon: BookOpen, name: 'French', description: 'Introduction to French language and culture beginning in Grade 4.' },
];

const site = 'https://christslovechristianschool.info';

export default function AcademicsPage() {
  const title = "Academics — Christ's Love Christian School";
  const description = "Explore our Kindergarten through Grade 7 curriculum at Christ's Love Christian School — rigorous academics grounded in Christian faith and values.";
  const canonicalUrl = `${site}/academics`;

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
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Curriculum</motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-secondary-foreground mb-5">Academics</motion.h1>
            <motion.p variants={fadeUp} className="text-secondary-foreground/70 text-lg leading-relaxed">
              A rigorous, faith-integrated curriculum designed to challenge and inspire students from Kindergarten through Grade 7.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Our Approach</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary mb-6">Faith-Integrated Learning</motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/80 text-lg leading-relaxed mb-4">
              At Christ's Love, we don't separate faith from academics — we integrate them. Every subject is taught through the lens of a Christian worldview, helping students see how all knowledge connects to the God who created it.
            </motion.p>
            <motion.p variants={fadeUp} className="text-foreground/70 leading-relaxed">
              Our teachers are credentialed educators who are also committed Christians, bringing both professional excellence and genuine faith to the classroom every day.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">What We Teach</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary">Core Curriculum</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {subjects.map(({ icon: Icon, name, description }) => (
              <motion.div key={name} variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg text-secondary font-semibold mb-2">{name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grade by Grade */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Grade by Grade</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-secondary">What Your Child Will Learn</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {grades.map((g) => (
              <motion.div key={g.grade} variants={fadeUp} className="bg-card border border-border rounded-lg p-6 flex gap-5">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-secondary-foreground font-heading font-bold text-xs text-center leading-tight">{g.grade.replace('Grade ', 'Gr.')}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-heading text-lg text-secondary font-semibold">{g.grade}</h3>
                    <span className="text-primary text-xs font-medium">{g.ages}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{g.focus}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-secondary mb-4">Questions About Our Curriculum?</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-8 max-w-md mx-auto">We'd love to walk you through our program and answer any questions you have.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to="/admissions" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors">
                Apply Now <ChevronRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-secondary text-secondary font-semibold rounded hover:bg-secondary hover:text-secondary-foreground transition-colors">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
