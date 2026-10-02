document.addEventListener("DOMContentLoaded", () => {
    
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

    // Dynamic Publication Fetching
    const publicationsContainer = document.getElementById('publications-container');

    if (publicationsContainer) {
        fetch('publications.json')
            .then(response => {
                if (!response.ok) throw new Error("Failed to load publications.json");
                return response.json();
            })
            .then(data => {
                renderPublications(data);
                bindPublicationEvents();
            })
            .catch(error => {
                console.error("Error loading publications:", error);
                publicationsContainer.innerHTML = '<p class="text-slate-500 italic">Unable to load publications at this time.</p>';
            });
    }

    function renderPublications(publications) {
        publicationsContainer.innerHTML = publications.map(pub => `
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 transition-shadow hover:shadow-md pub-card" data-category="${pub.category}">
                <div class="mb-4">
                    <span class="text-sm font-mono text-blue-900 font-semibold tracking-wide uppercase">${pub.year}</span>
                </div>
                <div class="space-y-3 mb-6">
                    <p class="text-sm text-slate-600">${pub.authors}</p>
                    <h3 class="text-xl font-semibold leading-tight text-slate-900">${pub.title}</h3>
                    <p class="text-sm font-medium text-slate-500 italic">${pub.venue}</p>
                </div>
                
                <div class="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                    <a href="${pub.paperUrl}" target="_blank" rel="noopener" class="text-center text-xs font-mono font-semibold tracking-wider px-4 py-2 border border-slate-200 hover:border-blue-900 hover:text-blue-900 hover:bg-slate-50 transition-colors rounded text-slate-600 focus:outline-none ${pub.paperUrl === '#' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}">PAPER</a>
                    <a href="${pub.codeUrl}" target="_blank" rel="noopener" class="text-center text-xs font-mono font-semibold tracking-wider px-4 py-2 border border-slate-200 hover:border-blue-900 hover:text-blue-900 hover:bg-slate-50 transition-colors rounded text-slate-600 focus:outline-none ${pub.codeUrl === '#' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}">CODE</a>
                    <button class="abs-btn text-center text-xs font-mono font-semibold tracking-wider px-4 py-2 border border-slate-200 hover:border-blue-900 hover:text-blue-900 hover:bg-slate-50 transition-colors rounded text-slate-600 focus:outline-none">ABSTRACT</button>
                </div>
                <div class="abstract-content hidden mt-6 text-sm text-slate-700 font-normal leading-relaxed border-l-4 border-blue-900 pl-5 bg-slate-50 p-4 rounded-r">
                    ${pub.abstract}
                </div>
            </div>
        `).join('');
    }

    function bindPublicationEvents() {
        // Publication Filter Logic
        const filterBtns = document.querySelectorAll('.pub-filter-btn');
        const pubCards = document.querySelectorAll('.pub-card');

        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => {
                        b.classList.remove('bg-slate-100', 'text-blue-900', 'font-semibold');
                        b.classList.add('text-slate-500', 'font-medium');
                    });
                    
                    btn.classList.remove('text-slate-500', 'font-medium');
                    btn.classList.add('bg-slate-100', 'text-blue-900', 'font-semibold');

                    const filterValue = btn.getAttribute('data-filter');

                    pubCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = ''; 
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
                    const cardContainer = btn.closest('.pub-card');
                    if (!cardContainer) return;

                    const abstractContent = cardContainer.querySelector('.abstract-content');
                    if (abstractContent) {
                        abstractContent.classList.toggle('hidden');
                        
                        if (abstractContent.classList.contains('hidden')) {
                            btn.classList.remove('bg-blue-900', 'text-white', 'border-blue-900');
                            btn.classList.add('border-slate-200', 'text-slate-600');
                        } else {
                            btn.classList.add('bg-blue-900', 'text-white', 'border-blue-900');
                            btn.classList.remove('border-slate-200', 'text-slate-600', 'hover:text-blue-900', 'hover:bg-slate-50');
                        }
                    }
                });
            });
        }
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

    // Initial observation of static elements
    document.querySelectorAll('.observe-fade').forEach((element) => {
        observer.observe(element);
    });

});
