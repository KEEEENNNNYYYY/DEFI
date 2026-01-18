const leftButton = document.querySelector('.arrow.left');
const rightButton = document.querySelector('.arrow.right');
const slides = document.querySelectorAll('.slide');

leftButton.onclick = () => turnSlider(-1);
rightButton.onclick = () => turnSlider(1);

function turnSlider(direction) {
    slides.forEach(slide => {
        const current = [...slide.classList]
            .find(c => c.startsWith('slide-'));
        let index = parseInt(current.split('-')[1]);

        slide.classList.remove(current);

        index += direction;
        if (index < 1) index = slides.length;
        if (index > slides.length) index = 1;

        slide.classList.add(`slide-${index}`);
    });
}
