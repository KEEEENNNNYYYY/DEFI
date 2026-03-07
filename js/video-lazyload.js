/**
 * video-lazyload.js — Chargement différé des vidéos de la section Impact
 * Les vidéos inactives ne chargent leur source que lorsque la section
 * devient visible dans le viewport (IntersectionObserver).
 */

(function () {
    'use strict';

    var lazyVideos = document.querySelectorAll('.impact-video[data-src]');

    function loadVideo(vid) {
        if (vid.dataset.src && !vid.querySelector('source')) {
            var source    = document.createElement('source');
            source.src    = vid.dataset.src;
            source.type   = 'video/mp4';
            vid.appendChild(source);
            vid.load();
        }
    }

    var impactSection = document.getElementById('impact');
    if (!impactSection || !lazyVideos.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                lazyVideos.forEach(loadVideo);
                observer.disconnect();
            }
        });
    }, { rootMargin: '200px' });

    observer.observe(impactSection);
})();