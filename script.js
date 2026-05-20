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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       Lógica de Galería Interactiva (Experiencia Luann)
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');
                
                // Actualizar botón activo
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filtrar elementos de la galería
                const itemsToAnimate = [];
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hide');
                        itemsToAnimate.push(item);
                    } else {
                        item.classList.add('hide');
                    }
                });
                
                // Animación GSAP de entrada para elementos filtrados
                gsap.fromTo(itemsToAnimate, 
                    { opacity: 0, scale: 0.95, y: 15 },
                    { 
                        opacity: 1, 
                        scale: 1, 
                        y: 0, 
                        duration: 0.4, 
                        stagger: 0.04, 
                        ease: "power2.out",
                        clearProps: "all"
                    }
                );
            });
        });

        // Autoplay interactivo de mini-videos de la galería en Hover
        document.querySelectorAll('.gallery-item.video-item').forEach(item => {
            const video = item.querySelector('video');
            item.addEventListener('mouseenter', () => {
                if (video) {
                    video.play().catch(e => console.log('Autoplay suspendido', e));
                }
            });
            item.addEventListener('mouseleave', () => {
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        });
    }

    /* ==========================================================================
       Lógica de Slider de Antes y Después
       ========================================================================== */
    const comparisonSlider = document.querySelector('.comparison-slider');
    if (comparisonSlider) {
        const handle = comparisonSlider.querySelector('.slider-handle');
        const imageAfter = comparisonSlider.querySelector('.image-after');
        let isDragging = false;

        const moveSlider = (clientX) => {
            const rect = comparisonSlider.getBoundingClientRect();
            const x = clientX - rect.left;
            let percentage = (x / rect.width) * 100;

            // Mantener el porcentaje entre 0 y 100
            percentage = Math.max(0, Math.min(100, percentage));

            // Aplicar estilos
            handle.style.left = `${percentage}%`;
            imageAfter.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        };

        // Eventos del Mouse
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
        });
        window.addEventListener('mouseup', () => { isDragging = false; });
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            moveSlider(e.clientX);
        });

        // Eventos Táctiles (Mobile)
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
        });
        window.addEventListener('touchend', () => { isDragging = false; });
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            moveSlider(e.touches[0].clientX);
        });

        // Hacer clic en cualquier parte del contenedor mueve el slider
        comparisonSlider.addEventListener('click', (e) => {
            if (e.target.closest('.slider-handle')) return;
            moveSlider(e.clientX);
        });
    }

    /* ==========================================================================
       Sistema de Visualización de Medios (Lightbox)
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxPrev = lightbox.querySelector('.lightbox-prev');
        const lightboxNext = lightbox.querySelector('.lightbox-next');
        
        let currentGalleryIndex = 0;
        let activeGalleryItems = [];

        const updateActiveGalleryItems = () => {
            activeGalleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
        };

        const showLightboxItem = (index) => {
            if (index < 0) index = activeGalleryItems.length - 1;
            if (index >= activeGalleryItems.length) index = 0;
            
            currentGalleryIndex = index;
            const item = activeGalleryItems[currentGalleryIndex];
            if (!item) return;

            const src = item.getAttribute('data-src');
            const type = item.getAttribute('data-type');
            const title = item.getAttribute('data-title') || '';

            lightboxContent.innerHTML = '';
            lightboxCaption.textContent = title;

            if (type === 'video') {
                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.autoplay = true;
                video.loop = true;
                video.playsInline = true;
                video.style.maxWidth = '100%';
                video.style.maxHeight = '80vh';
                lightboxContent.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = src;
                img.alt = title;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '80vh';
                lightboxContent.appendChild(img);
            }
        };

        const openLightbox = (index) => {
            updateActiveGalleryItems();
            showLightboxItem(index);
            lightbox.classList.add('active');
            gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            document.body.style.overflow = 'hidden'; // Detener scroll de fondo
        };

        const closeLightbox = () => {
            // Vaciar contenido para detener reproducción de videos
            lightboxContent.innerHTML = '';
            gsap.to(lightbox, { 
                opacity: 0, 
                duration: 0.3,
                onComplete: () => {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = ''; // Habilitar scroll
                }
            });
        };

        // Registrar evento clic en cada item de la galería
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                updateActiveGalleryItems();
                const activeIndex = activeGalleryItems.indexOf(item);
                openLightbox(activeIndex >= 0 ? activeIndex : 0);
            });
        });

        // Controles de Lightbox
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxItem(currentGalleryIndex - 1);
        });
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxItem(currentGalleryIndex + 1);
        });

        // Cerrar al hacer clic en el fondo oscuro
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Navegación por teclado
        window.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showLightboxItem(currentGalleryIndex - 1);
            if (e.key === 'ArrowRight') showLightboxItem(currentGalleryIndex + 1);
        });
    }

    /* ==========================================================================
       Botón de WhatsApp Flotante & ScrollTriggers
       ========================================================================== */
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                whatsappFloat.classList.add('visible');
            } else {
                whatsappFloat.classList.remove('visible');
            }
        });
    }

    // Registrar nuevos ScrollTriggers de GSAP
    if (typeof ScrollTrigger !== 'undefined') {
        // Revelar Galería
        gsap.from(".gallery-item", {
            scrollTrigger: {
                trigger: ".gallery-section",
                start: "top 85%",
            },
            opacity: 0,
            y: 35,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out"
        });

        // Revelar Comparador Antes/Después
        gsap.from(".comparison-wrapper", {
            scrollTrigger: {
                trigger: ".comparison-section",
                start: "top 80%",
            },
            opacity: 0,
            scale: 0.97,
            duration: 0.8,
            ease: "power2.out"
        });
    }
});

