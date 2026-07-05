import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, 'src');

// Define a client-side function that utilizes Vite dynamic lookups
const dynamicViteGalleryEngine = `
async function fetchGallery(): Promise<GalleryData> {
  // Leverage Vite's eager file-glob optimizer to read the public folder assets at compile time
  const imageModules = import.meta.glob('/public/airo-assets/uploads/gallery/*.{jpg,jpeg,png,svg,webp}', { eager: true, query: '?url' });
  const videoModules = import.meta.glob('/public/airo-assets/uploads/gallery/*.{mp4,webm,mov}', { eager: true, query: '?url' });

  const photosMedia = Object.keys(imageModules).map((filePath, index) => {
    const cleanUrl = filePath.replace('/public', '');
    // Auto-extract readable text naming contexts from file patterns
    const nameFragment = filePath.split('/').pop().split('.')[0].replace('gallery-', '').substring(0, 8);
    return {
      id: \`p_\${index}_\${nameFragment}\`,
      src: \`https://airoapp.ai\${cleanUrl}\`,
      caption: index === 0 ? "School Activity Layout" : \`School Event Asset \${index + 1}\`
    };
  });

  const videosMedia = Object.keys(videoModules).map((filePath, index) => {
    const cleanUrl = filePath.replace('/public', '');
    return {
      id: \`v_\${index}\`,
      src: \`https://airoapp.ai\${cleanUrl}\`,
      caption: \`School Video Highlight \${index + 1}\`
    };
  });

  return {
    photoEvents: [
      { id: "dynamic_photo_event", name: "School Photo Gallery Collections", media: photosMedia }
    ],
    videoEvents: [
      { id: "dynamic_video_event", name: "School Video Highlights", media: videosMedia }
    ]
  };
}
`;

function processDirectory(directory) {
  if (!fs.existsSync(directory)) return;
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const fullPath = path.join(directory, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      // Force the base layout site variable away from the broken production domain name
      content = content.replace(/const\s+site\s*=\s*['"]https:\/\/christslovechristianschool\.info['"]/g, "const site = 'https://airoapp.ai'");

      // Find the async fetchGallery block and swap it for our compiler engine
      if (content.includes("fetch('/api/gallery')") || content.includes('fetchGallery()')) {
        const fetchRegex = /async\s+function\s+fetchGallery\s*\(\s*\)[\s\S]*?\}\s*\}/g;
        if (fetchRegex.test(content)) {
          content = content.replace(fetchRegex, dynamicViteGalleryEngine);
        }
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Vite Glob Engine Injected] Unblocked empty data structures in: ${file}`);
      }
    }
  });
}

console.log('Deploying client-side automated file-glob compiler engine...');
processDirectory(PAGES_DIR);
console.log('Dynamic asset mapping pipeline finalized.');
