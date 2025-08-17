function initNav() {
    const btn = document.getElementById("nav-toggle-btn");
    const menu = document.getElementById("primary-menu");
    if (!btn || !menu) return;

    function setExpanded(expanded) {
        btn.setAttribute("aria-expanded", String(expanded));
        if (expanded) {
            menu.classList.add("open");
        } else {
            menu.classList.remove("open");
        }
    }

    btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        setExpanded(!isOpen);
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setExpanded(false);
    });

    // Manage aria-current on click
    const links = menu.querySelectorAll('a[href^="#"]');
    function setCurrent(link) {
        links.forEach((a) => a.removeAttribute("aria-current"));
        if (link) link.setAttribute("aria-current", "page");
    }
    links.forEach((a) => {
        a.addEventListener("click", () => {
            setCurrent(a);
            setExpanded(false);
        });
    });

    // Optionally set current based on current hash at load
    if (location.hash) {
        const active = Array.from(links).find((a) => a.getAttribute("href") === location.hash);
        if (active) setCurrent(active);
    }

    // Scroll-Spy: update aria-current based on scroll position
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    window.addEventListener("scroll", () => {
        let currentId = null;
        const scrollY = window.scrollY + 100; // offset for header height
        sections.forEach((section) => {
            if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                currentId = `#${section.id}`;
            }
        });
        if (currentId) {
            const activeLink = Array.from(links).find((a) => a.getAttribute("href") === currentId);
            setCurrent(activeLink);
        }
    });
}

fetch("assets/components/nav.html")
    .then((res) => res.text())
    .then((html) => {
        document.getElementById("nav-placeholder").innerHTML = html;
        initNav(); // Jetzt erst Nav-Logik starten
    });

fetch("assets/components/footer.html")
    .then((res) => res.text())
    .then((html) => (document.getElementById("footer-placeholder").innerHTML = html));

// Flip-Cards

(function () {
    document.querySelectorAll(".kacheln .flip_container").forEach(function (card) {
        var sRound = card.querySelector(".s_round");
        var bRound = card.querySelector(".b_round");
        var flip = card.querySelector(".flip_box");
        var sArrow = card.querySelector(".s_arrow");
        if (!sRound || !bRound || !flip || !sArrow) return;

        sRound.addEventListener("mouseenter", function () {
            bRound.classList.add("b_round_hover");
        });
        sRound.addEventListener("mouseleave", function () {
            bRound.classList.remove("b_round_hover");
        });

        sRound.addEventListener("click", function (e) {
            e.preventDefault();
            flip.classList.toggle("flipped");
            sRound.classList.add("s_round_click");
            sArrow.classList.toggle("s_arrow_rotate");
            bRound.classList.toggle("b_round_back_hover");
        });

        sRound.addEventListener("transitionend", function () {
            sRound.classList.remove("s_round_click");
            sRound.classList.add("s_round_back");
        });
    });
})();
