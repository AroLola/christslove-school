import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export default function handler(req: Request, res: Response) {
  try {
    const { filename, data: base64Data } = req.body as {
      filename: string;
      data: string;
    };

    if (!base64Data || !filename) {
      return res.status(400).json({ error: 'Missing filename or data' });
    }

    const ext = path.extname(filename) || '.jpg';
    const safeName = `gallery-${randomUUID()}${ext}`;
    const uploadDir = '/shared-storage/public/assets/uploads/gallery';
    fs.mkdirSync(uploadDir, { recursive: true });

    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(uploadDir, safeName), buffer);

    res.json({ url: `/airo-assets/uploads/gallery/${safeName}` });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
