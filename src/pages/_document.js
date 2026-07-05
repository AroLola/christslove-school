import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // Inject raw JavaScript directly into the browser shell to bypass compiling traps
  const bypassScript = `
    (function () {
      function forcePatchElement(element) {
        if (!element || element.hasAttribute('data-overridden')) return;
        var currentSrc = element.getAttribute('src') || element.src;
        if (!currentSrc) return;
        var parentNode = element.parentNode;
        if (!parentNode) return;

        if (currentSrc.includes('/airo-assets/images/')) {
          var videoSrc = currentSrc.replace('/airo-assets/images/', '/airo-assets/videos/');
          var video = document.createElement('video');
          video.src = videoSrc;
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          video.setAttribute('playsinline', '');
          if (element.className) video.className = element.className;
          if (element.style.cssText) video.style.cssText = element.style.cssText;

          video.setAttribute('data-overridden', 'true');
          element.setAttribute('data-overridden', 'true');
          element.style.setProperty('display', 'none', 'important');
          parentNode.insertBefore(video, element.nextSibling);
        }
      }

      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var added = mutations[i].addedNodes;
          for (var j = 0; j < added.length; j++) {
            var node = added[j];
            if (node.nodeType === 1) {
              if (node.tagName === 'IMG') forcePatchElement(node);
              var nested = node.querySelectorAll('img');
              for (var k = 0; k < nested.length; k++) { forcePatchElement(nested[k]); }
            }
          }
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    })();
  `;

  return (
    <Html lang="en">
      <Head>
        {/* dangerouslySetInnerHTML allows raw JS to run without strict TS checks */}
        <script dangerouslySetInnerHTML={{ __html: bypassScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
