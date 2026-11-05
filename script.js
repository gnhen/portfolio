// ============================================
// YEAR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ============================================
// SMOOTH SCROLL (anchor links only)
// ============================================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const target = document.getElementById(href.substring(1));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
      }
    }
  });
});

// ============================================
// HAMBURGER MENU
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', function() {
    const isActive = this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    this.setAttribute('aria-expanded', isActive);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// ============================================
// ACTIVE NAV LINK
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-link, .nav-menu > a');
  if (navLinks.length === 0) return;

  const currentPath = window.location.pathname.replace(/\/$/, '');
  const indexCurrent = window.location.origin + currentPath;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkHref = href && href !== '#' ? window.location.origin + href.replace(/\/$/, '') : indexCurrent;
    if (linkHref === indexCurrent || (currentPath === '/' && (href === '#' || href === ''))) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// ============================================
// WORD ROTATOR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const words = document.querySelectorAll('.rotator-word');
  if (words.length === 0) return;

  let currentIndex = 0;

  words.forEach((word, index) => {
    word.classList.toggle('active', index === 0);
    if (index !== 0) word.style.display = 'none';
  });

  const morphTo = (nextIndex) => {
    const currentWord = words[currentIndex];
    const nextWord = words[nextIndex];
    const from = currentWord.textContent;
    const to = nextWord.textContent;
    const steps = Math.max(from.length, to.length);
    let step = 0;

    currentWord.classList.remove('active');
    currentWord.style.display = 'none';
    nextWord.style.display = 'inline';
    nextWord.classList.add('active');
    currentIndex = nextIndex;

    const update = () => {
      const prefix = to.slice(0, step);
      const suffix = from.slice(step);
      nextWord.textContent = prefix + suffix;
      step += 1;

      if (step <= steps) {
        window.setTimeout(update, 80);
      } else {
        nextWord.textContent = to;
      }
    };

    update();
  };

  setInterval(() => {
    morphTo((currentIndex + 1) % words.length);
  }, 2400);
});
