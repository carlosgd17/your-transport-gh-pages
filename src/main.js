import './style.css';
import { initBookingWidget } from './components/bookingWidget.js';
import { initFareCalculator } from './components/fareCalculator.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Interactive Booking Form Widget & Modals
  initBookingWidget();

  // 2. Initialize Trip Fare Pricing Calculator
  initFareCalculator();

  // 3. Header scroll styling modifier
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 4. Scroll Spy Navigation Highlight
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && (href === `#${current}` || (href === '#' && current === 'home'))) {
        link.classList.add('active');
      }
    });
  });

  // Client Portal Sign-in mock interaction
  const btnLogin = document.getElementById('btn-login');
  if (btnLogin) {
    btnLogin.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Se ha solicitado una conexión segura al Portal de Clientes. Los autenticadores están inicializados en el entorno de desarrollo (Sandbox).');
    });
  }

  // Mobile Navigation toggle logic
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    // Close menu when clicking on links
    const navLinksList = mainNav.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });
  }

  // Client Portal Sign-in mock interaction for mobile
  const btnLoginMobile = document.getElementById('btn-login-mobile');
  if (btnLoginMobile) {
    btnLoginMobile.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Se ha solicitado una conexión segura al Portal de Clientes. Los autenticadores están inicializados en el entorno de desarrollo (Sandbox).');
    });
  }

  // Carousel Gallery Control Logic
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const carouselDots = document.querySelectorAll('.carousel-dot');

  if (carouselTrack && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      const slideWidth = carouselTrack.clientWidth;
      const scrollPosition = carouselTrack.scrollLeft;
      const currentIndex = Math.round(scrollPosition / slideWidth);
      const maxIndex = carouselDots.length - 1;

      if (currentIndex === 0) {
        // Wrap around to the last slide
        carouselTrack.scrollTo({ left: slideWidth * maxIndex, behavior: 'smooth' });
      } else {
        carouselTrack.scrollTo({ left: slideWidth * (currentIndex - 1), behavior: 'smooth' });
      }
    });

    nextBtn.addEventListener('click', () => {
      const slideWidth = carouselTrack.clientWidth;
      const scrollPosition = carouselTrack.scrollLeft;
      const currentIndex = Math.round(scrollPosition / slideWidth);
      const maxIndex = carouselDots.length - 1;

      if (currentIndex === maxIndex) {
        // Wrap around to the first slide
        carouselTrack.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselTrack.scrollTo({ left: slideWidth * (currentIndex + 1), behavior: 'smooth' });
      }
    });

    // Update active dot color indicator as carousel scrolls
    carouselTrack.addEventListener('scroll', () => {
      const scrollPosition = carouselTrack.scrollLeft;
      const slideWidth = carouselTrack.clientWidth;
      
      // Prevent division by zero if width is unexpected
      if (slideWidth > 0) {
        const activeIndex = Math.round(scrollPosition / slideWidth);
        carouselDots.forEach((dot, idx) => {
          if (idx === activeIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });

    // Make dot indicators clickable to jump directly to slides
    carouselDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const slideWidth = carouselTrack.clientWidth;
        carouselTrack.scrollTo({ left: slideWidth * idx, behavior: 'smooth' });
      });
    });
  }
});
