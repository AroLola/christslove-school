 import { useState, useEffect, useCallback } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Images, Video, FolderOpen } from 'lucide-react';

const site = 'https://christslovechristianschool.info';

type MediaItem = { id: string; src: string; caption?: string };
type EventSection = { id: string; name: string; media: MediaItem[] };
type GalleryData = { photoEvents: EventSection[]; videoEvents: EventSection[] };
type Tab = 'photos' | 'videos';

async function fetchGallery(): Promise<GalleryData> {
  const res = await fetch('/api/gallery');
  return res.json();
}

export default function GalleryPage() {
  const title = "Gallery — Christ's Love Christian School";
  const description = "Browse photos and videos from Christ's Love Christian School — classroom moments, events, and community life.";
  const canonicalUrl = `${site}/gallery`;

  const [data, setData] = useState<GalleryData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('photos');
  const [activeEvent, setActiveEvent] = useState<string>('all');
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null);
  const [slideIndices, setSlideIndices] = useState<Record<string, number>>({});

  useEffect(() => { fetchGallery().then(setData); }, []);

  // Auto-slideshow
  useEffect(() => {
    if (!data || lightbox !== null) return;
    const events = activeTab === 'photos' ? data.photoEvents : data.videoEvents;
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
  }, [data, activeTab, lightbox]);

  const tabKey = activeTab === 'photos' ? 'photoEvents' : 'videoEvents';
  const events = data ? data[tabKey] : [];
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl md:text-5xl font-bold text-secondary-foreground mb-4"
          >
            <h1 className="contents">Gallery</h1>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-secondary-foreground/70 text-lg max-w-xl mx-auto"
          >
            A glimpse into life at Christ's Love Christian School
          </motion.p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Tab switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => { setActiveTab('photos'); setActiveEvent('all'); }}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'photos' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground/70 hover:bg-muted'}`}
              >
                <Images size={16} /> Photos
              </button>
              <button
                onClick={() => { setActiveTab('videos'); setActiveEvent('all'); }}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'videos' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground/70 hover:bg-muted'}`}
              >
                <Video size={16} /> Videos
              </button>
            </div>
          </div>

          {/* Event Filter dropdown / list */}
          {events.length > 0 && (
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
                <button
                  onClick={() => setActiveEvent('all')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${activeEvent === 'all' ? 'bg-foreground text-background border-foreground' : 'bg-background text-foreground/60 border-border hover:border-foreground/30'}`}
                >
                  All Events
                </button>
                {events.map(e => (
                  <button
                    key={e.id}
                    onClick={() => setActiveEvent(e.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${activeEvent === e.id ? 'bg-foreground text-background border-foreground' : 'bg-background text-foreground/60 border-border hover:border-foreground/30'}`}
                  >
                    {e.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Content Rendering */}
          <div className="space-y-16">
            {visibleEvents.map(event => {
              const currentSlide = slideIndices[event.id] ?? 0;
              return (
                <div key={event.id} className="border-b border-border pb-12 last:border-0">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-foreground">
                      <FolderOpen className="text-primary" size={20} /> {event.name}
                    </h2>
                  </div>

                  {event.media.length === 0 ? (
                    <p className="text-muted-foreground text-sm italic">No media items in this album.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Left: Slideshow (Spans 1 col on desktop) */}
                      <div className="relative aspect-video md:aspect-square bg-muted rounded-xl overflow-hidden shadow-sm group">
                        {event.media.map((item, idx) => (
                          <div
                            key={item.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                          >
                            {activeTab === 'photos' ? (
                              <img
                                src={item.src}
                                alt={item.caption || event.name}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => openLightbox(event.media, idx)}
                              />
                            ) : (
                              <video
                                src={item.src}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => openLightbox(event.media, idx)}
                                muted
                                playsInline
                              />
                            )}
                          </div>
                        ))}
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-20 pointer-events-none">
                          {currentSlide + 1} / {event.media.length}
                        </div>
                      </div>

                      {/* Right: Grid of remaining photos (Spans 2 cols on desktop) */}
                      <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 content-start">
                        {event.media.map((item, idx) => (
                          <div
                            key={item.id}
