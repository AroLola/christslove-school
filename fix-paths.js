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

      // 2. Point the Footer Logo to the true, verified media folder asset path
      if (file.toLowerCase().includes('footer')) {
        if (!content.includes('layouts-footer-christs-love-christian-school-7f9e259a.jpg')) {
          if (content.includes('/airo-assets/images/layouts/footer/')) {
            content = content.replace(
              /src=["']\/airo-assets\/images\/layouts\/footer\/[^"']*?["']/g,
              'src="/media/layouts-footer-christs-love-christian-school-7f9e259a.jpg"'
            );
          } else {
            content = content.replace(/(<\/footer>)/i, `
              <div id="restored-footer-logo" className="flex justify-center items-center pb-6 border-b border-white/10 mb-6">
                <img src="/media/layouts-footer-christs-love-christian-school-7f9e259a.jpg" alt="Christ's Love Christian School Footer Logo" className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              $1
            `);
          }
        }
      }

      // 3. TARGETED COMMUNITY IMAGE FIX: Target ONLY the extensionless path inside the Our Community block
      content = content.replace(
        /\/airo-assets\/images\/pages\/home\/students-enjoying-community-time-at-chri-2/g,
        '/assets/media/pages-home-faith-and-learning-at-christs-love-chris-b8f78293.jpg'
      );

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Targeted Repair] Placed Faith & Learning photo into Our Community section for: ${file}`);
      }
    }
  });
}

console.log('Running targeted community layout replacements...');
processDirectory(PAGES_DIR);
console.log('Alignment processing complete.');
