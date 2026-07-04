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

      // 1. First, temporarily clean up any double-http or corrupted links
      content = content.replace(/https:\/\/ti1ev20vl7\.preview\.c36\.airoapp\.ai\/airo-assets\/uploads\/gallery-da93c89c/g, 'https://airoapp.ai');
      content = content.replace(/https:\/\/ti1ev20vl7\.preview\.c36\.airoapp\.ai\/airo-assets\/uploads\/gallery-7c88bb85/g, 'https://airoapp.ai');

      // 2. Only rewrite broken local paths if they do NOT already start with http
      const localPaths = ['/media/', 'media/', '/assets/', 'assets/', '/airo-assets/', 'airo-assets/', '/airo-assests/', 'airo-assests/'];
      localPaths.forEach(oldPath => {
        // This regex ensures it only catches paths that do not have http/https in front of them
        const regex = new RegExp(`(?<!https?:\\/\\/[^"']*?)src=["']${oldPath.replace(/\//g, '\\/')}(.*?\\.(jpg|jpeg|png|gif|webp|svg|mp4))["']`, 'g');
        content = content.replace(regex, 'src="https://airoapp.ai"');
      });

      // 3. Fix any absolute source fallbacks for root directory mappings
      content = content.replace(/uploads\/gallery\/gallery\//g, 'uploads/gallery/');
      content = content.replace(/uploads\/gallery\/uploads\//g, 'uploads/');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Safe Asset Linker] Fixed file: ${path.relative(__dirname, fullPath)}`);
      }
    }
  });
}

console.log('Running Safe Asset Linker script...');
processDirectory(PAGES_DIR);
console.log('All image links synchronized safely.');
