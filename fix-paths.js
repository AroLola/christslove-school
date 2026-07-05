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

      // 1. Direct Swap: Keep your working Header Logo perfectly intact
      content = content.replace(
        /src=["']\/airo-assets\/images\/layouts\/header\/christs-love-christian-school[^"']*?["']/g,
        'src="/media/layouts-header-christs-love-christian-school-aea019d4.jpg"'
      );
      content = content.replace(
        /['"]\/airo-assets\/images\/layouts\/header\/christs-love-christian-school['"]/g,
        '"/media/layouts-header-christs-love-christian-school-aea019d4.jpg"'
      );

      // 2. Targeted Community Image Fix: Keep your working Our Community photo intact
      content = content.replace(
        /\/airo-assets\/images\/pages\/home\/students-enjoying-community-time-at-chri-2/g,
        '/assets/media/pages-home-faith-and-learning-at-christs-love-chris-b8f78293.jpg'
      );

      // 3. FLOAT MARGIN ADJUSTMENT FIX: Pulls text up 3-4 lines to align with logo top
      if (file.toLowerCase().includes('footer')) {
        // Wipe all previous flex wrapper iterations cleanly to prevent injection blocks
        content = content.replace(/<div id="restored-footer-logo"[\s\S]*?<\/div>/g, '');
        content = content.replace(/<div className="flex flex-col md:flex-row items-center md:items-start[\s\S]*?<\/div>\s*<\/div>/g, '');
        content = content.replace(/<div className="flex flex-col md:flex-row items-center md:items-baseline[\s\S]*?<\/div>\s*<\/div>/g, '');
        content = content.replace(/<div className="flex flex-col md:flex-row items-center[\s\S]*?<\/div>\s*<\/div>/g, '');
        
        // Find the "Nurturing minds" container block and mount the high-alignment layout
        if (content.includes('Nurturing minds')) {
          content = content.replace(
            /([<][p|div][^>]*?>\s*Nurturing minds[\s\S]*?<\/[p|div]>)/i,
            `<div className="block clearfix md:text-left text-center">
              <img 
                src="/media/layouts-footer-christs-love-christian-school-3f0c5b4e.jpg" 
                alt="Christ's Love Christian School Footer Logo" 
                className="h-16 w-auto object-contain md:float-left md:mr-5 mb-4 md:mb-0 inline-block"
                onError={(e) => {
                  if (!e.currentTarget.src.includes('aea019d4')) {
                    e.currentTarget.src = "/media/layouts-header-christs-love-christian-school-aea019d4.jpg";
                  }
                }}
              />
              <div className="md:-mt-1">$1</div>
            </div>`
          );
        }
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Text Raised & Aligned] Updated layout properties within: ${file}`);
      }
    }
  });
}

console.log('Running text elevation layout script...');
processDirectory(PAGES_DIR);
console.log('Alignment processing complete.');
