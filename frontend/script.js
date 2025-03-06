document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const res = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        alert('Sign up successful! You can now sign in.');
    } else {
        alert('Sign up failed. Please try again.');
    }
});

document.getElementById('signin-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    const res = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('sign-up').style.display = 'none';
        document.getElementById('sign-in').style.display = 'none';
        document.getElementById('expense-tracking').style.display = 'block';
        document.getElementById('logout').style.display = 'block';
    } else {
        alert('Sign in failed. Please check your credentials.');
    }
});

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    document.getElementById('sign-up').style.display = 'block';
    document.getElementById('sign-in').style.display = 'block';
    document.getElementById('expense-tracking').style.display = 'none';
    document.getElementById('logout').style.display = 'none';
});
