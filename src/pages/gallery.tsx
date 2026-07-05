import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Images, Video, FolderOpen } from 'lucide-react';

type MediaItem = { id: string; src: string; caption?: string };
type EventSection = { id: string; name: string; media: MediaItem[] };
type Tab = 'photos' | 'videos';

// ── 1. CLEAN STATIC DATA LAYER ──────────────────────────────────────────────
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
        { id: "m-1", src: "https://airoapp.ai", caption: "Volleyball - Under-13 Girls bring home Silver medals." },
        { id: "m-2", src: "https://airoapp.ai", caption: "Volleyball - Under-15 Boys receiving their Silver medals." },
        { id: "m-3", src: "https://airoapp.ai", caption: "Volleyball - Under-15 Girls. Silver medalists." },
        { id: "m-4", src: "https://airoapp.ai", caption: "Melissa Angala and Agnes Sabuta shared with NBC their thoughts on Cricket Namibia Women’s Week." },
        { id: "m-5", src: "https://airoapp.ai", caption: "Bishop Elizabeth Arowolo visits CLCS to encourage and pray for the students." },
        { id: "m-6", src: "https://airoapp.ai", caption: "CLCS celebrates her 15 year anniversary with song and dance presentations." },
        { id: "m-7", src: "https://airoapp.ai", caption: "CLCS celebrates 15 years of scholarship, spiritual discipline, and excellence." },
        { id: "m-8", src: "https://airoapp.ai", caption: "CLCS celebrates 15 years of scholarship, spiritual discipline, and excellence." },
        { id: "m-9", src: "https://airoapp.ai", caption: "CLCS celebrates 15 years of academic excellence, spiritual growth, and grit." },
        { id: "m-10", src: "https://airoapp.ai", caption: "Bishop Elizabeth Arowolo teaches learners the song: 'Everywhere He Went, He Was Doing Good.'" },
        { id: "m-11", src: "https://airoapp.ai", caption: "Christ’s Love Christian School received a special visit and Bible donations from Gideon's Namibia." },
        { id: "m-12", src: "https://airoapp.ai", caption: "Netball Team hurdles to lift each other's spirits." }
      ]
    }
  ]
};

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('photos');
  const [activeEvent, setActiveEvent] = useState<string>('all');
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null);
  const [slideIndices, setSlideIndices] = useState<Record<string, number>>({});

  // Auto-slideshow loop
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

  // Set document title natively for Vite SPAs
  useEffect(() => {
    document.title = "Gallery — Christ's Love Christian School";
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <section className="bg-slate-100 py-16 md:py-20 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Gallery</h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            A glimpse into life at Christ's Love Christian School
          </p>
        </div>
      </section>

      {/* Main Controls Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
              <button 
                onClick={() => { setActiveTab('photos'); setActiveEvent('all'); }} 
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all ${activeTab === 'photos' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Images size={16} /> Photos
              </button>
              <button 
                onClick={() => { setActiveTab('videos'); setActiveEvent('all'); }} 
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all ${activeTab === 'videos' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Video size={16} /> Videos
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button 
              onClick={() => setActiveEvent('all')} 
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${activeEvent === 'all' ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              All Events
            </button>
            {events.map(event => (
              <button 
                key={event.id} 
                onClick={() => setActiveEvent(event.id)} 
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${activeEvent === event.id ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
              >
                {event.name}
              </button>
            ))}
          </div>

          {/* Grids / Media Display */}
          <div className="space-y-14">
            {visibleEvents.map(event => {
              const slideIdx = slideIndices[event.id] ?? 0;
              if (event.media.length === 0) return null;

              return (
                <div key={event.id} className="border-b border-gray-100 pb-10 last:border-none">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <FolderOpen size={20} className="text-blue-900 shrink-0" />
                    <h2 className="text-xl font-bold text-slate-800">{event.name}</h2>
                    <span className="text-gray-500 text-sm">({event.media.length} {activeTab === 'photos' ? 'photo' : 'video'}{event.media.length !== 1 ? 's' : ''})</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {activeTab === 'photos' ? (
                    <div>
                      {/* Slideshow Frame */}
                      <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-4 shadow-sm bg-black group cursor-pointer" onClick={() => openLightbox(event.media, slideIdx)}>
                        <img 
                          src={event.media[slideIdx].src} 
                          alt={event.media[slideIdx].caption ?? ''} 
                          className="w-full h-full object-cover transition-opacity duration-300" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
