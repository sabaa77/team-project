document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const authButtons = document.getElementById('authButtons');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const signoutButton = document.getElementById('signoutButton');

    if (isLoggedIn) {
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';

        signoutButton.style.display = 'block';

        signoutButton.addEventListener('click', () => {

            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');

            window.location.href = 'index.html';
        });
    } else {
        loginButton.style.display = 'block';
        signupButton.style.display = 'block';

        signoutButton.style.display = 'none';
    }
});