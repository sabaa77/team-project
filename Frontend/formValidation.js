document.getElementById('contactForm').addEventListener('submit', function (event) {
event.preventDefault();

const name = event.target.name.value.trim();
const email = event.target.email.value.trim();
const message = event.target.message.value.trim();

const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!nameRegex.test(name)) {
    alert('Name can only contain letters and spaces.');
    return false;
}

if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return false;
}

if (message.length < 10 || message.length > 500) {
    alert('Message must be between 10 ad 500 characters.');
    return false;
}

alert('Form submitted successfully!');
event.target.submit();
    
});