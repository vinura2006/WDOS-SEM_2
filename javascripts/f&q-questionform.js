document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    // Making the toast notification element
    const toastHTML = `
        <div class="toast-notification" id="successToast">
            <div class="toast-content">
                <div class="toast-title">Success!</div>
                <div class="toast-message">Your question has been successfully delivered.</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.classList.remove('show')">×</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', toastHTML);
    const successToast = document.getElementById('successToast');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        

        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.style.borderColor = '';
        });
        
        // Gathering input values
        const inputs = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            question: document.getElementById('question')
        };
        
        // Validating conditions
        const validations = [
            { element: inputs.name, condition: !inputs.name.value.trim(), message: 'Please enter your name' },
            { element: inputs.email, condition: !inputs.email.value.trim(), message: 'Please enter your email' },
            { element: inputs.email, condition: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.value) && inputs.email.value.trim(), 
              message: 'Please enter a valid email address' },
            { element: inputs.question, condition: !inputs.question.value.trim(), message: 'Please enter your question' },
            { element: inputs.question, condition: inputs.question.value.trim().length < 10, 
              message: 'Your question should be at least 10 characters long' }
        ];
        
        // Checking validators(ALL)
        const isValid = validations.every(validation => {
            if (validation.condition) {
                displayError(validation.element, validation.message);
                return false;
            }
            return true;
        });
        
        if (isValid) {
            // Show success notification if all the enterd informations are valid
            successToast.classList.add('show');
            
            // Diassapear Notification after 5 s
            setTimeout(() => {
                successToast.classList.remove('show');
            }, 5000);
            
            // Resetinf the form
            contactForm.reset();
            
        }
    });
    
    function displayError(inputElement, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        
        inputElement.parentNode.appendChild(errorElement);
        inputElement.style.borderColor = 'red';
    }
});