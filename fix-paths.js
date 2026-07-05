import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, 'src');

// Rebuild the global static gallery engine by explicitly mounting your exposed cloud video assets
const advancedGalleryDatabase = `
async function fetchGallery(): Promise<GalleryData> {
  return {
    photoEvents: [
      {
        id: "ev1",
        name: "School Sports & Activities",
        media: [
          { id: "p1", src: "https://airoapp.ai", caption: "U13 Volleyball League" },
          { id: "p2", src: "https://airoapp.ai", caption: "Maths Competition Fallback" },
          { id: "p3", src: "https://airoapp.ai", caption: "Maths and Science Prize Fallback" }
        ]
      }
    ],
    videoEvents: [
      {
        id: "v_ev1",
        name: "School Activities & Ceremonies",
        media: [
          { id: "v1", src: "https://airoapp.ai", caption: "School Events" },
          { id: "v2", src: "https://airoapp.ai", caption: "15th Anniversary" },
          { id: "v3", src: "https://airoapp.ai", caption: "Gideon Namibia" },
          { id: "v4", src: "https://airoapp.ai", caption: "Prefect's Prayer Circle" },
          { id: "v5", src: "https://airoapp.ai", caption: "CLMI Bishop's Visit" },
          { id: "v6", src: "https://airoapp.ai", caption: "Sports Highlights" },
          { id: "v7", src: "https://airoapp.ai", caption: "SWAKOP YOUTH" }
        ]
      }
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

      // EXPOSURE DIAGNOSTIC SCANNER: Locate hidden image hash layouts and print them out during build logs
      const hashRegex = /gallery-[A-Za-z0-9-]+\.(jpg|jpeg|png)/g;
      let match;
      while ((match = hashRegex.exec(content)) !== null) {
        console.log(`[DIAGNOSTICS EXPOSURE] Found active image hash key: "${match[0]}" inside file: ${file}`);
      }

      // 1. Force your hardcoded domain settings to cleanly bridge variables over to active storage targets
      content = content.replace(/const\s+site\s*=\s*['"]https:\/\/christslovechristianschool\.info['"]/g, "const site = 'https://airoapp.ai'");

      // 2. Intercept the gallery grid database routine and patch it with the new video ID schema table
      if (content.includes("fetch('/api/gallery')") || content.includes('fetchGallery()')) {
        const fetchRegex = /async\s+function\s+fetchGallery\s*\(\s*\)[\s\S]*?\}\s*\}/g;
        if (fetchRegex.test(content)) {
          content = content.replace(fetchRegex, advancedGalleryDatabase);
        } else {
          content = content.replace(/async\s+function\s+fetchGallery[\s\S]*?\{\s*const\s+res[\s\S]*?\}\x20*\}/g, advancedGalleryDatabase);
        }
      }

      // 3. Automated routing fallback protection map for core gallery arrays
      content = content.replace(/https:\/\/christslovechristianschool\.info\/airo-assets\/uploads\/gallery\//g, 'https://airoapp.ai/airo-assets/uploads/gallery/');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Diagnostic Deploy] Successfully injected path alignment filters in: ${path.relative(__dirname, fullPath)}`);
      }
    }
  });
}

console.log('Deploying automated structural file data diagnostic scanner...');
processDirectory(PAGES_DIR);
console.log('Data alignment routine finalized.');
