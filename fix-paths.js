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

            // 1. Keep your working Header Logo perfectly intact
            content = content.replace(
                /src=["']\/airo-assets\/images\/layouts\/header\/christs-love-christian-school[^"']*?["']/g,
                'src="/media/layouts-header-christs-love-christian-school-aea019d4.jpg"'
            );

            // 2. Keep your working Our Community photo intact
            content = content.replace(
                /\/airo-assets\/images\/pages\/home\/students-enjoying-community-time-at-chri-2/g,
                '/assets/media/pages-home-faith-and-learning-at-christs-love-chris-b8f78293.jpg'
            );

            // 3. Keep your working high-alignment baseline Float Footer intact
            if (file.toLowerCase().includes('footer')) {
                content = content.replace(/<div id="restored-footer-logo"[\s\S]*?<\/div>/g, '');
                content = content.replace(/<div className="flex flex-col md:flex-row items-center md:items-start[\s\S]*?<\/div>\s*<\/div>/g, '');
                content = content.replace(/<div className="flex flex-col md:flex-row items-center md:items-baseline[\s\S]*?<\/div>\s*<\/div>/g, '');

                if (content.includes('Nurturing minds') && !content.includes('md:float-left')) {
                    content = content.replace(
                        /([<][p|div][^>]*?>\s*Nurturing minds[\s\S]*?<\/[p|div]>)/i,
                        `<div className="block clearfix md:text-left text-center">
                            <img src="/media/layouts-footer-christs-love-christian-school-3f0c5b4e.jpg" alt="Christ's Love Christian School Footer Logo" className="h-16 w-auto object-contain md:float-left md:mr-5 mb-4 md:mb-0 inline-block" onError={(e) => { if (!e.currentTarget.src.includes('aea019d4')) { e.currentTarget.src = "/media/layouts-header-christs-love-christian-school-aea019d4.jpg"; } }} />
                            <div className="md:-mt-1">$1</div>
                        </div>`
                    );
                }
            }

            // 4. GLOBAL DOMAIN MIRROR: Swap the broken domain for the working GoDaddy assets server
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

            // 6. TARGETED REPAIR FOR NEW MISSION PICTURE HASH CODE: Swaps old/corrupted file tags with your new working image
            if (file.toLowerCase().includes('index') || file.toLowerCase().includes('home')) {
                content = content.replace(
                    /src=["']\/assets\/media\/pages-home-values-c9779bb4\.jpg["']/g,
                    'src="/assets/media/pages-home-values-a45fcfc4.jpg"'
                );
                content = content.replace(
                    /src=["']https:\/\/www\.christslovechristianschool\.info\/assets\/media\/pages-home-values-c9779bb4\.jpg["']/g,
                    'src="/assets/media/pages-home-values-a45fcfc4.jpg"'
                );
                content = content.replace(
                    /src=["']\/media\/pages-home-values-c9779bb4\.jpg["']/g,
                    'src="/assets/media/pages-home-values-a45fcfc4.jpg"'
                );
                content = content.replace(/\/assets\/Media\/pages-home-values-c9779bb4\.jpg/g, '/assets/media/pages-home-values-a45fcfc4.jpg');
            }

                        // 7. PRECISION STAFF REPAIR: Fixes placeholders explicitly without touching real image assets
            const lowerFile = file.toLowerCase();
            if (lowerFile.includes('about') || lowerFile.includes('staff') || lowerFile.includes('index')) {
                
                // 1. Target the absolute exact broken placeholder string (with ending quote boundaries)
                // This ensures that strings ending in .jpg or .png are ignored entirely!
                const brokenRootPatternDouble = /"https:\/\/christslovechristianschool\.info\/airo-assets\/images\/layouts\/footer\/christs-love-christian-school"/g;
                const brokenRootPatternSingle = /'https:\/\/christslovechristianschool\.info\/airo-assets\/images\/layouts\/footer\/christs-love-christian-school'/g;
                
                const globalPlaceholderLogo = '"/assets/media/layouts-footer-christs-love-christian-school-2658fcbe.png"';

                // Apply global fallback logo to any profile that has absolutely no image path extension
                content = content.replace(brokenRootPatternDouble, globalPlaceholderLogo);
                content = content.replace(brokenRootPatternSingle, globalPlaceholderLogo);

                // 2. Specific Real Photo Upgrades for Jequiline and Maria
                // This manually swaps their logo placeholders out for the real files you uploaded
                if (content.includes('JEQUILINE')) {
                    content = content.replace(
                        /(JEQUILINE\s+LIVIMBA[\s\S]*?imageUrl:\s*["'])\/assets\/media\/layouts-footer-christs-love-christian-school-2658fcbe\.png(["'])/i,
                        `$1/assets/media/jequiline-livimba.jpg$2`
                    );
                }

                if (content.includes('MARIA')) {
                    content = content.replace(
                        /(MARIA\s+O\.\s+AUKHUMES[\s\S]*?imageUrl:\s*["'])\/assets\/media\/layouts-footer-christs-love-christian-school-2658fcbe\.png(["'])/i,
                        `$1/assets/media/maria-aukhumes.jpg$2`
                    );
                }
            }


console.log('Running final asset sync loop with integrated placeholder parameters...');
processDirectory(PAGES_DIR);
console.log('Processing complete.');
