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

  /* ── Init ───────────────────────────────────────────────── */
  function init() {
    initReveal();
    initNav();
    initCursorGlow();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
