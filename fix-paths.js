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

      // 1. Swap the non-working domain name layout out for GoDaddy's live preview engine array target
      content = content.replace(/https:\/\/christslovechristianschool\.info\/airo-assets\/uploads\/gallery\//g, 'https://airoapp.ai');
      
      // 2. Catch alternative structural typos pointing to parent folders
      content = content.replace(/https:\/\/christslovechristianschool\.info\/media\//g, 'https://airoapp.ai');
      content = content.replace(/https:\/\/christslovechristianschool\.info\/assets\//g, 'https://airoapp.ai');

      // 3. Keep the working admissions page links untouched or restore them if broken
      content = content.replace(/https:\/\/ti1ev20vl7\.preview\.c36\.airoapp\.ai\/airo-assets\/uploads\/gallery-da93c89c/g, 'https://airoapp.aigallery-da93c89c');
      content = content.replace(/https:\/\/ti1ev20vl7\.preview\.c36\.airoapp\.ai\/airo-assets\/uploads\/gallery-7c88bb85/g, 'https://airoapp.aigallery-7c88bb85');

      // 4. Fallback filter rule for unmapped local relative text fragments
      const localPaths = ['/media/', 'media/', '/assets/', 'assets/', '/airo-assets/', 'airo-assets/'];
      localPaths.forEach(oldPath => {
        const regex = new RegExp(`(?<!https?:\\/\\/[^"']*?)src=["']${oldPath.replace(/\//g, '\\/')}(.*?\\.(jpg|jpeg|png|gif|webp|svg|mp4))["']`, 'g');
        content = content.replace(regex, 'src="https://airoapp.ai$1"');
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Gallery Mapping Sync] Patched master image slots inside: ${path.relative(__dirname, fullPath)}`);
      }
    }
  });
}

console.log('Running Master Gallery Link correction script...');
processDirectory(PAGES_DIR);
console.log('All homepage gallery blocks mapped to storage destinations successfully.');
