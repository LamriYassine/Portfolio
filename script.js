// Smooth scroll function
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form validation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
            showError('name', 'Name is required');
            isValid = false;
        } else if (name.length > 100) {
            showError('name', 'Name must be less than 100 characters');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Invalid email address');
            isValid = false;
        } else if (email.length > 255) {
            showError('email', 'Email must be less than 255 characters');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            showError('message', 'Message is required');
            isValid = false;
        } else if (message.length > 1000) {
            showError('message', 'Message must be less than 1000 characters');
            isValid = false;
        }
        
        // If valid, show success message and reset form
        if (isValid) {
            showToast('Message sent!', 'Thank you for reaching out. I\'ll get back to you soon.');
            contactForm.reset();
        }
    });
    
    // Clear error on input
    const formInputs = contactForm.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorElement = document.getElementById(`${this.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// Toast notification
function showToast(title, description) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDescription = document.getElementById('toast-description');
    
    if (toast && toastTitle && toastDescription) {
        toastTitle.textContent = title;
        toastDescription.textContent = description;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});