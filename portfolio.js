// Typing Animation
        const typingText = document.getElementById('typing-text');
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

        // Particle Animation
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
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

        createParticles();

        // MacBook Showcase Features
        function initMacBookFeatures() {
            // Slideshow functionality
            let currentSlide = 0;
            const slides = document.querySelectorAll('.slide');
            const navDots = document.querySelectorAll('.nav-dot');
            const totalSlides = slides.length;

            function showSlide(index) {
                // Remove active class from all slides and dots
                slides.forEach(slide => {
                    slide.classList.remove('active', 'prev');
                });
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                });

                // Add active class to current slide and dot
                if (slides[index]) {
                    slides[index].classList.add('active');
                    navDots[index].classList.add('active');
                }

                // Add prev class to previous slide for exit animation
                const prevIndex = currentSlide;
                if (slides[prevIndex] && prevIndex !== index) {
                    slides[prevIndex].classList.add('prev');
                }

                currentSlide = index;
            }

            // Auto slideshow
            function nextSlide() {
                const next = (currentSlide + 1) % totalSlides;
                showSlide(next);
            }

            // Change slide function for arrows
            window.changeSlide = function(direction) {
                let newIndex;
                if (direction === 1) {
                    newIndex = (currentSlide + 1) % totalSlides;
                } else {
                    newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                }
                showSlide(newIndex);
            };

            // Navigation dots click event
            navDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });

            // Auto play slideshow
            setInterval(nextSlide, 5000);

            // Initialize first slide
            if (slides.length > 0) {
                showSlide(0);
            }

            // Scroll-triggered emerging content
            function handleScroll() {
                const showcaseSection = document.querySelector('.showcase');
                const emergingContent = document.querySelector('.emerging-content');
                const featureCards = document.querySelectorAll('.feature-card');

                if (showcaseSection && emergingContent) {
                    const rect = showcaseSection.getBoundingClientRect();
                    const triggerPoint = window.innerHeight * 0.7;

                    // Check if section is in view
                    if (rect.top < triggerPoint && rect.bottom > 0) {
                        emergingContent.classList.add('visible');
                        
                        // Animate feature cards with delay
                        featureCards.forEach((card, index) => {
                            const delay = card.getAttribute('data-delay') || 0;
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, parseInt(delay));
                        });
                    }
                }
            }

            // Add scroll event listener
            window.addEventListener('scroll', handleScroll);
            
            // Call once to check initial state
            handleScroll();
        }

        // Initialize MacBook features when DOM is loaded
        document.addEventListener('DOMContentLoaded', initMacBookFeatures);

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
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
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

        //cursor image animation
        const images=[
            "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg",
            "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp",
            "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.webp",
            "https://i.pinimg.com/1200x/c3/cc/31/c3cc317a85e0953ea7320d4792353374.jpg"
        ]
        const container=document.getElementById("container");

        let currentIndex=0;
        let lastX=0;
        let lastY=0;
        let distanceThreshold= window.innerWidth <900? 100: 180;

        window.addEventListener("resize", () => {
            distanceThreshold = window.innerWidth < 900 ? 100 : 180;
        });

        window.addEventListener("mousemove", (e) => {
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > distanceThreshold) {
                createTrail(e.clientX, e.clientY);
                lastX = e.clientX;
                lastY = e.clientY;
            }
        });

        function createTrail(x,y){
            const img=document.createElement("img");
            img.classList.add("image-trail");
            img.src=images[currentIndex];
            container.appendChild(img);

            currentIndex=(currentIndex+1)%images.length;
            gsap.set(img,{
                x:x,
                y:y,
                scale:0,
                opacity:0,
                rotation:gsap.utils.random(-20,20)
            });
            gsap.to(img,{
                scale:1,
                opacity:1,
                duration:0.4,
                ease:"power2.out"
            });
            gsap.to(img,{
                scale:0.2,
                opacity:0,
                duration:1,
                delay:0.3,
                ease:"power2.in",
                onComplete: () => {
                    img.remove();
                },
            });
        }

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
                    
                    gsap.to(word, {
                        scale: 1.1,
                        rotation: gsap.utils.random(-5, 5),
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });
                
                word.addEventListener('mouseleave', () => {
                    gsap.to(word, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });
            });
        }

        // Initialize creative text animations when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initCreativeTextAnimation();
            initMediaWordHoverEffects();
        });

