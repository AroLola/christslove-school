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

      // 1. Direct Swap: Point the Header Logo to the true, verified media folder asset path
      content = content.replace(
        /src=["']\/airo-assets\/images\/layouts\/header\/christs-love-christian-school[^"']*?["']/g,
        'src="/media/layouts-header-christs-love-christian-school-aea019d4.jpg"'
      );

      content = content.replace(
        /['"]\/airo-assets\/images\/layouts\/header\/christs-love-christian-school['"]/g,
        '"/media/layouts-header-christs-love-christian-school-aea019d4.jpg"'
      );

      // 2. Automated Footer Restoration: Find the footer structure and inject the true hashed image layout
      if (file.toLowerCase().includes('footer')) {
        // Look for common places AIRO leaves empty image spots or text-only fields and mount the logo
        if (!content.includes('layouts-footer-christs-love-christian-school-7f9e259a.jpg')) {
          // If a broken image tag exists, overwrite it directly
          if (content.includes('/airo-assets/images/layouts/footer/')) {
            content = content.replace(
              /src=["']\/airo-assets\/images\/layouts\/footer\/[^"']*?["']/g,
              'src="/media/layouts-footer-christs-love-christian-school-7f9e259a.jpg"'
            );
          } else {
            // Otherwise, inject a clean logo layout container right before the main footer closing section
            content = content.replace(/(<\/footer>)/i, `
              <div id="restored-footer-logo" className="flex justify-center items-center pb-6 border-b border-white/10 mb-6">
                <img src="/media/layouts-footer-christs-love-christian-school-7f9e259a.jpg" alt="Christ's Love Christian School Footer Logo" className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              $1
            `);
          }
        }
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Layout Fixed Permanently] Patched logo elements in: ${file}`);
      }
    }
  });
}

console.log('Running direct header and footer logo link replacements...');
processDirectory(PAGES_DIR);
console.log('Logo alignment complete.');
