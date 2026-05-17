/**
 * layout.js
 * Injects shared Navbar and Footer across all pages.
 * Also handles mobile menu toggle and page entrance animations.
 */

const siteTitle = "Ibrahim A.";

const navbarHTML = `
  <nav class="navbar">
    <div class="container">
      <a href="/index.html" class="nav-brand">${siteTitle}</a>
      
      <button class="nav-toggle" id="mobile-menu-btn" aria-label="Toggle navigation">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <ul class="nav-links" id="nav-links">
        <li><a href="/index.html" class="nav-link">Accueil</a></li>
        
        <li class="dropdown">
          <a href="#" class="nav-link">Présentation <span style="font-size: 0.8em">▼</span></a>
          <div class="dropdown-menu">
            <a href="/presentation/apprenti.html">Apprenti</a>
            <a href="/presentation/entreprise.html">Entreprise</a>
          </div>
        </li>

        <li class="dropdown">
          <a href="#" class="nav-link">Épreuve E5 <span style="font-size: 0.8em">▼</span></a>
          <div class="dropdown-menu">
            <a href="/e5/tableau.html">Tableau de synthèse</a>
            <a href="/e5/formation.html">Missions en Formation</a>
            <a href="/e5/entreprise.html">Missions en Entreprise</a>
            <a href="/e5/certifications.html">Certifications</a>
          </div>
        </li>

        <li class="dropdown">
          <a href="#" class="nav-link">Épreuve E6 <span style="font-size: 0.8em">▼</span></a>
          <div class="dropdown-menu">
            <a href="/e6/situation.html">Situation</a>
            <a href="/e6/production.html">Production</a>
          </div>
        </li>

        <li><a href="/veille.html" class="nav-link">Veille Technologique</a></li>
      </ul>
    </div>
  </nav>
`;

const footerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="nav-brand">${siteTitle}</div>
          <p>Portfolio BTS SIO Option SISR</p>
        </div>
        
        <div class="footer-links">
          <a href="https://github.com" target="_blank" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://linkedin.com/in/ibrahimalexandre" target="_blank" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>
      <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color); color: var(--text-secondary); font-size: 0.9rem;">
        &copy; ${new Date().getFullYear()} Ibrahim ALEXANDRE. Tous droits réservés.
      </div>
    </div>
  </footer>
`;

// Determine base path from the script tag
const scriptTag = document.currentScript || document.querySelector('script[src$="layout.js"]');
let basePath = './';
if (scriptTag) {
  const src = scriptTag.getAttribute('src');
  if (src) {
    basePath = src.replace('js/layout.js', '');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Layout
  const headerContainer = document.getElementById('navbar-container');
  const footerContainer = document.getElementById('footer-container');

  if (headerContainer) headerContainer.innerHTML = navbarHTML;
  if (footerContainer) footerContainer.innerHTML = footerHTML;

  // Fix paths dynamically based on how layout.js was included
  document.querySelectorAll('.navbar a, .footer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('/')) {
      a.setAttribute('href', basePath + href.substring(1));
    }
  });

  // 2. Set Active Link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    // simple matching
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace('./', '').replace('../', ''))) {
      if(href !== '/index.html' || currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
        link.classList.add('active');
      }
    }
  });

  // 3. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Mobile dropdown toggles
  document.querySelectorAll('.dropdown > a').forEach(dropToggle => {
    dropToggle.addEventListener('click', (e) => {
      if(window.innerWidth <= 768) {
        e.preventDefault();
        dropToggle.parentElement.classList.toggle('active');
      }
    });
  });

  // 4. Scroll animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Default class to animate
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});
