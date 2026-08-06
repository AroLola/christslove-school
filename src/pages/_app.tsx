 import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  
  // 🛡️ Self-Healing Module Loader Interceptor
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      const errorMessage = event.message || '';
      
      // Catches both Vite-like module errors and Next.js / Webpack ChunkLoad Errors
      if (
        errorMessage.includes('Failed to fetch dynamically imported module') ||
        errorMessage.toLowerCase().includes('chunkloaderror') ||
        errorMessage.toLowerCase().includes('loading chunk')
      ) {
        console.warn('Stale build chunk detected. Forcing page refresh...');
        window.location.reload();
      }
    };

    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, []);

  return (
    <>
      {/* 🖼️ Safe Runtime Element Tracker Bypasser */}
      <script 
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var observer = new MutationObserver(function(mutations) {
                document.querySelectorAll('img').forEach(function(img) {
                  if (img.src.includes('gallery-') && !img.hasAttribute('data-bound')) {
                    img.setAttribute('data-bound', 'true');
                    img.style.cursor = 'pointer';
                    img.onclick = function() {
                      var modal = document.getElementById('tab-flyer-modal') || document.getElementById('global-gallery-modal');
                      var modalImg = document.getElementById('tab-flyer-modal-img') || document.getElementById('global-gallery-modal-img');
                      if (modal && modalImg) {
                        modalImg.src = img.src;
                        modal.style.display = 'flex';
                      }
                    };
                  }
                });
              });
              observer.observe(document.documentElement, { childList: true, subtree: true });
            })();
          `,
        }} 
      />
      <Component {...pageProps} />
    </>
  );
}
