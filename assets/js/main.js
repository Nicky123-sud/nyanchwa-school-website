// =========================
// NYANCHWA ADVENTIST PREPARATORY SCHOOL
// MAIN JAVASCRIPT FILE
// =========================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================
    // 1. NAVBAR SCROLL EFFECT
    // =========================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
    
    // =========================
    // 2. MOBILE MENU AUTO CLOSE
    // =========================
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu when link is clicked
            if (window.innerWidth < 992) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
            }
        });
    });
    
    // =========================
    // 3. ACTIVE NAV LINK HIGHLIGHT
    // =========================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // =========================
    // 4. SMOOTH SCROLLING
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // =========================
    // 5. BACK TO TOP BUTTON
    // =========================
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        backToTopButton.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initial state
        backToTopButton.style.transition = 'opacity 0.3s ease';
        backToTopButton.style.opacity = '0';
    }
    
    // =========================
    // 6. SCROLL REVEAL ANIMATION
    // =========================
    const revealElements = document.querySelectorAll('.card, .feature-card, .stat-item');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run on scroll
    window.addEventListener('scroll', revealOnScroll);
    // Run on load
    revealOnScroll();
    
    // =========================
    // 7. COUNTER ANIMATION (for stats)
    // =========================
    const counters = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;
    
    const animateCounters = function() {
        if (hasAnimated) return;
        
        const windowHeight = window.innerHeight;
        const firstCounter = counters[0];
        
        if (firstCounter) {
            const elementTop = firstCounter.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                hasAnimated = true;
                
                counters.forEach(counter => {
                    const target = counter.innerText;
                    const isPercentage = target.includes('%');
                    const isPlus = target.includes('+');
                    const numericValue = parseInt(target.replace(/\D/g, ''));
                    
                    let current = 0;
                    const increment = numericValue / 50;
                    const duration = 2000;
                    const stepTime = duration / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            counter.innerText = numericValue + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
                            clearInterval(timer);
                        } else {
                            counter.innerText = Math.floor(current) + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
                        }
                    }, stepTime);
                });
            }
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    animateCounters();
    
    // =========================
    // 8. FORM VALIDATION (Contact Forms)
    // =========================
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
    
    // =========================
    // 9. IMAGE LAZY LOADING FALLBACK
    // =========================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // =========================
    // 10. PREVENT EMPTY LINK CLICKS
    // =========================
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
    
    // =========================
    // 11. YEAR AUTO-UPDATE (Footer)
    // =========================
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace(/202\d/, currentYear);
    }
    
});

// =========================
// 12. EXTERNAL: GALLERY LIGHTBOX
// (Called from gallery.html)
// =========================
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (!lightbox) return;
    
    let currentIndex = 0;
    const images = Array.from(galleryImages);
    
    // Open lightbox
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentIndex = index;
            showImage(currentIndex);
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Previous image
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
    }
    
    // Next image
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    function showImage(index) {
        if (lightboxImg && images[index]) {
            lightboxImg.src = images[index].src;
            lightboxImg.alt = images[index].alt;
        }
    }
}

// =========================
// 13. EXTERNAL: GALLERY FILTER
// (Called from gallery.html)
// =========================
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}