const cardsData = Array.from({ length: 8 }, (_, i) => ({
    imagePath: `assets/pic${i + 1}.png`
}));

let currentIndex = 1;
let isAutoPlaying = true;
let autoPlayInterval;

function generateCards() {
    const track = document.getElementById('carouselTrack');
    track.innerHTML = '';

    const total = cardsData.length;

    const lastClone = document.createElement('div');
    lastClone.className = 'card';
    lastClone.innerHTML = `
        <div class="card-image"><img src="${cardsData[total - 1].imagePath}" /></div>`;
    track.appendChild(lastClone);

    cardsData.forEach((c, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-image"><img src="${c.imagePath}" /></div>`;
        track.appendChild(card);
    });

    const firstClone = document.createElement('div');
    firstClone.className = 'card';
    firstClone.innerHTML = `
        <div class="card-image"><img src="${cardsData[0].imagePath}" /></div>`;
    track.appendChild(firstClone);
}

function generateIndicators() {
    const container = document.getElementById('indicators');
    container.innerHTML = '';

    for (let i = 0; i < cardsData.length; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.onclick = () => { currentIndex = i + 1; updateCarousel(); };
        container.appendChild(indicator);
    }
}

function updateCarousel(jump = false) {
    const track = document.getElementById('carouselTrack');
    const card = track.querySelector('.card');
    if (!card) return;

    const cardWidth = card.offsetWidth + 24;
    track.style.transition = jump ? 'none' : 'transform 0.5s ease';
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    const realIndex = (currentIndex - 1 + cardsData.length) % cardsData.length;
    document.querySelectorAll('.indicator')
        .forEach((ind, i) => ind.classList.toggle('active', i === realIndex));

    document.getElementById('progressFill').style.width =
        `${((realIndex + 1) / cardsData.length) * 100}%`;
}

function goToNext() {
    currentIndex++;
    updateCarousel();
    if (currentIndex > cardsData.length) {
        setTimeout(() => { currentIndex = 1; updateCarousel(true); }, 500);
    }
}

function startAutoPlay() {
    if (isAutoPlaying) autoPlayInterval = setInterval(goToNext, 3000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function setupEventListeners() {
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => { isAutoPlaying = false; stopAutoPlay(); });
    container.addEventListener('mouseleave', () => { isAutoPlaying = true; startAutoPlay(); });
}

function initCarousel() {
    generateCards();
    generateIndicators();
    updateCarousel(true);
    setupEventListeners();
    startAutoPlay();
}
