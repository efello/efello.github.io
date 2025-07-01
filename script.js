document.addEventListener('DOMContentLoaded', function () {

    // =================================================================
    // SETUP VARIABLES
    // =================================================================
   
    const body = document.body;
    const projectGrid = document.querySelector('.project-grid');





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