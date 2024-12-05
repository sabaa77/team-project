const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

const validUser = { username: 'user123', password: 'pass123' };

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === validUser.username && password === validUser.password) {
        alert('Login successful!');
        errorMsg.textContent = '';
    } else {
        errorMsg.textContent = 'Invalid username or password!';
    }
});
