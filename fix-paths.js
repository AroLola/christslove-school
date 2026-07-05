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

      // 3. BASELINE FOOTER ALIGNMENT FIX
      if (file.toLowerCase().includes('footer')) {
        // Clear out any previous layout fragments to ensure clean injection loops
        content = content.replace(/<div id="restored-footer-logo"[\s\S]*?<\/div>/g, '');
        content = content.replace(/<div className="flex flex-col md:flex-row items-center md:items-start[\s\S]*?<\/div>\s*<\/div>/g, '');
        content = content.replace(/<div className="flex flex-col md:flex-row items-center md:items-baseline[\s\S]*?<\/div>\s*<\/div>/g, '');
        
        // Find the "Nurturing minds" container block and map the baseline flex rule
        if (content.includes('Nurturing minds')) {
          content = content.replace(
            /([<][p|div][^>]*?>\s*Nurturing minds[\s\S]*?<\/[p|div]>)/i,
            `<div className="flex flex-col md:flex-row items-center md:items-baseline gap-5 text-center md:text-left">
              <img 
                src="/media/layouts-footer-christs-love-christian-school-3f0c5b4e.jpg" 
                alt="Christ's Love Christian School Footer Logo" 
                className="h-16 w-auto object-contain shrink-0"
                onError={(e) => {
                  if (!e.currentTarget.src.includes('aea019d4')) {
                    e.currentTarget.src = "/media/layouts-header-christs-love-christian-school-aea019d4.jpg";
                  }
                }}
              />
              <div className="flex-1">$1</div>
            </div>`
          );
        }
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Baseline Alignment Applied] Adjusted layout properties within: ${file}`);
      }
    }
  });
}

console.log('Running baseline footer text alignment script...');
processDirectory(PAGES_DIR);
console.log('Alignment processing complete.');
