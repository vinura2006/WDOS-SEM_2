// Cart page
document.addEventListener('DOMContentLoaded', () => {
    // Taking references to the cart item body where should they be display
    const cartTableBody = document.querySelector('#cart-items');
    // references for the checkout butn
    const checkoutButton = document.querySelector('.checkout-btn');
    // defines constants to store the items in local storage

    const CART_STORAGE_KEY = 'shoppingCart'; // Main cart storage 
    const FAVORITES_STORAGE_KEY = 'favoriteCart'; // Storage for saved items in cart(Favourite)


    // Adding buttons (Favorites and Clear Cart)
    function addCustomButtons() {
        // TO find the cart summary section and exit if the cart summery doesn't exist
        const cartSummary = document.querySelector('.cart-summary');
        if (!cartSummary) return;
        
        // Favourite buttons container styles
        const favoritesContainer = document.createElement('div');
        favoritesContainer.className = 'favorites-buttons';
        favoritesContainer.style.marginTop = '20px';
        favoritesContainer.style.display = 'flex';
        favoritesContainer.style.gap = '10px';
        
        // Designing and creating the "Save as Favorite" button
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save as Favorites';
        saveButton.className = 'save-favorite-btn';
        saveButton.style.flex = '1';
        // background color (Blue)
        saveButton.style.background = '#007bff'; 
        saveButton.style.color = 'white';
        saveButton.style.border = 'none';
        saveButton.style.padding = '10px';
        saveButton.style.borderRadius = '5px';
        saveButton.style.cursor = 'pointer';
        saveButton.style.transition = 'background-color 0.3s ease';
        
        // designing/cre.. "Apply to Favorite" button
        const applyButton = document.createElement('button');
        applyButton.textContent = 'Apply Favorites';
        applyButton.className = 'apply-favorite-btn';
        applyButton.style.flex = '1';
        //background clr
        applyButton.style.background = '#28a745'; 
        applyButton.style.color = 'white';
        applyButton.style.border = 'none';
        applyButton.style.padding = '10px';
        applyButton.style.borderRadius = '5px';
        applyButton.style.cursor = 'pointer';
        applyButton.style.transition = 'background-color 0.3s ease';
        
        // Hover effects for btns
        saveButton.addEventListener('mouseover', () => {
            // Darker blue When hover
            saveButton.style.background = '#0069d9'; 
        });
        saveButton.addEventListener('mouseout', () => {
            // Return to original clr
            saveButton.style.background = '#007bff'; 
        });
        
        applyButton.addEventListener('mouseover', () => {
            // Darker green on hover
            applyButton.style.background = '#218838'; 
        });
        applyButton.addEventListener('mouseout', () => {
            // Return to original clr
            applyButton.style.background = '#28a745'; 
        });
        
        // Add buttons (To favourite cont)
        favoritesContainer.appendChild(saveButton);
        favoritesContainer.appendChild(applyButton);
        
        // Container for clear cart button( separated from other elements)
        const clearContainer = document.createElement('div');
        clearContainer.style.marginTop = '10px';
        
        // Designing and creating the cart button
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear Cart';
        clearButton.className = 'clear-cart-btn';
        clearButton.style.width = '100%';
        // Red background color
        clearButton.style.background = '#dc3545'; 
        clearButton.style.color = 'white';
        clearButton.style.border = 'none';
        clearButton.style.padding = '10px';
        clearButton.style.borderRadius = '5px';
        clearButton.style.cursor = 'pointer';
        clearButton.style.transition = 'background-color 0.3s ease';
        
        // Hover effect for Clear Cart btn
        clearButton.addEventListener('mouseover', () => {
            // Darker red when hover
            clearButton.style.background = '#c82333'; 
        });
        clearButton.addEventListener('mouseout', () => {
            // Return to original clr
            clearButton.style.background = '#dc3545'; 
        });
        
        clearContainer.appendChild(clearButton);
        
        // Insterting button before the payments methode
        const paymentMethods = cartSummary.querySelector('.payment-methods');
        cartSummary.insertBefore(favoritesContainer, paymentMethods);
        cartSummary.insertBefore(clearContainer, paymentMethods);
        
        // Adding event listner for the buttons to function
        saveButton.addEventListener('click', saveCartAsFavorite);
        applyButton.addEventListener('click', applyFavoriteCart);
        clearButton.addEventListener('click', clearCart);
    }
    
    // Clear all items function
    function clearCart() {
        // Take the current from the local storage
        const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
        
        // Make sure whether the cart is empty, If empty show the notification
        if (storedCart.length === 0) {
            showNotification('Cart is already empty', 'error');
            return;
        }
        
        // Confirmation before clearing the cart
        if (confirm('Are you sure you want to clear your entire cart?')) {
            // clearing the existing items in the local storage 
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
            // Update the cart display
            populateCart();
            // Successful notification 
            showNotification('Cart has been cleared', 'success');
        }
    }
    
    // Save as favourite function(To save the items for use later)
    function saveCartAsFavorite() {
        // Take the items from the local storage
        const currentCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
        
        // For prevent from saving empty cart
        if (currentCart.length === 0) {
            showNotification('Cannot save an empty cart as favorite', 'error');
            return;
        }
        
        // Save the currnet cart itmes in Favorite storage key for later use
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(currentCart));
        // To shwo successfull notification
        showNotification('Current cart saved as favorite', 'success');
    }
    
    // Apply favourites to the cart function
    function applyFavoriteCart() {
        // Take Items from the favourite storage
        const favoriteCart = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)) || [];
        
        // Check if any product is available on the favourite storage
        if (favoriteCart.length === 0) {
            showNotification('No favorite cart saved', 'error');
            return;
        }
        
        // Replace the current items with the favourite storage items
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(favoriteCart));
        // Update the cart and sisplay it
        populateCart();
        // show notification(Successfull)
        showNotification('Favorite cart applied', 'success');
    }
    


    // Because the notification used for many pages styles are used in the js code, Because the js code is common for the all the pages
    function showNotification(message, type = 'info', title = '') {
        // Designnin the styles for the notification
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
            .toast-notification {
                position: fixed; bottom: 30px; right: 30px;
                background: rgba(0,0,0,0.85); color: white;
                padding: 15px 25px; border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                display: flex; align-items: center; gap: 15px;
                transform: translateY(100px); opacity: 0;
                transition: all 0.3s ease; z-index: 9999;
                min-width: 350px; max-width: 450px;
                backdrop-filter: blur(10px);
                border-left: 4px solid #007bff;
            }
            .toast-notification.show { transform: translateY(0); opacity: 1; }
            .toast-content { flex: 1; }
            .toast-title { font-weight: 600; margin-bottom: 5px; }
            .toast-message { font-size: 0.95rem; opacity: 0.9; }
            .toast-close {
                background: none; border: none; color: white;
                cursor: pointer; font-size: 1.2rem; opacity: 0.7;
            }
            .toast-close:hover { opacity: 1; }
            @media (max-width: 480px) {
                .toast-notification {
                min-width: auto; max-width: 90%; left: 50%; right: auto;
                transform: translateX(-50%) translateY(100px);
                }
                .toast-notification.show { transform: translateX(-50%) translateY(0); }
            }
            `;
            document.head.appendChild(style);
        }

        // Setting the Title according to the type of the massege
        if (!title) {
            title = type === 'success' ? 'Success!' : 
                    type === 'error' ? 'Error!' : 
                    'Notification';
        }        

        // Create elements for the toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">&times;</button>
        `;

        // Set color to the notification based on the type of the notiffication
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#007bff'
        };
        toast.style.borderLeftColor = colors[type] || colors.info;

        // Adding to the DOM
        document.body.appendChild(toast);

        // Setting up a close button for the notification
        toast.querySelector('.toast-close').onclick = () => {
            toast.classList.remove('show');
            setTimeout(() => toast.parentNode && document.body.removeChild(toast), 300);
        };

        // Show up the notification and then auto hide it
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.parentNode && document.body.removeChild(toast), 300);
        }, 5000);

        return toast;
    }
    
    // Display cart items and update them (Main function)
    function populateCart() {
        // Take the current items from the local storage
        const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
        // Current cart clear(Display)
        cartTableBody.innerHTML = '';

        // Chekcout button state(If there is no no item make sure it is not working)
        updateCheckoutButtonState(storedCart.length > 0);

        // If there are no items in the cart display there are no items and continue to shopping
        if (storedCart.length === 0) {
            cartTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center;">
                        <p>Your cart is empty.</p>
                        <a href="games.html" class="continue-shopping">Continue Shopping</a>
                    </td>
                </tr>
            `;
            return;
        }

        // To create the table rows loop through the items in the cart
        storedCart.forEach((item, index) => {
            const row = document.createElement('tr');
            //Creating the Table with html including image, details, price, quantity controls, total, and action buttons(remove and save for later button)
            row.innerHTML = `
                <td class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </td>
                <td class="item-details">
                    <h3>${item.name}</h3>
                    <p>${item.platform ? 'Platform: ' + item.platform : item.category ? 'Category: ' + item.category : ''}</p>
                </td>
                <td class="item-price">
                    <p class="final-price">$${item.price.toFixed(2)}</p>
                </td>
                <td class="item-quantity">
                    <button class="qty-btn decrease" data-index="${index}">-</button>
                    <input type="number" value="${item.quantity || 1}" min="1" max="10" class="qty-input" data-index="${index}">
                    <button class="qty-btn increase" data-index="${index}">+</button>
                </td>
                <td class="item-total">
                    <p>$${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </td>
                <td class="item-actions">
                    <button class="remove-btn" data-index="${index}">Remove</button>
                    <button class="wishlist-btn">Save for Later</button>
                </td>
            `;
            cartTableBody.appendChild(row);

            // For every interactive items in raw add event listner
            // Remove button( animation and remove the item)
            row.querySelector('.remove-btn').addEventListener('click', () => removeItem(index));

            // decrease quantity button
            row.querySelector('.decrease').addEventListener('click', () => adjustQuantity(index, -1));

            // increase quantity button
            row.querySelector('.increase').addEventListener('click', () => adjustQuantity(index, 1));

            // Direct quantity input field
            row.querySelector('.qty-input').addEventListener('change', (event) => updateQuantity(index, parseInt(event.target.value)));

            // save for later button(wishlist)
            row.querySelector('.wishlist-btn').addEventListener('click', () => {
                alert(`Item "${item.name}" saved for later!`);
            });
        });

        // Update order summery 
        updateSummary(storedCart);
    }

    // Checkout button state updating function
    function updateCheckoutButtonState(hasItems) {
        // Exit if button isn't exist
        if (!checkoutButton) return; 
        
        if (hasItems) {
            // Enable checkout button if there are items
            checkoutButton.disabled = false;
            checkoutButton.style.opacity = '1';
            checkoutButton.style.cursor = 'pointer';
            
            // Turn on the click event
            checkoutButton.onclick = function() {
                window.location.href = 'personal-info.html';
            };
        } else {
            // If cart is empty make button disable and remove the click event
            checkoutButton.classList.add('disabled');
            checkoutButton.style.opacity = '0.5';
            checkoutButton.style.cursor = 'not-allowed';

            // Show the error notification 
            checkoutButton.onclick = function (e) {
                e.preventDefault();
                showNotification('Cannot proceed to checkout with an empty cart', 'error');
            };
        }
    }
    

    // To increase and decreasse item quantity
    function adjustQuantity(index, change) {
        // Take the current cart
        const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
        // Make sure the quantity is > 0
        storedCart[index].quantity = Math.max(1, (storedCart[index].quantity || 1) + change);
        // Save the updated cart
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));
        // refrsh the cart interface
        populateCart();
    }

    // Update the quantity from the direct input
    function updateQuantity(index, value) {

        // Take the current cart
        const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
        
        // ensure the quantity is > 0
        storedCart[index].quantity = Math.max(1, value);
        
        // Save updated crt
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));
        
        // Refresh the cart int
        populateCart();
    }

    // Remove with animation
    function removeItem(index) {
        // Take all the items in rows
        const cartItems = document.querySelectorAll('#cart-items tr');
        const rowToRemove = cartItems[index];

        // Check whether rows are exist
        if (!rowToRemove) return;

        // Css class for swipe out anuimation
        rowToRemove.classList.add('swipe-out');

        // Wait till animation done to remove the item(Becasue it is going to overlay otherwise)
        rowToRemove.addEventListener('animationend', () => {
            // Tske the current cart
            const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
            
            // Remove item form the array in the cart
            storedCart.splice(index, 1);
            
            // Save updated ..
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));
            // Refresh cart int...
            populateCart();
        });
    }

    // To update order summery with price and the toatal
    function updateSummary(cartItems) {
        // Take elements to calculate the toatal, sub total and also to count the number of items
        const subtotalElem = document.querySelector('.summary-item span:last-child');
        const totalElem = document.querySelector('.summary-total span:last-child');
        const subtotalItemsElem = document.querySelector('.summary-item span:first-child');

        // Exit if therre is anything requred is not there
        if (!subtotalElem || !subtotalItemsElem || !totalElem) return;

        let subtotal = 0;
        let totalItems = 0;

        // Count items and calculate the subtotal
        cartItems.forEach(item => {
            const quantity = item.quantity || 1;
            subtotal += item.price * quantity;
            totalItems += quantity;
        });

        // Update the subtotal in the interface
        subtotalElem.textContent = `$${subtotal.toFixed(2)}`;

        // For not subtotal and the total is same (in future ...)
        totalElem.textContent = `$${subtotal.toFixed(2)}`;

        // update the text according to item count which is - Items or Item
        subtotalItemsElem.textContent = `Subtotal (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`;
    }

    // Helper function for the pheriphals to catogarize the type of the hardware
    function getItemCategory(card) {
        if (card.classList.contains('part-card')) return 'Processor';
        if (card.classList.contains('graphics-card')) return 'Graphics Card';
        if (card.classList.contains('storage-item')) return 'Storage';
        // Default
        return 'Hardware'; 
    }

    // Function to move data from old cart format to new format
    function migrateOldCart() {
        // Check for the data in old cart
        const oldCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (oldCart.length > 0) {
            // get the current shopping cart data from localStorage
            const newCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

            //  checking for duplicate items between the old cart and the new cart
            oldCart.forEach(oldItem => {
                // Check if the same items exists in the new storage
                const existingItem = newCart.find(item => item.id === oldItem.id);
                if (existingItem) {
                    // If there is increase the quantity
                    existingItem.quantity += (oldItem.quantity || 1);
                } else {
                    // If there isn't that item add the item newly
                    newCart.push(oldItem);
                }
            });

            // delete old cart and update the cart
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
            localStorage.removeItem('cartItems');
        }
    }

    // Event listner for the add to cart button on the page anywhere
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Get the product details
            let id, name, price, image;
            
            // first get data from the attributes
            id = button.getAttribute('data-id');
            name = button.getAttribute('data-name');
            price = button.getAttribute('data-price');
            
            // If there is no atributed, get details from the parent elements
            const productCard = button.closest('.game-item, .product-card');
            if (!id && productCard) {
                 // Generate a unique ID if there is no id exists
                id = productCard.id || `product-${Date.now()}`;
            }
            
            if (!name && productCard) {
                const nameElem = productCard.querySelector('h3');
                if (nameElem) name = nameElem.textContent;
            }
            
            if (!price && productCard) {
                const priceElem = productCard.querySelector('.final-price');
                if (priceElem) price = priceElem.textContent.replace('$', '');
            }
            
            // Taking the image from the parent
            if (productCard) {
                const imgElem = productCard.querySelector('img');
                if (imgElem) image = imgElem.src;
            }
            
            // Validate the data that having
            if (!id || !name || !price || !image) {
                console.error('Missing product data for adding to cart');
                return;
            }
            
            price = parseFloat(price);
            
            // Get current cart
            const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
            // Check for whether the item is already exist in the cart
            const existingItem = storedCart.find(item => item.id === id);

            if (existingItem) {
                // If there is, increase the quantity
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                // If new, add to cart
                storedCart.push({
                    id,
                    name,
                    price,
                    image,
                    quantity: 1,
                    // platform default 
                    platform: 'PC' 
                });
            }

            // Save the updated cart
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));
            // Show the notification
            showNotification(`${name} added to cart!`, 'success');
            // refresh the cart if the current open page is cart
            if (cartTableBody) {
                populateCart();
            }
        });
    });

    // Event listners for the Add TO cart for Pheriphals page
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            // Find parent card
            const card = button.closest('.part-card, .graphics-card, .storage-item');
            // Exit if no parent product card found
            if (!card) return; 

            // Take the product details from the parent cards
            const itemId = card.id;
            const nameElement = card.querySelector('.part-name, .graphics-card-name, .storage-name');
            const priceElement = card.querySelector('.part-price, .graphics-card-price, .storage-price-back');
            if (!nameElement || !priceElement) return; // Exit if any required items is not found

            const itemName = nameElement.innerText;
            const itemPrice = parseFloat(priceElement.innerText.replace('$', ''));
            const itemImage = card.querySelector('img')?.src || '';
            
            // Take the current card
            const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
            
            // Checking for the item is already existed in the cart
            const existingItem = storedCart.find(item => item.id === itemId);

            if (existingItem) {
                // If the item is exist increase the quantity
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                // If the item is not there, add the item to the cart
                storedCart.push({
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1,
                    // Based on card type determine the catogory
                    category: getItemCategory(card) 
                });
            }

            // SAve the updated cart
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));
            // Show NOtific..
            showNotification(`${itemName} added to cart!`, 'success');
        });
    });

    // Run when page loads- Initializing the setup
    migrateOldCart(); // Migrate old cart data
    addCustomButtons(); // Add custom buttons to the page(Ordersummery)
    populateCart(); // Display cart items
});