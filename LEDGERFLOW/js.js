const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    window.location.href = "index.html";
  });
}
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

const payForm = document.getElementById("pay-form");
if (payForm) {
  payForm.addEventListener("submit", e => {
    e.preventDefault();
    const invoice = payForm.invoice.value.trim();
    const amount = payForm.amount.value.trim();

    if (invoice && amount) {
      document.getElementById("pay-message").textContent = `Payment of $${amount} for invoice ${invoice} processed successfully!`;
      payForm.reset();
    } else {
      document.getElementById("pay-message").textContent = "Please fill in all fields.";
    }
  });
}