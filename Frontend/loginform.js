async function login(event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('process-login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    });

    const result = await response.text();
    if (response.ok) {
        window.location.href = "basket.html";
    } else {
        document.getElementById('errorMsg').innerText = "Invalid email or password";
    }
}
document.getElementById('loginForm').addEventListener('submit', login);
