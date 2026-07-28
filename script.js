document.addEventListener("DOMContentLoaded", function() {
    // Publication Filtering Logic
    const buttons = document.querySelectorAll(".filter-btn");
    const entries = document.querySelectorAll(".publication-entry");
    const yearSections = document.querySelectorAll("#publications .year-section");
    const emptyState = document.getElementById("empty-state");

    function applyFilter(filterValue) {
        let totalVisible = 0;

        entries.forEach(entry => {
            if (filterValue === "all" || entry.getAttribute("data-category") === filterValue) {
                entry.style.display = "flex";
                totalVisible++;
            } else {
                entry.style.display = "none";
            }
        });

        yearSections.forEach(section => {
            let hasVisible = false;
            const sectionEntries = section.querySelectorAll(".publication-entry");
            
            sectionEntries.forEach(entry => {
                if (entry.style.display !== "none") {
                    hasVisible = true;
                }
            });
            
            if (hasVisible) {
                section.style.display = "flex";
            } else {
                section.style.display = "none";
            }
        });

        if (totalVisible === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
        }
    }

    const activeBtn = document.querySelector(".filter-btn.active");
    if (activeBtn) {
        applyFilter(activeBtn.getAttribute("data-filter"));
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const filterVal = button.getAttribute("data-filter");
            if (button.classList.contains("active") && filterVal !== "all") {
                button.classList.remove("active");
                const allBtn = document.querySelector(".filter-btn[data-filter='all']");
                if (allBtn) allBtn.classList.add("active");
                applyFilter("all");
            } else {
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                applyFilter(filterVal);
            }
        });
    });

    // Smooth Active Navigation Highlighting on Scroll
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id], footer[id]");

    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active-nav");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active-nav");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", highlightNavOnScroll);

    // Subtle Fade-in on Scroll observer for page sections
    const observerOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".page-content, .hero-split, .focus-interests-grid").forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(10px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(section);
    });

    // Inject active dynamic styling for observer reveal
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .page-content.fade-in, .hero-split.fade-in, .focus-interests-grid.fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
