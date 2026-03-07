/**
 * carousel.js — Nos valeurs
 * Conserve le système original slide-N (rotation des classes).
 * Ajoute : counter + barre de progression.
 */

(function () {
    'use strict';

    const slides         = document.querySelectorAll('#equipe .slide');
    const leftBtn        = document.querySelector('#equipe .arrow.left');
    const rightBtn       = document.querySelector('#equipe .arrow.right');
    const counterCurrent = document.querySelector('#equipe .counter-current');
    const counterTotal   = document.querySelector('#equipe .counter-total');
    const progressFill   = document.querySelector('#equipe .slider-progress-fill');

    if (!slides.length || !leftBtn || !rightBtn) return;

    const TOTAL = slides.length;

    if (counterTotal) counterTotal.textContent = TOTAL;

    function getActiveOriginalIndex() {
        const active = [...slides].find(s => s.classList.contains('slide-1'));
        return active ? parseInt(active.dataset.original || 1) : 1;
    }

    function updateUI() {
        const idx = getActiveOriginalIndex();
        if (counterCurrent) counterCurrent.textContent = idx;
        if (progressFill)   progressFill.style.width   = (idx / TOTAL * 100) + '%';
    }

    slides.forEach((slide, i) => { slide.dataset.original = i + 1; });

    function turnSlider(direction) {
        slides.forEach(slide => {
            const current = [...slide.classList].find(c => /^slide-\d+$/.test(c));
            if (!current) return;
            let index = parseInt(current.split('-')[1]);
            slide.classList.remove(current);
            index += direction;
            if (index < 1)     index = TOTAL;
            if (index > TOTAL) index = 1;
            slide.classList.add('slide-' + index);
        });
        updateUI();
    }

    leftBtn.addEventListener('click',  () => turnSlider(-1));
    rightBtn.addEventListener('click', () => turnSlider(1));
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  turnSlider(-1);
        if (e.key === 'ArrowRight') turnSlider(1);
    });

    updateUI();
})();