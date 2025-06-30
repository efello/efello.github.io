document.addEventListener('DOMContentLoaded', function () {

    // =================================================================
    // SETUP VARIABLES
    // =================================================================
    const lightbox = document.getElementById('lightbox');
    const body = document.body;
    const projectGrid = document.querySelector('.project-grid');


    // =================================================================
    // LIGHTBOX LOGIC (IMPROVED)
    // =================================================================
    if (projectGrid) {
        projectGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card, .card-tra');
            if (card) {
                openLightbox(card);
            }
        });
    }

    function openLightbox(card) {
        lightbox.innerHTML = '';
        const mediaElement = card.querySelector('img, video');
        const lightboxSrc = card.dataset.lightboxSrc; // Check for our data attribute

        let newMediaElement;

        if (mediaElement) { // For standard .project-card
            if (mediaElement.tagName === 'VIDEO') {
                newMediaElement = document.createElement('video');
                newMediaElement.src = mediaElement.src;
                newMediaElement.controls = true;
                newMediaElement.autoplay = true;
                newMediaElement.loop = true;
            } else {
                newMediaElement = document.createElement('img');
                newMediaElement.src = mediaElement.src;
            }
        } else if (lightboxSrc) { // For .card-tra with a background image
            newMediaElement = document.createElement('img');
            newMediaElement.src = lightboxSrc;
        }

        if (newMediaElement) {
            lightbox.appendChild(newMediaElement);
            lightbox.classList.add('active');
            body.classList.add('lightbox-active');
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        body.classList.remove('lightbox-active');
    }

    lightbox.addEventListener('click', (e) => {
        // Close only if the overlay itself is clicked, not the image/video
        if (e.target === lightbox) {
            closeLightbox();
        }
    });


    // =================================================================
    // NEW: SCROLLMAGIC PARALLAX LOGIC
    // =================================================================
    
    // 1. Init ScrollMagic Controller
    const controller = new ScrollMagic.Controller();

    // 2. Select all parallax cards
    const parallaxCards = document.querySelectorAll('.card-tra');

    // 3. Create a scene for each card
    parallaxCards.forEach(card => {

        const background = card.querySelector('.parallax-bg');

        new ScrollMagic.Scene({
                triggerElement: card,
                triggerHook: 'onEnter', // Starts when the top of the card enters the viewport
                duration: '200%' // Animation lasts for 2x the viewport height of scrolling
            })
            .setTween(background, {
                y: '100%', // Moves the background down by 60% of the card's height
                ease: 'none'
            })
            .addTo(controller);
    });

});