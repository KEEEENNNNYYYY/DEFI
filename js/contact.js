function showToast(msg) {
    const toast = document.getElementById('contactToast');
    toast.childNodes[1].textContent = ' ' + msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.classList.add('sending');
    btn.textContent = 'Envoi en cours…';

    // Simuler l'envoi (remplacer par EmailJS ou autre)
    setTimeout(() => {
        btn.classList.remove('sending');
        btn.innerHTML = `Envoyer le message
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>`;
        document.getElementById('contact-form').reset();
        showToast('Message envoyé avec succès !');
    }, 1800);
}