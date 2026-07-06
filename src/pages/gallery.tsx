import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaItem {
  id: string;
  src: string;
  caption?: string;
}

interface EventSection {
  id: string;
  name: string;
  media: MediaItem[];
}

export function PhotoSectionView({ event, onImageClick }: { event: EventSection; onImageClick: (items: MediaItem[], idx: number) => void }) {
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
        <h2 className="text-2xl font-bold text-white">{event.name === 'Sports Day' ? 'Sports' : event.name}</h2>
        <span className="text-muted-foreground text-sm">({activeMedia.length} photos)</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="relative w-full h-56 md:h-80 rounded-xl overflow-hidden mb-4 shadow-md cursor-pointer" onClick={() => onImageClick(activeMedia, slideIdx)}>
        <AnimatePresence mode="wait">
          {currentItem && (
            <motion.img
              key={slideIdx}
              src={currentItem.src.startsWith('hhttps') ? currentItem.src.replace('hhttps://', 'https://') : currentItem.src}
              alt={currentItem.caption || ''}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {currentItem?.caption && (
          <p className="absolute bottom-4 left-4 text-white font-semibold text-sm drop-shadow-md">{currentItem.caption}</p>
        )}

        {activeMedia.length > 1 && (
          <>
            <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
              {activeMedia.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSlideIdx(i); }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === slideIdx ? 'bg-primary' : 'bg-white/40'}`}
                />
              ))}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setSlideIdx((prev) => (prev - 1 + activeMedia.length) % activeMedia.length); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors z-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setSlideIdx((prev) => (prev + 1) % activeMedia.length); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors z-10"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {activeMedia.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-sm"
            onClick={() => onImageClick(activeMedia, i)}
          >
            <img
              src={photo.src.startsWith('hhttps') ? photo.src.replace('hhttps://', 'https://') : photo.src}
              alt={photo.caption || ''}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function VideoSectionView({ event }: { event: EventSection & { description?: string } }) {
  const activeMedia = event.media || [];
  if (activeMedia.length === 0) return null;

  return (
    <div className="border-b border-white/5 pb-16 last:border-0 last:pb-0">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
          📁 {event.name}
        </h2>
        {event.description && (
          <p className="text-muted-foreground text-base leading-relaxed">
            {event.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeMedia.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="relative rounded-lg overflow-hidden shadow-sm border border-white/10 bg-white/5 backdrop-blur-sm group flex flex-col justify-between"
          >
            <div className="w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video
                src={video.src.startsWith('hhttps') ? video.src.replace('hhttps://', 'https://') : video.src}
                className="w-full h-full object-cover"
                controls
              />
            </div>
            {video.caption && (
              <div className="px-3 py-2.5 bg-black/40 border-t border-white/10 flex-grow">
                <p className="text-sm text-white/90 font-medium leading-relaxed">
                  {video.caption}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-midnight text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">School Gallery</h1>
        <p className="text-muted-foreground mb-8">Explore photos and videos from our events and activities.</p>
      </div>
    </div>
  );
}
