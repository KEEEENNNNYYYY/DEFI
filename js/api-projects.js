document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://defi-admin-back-end.onrender.com/api/items";
    const container = document.getElementById("projects-container");

    try {
        const response = await axios.get(API_URL);
        const items = response.data.slice(0, 3);

        container.innerHTML = "";

        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "project-card-container";

            card.onclick = () => {
                window.location.href = `details.html?id=${item.id}`;
            };

            const preview = item.contenu.length > 100
                ? item.contenu.substring(0, 100) + "..."
                : item.contenu;

            card.innerHTML = `
                <img src="${item.imageUrl || 'assets/placeholder.jpg'}" class="project-card">
                <div class="card-content">
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-description">${preview}</p>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        container.innerHTML = '<p style="color:red;">Impossible de charger les projets.</p>';
    }
});

document.getElementById("see-more-btn")?.addEventListener("click", () => {
    window.location.href = "all-projects.html";
});
