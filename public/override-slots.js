/**
 * override-slots.js - Pure JavaScript Bypasser
 * Bypasses all compilation blocks and handles element patches dynamically at runtime.
 */
(function () {
  function forcePatchElement(element) {
    if (!element || element.hasAttribute('data-overridden')) return;

    // Direct object lookup bypasses structural HTMLElement restrictions
    var currentSrc = element.getAttribute('src') || element.src;
    if (!currentSrc) return;

    var parentNode = element.parentNode;
    if (!parentNode) return; // Null trap safety

    // Detect if this is a video asset hidden under an image extension
    if (currentSrc.includes('/airo-assets/images/')) {
      var videoSrc = currentSrc.replace('/airo-assets/images/', '/airo-assets/videos/');
      
      var video = document.createElement('video');
      video.src = videoSrc;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.setAttribute('playsinline', '');
      
      // Mirror styles safely without layout breaks
      if (element.className) video.className = element.className;
      if (element.style.cssText) video.style.cssText = element.style.cssText;

      video.setAttribute('data-overridden', 'true');
      element.setAttribute('data-overridden', 'true');
      element.style.display = 'none';

      parentNode.insertBefore(video, element.nextSibling);
    }
  }

  // Runtime observer that ignores frame layers and window prototypes
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var added = mutations[i].addedNodes;
      for (var j = 0; j < added.length; j++) {
        var node = added[j];
        if (node.nodeType === 1) {
          if (node.tagName === 'IMG') forcePatchElement(node);
          var nested = node.querySelectorAll('img');
          for (var k = 0; k < nested.length; k++) {
            forcePatchElement(nested[k]);
          }
        }
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
