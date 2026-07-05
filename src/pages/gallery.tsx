import { useState, useEffect, useCallback } from 'react'; 
import { Helmet } from '@dr.pogodin/react-helmet'; 
import { motion, AnimatePresence } from 'motion/react'; 
import { X, ChevronLeft, ChevronRight, Images, Video, FolderOpen } from 'lucide-react'; 

const site = 'https://christslovechristianschool.info'; 

type MediaItem = { id: string; src: string; caption?: string }; 
type EventSection = { id: string; name: string; media: MediaItem[] }; 
type Tab = 'photos' | 'videos'; 

const fadeUp = { 
  hidden: { opacity: 0, y: 28 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }, 
}; 

const stagger = { 
  hidden: {}, 
  visible: { transition: { staggerChildren: 0.1 } } 
}; 

// ── 1. STATIC PRODUCTION SCHEMA DATA LAYER ──────────────────────────────────
// You can manually add, edit, or remove your items inside this list directly!
const STATIC_GALLERY_DATA = {
  photoEvents: [
    {
      id: "sports",
      name: "Sports",
      media: [
        { id: "p1", src: "https://airoapp.ai", caption: "2027 Admission Open Announcement" },
        { id: "p2", src: "https://airoapp.ai", caption: "Admission & Enrollment Requirements" }
      ]
    },
    {
      id: "school-life",
      name: "School Life",
      media: []
    }
  ],
  videoEvents: [
    {
      id: "school-videos",
      name: "School Videos",
      media: [
        { id: "m-1782774757107-0.9459343479658033", src: "https://airoapp.ai", caption: "Volleyball - Under-13 Girls bring home Silver medals." },
        { id: "m-1782775590001-0.1972598469754525", src: "https://airoapp.ai", caption: "Volleyball - Under-15 Boys receiving their Silver medals." },
        { id: "m-1782776081095-0.007960250631391386", src: "https://airoapp.ai", caption: "Volleyball - Under-15 Girls. Silver medalists." },
        { id: "m-1781846539942-0.17936122800190435", src: "https://airoapp.ai", caption: "Melissa Angala and Agnes Sabuta -- Christ’s Love Christian School students -- shared with NBC how they feel about participating in the Cricket Namibia Women’s Week initiative." },
        { id: "m-1781821983590-0.4846056509140575", src: "https://airoapp.ai", caption: "Bishop Elizabeth Arowolo, General Overseer of Christ's Love Ministries International, visits CLCS to encourage and pray for the students." },
        { id: "m-1781821649262-0.6870646931584803", src: "https://airoapp.ai", caption: "CLCS celebrates her 15 year anniversary with song and dance presentations performed by our students." },
        { id: "m-1781833626325-0.003148085022670166", src: "https://airoapp.ai", caption: "CLCS celebrates 15 years of scholarship, spiritual discipline, and excellence." },
        { id: "m-1781834214803-0.2855789584040125", src: "https://airoapp.ai", caption: "CLCS celebrates 15 years of scholarship, spiritual discipline, and excellence." },
        { id: "m-1781846165641-0.36769376614076177", src: "https://airoapp.ai", caption: "CLCS celebrates 15 years of academic excellence, spiritual growth, and grit." },
        { id: "m-1781832384820-0.8160704511283176", src: "https://airoapp.ai", caption: "Bishop Elizabeth Arowolo visits CLCS to encourage and pray for the students. In this clip, she teaches learners the song: 'Everywhere He Went, He Was Doing Good.'" },
        { id: "m-1781823985212-0.6261830448984771", src: "https://airoapp.ai", caption: "Christ’s Love Christian School received a special visit from Colyn Hendriks of Gideon's Namibia, who donated Bibles to support learners." },
        { id: "m-1781940668512-0.06618980910488659", src: "https://airoapp.ai", caption: "Netball Team hurdles to lift each other's spirits." }
      ]
    }
  ]
};

