document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://defi-admin-back-end.onrender.com/api/items";
    const container = document.getElementById("projects-container");

    try {
        const response = await axios.get(API_URL);
        const items = response.data;

        container.innerHTML = "";

        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "project-card-container";

            card.addEventListener("click", () => {
                window.location.href = `details.html?id=${item.id}`;
            });

            const preview =
                item.contenu.length > 100
                    ? item.contenu.substring(0, 100) + "..."
                    : item.contenu;

            card.innerHTML = `
                <img src="${item.imageUrl || 'assets/placeholder.jpg'}" alt="${item.name}" class="project-card">
                <div class="card-content">
                    <h3 class="card-title">${item.name}</h3>
                    <p>${preview}</p>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error("Erreur de chargement :", err);
        container.innerHTML = '<p style="color:red;">Impossible de charger les projets.</p>';
    }
});
