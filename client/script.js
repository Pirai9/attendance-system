// Function to toggle between login and signup forms
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}

// Make sure this URL matches your server endpoint
const API_BASE_URL = 'http://localhost:8080/api';

// Login function
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (response.ok && data.user) {
            // Ensure we have user data before storing
            const userData = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role
            };
            
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Show success message
            showToast('Login successful!', true);
            
            // Clear form
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
            
            // Redirect to home page after a short delay
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
        } else {
            showToast(data.message || 'Login failed', false);
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('Login failed. Please try again.', false);
    }
}

// Utility function for showing toasts
function showToast(message, isSuccess = true) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: isSuccess ? "#4CAF50" : "#f44336",
        }
    }).showToast();
}

// Signup function
async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('user-role').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, email, password, role }),
        });

        const data = await response.json();
        
        if (response.ok) {
            showToast('Signup successful! Please login.', true);
            toggleForms(); // Switch to login form
            
            // Clear the form
            document.getElementById('signup-name').value = '';
            document.getElementById('signup-email').value = '';
            document.getElementById('signup-password').value = '';
            document.getElementById('user-role').value = '';
        } else {
            showToast(data.message || 'Signup failed', false);
        }
    } catch (error) {
        console.error('Signup error:', error);
        showToast('Signup failed. Please try again.', false);
    }
}

// Navbar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}); 