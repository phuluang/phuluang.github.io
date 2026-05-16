/* ─── Design System Doc · Interactive Behaviours ─────────────── */

(function () {
  'use strict';

  /* ── 1. Sidebar active-link via IntersectionObserver ─────────── */
  function initSidebarHighlight() {
    const sections = document.querySelectorAll('.ds-section[id]');
    const navLinks = document.querySelectorAll('.ds-nav__link[data-section]');

    if (!sections.length || !navLinks.length) return;

    const linkMap = {};
    navLinks.forEach((link) => {
      const key = link.dataset.section;
      if (key) linkMap[key] = link;
    });

    function setActive(id) {
      navLinks.forEach((l) => l.classList.remove('ds-nav__link--active'));
      const active = linkMap[id];
      if (active) active.classList.add('ds-nav__link--active');
    }

    // Start with the first section
    if (sections[0]) setActive(sections[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) setActive(visible[0].target.id);
      },
      {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /* ── 2. Copy-to-clipboard for code snippets ──────────────────── */
  function initCopyButtons() {
    const snippets = document.querySelectorAll('[data-snippet]');

    snippets.forEach((snippet) => {
      const copyBtn = snippet.querySelector('.snippet__copy');
      const codeEl  = snippet.querySelector('code');
      if (!copyBtn || !codeEl) return;

      copyBtn.addEventListener('click', async () => {
        // Strip HTML tags to get plain text
        const text = codeEl.innerText || codeEl.textContent;

        try {
          await navigator.clipboard.writeText(text);
          copyBtn.textContent = 'Copied!';
          copyBtn.classList.add('snippet__copy--copied');
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('snippet__copy--copied');
          }, 2000);
        } catch {
          // Fallback for older browsers
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity  = '0';
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);

          copyBtn.textContent = 'Copied!';
          copyBtn.classList.add('snippet__copy--copied');
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('snippet__copy--copied');
          }, 2000);
        }
      });
    });
  }

  /* ── 3. Smooth-scroll sidebar links with nav offset ─────────── */
  function initSidebarScroll() {
    const navLinks = document.querySelectorAll('.ds-nav__link[href^="#"]');
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '64',
      10
    );

    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ── 4. Nav scroll state (re-use main.js pattern if available) ─ */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Init ─────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initSidebarHighlight();
    initCopyButtons();
    initSidebarScroll();
    initNav();
  });
})();
