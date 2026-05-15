/**
 * Count-up animation for impact metrics.
 * Reads data-target (number) and data-suffix (%, x, +, ★ etc.)
 * Triggers once when element enters the viewport.
 */
(function () {
  'use strict';

  const DURATION = 1200; // ms

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target ?? '0');
    const suffix   = el.dataset.suffix ?? '';
    const decimals = (el.dataset.target ?? '0').includes('.') ? 1 : 0;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const value    = target * easeOutExpo(progress);

      el.textContent = value.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  function initCounters() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const counters = document.querySelectorAll('.metric__number[data-target]');

    if (prefersReduced) {
      counters.forEach(el => {
        const target   = parseFloat(el.dataset.target ?? '0');
        const suffix   = el.dataset.suffix ?? '';
        const decimals = (el.dataset.target ?? '0').includes('.') ? 1 : 0;
        el.textContent = target.toFixed(decimals) + suffix;
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(el => io.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
