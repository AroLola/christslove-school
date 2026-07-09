"use client"; 
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
  try {
    const res = await fetch('./gallery-data.json');
    return await res.json();
  } catch (e) {
    return { photoEvents: [], videoEvents: [] };
  }
}

// ── STANDALONE INJECTION-PROOF SUB-COMPONENTS ── // 
// Sub-Component A: Handles Photo Sections and Slideshows cleanly isolated from fix-paths regex 
function PhotoSectionView({ event, onImageClick }: { event: EventSection; onImageClick: (items: MediaItem[], idx: number) => void }) { 
  const [slideIdx, setSlideIdx] = useState(0); 

  useEffect(() => { 
    if (!event.media || event.media.length <= 1) return; 
    const interval = setInterval(() => { 
      setSlideIdx((prev) => (prev + 1) % event.media.length); 
    }, 4000); 
    return () => clearInterval(interval); 
  }, [event.media]); 

  const activeMedia = event.media || []; 
  const currentItem = activeMedia[slideIdx]; 

  if (activeMedia.length === 0) return null; 

  return ( 
    <div className="mb-14"> 
      <div className="flex items-center gap-3 mb-6"> 
        <FolderOpen size={20} className="text-primary shrink-0" /> 
        <h2>{event.name === 'Sports Day' ? 'Sports' : event.name}</h2> 
        <span className="text-muted-foreground text-sm">({activeMedia.length} photos)</span> 
        <div className="flex-1 h-px bg-border" /> 
      </div> 
      
      <div className="relative w-full h-56 md:h-80 rounded-xl overflow-hidden mb-4 shadow-md cursor-pointer" onClick={() => onImageClick(activeMedia, slideIdx)}> 
        <AnimatePresence mode="wait"> 
          {currentItem && ( 
            <motion.img key={slideIdx} src={currentItem.src} alt={currentItem.caption || ''} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} /> 
          )} 
        </AnimatePresence> 
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" /> 
        {currentItem?.caption && ( 
          <p className="absolute bottom-4 left-4 text-white font-semibold text-sm">{currentItem.caption}</p> 
        )} 
        {activeMedia.length > 1 && ( 
          <> 
            <div className="absolute bottom-4 right-4 flex gap-1.5"> 
              {activeMedia.map((_, i) => ( 
                <button key={i} onClick={(e) => { e.stopPropagation(); setSlideIdx(i); }} className={`w-2 h-2 rounded-full transition-colors ${i === slideIdx ? 'bg-white' : 'bg-white/40'}`} /> 
              ))} 
            </div> 
            <button onClick={(e) => { e.stopPropagation(); setSlideIdx((prev) => (prev - 1 + activeMedia.length) % activeMedia.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"> 
              <ChevronLeft size={18} /> 
            </button> 
            <button onClick={(e) => { e.stopPropagation(); setSlideIdx((prev) => (prev + 1) % activeMedia.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"> 
              <ChevronRight size={18} /> 
            </button> 
          </> 
        )} 
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2"> 
        {activeMedia.map((photo, i) => ( 
          <motion.div key={photo.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: i * 0.02 }} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-sm" onClick={() => onImageClick(activeMedia, i)}> 
            <img src={photo.src} alt={photo.caption || ''} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" /> 
          </motion.div> 
        ))} 
      </div> 
    </div> 
  ); 
} 

// Sub-Component B: Handles Video Albums safely separated from parent scope string match filters 
function VideoSectionView({ event }: { event: EventSection & { description?: string } }) { 
  const activeMedia = event.media || []; 
  if (activeMedia.length === 0) return null; 
  return ( 
    <div className="border-b border-secondary-foreground/5 pb-16 last:border-0 last:pb-0"> 
      <div className="mb-8 max-w-3xl"> 
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary mb-2 flex items-center gap-2"> 📁 {event.name} </h2> 
        {event.description && ( 
          <p className="text-muted-foreground text-base leading-relaxed"> {event.description} </p> 
        )} 
      </div> 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
        {activeMedia.map((video, i) => ( 
          <motion.div key={video.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: i * 0.03 }} className="relative rounded-lg overflow-hidden shadow-sm border border-border bg-card group flex flex-col justify-between" > 
            <div className="w-full aspect-video bg-black flex items-center justify-center overflow-hidden"> 
              <video src={video.src} className="w-full h-full object-cover" controls /> 
            </div> 
            {video.caption && ( 
              <div className="px-3 py-2.5 bg-background border-t border-border flex-grow"> 
                <p className="text-sm text-foreground/80 font-medium leading-relaxed"> {video.caption} </p> 
              </div> 
            )} 
          </motion.div> 
        ))} 
      </div> 
    </div> 
  ); 
} 

// Main Page Master Default Export Component Wrapper 
export default function GalleryPage() { 
  const title = "Gallery — Christ's Love Christian School"; 
  const description = "Browse photos and videos from Christ's Love Christian School — classroom moments, events, and community life."; 
  const canonicalUrl = `${site}/gallery`; 
  
  const [data, setData] = useState<GalleryData | null>(null); 
  const [activeTab, setActiveTab] = useState<Tab>('photos'); 
  const [activeEvent, setActiveEvent] = useState<string>('all'); 
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null); 

  useEffect(() => { 
    fetchGallery().then((rawData) => { 
      if (!rawData) return; 
      const cleanData = { 
        ...rawData, 
        photoEvents: rawData.photoEvents?.map((event: any) => { 
          let name = event.name; 
          if (name === 'Sports Day' || event.id === 'sports') name = 'Sports'; 
          if (event.id === 'school-life' || name === 'School' || name === 'School Life Portfolio') name = 'School Life'; 
          return { ...event, name, media: event.media || [] }; 
        }) || [], 
        videoEvents: rawData.videoEvents?.map((event: any) => { 
          let name = event.name; 
          if (name === 'Sports Day' || event.id === 'sports') name = 'Sports'; 
          return { ...event, name, media: event.media || [] }; 
        }) || [] 
      }; 
      setData(cleanData); 
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
                {event.name === 'Sports Day' ? 'Sports' : event.name} 
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
                key={activeTab + activeEvent} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                transition={{ duration: 0.3 }} 
                className="space-y-14" 
              > 
                {visibleEvents.map(event => ( 
                  activeTab === 'photos' ? ( 
                    <PhotoSectionView key={event.id} event={event} onImageClick={(items, idx) => setLightbox({ items, index: idx })} /> 
                  ) : ( 
                    <VideoSectionView key={event.id} event={event} /> 
                  ) 
                ))} 
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
            {/* Close Button - Triggers state clear correctly */}
            <button 
              onClick={() => setLightbox(null)} 
              className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-10 cursor-pointer" 
            > 
              <X size={22} /> 
            </button> 
            
            {lightbox.items.length > 1 && ( 
              <> 
                <button onClick={e => { e.stopPropagation(); prevLightbox(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-10 cursor-pointer" > <ChevronLeft size={26} /> </button> 
                <button onClick={e => { e.stopPropagation(); nextLightbox(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 z-10 cursor-pointer" > <ChevronRight size={26} /> </button> 
              </> 
            )} 
            
            <motion.div key={lightbox.index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="max-w-4xl max-h-[85vh] w-full" onClick={e => e.stopPropagation()} > 
              <img src={lightbox.items[lightbox.index].src} alt={lightbox.items[lightbox.index].caption ?? ''} className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" /> 
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
      <style dangerouslySetInnerHTML={{ __html: ` button[title*="Remove"], label[className*="cursor-pointer"] { display: none !important; opacity: 0 !important; pointer-events: none !important; } `}} /> 
    </> 
  ); 
}
