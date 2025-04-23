// Common functions that used by 3 pages of the checkout process
const CART_STORAGE_KEY = 'shoppingCart';

// To update the order summary with the data of the cart
function updateOrderSummary() {
    // To get elements (subtotal, tax, and total )
    const subtotalElem = document.getElementById('subtotal');
    const totalElem = document.getElementById('total');
    const taxElem = document.getElementById('tax');
    const shippingElem = document.getElementById('shipping');
    const orderItemsContainer = document.getElementById('order-items');
    
    // Exit if any of the required items is not found
    if (!subtotalElem || !totalElem || !taxElem || !orderItemsContainer || !shippingElem) return;
    
    // Load the saved dats from the localStorage
    const cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    
    // Calculate subtotal, display items in the cart
    let subtotal = 0;
    
    cartItems.forEach(item => {
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;
        subtotal += itemTotal;
        
        // Create the append item element
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image || '/api/placeholder/60/60'}" alt="${item.name}">
            </div>
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">$${item.price.toFixed(2)} × ${quantity}</p>
            </div>
            <div class="item-total">
                $${itemTotal.toFixed(2)}
            </div>
        `;
        orderItemsContainer.appendChild(itemElement);
    });
    
    // Setting up fixed shipping cost
    const shippingCost = 5.99;
    
    // Setting up the tax and the calculate the tax 
    const taxRate = 0.08;
    const taxAmount = subtotal * taxRate;
    
    // Taking the sum for the total
    const total = subtotal + shippingCost + taxAmount;
    
    // Update the things to display
    subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    shippingElem.textContent = `$${shippingCost.toFixed(2)}`;
    taxElem.textContent = `$${taxAmount.toFixed(2)}`;
    totalElem.textContent = `$${total.toFixed(2)}`;
}

// Standardizes currency formatting for consistent style
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

//Form field validation with error
function validateField(fieldId, errorId, validationFn) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);
    
    if (!field || !errorElement) return true; 
    
    const isValid = validationFn(field.value);
    
    if (!isValid) {
        field.classList.add('invalid');
        errorElement.style.display = 'block';
    } else {
        field.classList.remove('invalid');
        errorElement.style.display = 'none';
    }
    
    return isValid;
}

// Common validation functions for all three pages in the payment process 
const validators = {
    // first validates the given field is not empty
    notEmpty: (value) => value.trim().length > 0,
    
    // Email format validation
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    
    // Phone numeber validation check whether there are at leat 10 numbers
    phone: (value) => value.replace(/\D/g, '').length >= 10,
    
    // Zip code validation
    zipCode: (value) => value.trim().length >= 5,
    
    // credit card number validation after stripping the spaces and check wherther there are 13 to 19 numbers
    creditCard: (value) => {
        const digits = value.replace(/\D/g, '');
        return digits.length >= 13 && digits.length <= 19;
    },
    
    // expiry date validation
    expiryDate: (value) => /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value),
    
    // cvv vali... (3-4 ints)
    cvv: (value) => /^\d{3,4}$/.test(value)
};
