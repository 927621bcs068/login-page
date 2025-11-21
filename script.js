// Form validation and submission handling
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Clear previous error messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    
    // Validation flags
    let isValid = true;
    
    // Email validation
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!isValidEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Password validation
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    // If form is valid, submit
    if (isValid) {
        // Save remember me preference
        if (remember) {
            localStorage.setItem('rememberEmail', email);
        } else {
            localStorage.removeItem('rememberEmail');
        }
        
        // For demonstration, show success message
        alert('Login successful!\nEmail: ' + email + '\nRemember me: ' + remember);
        
        // Reset form
        document.getElementById('loginForm').reset();
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Load remembered email on page load
window.addEventListener('load', function() {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
});

// Real-time validation for email field
document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !isValidEmail(this.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
    } else {
        document.getElementById('emailError').textContent = '';
    }
});

// Real-time validation for password field
document.getElementById('password').addEventListener('blur', function() {
    if (this.value && this.value.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
    } else {
        document.getElementById('passwordError').textContent = '';
    }
});

// Clear error messages on input
document.getElementById('email').addEventListener('input', function() {
    if (isValidEmail(this.value)) {
        document.getElementById('emailError').textContent = '';
    }
});

document.getElementById('password').addEventListener('input', function() {
    if (this.value.length >= 6) {
        document.getElementById('passwordError').textContent = '';
    }
});
