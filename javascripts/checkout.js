document.addEventListener('DOMContentLoaded', function() {
    // Get references to important DOM elements
    const form = document.getElementById('checkout-form');
    const successMessage = document.getElementById('success-message');
    const orderItemsContainer = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    // Define cart storage key 
    const CART_STORAGE_KEY = 'shoppingCart';
    
    // Load cart data and populate order summary
    function loadCartData() {
        const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
        
        // If cart is empty, disable checkout
        if (storedCart.length === 0) {
            document.getElementById('order-summary').innerHTML = `
                <div class="empty-cart-message">
                    <h2>Your cart is empty</h2>
                    <p>Please add items to your cart before checkout.</p>
                    <a href="games.html">Continue Shopping</a>
                </div>
            `;
            form.style.display = 'none';
            return;
        }
        
        // Clear existing items
        orderItemsContainer.innerHTML = '';
        
        // Calculate totals
        let subtotal = 0;
        let totalItems = 0;
        
        // Add items to summary
        storedCart.forEach(item => {
            const quantity = item.quantity || 1;
            const itemTotal = item.price * quantity;
            subtotal += itemTotal;
            totalItems += quantity;
            
            // Create item elements
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                <div class="order-item-details">
                    <p class="order-item-name">${item.name}</p>
                    <p class="order-item-meta">
                        ${item.platform ? 'Platform: ' + item.platform : item.category ? 'Category: ' + item.category : ''}
                        ${quantity > 1 ? ' × ' + quantity : ''}
                    </p>
                </div>
                <div class="order-item-price">$${itemTotal.toFixed(2)}</div>
            `;
            
            orderItemsContainer.appendChild(itemElement);
        });
        
        // Calculate final price
        const shipping = 5.99;
        const tax = subtotal * 0.08;
        const total = subtotal + tax + shipping;
        
        // Update order summary
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Validations
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\d{10,15}$/,
        zip: /^\d{5}(-\d{4})?$/,
        cardnumber: /^\d{16}$/,
        expiry: /^(0[1-9]|1[0-2])\/\d{2}$/,
        cvv: /^\d{3,4}$/
    };
    
    // Format card number according tu the way user types
    document.getElementById('cardnumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        
        e.target.value = value;
    });
    
    //  expiry date format according to what user types
    document.getElementById('expiry').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        e.target.value = value;
    });
    
    // Function to validate an one by one form field
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.id;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        // Check whether the field is empty first
        if (field.required && value === '') {
            field.classList.add('invalid');
            errorElement.style.display = 'block';
            return false;
        }
        
        // validating patterns for some fields
        if (patterns[fieldName] && value !== '') {
            // Removing spaces in order to validate card numbers
            let testValue = value;
            if (fieldName === 'cardnumber') {
                testValue = value.replace(/\s/g, '');
            }
            
            if (!patterns[fieldName].test(testValue)) {
                field.classList.add('invalid');
                errorElement.style.display = 'block';
                return false;
            }
        }
        
        //  If came here, field is valid
        field.classList.remove('invalid'); // Remove the invalid class
        errorElement.style.display = 'none';
        return true;
    }
    
    //  Add event listeners to all form input fields
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validating all fields
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Hide the form and Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Clear the cart after successful order bymaking the array empty
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
            
            //  Log success message
            console.log('Form submitted successfully');
        } else {
            // If form is invalid, finding the first invalid field and scroll to that
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
    
    // Load cart data after done page loding
    loadCartData();
});