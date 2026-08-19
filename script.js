document.addEventListener("DOMContentLoaded", () => {
    
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
