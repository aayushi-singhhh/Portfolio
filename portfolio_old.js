// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const texts = [' Data Analyst', ' Web Developer', ' IT Sophomore', 'Generative AI (Beginner) '];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(typeText, typingSpeed);
        }

        typeText();
    }

    // Particle Animation
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
                particlesContainer.appendChild(particle);
            }
        }
    }

    createParticles();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Active navigation link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
            } else {
                alert('Oops! There was a problem submitting your form.');
            }
        })
        .catch(error => {
            alert('Network error: Please try again later.');
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // Animate skill bars on scroll
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
            }
        });
    });

    document.querySelectorAll('.skills-category').forEach(category => {
        skillsObserver.observe(category);
    });

    // Add scroll animations for course cards
    const courseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out';
            }
        });
    });

    document.querySelectorAll('.course-card').forEach(card => {
        courseObserver.observe(card);
    });

    // Cursor image animation
    const images = [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmYwMDAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5URVNUP0w8L3RleHQ+PC9zdmc+",
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDBmZjAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5URVNUPjE8L3RleHQ+PC9zdmc+",
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDAwMGZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5URVNUPjI8L3RleHQ+PC9zdmc+",
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmYwMGZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5URVNUPjM8L3RleHQ+PC9zdmc+"
    ];

    console.log('Initializing cursor animation...');
    console.log('GSAP available:', typeof gsap !== 'undefined');

    let currentIndex = 0;
    let lastX = 0;
    let lastY = 0;
    let distanceThreshold = window.innerWidth < 900 ? 50 : 100;

    window.addEventListener("resize", () => {
        distanceThreshold = window.innerWidth < 900 ? 50 : 100;
    });

    window.addEventListener("mousemove", (e) => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        console.log('Mouse moved, distance:', distance, 'threshold:', distanceThreshold);

        if (distance > distanceThreshold) {
            console.log('Creating trail...');
            createTrail(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    function createTrail(x, y) {
        console.log('Creating trail at:', x, y);
        const img = document.createElement("img");
        img.classList.add("image-trail");
        img.src = images[currentIndex];
        
        // Try appending to different elements
        const container = document.getElementById('container');
        if (container) {
            container.appendChild(img);
            console.log('Appended to container');
        } else {
            document.body.appendChild(img);
            console.log('Appended to body');
        }

        currentIndex = (currentIndex + 1) % images.length;
        
        // Simple CSS animation
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        img.style.opacity = '1';
        img.style.transform = 'scale(1) translate(-50%, -50%)';
        
        setTimeout(() => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.2) translate(-50%, -50%)';
            setTimeout(() => {
                img.remove();
            }, 1000);
        }, 300);
    }

    // Test click event
    document.addEventListener('click', () => {
        console.log('Click detected!');
        createTrail(100, 100);
    });

    // Creative Text Animation
    function initCreativeTextAnimation() {
        const textWords = document.querySelectorAll('.text-word');
        const mediaWords = document.querySelectorAll('.media-word');
        
        // Set CSS custom properties for staggered animations
        textWords.forEach((word, index) => {
            word.style.setProperty('--word-index', index);
        });
        
        mediaWords.forEach((word, index) => {
            word.style.setProperty('--word-index', index);
        });
        
        // Intersection Observer for triggering animations when section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Restart animations
                    const words = entry.target.querySelectorAll('.text-word, .media-word');
                    words.forEach((word, index) => {
                        word.style.animation = 'none';
                        setTimeout(() => {
                            if (word.classList.contains('text-word')) {
                                word.style.animation = 'slideUpFade 1s ease-out forwards';
                           


