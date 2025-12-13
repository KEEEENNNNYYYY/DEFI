// Menu mobile
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
});

// Fermer quand on clique sur un lien
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });
});

// Chargement du projet
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");

    const detailContainer = document.getElementById("project-detail");

    if (!projectId) {
        detailContainer.innerHTML = "<p>Projet introuvable.</p>";
        return;
    }

    try {
        const API_URL = "https://defi-admin-back-end.onrender.com/api/items";
        const { data: items } = await axios.get(API_URL);

        const project = items.find(p => p.id == projectId);

        if (!project) {
            detailContainer.innerHTML = "<p>Projet introuvable.</p>";
            return;
        }

        detailContainer.innerHTML = `
            <img src="${project.imageUrl || 'assets/placeholder.jpg'}" class="article-image">

            <h1 class="article-title">${project.name}</h1>

            <div class="article-meta">
                Publié le ${new Date().toLocaleDateString("fr-FR")}
            </div>

            <div class="article-content">${project.contenu}</div>
        `;

        const btn = document.createElement("button");
        btn.textContent = "← Retour";
        btn.className = "back-btn";
        btn.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        detailContainer.appendChild(btn);

    } catch (err) {
        console.error(err);
        detailContainer.innerHTML = "<p>Impossible de charger les détails du projet.</p>";
    }
});
