document.addEventListener('DOMContentLoaded', function() {
    // Check authentication state
    checkAuth();

    // Add logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Contact Form Handler
    async function handleContactSubmit(event) {
        event.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            // Here you would typically send the data to your server
            console.log('Form submitted:', formData);
            
            // Show success message
            showToast('Message sent successfully!', true);
            
            // Clear form
            event.target.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            showToast('Failed to send message. Please try again.', false);
        }
    }
});

// Check if user is authenticated
function checkAuth() {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        // Redirect to login page if no user data
        window.location.href = 'index.html';
        return;
    }

    try {
        const user = JSON.parse(userStr);
        if (!user) {
            window.location.href = 'index.html';
            return;
        }
        // Update UI with user info
        updateUserUI(user);
    } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user'); // Clear invalid data
        window.location.href = 'index.html';
    }
}

// Update UI with user information
function updateUserUI(user) {
    const userNameElements = document.querySelectorAll('#user-name');
    userNameElements.forEach(element => {
        element.textContent = user.name;
    });

    // Show/hide elements based on user role
    if (user.role === 'TEACHER') {
        // Add any teacher-specific UI updates
        document.body.classList.add('teacher-view');
    } else {
        // Add any student-specific UI updates
        document.body.classList.add('student-view');
    }
}

// Handle logout
function handleLogout(event) {
    if (event) {
        event.preventDefault(); // Prevent default button behavior
    }
    
    try {
        // Show confirmation dialog
        if (confirm('Are you sure you want to logout?')) {
            // Clear local storage
            localStorage.clear();
            
            // Redirect to login page immediately
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert('Error logging out. Please try again.');
    }
}

// Toast notification function
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