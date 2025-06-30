document.addEventListener('DOMContentLoaded', function () {

    // =================================================================
    // SETUP VARIABLES
    // =================================================================
    const lightbox = document.getElementById('lightbox');
    const body = document.body;
    const projectGrid = document.querySelector('.project-grid');


    // =================================================================
    // LIGHTBOX LOGIC
    // =================================================================
    if (projectGrid) {
        projectGrid.addEventListener('click', (e) => {
            // Updated to allow clicking on any card type, not just .project-card
            const card = e.target.closest('.project-card, .card-tra');
            if (card) {
                openLightbox(card);
            }
        });
    }

    function openLightbox(card) {
        lightbox.innerHTML = '';
        const mediaElement = card.querySelector('img, video');
        if (mediaElement) {
            let newMediaElement;
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
            lightbox.appendChild(newMediaElement);
            lightbox.classList.add('active');
            body.classList.add('lightbox-active');
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        body.classList.remove('lightbox-active');
    }

    lightbox.addEventListener('click', () => {
        closeLightbox();
    });


    // =================================================================
    // FADE-IN ANIMATION LOGIC
    // =================================================================
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1
    });

    const transitionalCards = document.querySelectorAll('.card-tra');
    transitionalCards.forEach(card => fadeInObserver.observe(card));


    // =================================================================
    // NEW: ZOOM-ON-SCROLL LOGIC FOR .card-tra IMAGES
    // =================================================================
    const cardsToZoom = document.querySelectorAll('.card-tra');

    function handleScrollZoom() {
        const viewportHeight = window.innerHeight;

        cardsToZoom.forEach(card => {
            const image = card.querySelector('img');
            if (image) {
                const cardRect = card.getBoundingClientRect();
                
                // Calculate the center of the card relative to the viewport's center
                const cardCenter = cardRect.top + cardRect.height / 2;
                const viewportCenter = viewportHeight / 2;

                // Calculate the distance from the center, normalized from -1 to 1
                const distanceFromCenter = (cardCenter - viewportCenter) / viewportCenter;
                
                // Calculate scale: starts at 1, goes up to 1.15 at the center, then back to 1
                // The Math.abs makes it zoom in from both top and bottom
                const scale = 1 + (1 - Math.abs(distanceFromCenter)) * 0.15;

                // Only apply the effect when the card is in the viewport
                if (cardRect.top < viewportHeight && cardRect.bottom > 0) {
                    // Use requestAnimationFrame for smoother animations
                    requestAnimationFrame(() => {
                        image.style.transform = `scale(${scale})`;
                    });
                }
            }
        });
    }

    // Attach the function to the scroll event
    window.addEventListener('scroll', handleScrollZoom, { passive: true });
    
    // Run it once on load
    handleScrollZoom();

});