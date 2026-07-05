import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

const site = 'https://christslovechristianschool.info';

type MediaItem = { id: string; src: string; caption?: string };
type EventSection = { id: string; name: string; media: MediaItem[] };
type GalleryData = { photoEvents: EventSection[]; videoEvents: EventSection[] };

const INITIAL_DATA: GalleryData = {
  photoEvents: [
    { id: "e1", name: "School Highlights", media: [] }
  ],
  videoEvents: [
    { id: "v1", name: "School Videos", media: [] }
  ]
};

export default function GalleryPage() {
  const title = "Gallery — Christ's Love Christian School";
  const [data] = useState<GalleryData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  const events = activeTab === 'photos' ? data.photoEvents : data.videoEvents;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={`${site}/gallery`} />
      </Helmet>

      <header className="text-center py-12 bg-secondary rounded-xl mb-8">
        <h1 className="text-4xl font-bold mb-2">School Gallery</h1>
        <p className="text-muted-foreground">Welcome to Christ's Love Christian School gallery view.</p>
      </header>

      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('photos')} 
          className={`px-6 py-2 rounded-lg font-semibold ${activeTab === 'photos' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
        >
          Photos
        </button>
        <button 
          onClick={() => setActiveTab('videos')} 
          className={`px-6 py-2 rounded-lg font-semibold ${activeTab === 'videos' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
        >
          Videos
        </button>
      </div>

      <main className="space-y-8">
        {events.map(event => (
          <div key={event.id} className="border-b border-border pb-6 last:border-0">
            <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
            <p className="text-sm text-muted-foreground italic">No media uploads available yet.</p>
          </div>
        ))}
      </main>
    </div>
  );
}


