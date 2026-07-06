"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, ChevronLeft, ChevronRight, Images, Video,
  FolderOpen, Plus, Trash2, Upload, PlusCircle,
} from 'lucide-react';


const site = 'https://christslovechristianschool.info';


type MediaItem = { id: string; src: string; caption?: string };
type EventSection = { id: string; name: string; media: MediaItem[] };
type GalleryData = { photoEvents: EventSection[]; videoEvents: EventSection[] };
type Tab = 'photos' | 'videos';


async function fetchGallery(): Promise<GalleryData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/gallery`);
  return res.json();
}


async function mutateGallery(body: object): Promise<GalleryData> {
  const res = await fetch('/api/gallery', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}


async function uploadFile(file: File): Promise<string> {
  // Use FormData for multipart upload — avoids JSON body size limits
  const formData = new FormData();
  formData.append('file', file);
  formData.append('filename', file.name);


  const res = await fetch('/api/gallery/upload-form', {
    method: 'POST',
    body: formData,
  });
  const json = await res.json();
  if (json.url) return json.url;
  throw new Error(json.error ?? 'Upload failed');
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
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [newEventName, setNewEventName] = useState('');
  const [showNewEvent, setShowNewEvent] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});








    useEffect(() => {
    fetchGallery().then((rawData) => {
      if (!rawData) return;


      const cleanData = {
        ...rawData,
        photoEvents: rawData.photoEvents?.map((event: any) => {
          let name = event.name;
          if (name === 'Sports Day' || event.id === 'sports') name = 'Sports';
          if (event.id === 'school-life' || name === 'School' || name === 'School Life Portfolio') name = 'School Life';
         
          return {
            ...event,
            name,
            media: event.media?.filter((m: any) => m.src && m.src.trim() !== '') || []
          };
        }) || [],
        videoEvents: rawData.videoEvents?.map((event: any) => {
          let name = event.name;
          if (name === 'Sports Day' || event.id === 'sports') name = 'Sports';
         
          return {
            ...event,
            name,
            media: event.media?.map((video: any) => {
              let caption = video.caption || '';
             
              // --- WRITE YOUR FREE CUSTOM DESCRIPTIONS HERE ---
              if (video.id === 'school-videos') {
                caption = 'Highlights from our annual school life activities and student community events.';
              } else if (video.id === 'm-1782774757107-0.9459343479658033') {
                caption = 'Volleyball - Under-13 Girls bring home Silver medals.';
              } else if (video.id === 'm-1782775590001-0.1972598469754525') {
                caption = 'Volleyball - Under-15 Boys receiving their Silver medals.';
              } else if (video.id === 'm-1782776081095-0.007960250631391386') {
                caption = 'Volleyball - Under-15 Girls. Silver medalists.';
              } else if (video.id === 'm-1781846539942-0.17936122800190435') {
                caption = 'Melissa Angala and Agnes Sabuta -- Christ’s Love Christian School students -- shared with NBC how they feel about participating in the Cricket Namibia Women’s Week initiative.';
              } else if (video.id === 'm-1781821983590-0.4846056509140575') {
                caption = 'Bishop Elizabeth Arowolo, General Overseer of Christ\'s Love Ministries International, visits CLCS to encourage and pray for the students. Learners were taught powerful Bible verses and received precious insights duringfrom her message.';
              } else if (video.id === 'm-1781821649262-0.6870646931584803') {
                caption = 'CLCS celebrates her 15 year anniversary with song and dance presentations performed by our students.';
                 } else if (video.id === 'm-1781833626325-0.003148085022670166') {
                caption = 'CLCS celebrates 15 years of scholarship, spiritual discipline, and excellence.';
                 } else if (video.id === 'm-1781834214803-0.2855789584040125') {
                caption = 'CLCS celebrates 15 years of scholarship, spiritual discipline, and excellence.';
                 } else if (video.id === 'm-1781846165641-0.36769376614076177') {
                caption = 'CLCS celebrates 15 years of academic excellence, spiritual growth, and grit.';
                 } else if (video.id === 'm-1781832384820-0.8160704511283176') {
                caption = 'Bishop Elizabeth Arowolo, General Overseer of Christ\'s Love Ministries International, visits CLCS to encourage and pray for the students. In this clip, she teaches learners the song: "Everywhere He Went, He Was Doing Good.';
                 } else if (video.id === 'm-1781823985212-0.6261830448984771') {
                caption = 'Christ\’s Love Christian School received a special visit from Colyn Hendriks of Gideon\'s Namibia, who visited with a simple mission: To give. Bibles were donated to the school to support learners in their Christian Moral Education lessons.';
                 } else if (video.id === 'm-1781940668512-0.06618980910488659') {
                caption = 'Netball Team hurdles to lift each other\'s spirits.';
                 } else if (video.id === 'INSERT_YOUR_7TH_VIDEO_ID_HERE') {
                caption = 'Custom description for your seventh video goes here.';
                           } else {
                // Default fallback: Cleans up the text instantly while you gather your custom captions
                caption = video.caption || "Christ's Love Christian School Event";
              }




              return { ...video, caption };
            }).filter((m: any) => m.src && m.src.trim() !== '') || []
          };
        }) || []
      };


      setData(cleanData);
    });
  }, []);










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








  async function handleUpload(eventId: string, files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(prev => ({ ...prev, [eventId]: true }));
    try {
      for (const file of Array.from(files)) {
        const url = await uploadFile(file);
        const updated = await mutateGallery({
          action: 'add_media',
          tab: tabKey,
          eventId,
          mediaItem: { id: `m-${Date.now()}-${Math.random()}`, src: url, caption: '' },
        });
        setData(updated);
      }
    } finally {
      setUploading(prev => ({ ...prev, [eventId]: false }));
    }
  }








  async function handleRemoveMedia(eventId: string, mediaId: string) {
    const updated = await mutateGallery({ action: 'remove_media', tab: tabKey, eventId, mediaId });
    setData(updated);
  }








  async function handleAddEvent() {
    if (!newEventName.trim()) return;
    const updated = await mutateGallery({ action: 'add_event', tab: tabKey, eventName: newEventName.trim() });
    setData(updated);
    setNewEventName('');
    setShowNewEvent(false);
  }








  async function handleRemoveEvent(eventId: string) {
    if (!confirm('Remove this event section and all its photos?')) return;
    const updated = await mutateGallery({ action: 'remove_event', tab: tabKey, eventId });
    setData(updated);
    if (activeEvent === eventId) setActiveEvent('all');
  }








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








          {/* Event filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveEvent('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeEvent === 'all' ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-background text-foreground/70 border-border hover:bg-muted'}`}
            >
              All Events
            </button>
            {events.map(event => (
              <button
                key={event.id}
                onClick={() => setActiveEvent(event.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeEvent === event.id ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-background text-foreground/70 border-border hover:bg-muted'}`}
              >
                {event.name}
              </button>
            ))}
            
          </div>








          {/* New event input */}
          <AnimatePresence>
            {showNewEvent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2 justify-center mb-8"
              >
                <input
                  type="text"
                  value={newEventName}
                  onChange={e => setNewEventName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddEvent()}
                  placeholder="Event name (e.g. Sports Day 2025)"
                  className="border border-border rounded-lg px-4 py-2 text-sm w-64 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
                <button
                  onClick={handleAddEvent}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowNewEvent(false)}
                  className="border border-border px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            )}
          </AnimatePresence>








          {/* Event sections */}
          {!data ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + activeEvent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-14"
              >
                {visibleEvents.map(event => {
                  const slideIdx = slideIndices[event.id] ?? 0;
                  const isUploading = uploading[event.id];








                  return (
                    <div key={event.id}>
                      {/* Section heading */}
                      <div className="flex items-center gap-3 mb-6">
                        <FolderOpen size={20} className="text-primary shrink-0" />
                        <h2>{event.name === 'Sports Day' ? 'Sports' : event.name}</h2>
                        <span className="text-muted-foreground text-sm">({event.media.length} {activeTab === 'photos' ? 'photo' : 'video'}{event.media.length !== 1 ? 's' : ''})</span>
                        <div className="flex-1 h-px bg-border" />
                        {/* Upload button */}
                        <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${isUploading ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground hover:opacity-90'}`}>
                          {isUploading ? (
                            <><div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> Uploading…</>
                          ) : (
                            <><Upload size={13} /> Add {activeTab === 'photos' ? 'Photos' : 'Videos'}</>
                          )}
                          <input
                            ref={el => { fileInputRefs.current[event.id] = el; }}
                            type="file"
                            accept={activeTab === 'photos' ? 'image/*' : 'video/*'}
                            multiple
                            className="hidden"
                            onChange={e => handleUpload(event.id, e.target.files)}
                          />
                        </label>
                        {/* Remove event */}
                        <button
                          onClick={() => handleRemoveEvent(event.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
                          title="Remove event section"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>








                      {event.media.length === 0 ? (
                        <label className="flex flex-col items-center justify-center py-16 rounded-xl border-2 border-dashed border-border text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors group">
                          <PlusCircle size={36} className="text-muted-foreground/40 group-hover:text-primary mb-3 transition-colors" />
                          <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
                            Click to add {activeTab === 'photos' ? 'photos' : 'videos'} to {event.name}
                          </p>
                          <input
                            type="file"
                            accept={activeTab === 'photos' ? 'image/*' : 'video/*'}
                            multiple
                            className="hidden"
                            onChange={e => handleUpload(event.id, e.target.files)}
                          />
                        </label>
                      ) : activeTab === 'photos' ? (
                        <>
                          {/* Slideshow hero */}
                          <div
                            className="relative w-full h-56 md:h-80 rounded-xl overflow-hidden mb-4 shadow-md cursor-pointer"
                            onClick={() => openLightbox(event.media, slideIdx)}
                          >
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={slideIdx}
                                src={event.media[slideIdx].src}
                                alt={event.media[slideIdx].caption ?? ''}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                              />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                            {event.media[slideIdx].caption && (
                              <p className="absolute bottom-4 left-4 text-white font-semibold text-sm">{event.media[slideIdx].caption}</p>
                            )}
                            {event.media.length > 1 && (
                              <>
                                <div className="absolute bottom-4 right-4 flex gap-1.5">
                                  {event.media.map((_, i) => (
                                    <button
                                      key={i}
                                      onClick={e => { e.stopPropagation(); setSlideIndices(prev => ({ ...prev, [event.id]: i })); }}
                                      className={`w-2 h-2 rounded-full transition-colors ${i === slideIdx ? 'bg-white' : 'bg-white/40'}`}
                                    />
                                  ))}
                                </div>
                                <button onClick={e => { e.stopPropagation(); setSlideIndices(prev => ({ ...prev, [event.id]: (slideIdx - 1 + event.media.length) % event.media.length })); }} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors">
                                  <ChevronLeft size={18} />
                                </button>
                                <button onClick={e => { e.stopPropagation(); setSlideIndices(prev => ({ ...prev, [event.id]: (slideIdx + 1) % event.media.length })); }} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors">
                                  <ChevronRight size={18} />
                                </button>
                              </>
                            )}
                          </div>








                          {/* Thumbnail grid */}
                          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                            {event.media.map((photo, i) => (
                              <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.04 }}
                                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-sm"
                              >
                                <img
                                  src={photo.src}
                                  alt={photo.caption ?? ''}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  onClick={() => openLightbox(event.media, i)}
                                />
                                <button
                                  onClick={() => handleRemoveMedia(event.id, photo.id)}
                                  className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                                  title="Remove photo"
                                >
                                  <X size={11} />
                                </button>
                              </motion.div>
                            ))}
                          </div>
                        </>
                      ) : (
                        /* Video grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {event.media.map((video, i) => (
                            <motion.div
                              key={video.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="relative rounded-lg overflow-hidden shadow-sm border border-border group"
                            >
                             <video src={video.src} className="w-full aspect-video object-cover" controls />




{/* Permanent Visible Description Block */}
<div className="px-3 py-2.5 bg-background border-t border-border">
  <p className="text-sm text-foreground/80 font-medium leading-relaxed">
    {
      // --- VIDEO DESCRIPTION MAPPING ---
      // If a specific video has an explicit description saved, show it.
      // Otherwise, you can hardcode fallback descriptions by video ID right here!
      video.id === 'school-videos' ? 'Highlights from our annual school life activities and student community events.' :
     
      // Fallback: This reads the caption from the GoDaddy media upload window
      video.caption || 'Christ\'s Love Christian School Event'
    }
  </p>
</div>




<button onClick={() => handleRemoveMedia(event.id, video.id)} className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all" title="Remove video"
                              >
                                <X size={13} />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>








      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && lightbox.items[lightbox.index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-10">
              <X size={22} />
            </button>
            {lightbox.items.length > 1 && (
              <>
                <button onClick={e => { e.stopPropagation(); prevLightbox(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-10">
                  <ChevronLeft size={26} />
                </button>
                <button onClick={e => { e.stopPropagation(); nextLightbox(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-10">
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
              className="max-w-4xl max-h-[85vh] w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.items[lightbox.index].src}
                alt={lightbox.items[lightbox.index].caption ?? ''}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              {lightbox.items[lightbox.index].caption && (
                <p className="text-white/70 text-sm text-center mt-3">{lightbox.items[lightbox.index].caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
         </AnimatePresence>
   
    {/* Embedded CSS Guard to hide delete buttons from public visitors */}
    <style dangerouslySetInnerHTML={{ __html: `
      .hover\\:bg-red-600,
      button[title*="Remove"] {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `}} />
  </>
);
}























