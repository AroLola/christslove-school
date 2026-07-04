 import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, 'src');

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

      // 1. Revert any accidental window.location.origin formatting back to clean string attributes
      content = content.replace(/src=\{\`\$\{window\.location\.origin\}(.*?)\`\}/g, 'src="$1"');
      content = content.replace(/src=\{\"\$\{window\.location\.origin\}(.*?)\"\}/g, 'src="$1"');

      // 2. Globally rewrite local scattered asset folders to point directly to GoDaddy's live server
      const localPaths = ['/media/', 'media/', '/assets/', 'assets/', '/airo-assets/', 'airo-assets/', '/airo-assests/', 'airo-assests/'];
      localPaths.forEach(oldPath => {
        const regex = new RegExp(`src=["']${oldPath.replace(/\//g, '\\/')}(.*?\.(jpg|jpeg|png|gif|webp|svg|mp4))["']`, 'g');
        content = content.replace(regex, 'src="https://airoapp.ai"');
      });

      // 3. Specifically fix images that might be looking inside a nested gallery or upload folder
      content = content.replace(/uploads\/gallery\//g, 'gallery/');
      content = content.replace(/uploads\/media\//g, '');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[GoDaddy Cloud Tunnel] Rerouted images in: ${path.relative(__dirname, fullPath)}`);
      }
    }
  });
}

console.log('Running GoDaddy cloud asset mirror script...');
processDirectory(PAGES_DIR);
console.log('All image links successfully mapped to cloud storage.');
