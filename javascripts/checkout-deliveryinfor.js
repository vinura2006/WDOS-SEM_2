document.addEventListener('DOMContentLoaded', () => {
    // Load cart data, order summery froom local storage
    updateOrderSummary();
    
    // Load any form data from the local storage
    loadSavedFormData();
    
    // Handle the from submisson
    document.getElementById('delivery-info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        if (validateDeliveryInfo()) {
            // Save data to the localStorage
            saveFormData();
            
            // Direct to payment page
            window.location.href = 'payment-info.html';
        }
    });
    
    // TO validate the form
    function validateDeliveryInfo() {
        let isValid = true;
        
        // Validate the enterd adress
        const address = document.getElementById('address');
        if (!address.value.trim()) {
            document.getElementById('address-error').style.display = 'block';
            address.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('address-error').style.display = 'none';
            address.classList.remove('invalid');
        }
        
        // Validate the city if there is nothing show the error
        const city = document.getElementById('city');
        if (!city.value.trim()) {
            document.getElementById('city-error').style.display = 'block';
            city.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('city-error').style.display = 'none';
            city.classList.remove('invalid');
        }
        
        // Validatting the zip code
        const zip = document.getElementById('zip');
        if (!zip.value.trim()) {
            document.getElementById('zip-error').style.display = 'block';
            zip.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('zip-error').style.display = 'none';
            zip.classList.remove('invalid');
        }
        
        // To validate the country
        const country = document.getElementById('country');
        if (!country.value) {
            document.getElementById('country-error').style.display = 'block';
            country.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('country-error').style.display = 'none';
            country.classList.remove('invalid');
        }
        
        return isValid;
    }
    
    // To save form data to the local storage
    function saveFormData() {
        const formData = {
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value
        };
        
        localStorage.setItem('checkoutDeliveryInfo', JSON.stringify(formData));
    }
    
    // To load saved form local storage
    function loadSavedFormData() {
        const savedData = JSON.parse(localStorage.getItem('checkoutDeliveryInfo'));
        if (savedData) {
            document.getElementById('address').value = savedData.address || '';
            document.getElementById('city').value = savedData.city || '';
            document.getElementById('zip').value = savedData.zip || '';
            document.getElementById('country').value = savedData.country || '';
        }
    }
});