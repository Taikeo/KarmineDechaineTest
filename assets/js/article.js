/* ── Le Karmine Déchaîné — Article scroll animations ── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. PROGRESS BAR DE LECTURE ── */
  const bar = document.createElement('div');
  bar.id = 'kd-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const el = document.querySelector('.art-body') || document.body;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight + rect.top + window.scrollY - window.innerHeight;
    const pct = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
    bar.style.width = pct + '%';
  }, { passive: true });

  /* ── 2. SCROLL REVEAL ── */
  const targets = document.querySelectorAll(
    '.art-body p, .art-body h3, .art-body blockquote, .art-body ul, .art-body li, .art-hero-img, .art-caption, .bandeau-rip, .bandeau-medecins, .nav-articles'
  );

  targets.forEach((el, i) => {
    el.classList.add('kd-reveal');
    // Stagger léger sur les paragraphes consécutifs
    if (el.tagName === 'P') {
      el.style.transitionDelay = (i % 3) * 0.04 + 's';
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('kd-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));

  /* ── 3. HIGHLIGHT MOT AU SURVOL (strong) ── */
  document.querySelectorAll('.art-body strong').forEach(el => {
    el.addEventListener('mouseenter', () => el.style.color = 'var(--cyan)');
    el.addEventListener('mouseleave', () => el.style.color = '');
  });

  /* ── 4. IMAGE ZOOM SUBTLE AU SCROLL ── */
  const heroImg = document.querySelector('.art-hero-img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY * 0.06;
      heroImg.style.transform = `scale(1.0) translateY(${offset}px)`;
    }, { passive: true });
  }

});
