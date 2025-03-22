document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user_type', data.userType);

            window.location.href = data.redirect;
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});