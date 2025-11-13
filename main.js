const API_URL = "http://localhost:5000/api/items";
const container = document.getElementById("projects-container");

async function loadProjects() {
    try {
        const response = await axios.get(API_URL);
        const items = response.data;
        const container = document.getElementById("projects-container");
        console.log("Container :", container);
        console.log("Réponse API :", response.data);

        container.innerHTML = ""; // Nettoyer avant d’ajouter les éléments

        items.forEach(item => {
            const card = document.createElement("div");
            card.className =
                "project-card-container hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 scale-in";

            card.innerHTML = `
        <img src="assets/800_5cdc003c680f4.jpg" alt="${item.name}" class="project-card">
        <div class="p-6 flex-1">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">${item.name}</h3>
          <p class="text-gray-600 leading-relaxed">Prix : ${item.price} Ar</p>
        </div>
      `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Erreur de chargement :", error);
        container.innerHTML =
            '<p class="text-red-500">Impossible de charger les projets.</p>';
    }
}

// Charger les projets au démarrage
loadProjects();

// 🔁 (optionnel) recharger automatiquement toutes les 10 secondes
setInterval(loadProjects, 10000);

