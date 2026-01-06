const tags = document.querySelectorAll('.impact-tags .tag');
const video = document.getElementById('impact-video');
const description = document.getElementById('impact-description');
const link = document.getElementById('impact-link');

tags.forEach(tag => {
    tag.addEventListener('click', () => {

        // Active class
        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        // Change text
        description.textContent = tag.dataset.text;

        // Change link
        link.href = tag.dataset.link;

        // Change video
        video.pause();
        video.querySelector('source').src = tag.dataset.video;
        video.load();
        video.play();
    });
});
