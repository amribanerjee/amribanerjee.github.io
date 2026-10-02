document.addEventListener("DOMContentLoaded", () => {
    
    // Abstract & Praise Toggle Logic
    const toggleButtons = document.querySelectorAll('.abs-btn, #praise-toggle');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Find the closest parent container (either the article for papers, or the div for the book)
            const container = btn.closest('article') || btn.closest('.grid');
            if (!container) return;

            const content = container.querySelector('.abstract-content, #praise-content');
            if (content) {
                content.classList.toggle('hidden');
                
                // Optional: swap text for the book reviews toggle
                if (btn.id === 'praise-toggle') {
                    btn.textContent = content.classList.contains('hidden') ? 'REVIEWS' : 'CLOSE';
                }
            }
        });
    });

    // Elegant Scroll Reveal Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05
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
