import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, 'src');
const PUBLIC_MEDIA_DIR = path.join(__dirname, 'public', 'assets', 'media');

// Step A: Dynamically scan the media folder and add .jpg to files missing extensions
if (fs.existsSync(PUBLIC_MEDIA_DIR)) {
  const files = fs.readdirSync(PUBLIC_MEDIA_DIR);
  files.forEach(file => {
    if (!file.includes('.')) {
      const oldPath = path.join(PUBLIC_MEDIA_DIR, file);
      const newPath = path.join(PUBLIC_MEDIA_DIR, `${file}.jpg`);
      fs.renameSync(oldPath, newPath);
      console.log(`[Extension Fix] Appended extension: ${file} -> ${file}.jpg`);
    }
  });
}

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

      // Ensure references to pages-home-values add the fixed extension natively
      content = content.replace(/pages-home-values-c9779bb4(?!"|\.jpg)/g, 'pages-home-values-c9779bb4.jpg');

      // Globally intercept local scattered layouts and convert them into absolute root directories
      content = content.replace(/(src=["'`])public\//g, '$1/');
      content = content.replace(/(src=["'`])assets\/media\//g, '$1/assets/media/');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Layout Linker] Rectified media extensions in: ${file}`);
      }
    }
  });
}

console.log('Running static file extension repair loop...');
processDirectory(PAGES_DIR);
console.log('Alignment processing complete.');
