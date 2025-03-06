async function signUp(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    try {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, phone, address }),
        });

        if (response.ok) {
            alert('Sign up successful!');
            window.location.href = 'signin.html'; // Redirect to sign in page
        } else {
            const error = await response.text();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        alert('Error signing up. Please try again.');
    }
}

// Attach the signUp function to the signup form
document.getElementById('signup-form').addEventListener('submit', signUp);
