document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    // Toggle the mobile nav
    hamburgerBtn.addEventListener('click', function() {
        mobileNav.classList.add('active');
    });
    
    // To close the nav manu when close button clicked
    closeBtn.addEventListener('click', function() {
        mobileNav.classList.remove('active');
    });
});
