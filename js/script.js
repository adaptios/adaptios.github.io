function userScroll() {
  const navbar = document.querySelector('.navbar');
  const toTopBtn = document.querySelector('#to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-sticky');
      toTopBtn.classList.add('show');
    } else {
      navbar.classList.remove('navbar-sticky');
      toTopBtn.classList.remove('show');
    }
  });
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function incrementStats() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach((counter) => {
    counter.innerText = 0;

    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
      const c = +counter.innerText;

      const increment = target / 200;

      if (c < target) {
        counter.innerText = Math.ceil(c + increment);
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

function lazyLoadHeroVideo() {
  const video = document.querySelector('.hero-video[data-src]');

  if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const loadVideo = () => {
    video.src = video.dataset.src;
    video.removeAttribute('data-src');
    video.load();
  };

  video.addEventListener(
    'canplay',
    () => {
      video.play().catch(() => {});
      video.classList.add('is-loaded');
    },
    { once: true }
  );

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadVideo, { timeout: 2000 });
  } else {
    window.setTimeout(loadVideo, 800);
  }
}

function collapseMobileNavOnClick() {
  const navMenu = document.querySelector('#navbarNavDropdown');

  if (!navMenu || !window.bootstrap) {
    return;
  }

  document.querySelectorAll('#navbarNavDropdown .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const collapse = window.bootstrap.Collapse.getOrCreateInstance(navMenu, {
        toggle: false,
      });

      collapse.hide();
    });
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', userScroll);
document.addEventListener('DOMContentLoaded', incrementStats);
document.addEventListener('DOMContentLoaded', collapseMobileNavOnClick);
window.addEventListener('load', lazyLoadHeroVideo);
document.querySelector('#to-top').addEventListener('click', scrollToTop);
