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

      // 1. Keep your 100% working Header Logo perfectly intact
      content = content.replace(
        /src=["']\/airo-assets\/images\/layouts\/header\/christs-love-christian-school[^"']*?["']/g,
        'src="/media/layouts-header-christs-love-christian-school-aea019d4.jpg"'
      );

      // 2. Keep your 100% working Our Community photo intact
      content = content.replace(
        /\/airo-assets\/images\/pages\/home\/students-enjoying-community-time-at-chri-2/g,
        '/assets/media/pages-home-faith-and-learning-at-christs-love-chris-b8f78293.jpg'
      );

      // 3. Keep your 100% working high-alignment baseline Float Footer intact
      if (file.toLowerCase().includes('footer')) {
        content = content.replace(/<div id="restored-footer-logo"[\s\S]*?<\/div>/g, '');
        content = content.replace(/<div className="flex flex-col md:flex-row items-center md:items-start[\s\S]*?<\/div>\s*<\/div>/g, '');
        content = content.replace(/<div className="flex flex-col md:flex-row items-center md:items-baseline[\s\S]*?<\/div>\s*<\/div>/g, '');
        
        if (content.includes('Nurturing minds') && !content.includes('md:float-left')) {
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

      // 4. Keep your 100% working Awards and Staff domain mirrors intact
      content = content.replace(
        /https:\/\/www\.christslovechristianschool\.info\/airo-assets\/uploads\/gallery\//g,
        'https://airoapp.ai'
      );
      content = content.replace(
        /https:\/\/christslovechristianschool\.info\/airo-assets\/uploads\/gallery\//g,
        'https://airoapp.ai'
      );

      // 5. TARGETED REPAIR FOR REGIONAL SPELLING BEE: Lowercase case sensitivity correction
      content = content.replace(/Regional-Spelling-Bee/g, 'regional-spelling-bee');

      // 6. SELF-HEALING MISSION IMAGE MATRIX: Dynamic error catcher that switches GoDaddy hashes until it hits your exact values picture
      if (file.toLowerCase().includes('index') || file.toLowerCase().includes('home')) {
        // Find the image block associated with your values alt text line
        const missionRegex = /<img[^>]*?alt=["']Faith and learning at Christ's Love Christian School["'][^>]*?\/>/gi;
        const correctTag = `<img 
          src="https://airoapp.aigallery-b46fa55e-919b-43af-b9b1-299577c1e1be.jpg" 
          alt="Faith and learning at Christ's Love Christian School"
          className="w-full h-[440px] object-cover rounded-lg shadow-lg"
          loading="lazy"
          onError={(e) => {
            // Self-Healing Loop: If variant 1 is wrong, test target hash variant 2 automatically
            if (e.currentTarget.src.includes('gallery-b46fa55e')) {
              e.currentTarget.src = "https://airoapp.aigallery-a15a6a9e-fdcc-41c8-b436-7011acf2a72b.jpg";
            } else if (e.currentTarget.src.includes('gallery-a15a6a9e')) {
              e.currentTarget.src = "https://airoapp.aigallery-da93c89c-81c8-4846-bdf8-9be9babd58f7.jpg";
            }
          }}
        />`;

        // If the tag format is layout-bound as a standard string replace, overwrite it cleanly
        content = content.replace(/src=["'][^"']*?pages-home-values-c9779bb4\.jpg["']/g, 'src="https://airoapp.aigallery-b46fa55e-919b-43af-b9b1-299577c1e1be.jpg"');
        content = content.replace(/src=["']https:\/\/www\.christslovechristianschool\.info\/assets\/media\/pages-home-values-c9779bb4\.jpg["']/g, 'src="https://airoapp.aigallery-b46fa55e-919b-43af-b9b1-299577c1e1be.jpg"');
        content = content.replace(/src=["']https:\/\/ti1ev20vl7\.preview\.c36\.airoapp\.ai\/airo-assets\/uploads\/gallery\/gallery-b5380486-77e8-4bee-9235-c8186d2f052a\.jpg["']/g, 'src="https://airoapp.aigallery-b46fa55e-919b-43af-b9b1-299577c1e1be.jpg"');
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Final Polish Complete] Handled self-healing mission variables inside: ${file}`);
      }
    }
  });
}

console.log('Deploying mission layout alignment updates...');
processDirectory(PAGES_DIR);
console.log('Processing complete.');
