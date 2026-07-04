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

      // 1. Remap the 12 broken gallery master slots from your old custom domain to GoDaddy's storage loop
      content = content.replace(/https:\/\/christslovechristianschool\.info\/airo-assets\/uploads\/gallery\//g, 'https://airoapp.ai');
      
      // 2. Fix the broken header logo reference strings dynamically
      content = content.replace(/src=["'](.*?)logo\.(png|jpg|jpeg|svg)["']/gi, 'src="https://airoapp.aigallery-da93c89c-81c8-4846-bdf8-9be9babd58f7.jpg"');

      // 3. Automated Footer Injection: Restore the erased footer logo if inside a Footer component structure
      if (file.toLowerCase().includes('footer') && !content.includes('id="restored-footer-logo"')) {
        content = content.replace(/(<\/footer>)/i, `
          <div id="restored-footer-logo" className="flex justify-center items-center pt-4 border-t border-white/10 mt-4">
            <img src="https://airoapp.aigallery-da93c89c-81c8-4846-bdf8-9be9babd58f7.jpg" alt="Christ's Love Christian School Logo" className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </div>
          $1
        `);
      }

      // 4. Fallback filter rule to preserve working admissions pages
      content = content.replace(/https:\/\/ti1ev20vl7\.preview\.c36\.airoapp\.ai\/airo-assets\/uploads\/gallery-da93c89c/g, 'https://airoapp.aigallery-da93c89c');
      content = content.replace(/https:\/\/ti1ev20vl7\.preview\.c36\.airoapp\.ai\/airo-assets\/uploads\/gallery-7c88bb85/g, 'https://airoapp.aigallery-7c88bb85');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[AIRO Restore Engine] Reconstructed layout paths inside: ${path.relative(__dirname, fullPath)}`);
      }
    }
  });
}

console.log('Initializing AIRO layout repair pipeline...');
processDirectory(PAGES_DIR);
console.log('All image arrays, header references, and footer elements successfully patched.');
