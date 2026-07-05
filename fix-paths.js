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

      // 1. Transform the Header Logo tag into a smart self-healing fallback element
      if (file.toLowerCase().includes('header') && content.includes('/airo-assets/images/layouts/header/christs-love-christian-school')) {
        content = content.replace(
          /<img\s+src="\/airo-assets\/images\/layouts\/header\/christs-love-christian-school"[^>]*\/>/g,
          `<img 
            src="/airo-assets/images/layouts/header/christs-love-christian-school.png" 
            alt="Christ's Love Christian School" 
            className="h-14 md:h-16 w-auto object-contain shrink-0 self-center"
            onError={(e) => {
              if (!e.currentTarget.src.endsWith('.jpg')) {
                e.currentTarget.src = "/airo-assets/images/layouts/header/christs-love-christian-school.jpg";
              }
            }} 
          />`
        );
      }

      // 2. Apply the exact same fallback strategy to your Homepage Values asset box
      if (content.includes('pages-home-values-c9779bb4')) {
        content = content.replace(
          /src=["']([^"']*?pages-home-values-c9779bb4[^"']*?)["']/g,
          `src="/assets/media/pages-home-values-c9779bb4.jpg" onError={(e) => { if(!e.currentTarget.src.endsWith('.png')) { e.currentTarget.src = "/assets/media/pages-home-values-c9779bb4.png"; } }}`
        );
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Logo Strategy Tunneled] Injected safe fallbacks inside: ${file}`);
      }
    }
  });
}

console.log('Deploying automated extension file fallback routers...');
processDirectory(PAGES_DIR);
console.log('Fallback injection successfully complete.');
