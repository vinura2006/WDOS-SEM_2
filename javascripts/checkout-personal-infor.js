document.addEventListener('DOMContentLoaded', () => {
    // Load cart data/ update order summary
    updateOrderSummary();
    
    // Load save form data
    loadSavedFormData();
    
    // Handle the submission of form
    document.getElementById('personal-info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // form validation
        if (validatePersonalInfo()) {
            // Saving form data to localStorage
            saveFormData();
            
            // Direct to delivery page
            window.location.href = 'delivery-info.html';
        }
    });
    
    // validate the form function
    function validatePersonalInfo() {
        let isValid = true;
        
        // full name validation
        const fullname = document.getElementById('fullname');
        if (!fullname.value.trim()) {
            document.getElementById('fullname-error').style.display = 'block';
            fullname.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('fullname-error').style.display = 'none';
            fullname.classList.remove('invalid');
        }
        
        // Validate the enterd email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('email-error').style.display = 'block';
            email.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('email-error').style.display = 'none';
            email.classList.remove('invalid');
        }
        
        // Validate phone number
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.replace(/\D/g, '');
        if (phoneValue.length < 10) {
            document.getElementById('phone-error').style.display = 'block';
            phone.classList.add('invalid');
            isValid = false;
        } else {
            document.getElementById('phone-error').style.display = 'none';
            phone.classList.remove('invalid');
        }
        
        return isValid;
    }
    
    // save form data function
    function saveFormData() {
        const formData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        
        localStorage.setItem('checkoutPersonalInfo', JSON.stringify(formData));
    }
    
    // Function to load saved form data from the local storage
    function loadSavedFormData() {
        const savedData = JSON.parse(localStorage.getItem('checkoutPersonalInfo'));
        if (savedData) {
            document.getElementById('fullname').value = savedData.fullname || '';
            document.getElementById('email').value = savedData.email || '';
            document.getElementById('phone').value = savedData.phone || '';
        }
    }
});