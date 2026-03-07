/**
 * navbar.js — Mega-dropdown toggle
 * Gère l'ouverture/fermeture des menus déroulants de la navbar.
 */

(function () {
    'use strict';

    const toggles   = document.querySelectorAll('.dropdown-toggle');
    const dropdowns = document.querySelectorAll('.mega-dropdown');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', e => {
            e.stopPropagation();

            const targetId       = 'mega-' + toggle.dataset.mega;
            const targetDropdown = document.getElementById(targetId);

            // Fermer tous les autres menus
            dropdowns.forEach(d => {
                if (d !== targetDropdown) d.classList.remove('open');
            });

            // Toggle le menu ciblé
            targetDropdown.classList.toggle('open');
        });
    });

    // Clic en dehors → ferme tout
    document.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('open'));
    });
})();