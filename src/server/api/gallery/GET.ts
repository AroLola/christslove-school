import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';

const DATA_FILE = '/private/gallery-data.json';

export type GalleryData = {
  photoEvents: EventSection[];
  videoEvents: EventSection[];
};

export type EventSection = {
  id: string;
  name: string;
  media: MediaItem[];
};

export type MediaItem = {
  id: string;
  src: string;
  caption?: string;
};

function defaultData(): GalleryData {
  return {
    photoEvents: [
      { id: 'school-life', name: 'School Life', media: [
        { id: 'sl1', src: '/assets/IMG_5755.jpg', caption: 'Students at school' },
        { id: 'sl2', src: '/assets/media/pages-home-values-c9779bb4.jpg', caption: 'Faith & Learning' },
        { id: 'sl3', src: '/assets/media/pages-home-community-457959e7.jpg', caption: 'Our Community' },
      ]},
      { id: 'sports-day', name: 'Sports Day', media: [] },
      { id: 'graduation', name: 'Graduation', media: [] },
      { id: 'chapel', name: 'Chapel & Worship', media: [] },
    ],
    videoEvents: [
      { id: 'school-videos', name: 'School Events', media: [] },
    ],
  };
}

export function loadData(): GalleryData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {}
  return defaultData();
}

export function saveData(data: GalleryData) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export default function handler(_req: Request, res: Response) {
  res.json(loadData());
}
