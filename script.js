// API Configuration
const API_URL = 'http://localhost:5000/api';

// Form validation and submission handling with backend
document.getElementById('loginForm').addEventListener('submit', async function(event) {
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
  
  // If form is valid, send to backend
  if (isValid) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Save token in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', email);
        
        // Save remember me preference
        if (remember) {
          localStorage.setItem('rememberEmail', email);
        } else {
          localStorage.removeItem('rememberEmail');
        }
        
        // Show success message
        alert('Login successful!\nWelcome, ' + email);
        
        // Reset form
        document.getElementById('loginForm').reset();
        
        // Redirect to dashboard (update this URL as needed)
        setTimeout(() => {
          window.location.href = '/dashboard.html';
        }, 1000);
      } else {
        document.getElementById('emailError').textContent = data.error || 'Login failed';
      }
    } catch (err) {
      console.error('Error:', err);
      document.getElementById('emailError').textContent = 'Connection error. Please try again.';
    }
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
  
  // Check if already logged in
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    // Optionally redirect if already logged in
    // window.location.href = '/dashboard.html';
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
