document.addEventListener('DOMContentLoaded', () => {
    // Getting elements
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    
    // Getting form elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    const showSignupLink = document.getElementById('showSignup');
    const showLoginLink = document.getElementById('showLogin');
    
    // User button
    const userBtn = document.querySelector('.user-btn');
    const authContainer = document.getElementById('authContainer');
    
    // notificatiojn element for styling
    const toastEl = document.createElement('div');
    toastEl.className = 'toast-notification';
    toastEl.innerHTML = `
        <div class="toast-content">
            <div class="toast-title">Error</div>
            <div class="toast-message">Passwords do not match!</div>
        </div>
        <button class="toast-close">&times;</button>
    `;
    document.body.appendChild(toastEl);
    
    // event listener for close butn
    const closeBtn = toastEl.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toastEl.classList.remove('show');
    });
    
    // toast notification showwing function
    function showToast(title, message) {
        toastEl.querySelector('.toast-title').textContent = title;
        toastEl.querySelector('.toast-message').textContent = message;
        toastEl.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toastEl.classList.remove('show');
        }, 3000);
    }
    
    // switching via tab 
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });
    
    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
    
    // switching functionality via Link under the form
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupTab.click();
    });
    
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginTab.click();
    });
    
    // Password validation to confirem whether the both the passwords are same
    signupForm.addEventListener('submit', (e) => {
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Checking for the passwords same or not
        if (password !== confirmPassword) {
            e.preventDefault(); 
            showToast('Password Error', 'Passwords do not match!');
        }
    });
});