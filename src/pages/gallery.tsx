import { useState, useEffect, useCallback } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Images, Video, FolderOpen } from 'lucide-react';

const site = 'https://christslovechristianschool.info';

type MediaItem = { id: string; src: string; caption?: string };
type EventSection = { id: string; name: string; media: MediaItem[] };
type GalleryData = { photoEvents: EventSection[]; videoEvents: EventSection[] };
type Tab = 'photos' | 'videos';

const INITIAL_GALLERY_DATA: GalleryData = {
  photoEvents: [
    {
      id: "event-1",
      name: "Classroom Activities",
      media: []
    }
  ],
  videoEvents: [
    {
      id: "video-1",
      name: "School Events",
      media: []
    }
  ]
};

export default function GalleryPage() {
  const title = "Gallery — Christ's Love Christian School";
  const description = "Browse photos and videos from Christ's Love Christian School — classroom moments, events, and community life.";
  const canonicalUrl = `${site}/gallery`;

  const [data] = useState<GalleryData>(INITIAL_GALLERY_DATA);
  const [activeTab, setActiveTab] = useState<Tab>('photos');
  const [activeEvent, setActiveEvent] = useState<string>('all');
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null);

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
      </Helmet>

      {/* Hero */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-secondary-foreground">Gallery</h1>
          <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto">
            A glimpse into life at Christ's Love Christian School
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">

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

          {/* Event Filters */}
          {events.length > 0 && (
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setActiveEvent('all')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${activeEvent === 'all' ? 'bg-foreground text-background border-foreground' : 'bg-background text-foreground/60 border-border'}`}
                >
                  All Events
                </button>
                {events.map(e => (
                  <button
                    key={e.id}
                    onClick={() => setActiveEvent(e.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${activeEvent === e.id ? 'bg-foreground text-background border-foreground' : 'bg-background text-foreground/60 border-border'}`}
                  >
                    {e.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Media Uniform Grid Layout */}
          <div className="space-y-16">
            {visibleEvents.map(event => (
              <div key={event.id} className="border-b border-border pb-12 last:border-0">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 mb-6 text-foreground">
                  <FolderOpen className="text-primary" size={20} /> {event.name}
                </h2>

                {event.media.length === 0 ? (
                  <p className="text-muted-foreground text-sm italic">No media items available.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {event.media.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => openLightbox(event.media, idx)}
                        className="relative aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer group border border-border/40 hover:shadow-md transition-shadow"
                      >
                        {activeTab === 'photos' ? (
                          <img 
                            src={item.src} 
                            alt={item.caption || ''} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                          />
                        ) : (
                          <div className="w-full h-full relative flex items-center justify-center bg-black">
                            <video src={item.src} className="w-full h-full object-cover opacity-80" muted playsInline />
                            <Video size={24} className="text-white drop-shadow absolute" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 touch-none"
          >
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-colors z-50">
              <X size={24} />
            </button>

            <div className="relative w-full max-w-5xl aspect-video max-h-[80vh] flex items-center justify-center">
              {lightbox.items.length > 1 && (
                <>
                  <button onClick={prevLightbox} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-50">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextLightbox} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-50">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="w-full h-full flex items-center justify-center select-none">
                {activeTab === 'photos' ? (
                  <img
                    src={lightbox.items[lightbox.index].src}
                    alt={lightbox.items[lightbox.index].caption || ''}
                    className="max-w-full max-h-full object-contain rounded"
                  />
                ) : (
                  <video
                    src={lightbox.items[lightbox.index].src}
                    controls
                    autoPlay
                    className="max-w-full max-h-full object-contain rounded"
                  />
                )}
              </div>
            </div>

            {lightbox.items[lightbox.index].caption && (
              <p className="text-white/80 mt-4 text-center max-w-xl text-sm md:text-base px-4">
                {lightbox.items[lightbox.index].caption}
              </p>
            )}
            <p className="text-white/40 text-xs mt-2">
              {lightbox.index + 1} / {lightbox.items.length}
            </p>
