/* LOGIN FORM */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email !== "" && password !== "") {
      window.location.href = "reservation.html";
    } else {
      alert("Please enter your email and password.");
    }
  });
}


/* CAROUSEL */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let current = 0;
let timer;

function showSlide(index) {

  if (slides.length === 0) return;

  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = (index + slides.length) % slides.length;

  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

function nextSlide() {
  showSlide(current + 1);
}

function prevSlide() {
  showSlide(current - 1);
}

function startCarousel() {

  if (slides.length === 0) return;

  timer = setInterval(nextSlide, 3500);
}

function resetCarousel() {
  clearInterval(timer);
  startCarousel();
}

if (prevBtn && nextBtn) {

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetCarousel();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetCarousel();
  });

}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetCarousel();
  });
});

startCarousel();


/* RESERVATION FORM */

const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {

  reservationForm.addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Reservation submitted successfully!");

    reservationForm.reset();
  });

}