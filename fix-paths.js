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
      processDirectory(fullPath); // Recurse into subfolders
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      // 1. Remove any accidental "public/" prefixes inside image paths
      content = content.replace(/(src=["'`])public\//g, '$1/');
      content = content.replace(/(url\(["'`]?)public\//g, '$1/');

      // 2. Fix missing leading forward slashes for scattered folders
      const folders = ['media', 'assets', 'airo-assets', 'airo-assests', 'airo-assets/uploads/gallery'];
        // Fixes paths like src="media/... or src="./media/... changing them to src="/media/...
        const regexSrc = new RegExp(`(src=["'\` ]|href=["'\` ])(\\.\\/|\\.\\.\\/)?(${folder}\\/)`, 'g');
        content = content.replace(regexSrc, '$1/$3');
        
        // Fixes CSS background-image paths like url('media/... or url('./media/...
        const regexUrl = new RegExp(`(url\\(["'\` ]?)(\\.\\/|\\.\\.\\/)?(${folder}\\/)`, 'g');
        content = content.replace(regexUrl, '$1/$3');
      });

      // Save the file if changes were made
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`[Automated] Fixed paths in: ${path.relative(__dirname, fullPath)}`);
      }
    }
  });
}

console.log('Starting automated path correction...');
processDirectory(PAGES_DIR);
console.log('Path correction complete!');
