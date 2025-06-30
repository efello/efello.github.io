document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const body = document.body;
    const projectGrid = document.querySelector('.project-grid');

    if (projectGrid) {
        projectGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                openLightbox(card);
            }
        });
    }

    // --- Open Lightbox Function ---
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

    // --- Close Lightbox Function ---
    function closeLightbox() {
        lightbox.classList.remove('active');
        body.classList.remove('lightbox-active');
    }

    // CORRECTED: Event listener to close lightbox.
    // This will now close if you click ANYWHERE inside the lightbox,
    // including the image/video itself.
    lightbox.addEventListener('click', () => {
        closeLightbox();
    });
});