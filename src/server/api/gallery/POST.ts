import type { Request, Response } from 'express';
import { loadData, saveData } from './GET.js';

// POST /api/gallery — add event, remove event, add/remove media item
export default function handler(req: Request, res: Response) {
  const data = loadData();
  const { action, tab, eventId, eventName, mediaItem, mediaId } = req.body as {
    action: string;
    tab: 'photoEvents' | 'videoEvents';
    eventId?: string;
    eventName?: string;
    mediaItem?: { id: string; src: string; caption?: string };
    mediaId?: string;
  };

  const list = data[tab ?? 'photoEvents'];

  if (action === 'add_event' && eventName) {
    const id = eventName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    list.push({ id, name: eventName, media: [] });
  }

  if (action === 'remove_event' && eventId) {
    const idx = list.findIndex(e => e.id === eventId);
    if (idx !== -1) list.splice(idx, 1);
  }

  if (action === 'add_media' && eventId && mediaItem) {
    const event = list.find(e => e.id === eventId);
    if (event) event.media.push(mediaItem);
  }

  if (action === 'remove_media' && eventId && mediaId) {
    const event = list.find(e => e.id === eventId);
    if (event) event.media = event.media.filter(m => m.id !== mediaId);
  }

  saveData(data);
  res.json(data);
}
