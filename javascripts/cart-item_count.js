//Cart badge item counter
document.addEventListener('DOMContentLoaded', () => {
    
    // Constants
    const CART_STORAGE_KEY = 'shoppingCart';
    
    // Designing and addding badges
    function initCartBadges() {
        // Badge for desktop cart button
        const desktopCartBtn = document.querySelector('.cart-btn');
        if (desktopCartBtn) {
            // Styles for the pc badge on the button
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background-color: #e74c3c;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                font-weight: bold;
            `;
            
            //Make the parent item relative to the position
            desktopCartBtn.style.position = 'relative';
            desktopCartBtn.appendChild(badge);
        }
        
        // Adding and creating badje for the mobile button
        const mobileCartBtn = document.querySelector('.mobile-nav-actions .mobile-action-btn:first-child');
        if (mobileCartBtn) {
            // Creating and styling thr badge
            const mobileBadge = document.createElement('span');
            mobileBadge.className = 'cart-badge-mobile';
            mobileBadge.style.cssText = `
                margin-left: 5px;
                background-color: #e74c3c;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                font-weight: bold;
            `;
            mobileCartBtn.appendChild(mobileBadge);
        }
        
        // With current count update the badge
        updateCartCount();
        
        // checking for update
        setInterval(updateCartCount, 1000);
    }
    
    // Update the badge according to the currne count
    function updateCartCount() {
        // Get the cart Local Storage
        const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
        
        // Total items count
        let itemCount = 0;
        cart.forEach(item => {
            itemCount += item.quantity || 1;
        });
        
        // Update the badge elements
        document.querySelectorAll('.cart-badge, .cart-badge-mobile').forEach(badge => {
            if (itemCount > 0) {
                badge.textContent = itemCount > 99 ? '99+' : itemCount;
                badge.style.display = badge.classList.contains('cart-badge') ? 'flex' : 'inline-flex';
            } else {
                badge.style.display = 'none';
            }
        });
    }
    
    // Initialize the badges
    initCartBadges();
    
    // add to cart button click listner
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn') || 
            event.target.classList.contains('add-to-cart') ||
            event.target.closest('.add-to-cart-btn') ||
            event.target.closest('.add-to-cart')) {
            setTimeout(updateCartCount, 100);
        }
    });
});