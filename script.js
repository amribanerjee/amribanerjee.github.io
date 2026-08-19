document.addEventListener("DOMContentLoaded", () => {
    
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            if (localStorage.getItem('theme')) {
                if (localStorage.getItem('theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }
            }
        });
    }

    // Book Praise Toggle Logic
    const praiseToggleBtn = document.getElementById('praise-toggle');
    const praiseContent = document.getElementById('praise-content');

    if (praiseToggleBtn && praiseContent) {
        praiseToggleBtn.addEventListener('click', () => {
            praiseContent.classList.toggle('hidden');
            if (praiseContent.classList.contains('hidden')) {
                praiseToggleBtn.textContent = 'Show Praise';
            } else {
                praiseToggleBtn.textContent = 'Hide Praise';
            }
        });
    }

    // Publication Filter Logic
    const filterBtns = document.querySelectorAll('.pub-filter-btn');
    const pubCards = document.querySelectorAll('.pub-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Reset all buttons to inactive styling
                filterBtns.forEach(b => {
                    b.classList.remove('border-foreground', 'text-foreground');
                    b.classList.add('border-transparent', 'text-muted');
                });
                
                // Set clicked button to active styling
                btn.classList.remove('border-transparent', 'text-muted');
                btn.classList.add('border-foreground', 'text-foreground');

                const filterValue = btn.getAttribute('data-filter');

                // Filter cards based on data-category
                pubCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = ''; // Reverts to CSS default (grid)
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Abstract Toggle Logic
    const absBtns = document.querySelectorAll('.abs-btn');
    
    if (absBtns.length > 0) {
        absBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Find the nearest abstract content container
                const abstractContent = btn.parentElement.nextElementSibling;
                if (abstractContent && abstractContent.classList.contains('abstract-content')) {
                    abstractContent.classList.toggle('hidden');
                    
                    // Toggle active button styles
                    if (abstractContent.classList.contains('hidden')) {
                        btn.classList.remove('bg-foreground', 'text-background', 'border-foreground');
                        btn.classList.add('border-border', 'text-muted');
                    } else {
                        btn.classList.add('bg-foreground', 'text-background', 'border-foreground');
                        btn.classList.remove('border-border', 'text-muted');
                    }
                }
            });
        });
    }

    // Smooth scrolling for navigation anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for elegant scroll reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.observe-fade').forEach((element) => {
        observer.observe(element);
    });

});
