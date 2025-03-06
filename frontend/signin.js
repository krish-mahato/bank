async function signIn(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert('Sign in successful!');
            // Redirect to the dashboard or homepage after a successful login
            window.location.href = 'dashboard.html';
        } else {
            const error = await response.text();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while signing in');
    }
}

document.getElementById('signin-form').addEventListener('submit', signIn);
