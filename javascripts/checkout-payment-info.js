document.addEventListener('DOMContentLoaded', () => {
    // Load cart data/ update order summary
    updateOrderSummary();
    
    //  card input fields format
    formatCardInputs();
    
    // Load saved form data from local storage
    loadSavedFormData();
    
    // Load and dislay the information of before steps
    loadReviewInfo();
    
    // from submission handle
    document.getElementById('payment-info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate the form
        if (validatePaymentInfo()) {
            processPayment();
        }
    });
    
    // format card inputs function
    function formatCardInputs() {
        // card number formating
        const cardNumber = document.getElementById('cardnumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function() {
                let value = this.value.replace(/\D/g, '');
                if (value.length > 0) {
                    value = value.match(/.{1,4}/g).join(' ');
                }
                this.value = value;
            });
        }
        
        // Format expiry date
        const expiry = document.getElementById('expiry');
        if (expiry) {
            expiry.addEventListener('input', function() {
                let value = this.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length > 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2);
                    }
                    if (value.length > 5) {
                        value = value.substring(0, 5);
                    }
                }
                this.value = value;
            });
        }
        
        // CVV formatting 
        const cvv = document.getElementById('cvv');
        if (cvv) {
            cvv.addEventListener('input', function() {
                this.value = this.value.replace(/\D/g, '').substring(0, 4);
            });
        }
    }
    
    //  Validate the form function
    function validatePaymentInfo() {
        let isValid = true;
        
        // Validating the card name
        const cardname = document.getElementById('cardname');
        if (!cardname.value.trim()) {
            document.getElementById('cardname-error').style.display = 'block';
            cardname.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('cardname-error').style.display = 'none';
            cardname.classList.remove('invalid');
        }
        
        // Validate card number (Check there are 13-19 numbers)
        const cardnumber = document.getElementById('cardnumber');
        const cardDigits = cardnumber.value.replace(/\D/g, '');
        if (cardDigits.length < 13 || cardDigits.length > 19) {
            document.getElementById('cardnumber-error').style.display = 'block';
            cardnumber.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('cardnumber-error').style.display = 'none';
            cardnumber.classList.remove('invalid');
        }
        
        // To validate the expiry date
        const expiry = document.getElementById('expiry');
        if (!expiry.value.trim() || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry.value)) {
            document.getElementById('expiry-error').style.display = 'block';
            expiry.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('expiry-error').style.display = 'none';
            expiry.classList.remove('invalid');
        }
        
        // TO validate the CVV
        const cvv = document.getElementById('cvv');
        if (!cvv.value.trim() || !/^\d{3,4}$/.test(cvv.value)) {
            document.getElementById('cvv-error').style.display = 'block';
            cvv.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('cvv-error').style.display = 'none';
            cvv.classList.remove('invalid');
        }
        
        return isValid;
    }
    
    // To load data from the local storage
    function loadSavedFormData() {
        const savedData = JSON.parse(localStorage.getItem('checkoutPaymentInfo'));
        if (savedData) {
            document.getElementById('cardname').value = savedData.cardname || '';
            document.getElementById('cardnumber').value = savedData.cardnumber || '';
            document.getElementById('expiry').value = savedData.expiry || '';
            document.getElementById('cvv').value = savedData.cvv || '';
        }
    }
    
    // function to load and display the information that submitted brfore
    function loadReviewInfo() {
        // personal info
        const personalInfo = JSON.parse(localStorage.getItem('checkoutPersonalInfo')) || {};
        document.getElementById('review-name').textContent = personalInfo.fullname || 'Not provided';
        document.getElementById('review-email').textContent = personalInfo.email || 'Not provided';
        document.getElementById('review-phone').textContent = personalInfo.phone || 'Not provided';
        
        // delivery info
        const deliveryInfo = JSON.parse(localStorage.getItem('checkoutDeliveryInfo')) || {};
        document.getElementById('review-address').textContent = deliveryInfo.address || 'Not provided';
        document.getElementById('review-city-zip').textContent = 
            `${deliveryInfo.city || ''} ${deliveryInfo.zip || ''}`.trim() || 'Not provided';
        
        // country code to country name
        const countryMap = {
            'US': 'United States',
            'CA': 'Canada',
            'UK': 'United Kingdom',
            'AU': 'Australia',
            'SL': 'Sri Lanka'
            
        };
        document.getElementById('review-country').textContent = 
            deliveryInfo.country ? (countryMap[deliveryInfo.country] || deliveryInfo.country) : 'Not provided';
    }
    
    //To the process the payment
    function processPayment() {
        // Save payment information to the localStorage
        const paymentInfo = {
            cardname: document.getElementById('cardname').value,
            cardnumber: document.getElementById('cardnumber').value,
            expiry: document.getElementById('expiry').value,
            cvv: document.getElementById('cvv').value
        };
        localStorage.setItem('checkoutPaymentInfo', JSON.stringify(paymentInfo));
        
        // To hide the form
        document.getElementById('payment-info-form').style.display = 'none';
        
        // Show successfull msg
        document.getElementById('success-message').style.display = 'block';
        
        // Make the cart empty
        localStorage.setItem('shoppingCart', JSON.stringify([]));
    }
});