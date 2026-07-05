import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 🛡️ Safe Runtime Element Tracker Bypasser */}
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
