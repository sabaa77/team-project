document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('signup.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ name, email, password })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = result.redirect;
        } else {
            document.getElementById('errorMsg').innerText = result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorMsg').innerText = "An error occurred. Please try again.";
    }
});