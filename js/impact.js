/**
 * impact.js
 * Gère l'interactivité de la section #impact :
 * - Switching des vidéos par tag (fade, non display:none)
 * - Mise à jour du texte de description
 * - Mise à jour du lien CTA
 * - Barre de progression (position du tag actif)
 * - Mise à jour du label sur la vidéo
 * - Ralentissement de la lecture vidéo
 */

(function () {
    'use strict';

    /* ── sélecteurs ── */
    const tags        = document.querySelectorAll('#impact .impact-tag');
    const videos      = document.querySelectorAll('#impact .impact-video');
    const description = document.getElementById('impact-description');
    const ctaLink     = document.getElementById('impact-link');
    const progressFill= document.querySelector('#impact .impact-progress-fill');
    const stageNum    = document.querySelector('#impact .stage-label-num');
    const stageText   = document.querySelector('#impact .stage-label-text');

    if (!tags.length) return; // section absente de la page

    const TOTAL = tags.length;

    /* ── init : ralentir toutes les vidéos ── */
    videos.forEach(v => {
        v.playbackRate = 0.55;
        v.muted = true;
        v.loop  = true;
    });

    /* ── utilitaire : index du tag actif ── */
    function getActiveIndex() {
        return [...tags].findIndex(t => t.classList.contains('active'));
    }

    /* ── mise à jour de la barre de progression ── */
    function updateProgress(index) {
        if (!progressFill) return;
        const pct = ((index + 1) / TOTAL) * 100;
        progressFill.style.width = pct + '%';
    }

    /* ── transition description (fade) ── */
    function updateDescription(text) {
        if (!description) return;
        description.classList.add('transitioning');
        setTimeout(() => {
            description.textContent = text;
            description.classList.remove('transitioning');
        }, 220);
    }

    /* ── mise à jour du label sur la vidéo ── */
    function updateStageLabel(num, label) {
        if (stageNum)  stageNum.textContent  = num;
        if (stageText) stageText.textContent = label;
    }

    /* ── activation d'un tag ── */
    function activateTag(clickedTag, index) {
        /* tags */
        tags.forEach(t => t.classList.remove('active'));
        clickedTag.classList.add('active');

        const selectedTag = clickedTag.dataset.tag;
        const text        = clickedTag.dataset.text  || '';
        const link        = clickedTag.dataset.link  || '#';
        const numLabel    = clickedTag.querySelector('.tag-num')?.textContent  || String(index + 1).padStart(2, '0');
        const textLabel   = clickedTag.querySelector('.tag-label')?.textContent || '';

        /* vidéos : crossfade via opacity (display:block sur toutes) */
        videos.forEach(v => {
            if (v.dataset.tag === selectedTag) {
                v.classList.add('active');
                v.currentTime = 0;
                v.play().catch(() => {}); // ignore autoplay policy errors
            } else {
                v.classList.remove('active');
                /* on ne met PAS pause() : évite le flash au retour */
            }
        });

        /* description */
        updateDescription(text);

        /* lien CTA */
        if (ctaLink) ctaLink.href = link;

        /* barre de progression */
        updateProgress(index);

        /* label vidéo */
        updateStageLabel(numLabel, textLabel);
    }

    /* ── event listeners ── */
    tags.forEach((tag, index) => {
        tag.addEventListener('click', () => activateTag(tag, index));

        /* accessibilité clavier */
        tag.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateTag(tag, index);
            }
        });
    });

    /* ── init : état du premier tag ── */
    const firstActive = document.querySelector('#impact .impact-tag.active');
    const firstIndex  = firstActive ? [...tags].indexOf(firstActive) : 0;
    updateProgress(firstIndex);

})();