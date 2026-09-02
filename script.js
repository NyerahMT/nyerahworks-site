const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');
const scrollFill = document.querySelector('[data-scroll-fill]');
const scrollPercent = document.querySelector('[data-scroll-percent]');
const scrollSection = document.querySelector('[data-scroll-section]');
const sectionTargets = [...document.querySelectorAll('[data-scroll-section-name]')];
const revealTargets = [...document.querySelectorAll('[data-reveal]')];
const parallaxTargets = [...document.querySelectorAll('[data-parallax] .project-figure img')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 8);
};

const closeMenu = () => {
  if (!menuButton || !nav) return;
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) closeMenu();
  }, { passive: true });
}

/* Only hide reveal targets after JavaScript is confirmed to be running. */
document.documentElement.classList.add('motion-ready');

if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -7% 0px'
  });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

let scrollFrame = 0;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const updateScrollMotion = () => {
  scrollFrame = 0;

  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = clamp(window.scrollY / maxScroll, 0, 1);
  const progressPercent = Math.round(progress * 100);

  if (scrollFill) {
    scrollFill.style.setProperty('--scroll-progress', `${progress * 100}%`);
  }

  if (scrollPercent) {
    scrollPercent.textContent = String(progressPercent).padStart(2, '0');
  }

  if (scrollSection && sectionTargets.length) {
    const activationLine = window.innerHeight * 0.42;
    let active = sectionTargets[0];

    sectionTargets.forEach((section) => {
      if (section.getBoundingClientRect().top <= activationLine) active = section;
    });

    scrollSection.textContent = active.dataset.scrollSectionName || '00 / TOP';
  }

  if (!reduceMotion.matches) {
    parallaxTargets.forEach((image) => {
      const figure = image.closest('.project-figure');
      if (!figure) return;

      const rect = figure.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

      const centerDelta = (rect.top + (rect.height / 2)) - (window.innerHeight / 2);
      const normalized = centerDelta / window.innerHeight;
      const shift = clamp(normalized * -28, -20, 20);
      image.style.setProperty('--parallax-y', `${shift.toFixed(2)}px`);
    });
  }
};

const requestScrollMotion = () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(updateScrollMotion);
};

updateScrollMotion();
window.addEventListener('scroll', requestScrollMotion, { passive: true });
window.addEventListener('resize', requestScrollMotion, { passive: true });

reduceMotion.addEventListener?.('change', () => {
  if (reduceMotion.matches) {
    parallaxTargets.forEach((image) => image.style.removeProperty('--parallax-y'));
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }
  requestScrollMotion();
});
