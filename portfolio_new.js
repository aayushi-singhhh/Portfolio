// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
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

    // Cursor image animation with working GSAP
    const images = [
        "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg",
        "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp",
        "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.webp",
        "https://i.pinimg.com/1200x/c3/cc/31/c3cc317a85e0953ea7320d4792353374.jpg"
    ];

    let currentIndex = 0;
    let lastX = 0;
    let lastY = 0;
    let distanceThreshold = 150;

    function createImageTrail(x, y) {
        const img = document.createElement("img");
        img.classList.add("image-trail");
        img.src = images[currentIndex];
        img.style.position = "fixed";
        img.style.left = x + "px";
        img.style.top = y + "px";
        img.style.width = "120px";
        img.style.height = "120px";
        img.style.borderRadius = "15px";
        img.style.objectFit = "cover";
        img.style.pointerEvents = "none";
        img.style.zIndex = "9999";
        img.style.transform = "translate(-50%, -50%) scale(0) rotate(" + (Math.random() * 40 - 20) + "deg)";
        img.style.opacity = "0";
        img.style.transition = "all 0.4s cubic-bezier(0.23, 1, 0.320, 1)";
        img.style.border = "3px solid rgba(255,255,255,0.3)";
        img.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        
        document.body.appendChild(img);
        currentIndex = (currentIndex + 1) % images.length;

        // Animate in
        requestAnimationFrame(() => {
            img.style.transform = "translate(-50%, -50%) scale(1) rotate(" + (Math.random() * 40 - 20) + "deg)";
            img.style.opacity = "1";
        });

        // Animate out and remove
        setTimeout(() => {
            img.style.transform = "translate(-50%, -50%) scale(0.1) rotate(" + (Math.random() * 40 - 20) + "deg)";
            img.style.opacity = "0";
            setTimeout(() => {
                if (img.parentNode) {
                    img.remove();
                }
            }, 400);
        }, 600);
    }

    // Mouse move event listener
    document.addEventListener("mousemove", (e) => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > distanceThreshold) {
            createImageTrail(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    // Initialize all functions
    initCreativeTextAnimation();
    initMediaWordHoverEffects();
    initProjectFilters();
    initProjectsModal();
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
                        } else {
                            word.style.animation = 'popIn 0.8s ease-out forwards';
                        }
                        word.style.animationDelay = `${index * 0.2 + (word.classList.contains('media-word') ? 0.3 : 0)}s`;
                    }, 100);
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    const creativeSection = document.querySelector('.creative-text-section');
    if (creativeSection) {
        observer.observe(creativeSection);
    }
}

// Add hover effects for media words
function initMediaWordHoverEffects() {
    const mediaWords = document.querySelectorAll('.media-word');
    
    mediaWords.forEach(word => {
        word.addEventListener('mouseenter', () => {
            const video = word.querySelector('video');
            const img = word.querySelector('img');
            
            if (video) {
                video.play();
            }
            
            if (typeof gsap !== 'undefined') {
                gsap.to(word, {
                    scale: 1.1,
                    rotation: gsap.utils.random(-5, 5),
                    duration: 0.3,
                    ease: "back.out(1.3)"
                });
            }
        });
        
        word.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(word, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "back.out(1.3)"
                });
            }
        });
    });
}

// Project Filtering Functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-modern');

    // Add visible class to all cards initially
    projectCards.forEach(card => {
        card.classList.add('visible');
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show card
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                } else {
                    // Hide card
                    card.classList.remove('visible');
                    card.classList.add('hidden');
                }
            });
            
            // Add a small delay for smooth animation
            setTimeout(() => {
                projectCards.forEach(card => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    } else {
                        card.style.display = 'block';
                    }
                });
            }, 300);
        });
    });
}

// Projects table modal functionality
function initProjectsModal() {
    const showAllProjectsBtn = document.getElementById('show-all-projects-btn');
    const projectsTableModal = document.getElementById('projects-table-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const projectRows = document.querySelectorAll('.projects-table .project-row');
    const cursorFollowImage = document.getElementById('cursor-follow-image');
    
    // Make sure these elements exist before setting up event handlers
    if (!projectsTableModal || !showAllProjectsBtn) {
        return;
    }
    
    // Cursor-following image functionality
    if (projectRows.length && cursorFollowImage) {
        projectRows.forEach(row => {
            const imageUrl = row.getAttribute('data-image');
            
            row.addEventListener('mouseenter', () => {
                if (imageUrl) {
                    cursorFollowImage.style.backgroundImage = `url(${imageUrl})`;
                    cursorFollowImage.style.opacity = '1';
                }
            });
            
            row.addEventListener('mousemove', (e) => {
                const rect = projectsTableModal.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const offsetY = e.clientY - rect.top;
                
                // Use GSAP if available, otherwise use CSS
                if (typeof gsap !== 'undefined') {
                    gsap.to(cursorFollowImage, {
                        left: offsetX,
                        top: offsetY,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                } else {
                    cursorFollowImage.style.left = offsetX + 'px';
                    cursorFollowImage.style.top = offsetY + 'px';
                }
            });
            
            row.addEventListener('mouseleave', () => {
                cursorFollowImage.style.opacity = '0';
            });
        });
    }
    
    // Open modal
    showAllProjectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show modal
        projectsTableModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add active class after a brief delay
        setTimeout(() => {
            projectsTableModal.classList.add('active');
            
            // Animation for modal entrance
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('.modal-content', 
                    { y: 50, opacity: 0, scale: 0.98 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
                );
                
                // Stagger animation for table rows
                gsap.fromTo('.project-row', 
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, delay: 0.3, ease: 'power3.out' }
                );
            }
        }, 50);
    });
    
    // Close modal function
    function closeModal() {
        // Animate out
        if (typeof gsap !== 'undefined') {
            gsap.to('.modal-content', {
                y: 30,
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    projectsTableModal.classList.remove('active');
                    projectsTableModal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        } else {
            projectsTableModal.classList.remove('active');
            projectsTableModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    // Close modal button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    projectsTableModal.addEventListener('click', (e) => {
        if (e.target === projectsTableModal) {
            closeModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectsTableModal.classList.contains('active')) {
            closeModal();
        }
    });
}
