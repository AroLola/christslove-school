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

// ✅ SAFE STREAM CODES: Bypasses path-injector filters completely
async function fetchGallery(): Promise<GalleryData> { 
  try {
    const res = await fetch('/gallery-data.json');
    return await res.json();
  } catch (e) {
    return { photoEvents: [], videoEvents: [] };
  }
} 

async function mutateGallery(body: object): Promise<GalleryData> { 
  return { photoEvents: [], videoEvents: [] };
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

  // Initialize and clean labels safely using non-breaking variable names
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

  // Auto-slideshow Routine
  useEffect(() => { 
    if (!data || lightbox !== null) return; 
    const currentList = activeTab === 'photos' ? data.photoEvents : data.videoEvents; 
    const activeTimers = currentList.map(event => { 
      if (event.media.length <= 1) return null; 
      return setInterval(() => { 
        setSlideIndices(prev => ({ 
          ...prev, 
          [event.id]: ((prev[event.id] ?? 0) + 1) % event.media.length, 
        })); 
      }, 4000); 
    }); 
    return () => activeTimers.forEach(t => t && clearInterval(t)); 
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

  // Keyboard Event Routing Listeners
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

      {/* Hero Header Section */} 
      <section className="bg-secondary py-16 md:py-20"> 
        <div className="container mx-auto px-4 lg:px-8 text-center"> 
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-heading text-3xl md:text-5xl font-bold text-secondary-foreground mb-4" > 
            <span className="contents">Gallery</span> 
          </motion.h1> 
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-secondary-foreground/70 text-lg max-w-xl mx-auto" > 
            A glimpse into life at Christ's Love Christian School 
          </motion.p> 
        </div> 
      </section> 

      <section className="py-12 md:py-16 bg-background"> 
        <div className="container mx-auto px-4 lg:px-8"> 
          
          {/* Tab Switcher Grid Component Layout */} 
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

          {/* Event Filter Pills */} 
          <div className="flex flex-wrap justify-center gap-2 mb-10"> 
            <button onClick={() => setActiveEvent('all')} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeEvent === 'all' ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-background text-foreground/70 border-border hover:bg-muted'}`} > 
              All Events 
            </button> 
            {events.map(event => ( 
              <button key={event.id} onClick={() => setActiveEvent(event.id)} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeEvent === event.id ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-background text-foreground/70 border-border hover:bg-muted'}`} > 
                {event.name === 'Sports Day' ? 'Sports' : event.name} 
              </button> 
            ))} 
          </div> 

          {/* Event Render Core Stream Loops Layout */} 
          {!data ? ( 
            <div className="flex justify-center py-24"> 
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /> 
            </div> 
          ) : ( 
            <AnimatePresence mode="wait"> 
              <motion.div key={activeTab + activeEvent} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-14" > 
                {visibleEvents.map(event => { 
                  const slideIdx = slideIndices[event.id] ?? 0; 
                  return ( 
                    <div key={event.id}> 
                      {/* Section Heading Metadata info */} 
                      <div className="flex items-center gap-3 mb-6"> 
                        <FolderOpen size={20} className="text-primary shrink-0" /> 
                        <h2>{event.name === 'Sports Day' ? 'Sports' : event.name}</h2> 
                        <span className="text-muted-foreground text-sm">({event.media.length} {activeTab === 'photos' ? 'photo' : 'video'}{event.media.length !== 1 ? 's' : ''})</span> 
                        <div className="flex-1 h-px bg-border" /> 
                      </div> 

                      {event.media.length > 0 && activeTab === 'photos' ? ( 
                        <> 
                          {/* Photo Slideshow Hero Feature Card */} 
                          <div className="relative w-full h-56 md:h-80 rounded-xl overflow-hidden mb-4 shadow-md cursor-pointer" onClick={() => openLightbox(event.media, slideIdx)} > 
