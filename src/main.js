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
});
