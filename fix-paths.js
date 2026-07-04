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

      // 1. Convert absolute GitHub raw URLs into our local proxy tunnel
      content = content.replace(/https:\/\/raw\.githubusercontent\.com\/AroLola\/christslove-school\/main\/public\//g, '/_github-assets/');
      content = content.replace(/https:\/\/raw\.githubusercontent\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\/main\/public\//g, '/_github-assets/');
      
      // 2. Wrap image src tags into the clean proxy format
      content = content.replace(/src=["'](.*?\.(jpg|jpeg|png|gif|webp|svg|mp4))["']/g, (match, p1) => {
        let cleanPath = p1.replace(/^\.\/|^\.\.\//, '').replace(/^public\//, '');
        if (!cleanPath.startsWith('/') && !cleanPath.startsWith('http') && !cleanPath.startsWith('_github-assets')) {
          cleanPath = '/' + cleanPath;
        }
        return `src={"\${window.location.origin}${cleanPath}"}`;
      });

      // 3. Fix structural folder names dynamically inside your code arrays
      content = content.replace(/(['"`])public\/(media|assets|airo-assets|airo-assests)\//g, '$1/$2/');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Proxy Automation] Transformed paths in: ${path.relative(__dirname, fullPath)}`);
      }
    }
  });
}

console.log('Running proxy route automation script...');
processDirectory(PAGES_DIR);
console.log('Proxy layout applied successfully.');
