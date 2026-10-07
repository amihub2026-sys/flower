const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
    setTimeout(() => preloader?.remove(), 450);
  }, 1000);
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 20));

const heroSlides = [
  'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=90',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=90',
  'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=90'
];
let slideIndex = 0;
const heroImage = document.getElementById('heroImage');
const slideCount = document.getElementById('slideCount');
function setSlide(index) {
  slideIndex = (index + heroSlides.length) % heroSlides.length;
  heroImage.style.opacity = '0';
  setTimeout(() => {
    heroImage.src = heroSlides[slideIndex];
    slideCount.textContent = `${String(slideIndex + 1).padStart(2, '0')} / 03`;
    heroImage.style.opacity = '1';
  }, 220);
}
document.getElementById('prevSlide')?.addEventListener('click', () => setSlide(slideIndex - 1));
document.getElementById('nextSlide')?.addEventListener('click', () => setSlide(slideIndex + 1));
setInterval(() => setSlide(slideIndex + 1), 5500);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
form?.addEventListener('submit', e => {
  e.preventDefault();
  formMessage.textContent = 'Thank you! Your enquiry has been received.';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
function changeWhyImage(button, imageUrl) {

  const mainImage = document.getElementById("whyMainImage");

  if (!mainImage) return;

  /* fade out */

  mainImage.style.opacity = "0";

  setTimeout(() => {

    mainImage.src = imageUrl;

    mainImage.onload = () => {
      mainImage.style.opacity = "1";
    };

  }, 180);


  /* remove active from all cards */

  document.querySelectorAll(".why-thumb").forEach((thumb) => {
    thumb.classList.remove("active");
  });


  /* active clicked card */

  button.classList.add("active");

}
const bestSellerSlider = document.querySelector("#bestsellers .product-grid");

if (bestSellerSlider) {

  let bestSellerAutoScroll;

  function startBestSellerScroll() {

    bestSellerAutoScroll = setInterval(() => {

      const firstCard = bestSellerSlider.querySelector(".product-card");

      if (!firstCard) return;

      const cardWidth =
        firstCard.offsetWidth +
        parseFloat(getComputedStyle(bestSellerSlider).gap || 0);

      const maxScroll =
        bestSellerSlider.scrollWidth - bestSellerSlider.clientWidth;

      if (bestSellerSlider.scrollLeft >= maxScroll - 10) {

        bestSellerSlider.scrollTo({
          left: 0,
          behavior: "smooth"
        });

      } else {

        bestSellerSlider.scrollBy({
          left: cardWidth,
          behavior: "smooth"
        });

      }

    }, 3000);
  }

  function stopBestSellerScroll() {
    clearInterval(bestSellerAutoScroll);
  }

  startBestSellerScroll();

  bestSellerSlider.addEventListener("mouseenter", stopBestSellerScroll);
  bestSellerSlider.addEventListener("mouseleave", startBestSellerScroll);

  bestSellerSlider.addEventListener("touchstart", stopBestSellerScroll);
  bestSellerSlider.addEventListener("touchend", startBestSellerScroll);
}