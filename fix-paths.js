import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, 'src');

// Define a fully populated mock database using your working GoDaddy Airo assets
const mockGalleryDatabase = `
async function fetchGallery(): Promise<GalleryData> {
  return {
    photoEvents: [
      {
        id: "ev1",
        name: "School Admissions & Flyers",
        media: [
          { id: "p1", src: "https://airoapp.ai", caption: "2027 Admission Open" },
          { id: "p2", src: "https://airoapp.ai", caption: "2027 Admission Requirements" }
        ]
      },
      {
        id: "ev2",
        name: "Academic Competitions",
        media: [
          { id: "p3", src: "https://airoapp.ai", caption: "Maths Competition" },
          { id: "p4", src: "https://airoapp.ai", caption: "Maths and Science Prize" },
          { id: "p5", src: "https://airoapp.ai", caption: "Regional Spelling Bee Prize Winners" },
          { id: "p6", src: "https://airoapp.ai", caption: "Maths Gold Winners" },
          { id: "p7", src: "https://airoapp.ai", caption: "Maths Quiz Participants" },
          { id: "p8", src: "https://airoapp.ai", caption: "Regional Social Studies Quiz" }
        ]
      },
      {
        id: "ev3",
        name: "School Sports & Leadership",
        media: [
          { id: "p9", src: "https://airoapp.ai", caption: "U-13 Volleyball Champions" },
          { id: "p10", src: "https://airoapp.ai", caption: "U-13 Volleyball Champions Event" },
          { id: "p11", src: "https://airoapp.ai", caption: "Under-10 Netball" },
          { id: "p12", src: "https://airoapp.ai", caption: "Under-13 Volleyball Gold" },
          { id: "p13", src: "https://airoapp.ai", caption: "Principal's Comments" }
        ]
      }
    ],
    videoEvents: [
      {
        id: "v_ev1",
        name: "School Activities",
        media: [
          { id: "v1", src: "https://airoapp.ai", caption: "Campus Overview Tour" }
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

      // 1. Intercept the hardcoded site domain variable and set it to pull from GoDaddy storage rules natively
      content = content.replace(/const\s+site\s*=\s*['"]https:\/\/christslovechristianschool\.info['"]/g, "const site = 'https://airoapp.ai'");

      // 2. Intercept the broken API fetch function and overwrite it with our hardcoded database mapping
      if (content.includes("fetch('/api/gallery')") || content.includes('fetchGallery()')) {
        const fetchRegex = /async\s+function\s+fetchGallery\s*\(\s*\)[\s\S]*?\}\s*\}/g;
        if (fetchRegex.test(content)) {
          content = content.replace(fetchRegex, mockGalleryDatabase);
        } else {
          content = content.replace(/async\s+function\s+fetchGallery[\s\S]*?\{\s*const\s+res[\s\S]*?\}\x20*\}/g, mockGalleryDatabase);
        }
      }

      // 3. Fallback cleanups for static images linked across alternative component grids
      content = content.replace(/https:\/\/christslovechristianschool\.info\/airo-assets\/uploads\/gallery\//g, 'https://airoapp.ai/airo-assets/uploads/gallery/');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Database Injector] Bypassed broken site configuration and API routes in: ${path.relative(__dirname, fullPath)}`);
      }
    }
  });
}

console.log('Initializing custom site variable override and API route interception loop...');
processDirectory(PAGES_DIR);
console.log('Static data schema mapping applied successfully.');
