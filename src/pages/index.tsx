import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Star, Users, ChevronRight } from 'lucide-react';

const site = 'https://christslovechristianschool.info';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Christ's Love Christian School — Faith-Centered Education K–7</title>
        <meta name="description" content="A private Christian school nurturing students from Kindergarten through Grade 7. Enroll today." />
        <link rel="canonical" href={`${site}/`} />
      </Helmet>

      {/* ── HERO SECTION ── */}
      <section className="relative flex items-center overflow-hidden bg-midnight text-white py-24" style={{ minHeight: '88vh' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Christ's Love <span className="text-primary">Christian School</span>
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Nurturing minds, hearts, and faith from Kindergarten through Grade 7. Where academic excellence meets the love of Christ.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admissions" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors">
                Enroll Now <ChevronRight size={18} />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/60 text-white font-semibold rounded hover:bg-white/10 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section className="py-20 bg-secondary text-white border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Our Mission</p>
          <h2 className="text-4xl font-bold mb-6">Rooted in Faith, Built for Life</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            We partner with families to provide an exceptional education that honors Christ in every subject, raising students to be academically prepared and spiritually grounded.
          </p>
        </div>
      </section>

      {/* ── ADMISSIONS CTA ── */}
      <section className="py-20 bg-midnight text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-secondary rounded-2xl p-12 border border-white/5 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-4">Begin Your Child's Journey in Faith</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Spaces are limited for the upcoming academic year. Apply today to secure your child's place in our community.
            </p>
            <Link to="/admissions" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded hover:bg-primary/90 transition-colors">
              Apply Today <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
