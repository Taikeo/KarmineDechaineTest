/* ── Le Karmine Déchaîné — Article enhancements ── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. PROGRESS BAR DE LECTURE ── */
  const bar = document.createElement('div');
  bar.id = 'kd-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const body = document.querySelector('.art-body') || document.body;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(100, Math.max(0, (window.scrollY / docH) * 100));
    bar.style.width = pct + '%';
  }, { passive: true });

  /* ── 2. PULL-QUOTES auto sur les blockquotes ── */
  document.querySelectorAll('.art-body blockquote').forEach((bq, i) => {
    // Toutes les 2 blockquotes, créer un pull-quote avant
    if (i % 2 === 0) {
      const text = bq.querySelector('em') 
        ? bq.innerHTML.replace(bq.querySelector('em').outerHTML, '').trim()
        : bq.textContent.trim().split('.')[0] + '.';
      const pq = document.createElement('div');
      pq.className = 'pull-quote kd-reveal';
      // Garder court
      const words = text.replace(/<[^>]+>/g, '').split(' ').slice(0, 12).join(' ');
      pq.textContent = words + (text.split(' ').length > 12 ? '…' : '');
      bq.parentNode.insertBefore(pq, bq);
    }
  });

  /* ── 3. SÉPARATEURS entre les grandes sections (après chaque 3e p) ── */
  const paras = document.querySelectorAll('.art-body > p');
  paras.forEach((p, i) => {
    if ((i + 1) % 4 === 0 && i < paras.length - 2) {
      const sep = document.createElement('div');
      sep.className = 'art-sep kd-reveal';
      sep.textContent = '◆';
      p.after(sep);
    }
  });

  /* ── 4. SCROLL REVEAL ── */
  const targets = document.querySelectorAll(
    '.art-body p, .art-body h3, .art-body blockquote, .art-body ul, .art-body li, .art-hero-img, .art-caption, .pull-quote, .bandeau-rip, .bandeau-medecins, .nav-articles, .election-results, .candidats-grid, .symptomes-grid, .cas-list, .bandeau-passation, .bandeau-horaire, .bandeau-alerte, .bandeau-medecins-light, .procuration-block, .art-teaser'
  );

  targets.forEach((el, i) => {
    if (!el.classList.contains('kd-reveal')) el.classList.add('kd-reveal');
    if (el.tagName === 'P') el.style.transitionDelay = (i % 3) * 0.035 + 's';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('kd-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  targets.forEach(el => observer.observe(el));

  /* ── 5. HIGHLIGHT gras au survol ── */
  document.querySelectorAll('.art-body strong').forEach(el => {
    el.style.transition = 'color .2s';
    el.addEventListener('mouseenter', () => el.style.color = 'var(--cyan)');
    el.addEventListener('mouseleave', () => el.style.color = '');
  });

  /* ── 6. PARALLAX image hero ── */
  const heroImg = document.querySelector('.art-hero-img');
  if (heroImg) {
    heroImg.style.transition = 'transform .1s linear';
    window.addEventListener('scroll', () => {
      const offset = Math.min(window.scrollY * 0.05, 40);
      heroImg.style.transform = `translateY(${offset}px)`;
    }, { passive: true });
  }

  /* ── 7. TEMPS DE LECTURE estimé ── */
  const body = document.querySelector('.art-body');
  const meta = document.querySelector('.art-meta');
  if (body && meta) {
    const words = body.textContent.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    const tag = document.createElement('span');
    tag.innerHTML = `<span class="s">·</span> ${mins} min de lecture`;
    tag.style.cssText = 'font-family:Barlow Condensed,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--gray)';
    meta.appendChild(tag);
  }

});