export default function GalleryPage() { 
  const title = "Gallery — Christ's Love Christian School"; 
  const description = "Browse photos and videos from Christ's Love Christian School — classroom moments, events, and community life."; 
  const canonicalUrl = `${site}/gallery`; 

  const [activeTab, setActiveTab] = useState<Tab>('photos'); 
  const [activeEvent, setActiveEvent] = useState<string>('all'); 
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null); 
  const [slideIndices, setSlideIndices] = useState<Record<string, number>>({}); 

  // Auto-slideshow loop hook configuration
  useEffect(() => { 
    if (lightbox !== null) return; 
    const events = activeTab === 'photos' ? STATIC_GALLERY_DATA.photoEvents : STATIC_GALLERY_DATA.videoEvents; 
    const timers = events.map(event => { 
      if (event.media.length <= 1) return null; 
      return setInterval(() => { 
        setSlideIndices(prev => ({ 
          ...prev, 
          [event.id]: ((prev[event.id] ?? 0) + 1) % event.media.length, 
        })); 
      }, 4000); 
    }); 
    return () => timers.forEach(t => t && clearInterval(t)); 
  }, [activeTab, lightbox]); 

  const tabKey = activeTab === 'photos' ? 'photoEvents' : 'videoEvents'; 
  const events = STATIC_GALLERY_DATA[tabKey]; 
  const visibleEvents = activeEvent === 'all' ? events : events.filter(e => e.id === activeEvent); 

  const openLightbox = (items: MediaItem[], index: number) => setLightbox({ items, index }); 
  const closeLightbox = () => setLightbox(null); 

  const prevLightbox = useCallback(() => { 
    if (!lightbox) return; 
    setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.items.length) % lightbox.items.length }); 
  }, [lightbox]); 

  const nextLightbox = useCallback(() => { 
    if (!lightbox) return; 
    setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.items.length }); 
  }, [lightbox]); 

  useEffect(() => { 
    const handler = (e: KeyboardEvent) => { 
      if (!lightbox) return; 
      if (e.key === 'ArrowLeft') prevLightbox(); 
      if (e.key === 'ArrowRight') nextLightbox(); 
      if (e.key === 'Escape') closeLightbox(); 
    }; 
    window.addEventListener('keydown', handler); 
    return () => window.removeEventListener('keydown', handler); 
  }, [lightbox, prevLightbox, nextLightbox]); 

  const jsonLd = { 
    '@context': 'https://schema.org', 
    '@type': 'CollectionPage', 
    '@id': `${canonicalUrl}#webpage`, 
    name: title, 
    url: canonicalUrl, 
    isPartOf: { '@id': `${site}/#website` }, 
    about: { '@id': `${site}/#organization` }, 
  }; 

  return ( 
    <> 
      <Helmet> 
        <title>{title}</title> 
        <meta name="description" content={description} /> 
        <link rel="canonical" href={canonicalUrl} /> 
        <meta property="og:title" content={title} /> 
        <meta property="og:description" content={description} /> 
        <meta property="og:url" content={canonicalUrl} /> 
        <meta property="og:type" content="website" /> 
        <meta name="twitter:card" content="summary_large_image" /> 
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> 
      </Helmet> 

      {/* Hero */} 
      <section className="bg-secondary py-16 md:py-20"> 
        <div className="container mx-auto px-4 lg:px-8 text-center"> 
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-secondary-foreground mb-4">Gallery</h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-secondary-foreground/70 text-lg max-w-xl mx-auto" > 
            A glimpse into life at Christ's Love Christian School 
          </motion.p> 
        </div> 
      </section> 

      <section className="py-12 md:py-16 bg-background"> 
        <div className="container mx-auto px-4 lg:px-8"> 
          {/* Tab switcher */} 
          <div className="flex justify-center mb-8"> 
            <div className="inline-flex rounded-lg border border-border overflow-hidden"> 
              <button onClick={() => { setActiveTab('photos'); setActiveEvent('all'); }} className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'photos' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground/70 hover:bg-muted'}`} > 
                <Images size={16} /> Photos 
              </button> 
              <button onClick={() => { setActiveTab('videos'); setActiveEvent('all'); }} className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'videos' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground/70 hover:bg-muted'}`} > 
                <Video size={16} /> Videos 
              </button> 
            </div> 
          </div> 

          {/* Event filter pills */} 
          <div className="flex flex-wrap justify-center gap-2 mb-10"> 
