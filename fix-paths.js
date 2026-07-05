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

      // 1. Fix the Header Logo extension layout block directly
      content = content.replace(
        /\/airo-assets\/images\/layouts\/header\/christs-love-christian-school(?!"|\.png|\.jpg|\.svg)/g,
        '/airo-assets/images/layouts/header/christs-love-christian-school.png'
      );

      // 2. Clear out any accidental broken custom domain attachments on the header path
      content = content.replace(
        /https:\/\/christslovechristianschool\.info\/airo-assets\/images\/layouts\/header\/christs-love-christian-school\.png/g,
        '/airo-assets/images/layouts/header/christs-love-christian-school.png'
      );

      // 3. Fix the Homepage Values image extension we found earlier
      content = content.replace(
        /pages-home-values-c9779bb4(?!"|\.png|\.jpg|\.jpeg)/g,
        'pages-home-values-c9779bb4.jpg'
      );

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Logo & Extension Fix] Patched string references inside: ${file}`);
      }
    }
  });
}

console.log('Running extensionless string correction script...');
processDirectory(PAGES_DIR);
console.log('Logo alignment processing complete.');
