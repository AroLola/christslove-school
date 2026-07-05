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

      // 1. Point the Header Logo to the true, verified media folder asset path
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

      // 3. Homepage Grid Fix: Force broken placeholders to read your customized Faith & Learning image
      if (file.toLowerCase().includes('index') || file.toLowerCase().includes('home') || file.toLowerCase().includes('gallery')) {
        // Replace repeating volleyball placeholders with the true customized file path
        content = content.replace(
          /https:\/\/ti1ev20vl7\.preview\.c36\.airoapp\.ai\/airo-assets\/uploads\/gallery\/gallery-3d5bb981-706b-4276-81e5-ed182c595047\.jpg/g,
          '/assets/media/pages-home-faith-and-learning-at-christs-love-chris-b8f78293.jpg'
        );
        // Catch references looking for custom domains or alternative old fallback paths
        content = content.replace(
          /https:\/\/christslovechristianschool\.info\/airo-assets\/uploads\/gallery\/gallery-[A-Za-z0-9-]+\.(jpg|jpeg|png)/g,
          '/assets/media/pages-home-faith-and-learning-at-christs-love-chris-b8f78293.jpg'
        );
        content = content.replace(
          /\/assets\/media\/pages-home-community-457959e7\.jpg/g,
          '/assets/media/pages-home-faith-and-learning-at-christs-love-chris-b8f78293.jpg'
        );
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Faith & Learning Image Loaded] Linked customized asset inside: ${file}`);
      }
    }
  });
}

console.log('Running direct link replacements for logos and faith-and-learning image assets...');
processDirectory(PAGES_DIR);
console.log('Alignment processing complete.');
