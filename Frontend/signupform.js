const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();

    if (newUsername && newPassword) {
        alert('Signup successful! You can now log in.');
        window.location.href = 'login.html';
    } else {
        alert('Please fill out all fields!');
    }
});
