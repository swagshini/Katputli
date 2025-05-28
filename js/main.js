// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Mobile menu toggle
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '☰';
    document.querySelector('.nav-container').prepend(mobileMenuButton);

    mobileMenuButton.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
        }
    });

    // Initialize mobile menu state
    if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
    }

    // Scroll-based section visibility
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-button.next');
    const prevButton = carousel.querySelector('.carousel-button.prev');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    let currentIndex = 0;
    const slideWidth = carousel.offsetWidth;
    let slideInterval;
    const ROTATION_INTERVAL = 3000; // Rotate every 3 seconds

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            startAutoRotation();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // Update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateDots();
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }

    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }

    // Start auto rotation
    function startAutoRotation() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, ROTATION_INTERVAL);
    }

    // Event listeners
    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startAutoRotation();
    });

    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startAutoRotation();
    });

    // Pause auto-rotation on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoRotation();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newSlideWidth = carousel.offsetWidth;
        track.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
    });

    // Start auto-rotation initially
    startAutoRotation();
}); 