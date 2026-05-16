/**
 * main.js
 * - Scroll reveal via IntersectionObserver
 * - Cursor glow radial gradient in hero
 * - Nav .scrolled class after 80px scroll
 */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll Reveal ──────────────────────────────────────── */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (prefersReduced) {
      items.forEach(el => el.classList.add('visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach(el => io.observe(el));
  }

  /* ── Nav Scroll State ───────────────────────────────────── */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;

    function updateNav() {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });

    updateNav();
  }

  /* ── Cursor Glow ────────────────────────────────────────── */
  function initCursorGlow() {
    if (prefersReduced) return;

    const hero = document.querySelector('.hero');
    const glow = document.getElementById('heroGlow');
    if (!hero || !glow) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      glow.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
      glow.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
    });

    hero.addEventListener('mouseleave', () => {
      glow.style.setProperty('--glow-x', '-600px');
      glow.style.setProperty('--glow-y', '-600px');
    });
  }

  /* ── Smooth anchor scroll (respects reduced motion) ──── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top,
          behavior: prefersReduced ? 'instant' : 'smooth'
        });
      });
    });
  }

  /* ── Project Carousels ──────────────────────────────────── */
  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
      const viewport = carousel.querySelector('.project-carousel__viewport');
      const track    = carousel.querySelector('.project-carousel__track');
      const cards    = [...carousel.querySelectorAll('.project-carousel__track > .card')];
      const prevBtn  = carousel.querySelector('.carousel-btn--prev');
      const nextBtn  = carousel.querySelector('.carousel-btn--next');
      const dots     = [...carousel.querySelectorAll('.carousel-dot')];

      if (!viewport || cards.length < 2) return;

      // Scroll viewport so card[index] aligns to the left edge.
      // Uses live getBoundingClientRect so it works even when the viewport
      // is narrower than a full step (card + gap).
      function goTo(index) {
        const clamped = Math.max(0, Math.min(cards.length - 1, index));
        const vpRect   = viewport.getBoundingClientRect();
        const cardRect = cards[clamped].getBoundingClientRect();
        const target   = viewport.scrollLeft + (cardRect.left - vpRect.left);
        viewport.scrollTo({ left: target, behavior: prefersReduced ? 'instant' : 'smooth' });
      }

      // Find the card whose left edge is closest to the viewport's left edge.
      function currentIndex() {
        const vpLeft = viewport.getBoundingClientRect().left;
        let closest = 0, closestDist = Infinity;
        cards.forEach((card, i) => {
          const dist = Math.abs(card.getBoundingClientRect().left - vpLeft);
          if (dist < closestDist) { closestDist = dist; closest = i; }
        });
        return closest;
      }

      // Left-edge mask only — fades the peeking previous card, no right crop.
      // Called on every scroll tick so it stays in sync during smooth animation.
      function updateMask() {
        const atStart = viewport.scrollLeft <= 0;
        const mask    = atStart ? '' : 'linear-gradient(to right, transparent, black 48px)';
        viewport.style.maskImage       = mask;
        viewport.style.webkitMaskImage = mask;
      }

      // Sync dots + button disabled states (debounced — runs after snap settles).
      function syncUI(index) {
        dots.forEach((d, i) => {
          const active = i === index;
          d.classList.toggle('carousel-dot--active', active);
          d.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        const atStart = viewport.scrollLeft <= 0;
        const atEnd   = viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 1;
        if (prevBtn) prevBtn.disabled = atStart;
        if (nextBtn) nextBtn.disabled = atEnd;
        updateMask(); // keep mask in sync after settling
      }

      // Button clicks
      prevBtn?.addEventListener('click', () => goTo(currentIndex() - 1));
      nextBtn?.addEventListener('click', () => goTo(currentIndex() + 1));

      // Dot clicks
      dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

      // Mouse wheel → horizontal scroll
      // Only intercepts when the carousel can actually move; otherwise lets page scroll through.
      viewport.addEventListener('wheel', (e) => {
        // Let native horizontal trackpad swipe pass through
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        const atStart = viewport.scrollLeft <= 0;
        const atEnd   = viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 1;

        // At scroll bounds in the wheel direction → let the page scroll normally
        if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

        e.preventDefault();
        viewport.scrollLeft += e.deltaY;
      }, { passive: false });

      // Update mask on every scroll tick (no debounce) so the fade
      // stays in sync during smooth scroll animation.
      // Dots + buttons update after snap settles (debounced).
      let scrollTimer;
      viewport.addEventListener('scroll', () => {
        updateMask();
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => syncUI(currentIndex()), 80);
      }, { passive: true });

      // Initial state
      syncUI(0);
    });
  }

  /* ── Init ───────────────────────────────────────────────── */
  function init() {
    initReveal();
    initNav();
    initCursorGlow();
    initSmoothScroll();
    initCarousels();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
