// EmailJS
(function () {
    emailjs.init("X1PL2aPIO9Ba30Gyc");
})();

const contactForm = document.getElementById("contact-form");

function showNotification(message, isError = false) {
    const notif = document.getElementById("notification");
    notif.textContent = message;
    notif.className = "notification show" + (isError ? " error" : "");
    setTimeout(() => notif.className = "notification", 3000);
}

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        from_name: document.getElementById("from_name").value.trim(),
        from_email: document.getElementById("from_email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message-text").value.trim()
    };

    data.message_html = data.message.replace(/\n/g, "<br>");

    emailjs
        .send("service_m395mqh", "template_2gym8bu", data)
        .then(() => {
            showNotification("Message envoyé avec succès !");
            contactForm.reset();
        })
        .catch(err => {
            showNotification("Erreur lors de l'envoi : " + (err.text || "Voir console."), true);
        });
});
