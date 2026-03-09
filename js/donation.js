/**
 * donation.js
 * Gestion du formulaire de don — copie des numéros Mobile Money
 */

/**
 * Copie le numéro dans le presse-papiers et affiche le toast de confirmation.
 * @param {HTMLButtonElement} btn    - Le bouton "Copier" cliqué
 * @param {string}            number - Le numéro à copier
 */
function copyNumber(btn, number) {
    const toast = document.getElementById('donToast');
    const msg   = document.getElementById('donToastMsg');

    const showFeedback = () => {
        btn.textContent = 'Copié !';
        btn.classList.add('copied');

        msg.textContent = number + ' copié !';
        toast.classList.add('show');

        setTimeout(() => {
            btn.textContent = 'Copier';
            btn.classList.remove('copied');
            toast.classList.remove('show');
        }, 2200);
    };

    // Clipboard API (navigateurs modernes)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(number)
            .then(showFeedback)
            .catch(() => fallbackCopy(number, showFeedback));
    } else {
        fallbackCopy(number, showFeedback);
    }
}

/**
 * Fallback execCommand pour les environnements sans Clipboard API.
 * @param {string}   text     - Texte à copier
 * @param {Function} callback - Callback appelé après la copie
 */
function fallbackCopy(text, callback) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
        document.execCommand('copy');
        if (typeof callback === 'function') callback();
    } catch (err) {
        console.warn('Copie impossible :', err);
    } finally {
        document.body.removeChild(ta);
    }
}