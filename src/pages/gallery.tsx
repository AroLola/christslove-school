"use client";

import { useState, useEffect, useCallback } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Images, Video } from 'lucide-react';

// Define core type structures
type Tab = 'photos' | 'videos';

interface MediaItem {
  id: string;
  src: string;
  caption?: string;
}

interface GalleryEvent {
  id: string;
  name: string;
  media: MediaItem[];
}

interface GalleryData {
  photoEvents: GalleryEvent[];
  videoEvents: GalleryEvent[];
}

const site = "https://christslovechristianschool.info"; // Fallback production site link

// Assuming child component view frameworks are imported or defined in file context
function PhotoSectionView({ event, onImageClick }: { event: GalleryEvent; onImageClick: (items: MediaItem[], idx: number) => void }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">{event.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {event.media.map((item, idx) => (
          <div 
            key={item.id} 
            className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => onImageClick(event.media, idx)}
          >
            <div className="aspect-square w-full overflow-hidden bg-muted">
              <img 
                src={item.src} 
                alt={item.caption || event.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/media/layouts-header-christs-love-christian-school-aea019d4.jpg";
                }}
              />
            </div>
            {item.caption && (
              <div className="p-3">
                <p className="text-sm text-card-foreground/80 line-clamp-2">{item.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoSectionView({ event }: { event: GalleryEvent }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">{event.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {event.media.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="aspect-video w-full bg-black">
              {item.src ? (
                <video src={item.src} controls className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground p-4 text-center">
                  Video Link Coming Soon
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-base text-card-foreground">{item.caption || event.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page Master Default Export Component Wrapper ──
export default function GalleryPage() {
  const title = "Gallery — Christ's Love Christian School";
  const description = "Browse photos and videos from Christ's Love Christian School — classroom moments, events, and community life.";
  const canonicalUrl = `${site}/gallery`;

  const [data, setData] = useState<GalleryData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('photos');
  const [activeEvent, setActiveEvent] = useState<string>('all');
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null);

  useEffect(() => {
    // Force direct absolute root directory fetch call
    fetch('/gallery-data.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP network error: ${res.status}`);
        return res.json();
      })
      .then((rawData) => {
        if (!rawData) return;
        
        const cleanData = {
          ...rawData,
          photoEvents: rawData.photoEvents?.map((event: any) => {
            let name = event.name;
            
            // Normalize Sports identifiers cleanly
            if (name === 'Sports Day' || event.id === 'sports' || event.id === 'sports-gallery-album') {
              name = 'Sports';
            }
            // ✅ Fix Duplicate 'Class Time' labels to separate filters correctly
            if (event.id === 'leadership-gallery-album') {
              name = 'Leadership';
            }
            
            return { 
              ...event, 
              name, 
              media: event.media || [] 
            };
          }) || [],
          videoEvents: rawData.videoEvents?.map((event: any) => {
            let name = event.name;
            if (name === 'Sports Day' || event.id === 'sports') {
              name = 'Sports';
            }
            return { 
              ...event, 
              name, 
              media: event.media || [] 
            };
          }) || []
        };
        setData(cleanData);
      })
      .catch((err) => {
        console.error("Gallery production pipeline tracking failed:", err);
      });
  }, []);

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
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, prevLightbox, nextLightbox]);

  const tabKey = activeTab === 'photos' ? 'photoEvents' : 'videoEvents';
  const events = data ? data[tabKey] : [];
  const visibleEvents = activeEvent === 'all' ? events : events.filter(e => e.id === activeEvent);

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
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── TOP HERO HEADER SECTION ── */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl md:text-5xl font-bold text-secondary-foreground mb-4"
          >
            <span className="contents">Gallery</span>
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

      {/* ── MAIN CONTENT GRID & FILTERS SECTION ── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-border overflow-hidden">
              <button 
                onClick={() => { setActiveTab('photos'); setActiveEvent('all'); }} 
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${ activeTab === 'photos' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground/70 hover:bg-muted' }`}
              >
                <Images size={16} /> Photos 
              </button>
              <button 
                onClick={() => { setActiveTab('videos'); setActiveEvent('all'); }} 
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${ activeTab === 'videos' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground/70 hover:bg-muted' }`}
              >
                <Video size={16} /> Videos 
              </button>
            </div>
          </div>

                 {/* Event Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button 
              onClick={() => setActiveEvent('all')} 
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${ activeEvent === 'all' ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-background text-foreground/70 border-border hover:bg-muted' }`}
            >
              All Events
            </button>
            {events.map(event => (
              <button 
                key={event.id} 
                onClick={() => setActiveEvent(event.id)} 
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${ activeEvent === event.id ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-background text-foreground/70 border-border hover:bg-muted' }`}
              >
                {event.name}
              </button>
            ))}
          </div>

          {/* Core Layout Containers */}
          {!data ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${activeTab}-${activeEvent}`} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                transition={{ duration: 0.3 }}
                className="space-y-14"
              >
                {visibleEvents.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No media available for this filter layout selection.
                  </div>
                ) : (
                  visibleEvents.map(event => (
                    activeTab === 'photos' ? (
                      <PhotoSectionView 
                        key={event.id} 
                        event={event} 
                        onImageClick={(items, idx) => setLightbox({ items, index: idx })} 
                      />
                    ) : (
                      <VideoSectionView key={event.id} event={event} />
                    )
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── INTERACTIVE EXPERT LIGHTBOX FRAME LAYOUT OVERLAY ── */}
      <AnimatePresence>
        {lightbox !== null && lightbox.items[lightbox.index] && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out" 
            onClick={() => setLightbox(null)}
          >
            {/* Close Button */}
            <button 
              onClick={() => setLightbox(null)} 
              className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-10 cursor-pointer"
            >
              <X size={22} />
            </button>
            
            {lightbox.items.length > 1 && (
              <>
                <button 
                  onClick={e => { e.stopPropagation(); prevLightbox(); }} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-10 cursor-pointer"
                >
                  <ChevronLeft size={26} />
                </button>
                <button 
                  onClick={e => { e.stopPropagation(); nextLightbox(); }} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-10 cursor-pointer"
                >
                  <ChevronRight size={26} />
                </button>
              </>
            )}

            <motion.div 
              key={lightbox.index} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              transition={{ duration: 0.2 }} 
              className="max-w-4xl max-h-[85vh] w-full text-center" 
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={lightbox.items[lightbox.index].src} 
                alt={lightbox.items[lightbox.index].caption ?? ''} 
                className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto" 
              />
              {lightbox.items[lightbox.index].caption && (
                <p className="text-white/70 text-sm text-center mt-3 font-medium bg-black/30 inline-block px-4 py-1.5 rounded-full mx-auto backdrop-blur-sm tracking-wide">
                  {lightbox.items[lightbox.index].caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security lock stylesheet overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        button[title*="Remove"], label[className*="cursor-pointer"] {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}} />
    </>
  );
}
