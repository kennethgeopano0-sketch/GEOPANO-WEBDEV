document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('reservationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Reservation request sent! We'll confirm within 24 hours. Thank you!");
    this.reset();
});

// Login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    if (email && password) {
        alert(`Welcome back, ${email}!`);
        // In production: authenticate and redirect
    } else {
        alert('Please fill in all fields.');
    }
});

