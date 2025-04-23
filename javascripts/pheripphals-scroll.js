document.addEventListener('DOMContentLoaded', function() {
    const quickNav = document.getElementById('quickNav');
    let timer;
    let isScrolling = false;
    
    // Quick nav visible - function
    function showQuickNav() {
        quickNav.classList.remove('hidden');
        
        // Make quick nav hide after 1.5s
        clearTimeout(timer);
        timer = setTimeout(hideQuickNav, 1500);
    }
    
    // To make the quick nav hidden
    function hideQuickNav() {
        quickNav.classList.add('hidden');
    }
    
    //Checking click evens on button (process)
    document.querySelectorAll('.quick-nav-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Pop quick nav when page loads
    showQuickNav();
    
    // Make the buttond hide when scrolling
    window.addEventListener('scroll', function() {
        // When scrolling starts, buttons hide
        if (!isScrolling) {
            hideQuickNav();
        }
        
        isScrolling = true;
        
        // After scrolling done
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(function() {
            isScrolling = false;
            // Show buttons when scrolling is done
            showQuickNav(); 
        }, 100);
    });
});