document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // GSAP Preloader Animation
    const tl = gsap.timeline();
    
    tl.to(".loader-logo", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    })
    .to(".loader-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    }, "-=0.5")
    .to("#preloader", {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut"
    })
    .from(".navbar", {
        y: -100,
        opacity: 0,
        duration: 0.8
    }, "-=0.3")
    .from(".hero-text > *", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.5")
    .from(".hero-image", {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "expo.out"
    }, "-=1");

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Animations with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Services Reveal
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services",
            start: "top 95%",
        },
        opacity: 0.4, // Empezamos desde 0.4 para que no desaparezcan del todo
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Contact Info Reveal
    gsap.from(".info-item", {
        scrollTrigger: {
            trigger: ".contact",
            start: "top 80%",
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Pricing Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update panels with animation
            tabPanels.forEach(panel => {
                if (panel.id === `tab-${tabId}`) {
                    panel.classList.add('active');
                    gsap.from(panel.querySelectorAll('.price-item'), {
                        opacity: 0,
                        x: 20,
                        duration: 0.4,
                        stagger: 0.05
                    });
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    // Smooth Scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
