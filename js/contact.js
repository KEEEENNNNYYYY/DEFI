// Initialisation EmailJS
emailjs.init("X1PL2aPIO9Ba30Gyc");

function showToast(msg, isError = false) {
    const toast = document.getElementById('contactToast');
    const icon = toast.querySelector('svg');

    // Icône succès ou erreur
    if (isError) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        toast.style.borderColor = 'rgba(239,68,68,0.5)';
        toast.style.background = '#3b0f0f';
    } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>';
        toast.style.borderColor = 'rgba(76,175,80,0.4)';
        toast.style.background = '';
    }

    // Mettre à jour le texte (nœud texte après le svg)
    const textNode = [...toast.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
    if (textNode) {
        textNode.textContent = ' ' + msg;
    } else {
        toast.appendChild(document.createTextNode(' ' + msg));
    }

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

function handleSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    btn.classList.add('sending');
    btn.innerHTML = `
        <svg style="width:16px;height:16px;animation:spin 1s linear infinite" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        Envoi en cours…`;

    const form = document.getElementById('contact-form');

    emailjs.sendForm("service_m395mqh", "template_2gym8bu", form)
        .then(() => {
            btn.classList.remove('sending');
            btn.innerHTML = `Envoyer le message
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>`;
            form.reset();
            showToast('Message envoyé avec succès !');
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            btn.classList.remove('sending');
            btn.innerHTML = `Envoyer le message
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>`;
            showToast("Échec de l'envoi. Réessayez.", true);
        });
}

// Animation spin pour le bouton
const style = document.createElement('style');
style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
document.head.appendChild(style);