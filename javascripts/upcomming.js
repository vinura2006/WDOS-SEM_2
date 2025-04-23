document.addEventListener('DOMContentLoaded', () => {
    // game functionality im
    const initGameCarousel = () => {
        const carousel = document.querySelector('.game-carousel');
        if (!carousel) return;
        
        const track = carousel.querySelector('.game-carousel-track');
        const cards = track.querySelectorAll('.game-card');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        let currentPosition = 0;
        let slidesPerView = getSlidesPerView();
        
        // number of visible slides according to display size
        function getSlidesPerView() {
            const width = window.innerWidth;
            if (width < 576) return 1;
            if (width < 992) return 2;
            if (width < 1200) return 3;
            return 4;
        }
        
        // updating the item position
        function updateCarouselPosition() {
            // card width + gap (calculation)
            const slideWidth = 100 / slidesPerView;
            const translateValue = -currentPosition * slideWidth;
            
            // track Transformation
            track.style.transform = `translateX(${translateValue}%)`;
            
            // button state Updte 
            updateButtonStates();
        }
        

        // navigation button states Updating function 
        function updateButtonStates() {
            const maxPosition = Math.max(0, cards.length - slidesPerView);
            
            prevBtn.disabled = currentPosition <= 0;
            nextBtn.disabled = currentPosition >= maxPosition;
            
            prevBtn.style.opacity = currentPosition <= 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentPosition >= maxPosition ? '0.5' : '1';
            
            prevBtn.style.cursor = currentPosition <= 0 ? 'not-allowed' : 'pointer';
            nextBtn.style.cursor = currentPosition >= maxPosition ? 'not-allowed' : 'pointer';
        }
        
        // to previous slide navigation
        function goToPrevSlide() {
            if (currentPosition > 0) {
                currentPosition--;
                updateCarouselPosition();
            }
        }
        
        // to next slide nav
        function goToNextSlide() {
            const maxPosition = Math.max(0, cards.length - slidesPerView);
            if (currentPosition < maxPosition) {
                currentPosition++;
                updateCarouselPosition();
            }
        }
        
        // Add event listeners to buttons
        prevBtn.addEventListener('click', goToPrevSlide);
        nextBtn.addEventListener('click', goToNextSlide);
        
        // adjust according to thescreen size
        window.addEventListener('resize', () => {
            // Update slides according to the sizes
            const newSlidesPerView = getSlidesPerView();
            
            //update if the n of slides wich are visible changes
            if (newSlidesPerView !== slidesPerView) {
                slidesPerView = newSlidesPerView;
                
                // Reset position after layout changes
                currentPosition = 0;
                updateCarouselPosition();
            }
        });
        
        // Initialize carousel
        updateCarouselPosition();
        
        // keyboard navigation menu 
        // Sometimes didnt work
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToPrevSlide();
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
            }
        });
        
        // Add touch and swip support
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        //  swipe gesture function
        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
             // Minimum distance to understand whether it is a swip
            const swipeThreshold = 50;
            if (swipeDistance > swipeThreshold) {
                // Swipe to right
                goToPrevSlide(); 
                
            } else if (swipeDistance < -swipeThreshold) {
                // Swipe left
                goToNextSlide(); 
            }
        }
    };

    // Calling the functions
    initGameCarousel();
});
