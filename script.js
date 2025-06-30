document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');
    const lightbox = document.getElementById('lightbox');
    const body = document.body;

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Clear any previous content from the lightbox
            lightbox.innerHTML = '';

            const mediaElement = card.querySelector('img, video');
            
            if (mediaElement) {
                let newMediaElement;

                // Check if the clicked media is a video or an image
                if (mediaElement.tagName === 'VIDEO') {
                    newMediaElement = document.createElement('video');
                    newMediaElement.src = mediaElement.src;
                    newMediaElement.controls = true; // Show controls in lightbox view
                    newMediaElement.autoplay = true;
                    newMediaElement.loop = true;
                } else {
                    newMediaElement = document.createElement('img');
                    newMediaElement.src = mediaElement.src;
                }

                // Add the new element to the lightbox and show it
                lightbox.appendChild(newMediaElement);
                lightbox.classList.add('active');
                body.classList.add('lightbox-active'); // Prevent background scroll
            }
        });
    });

    // Function to close the lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        body.classList.remove('lightbox-active'); // Re-enable background scroll
    }

    // Close lightbox when clicking on the background overlay
    lightbox.addEventListener('click', (e) => {
        // We check if the click is on the overlay itself, not the media inside
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox when pressing the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});