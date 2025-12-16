document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".glass-navbar");
    const hero = document.querySelector(".carousel");

    function handleNavbarScroll() {
        const heroHeight = hero.offsetHeight;
        const triggerPoint = heroHeight * 0.75;

        if (window.scrollY > triggerPoint) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);
});
