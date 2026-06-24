/* ── Le Karmine Déchaîné — Effets globaux ── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. CURSEUR CUSTOM ── */
  const cursor = document.createElement('div');
  cursor.id = 'kd-cursor';
  const ring = document.createElement('div');
  ring.id = 'kd-cursor-ring';
  document.body.append(cursor, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  const animCursor = () => {
    cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    rx += (mx - rx) * .14;
    ry += (my - ry) * .14;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animCursor);
  };
  animCursor();

  // Hover sur liens/boutons
  document.querySelectorAll('a, button, .ed-card, .card, .hero-btn, .feat-link').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });

  // Cacher hors fenêtre
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; ring.style.opacity = ''; });

  /* ── 2. MASTHEAD SHADOW AU SCROLL ── */
  const mast = document.querySelector('.mast');
  if (mast) {
    window.addEventListener('scroll', () => {
      mast.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── 3. SECTION TITLES REVEAL ── */
  const secTitles = document.querySelectorAll('.section-title');
  if (secTitles.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('kd-visible'); });
    }, { threshold: .5 });
    secTitles.forEach(el => obs.observe(el));
  }

  /* ── 4. PARTICULES SUR BANDEAU RIP ── */
  const rip = document.querySelector('.bandeau-rip');
  if (rip) {
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'kd-particle';
      p.style.cssText = `
        left: ${10 + Math.random() * 80}%;
        top: ${20 + Math.random() * 60}%;
        animation-delay: ${Math.random() * 3}s;
        animation-duration: ${2.5 + Math.random() * 2}s;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        opacity: ${.3 + Math.random() * .4};
      `;
      rip.appendChild(p);
    }
  }

  /* ── 5. SCROLL REVEAL GLOBAL (cards, sections) ── */
  const revealEls = document.querySelectorAll(
    '.ed-card, .card, .hero, .featured, .art-resume, .banner-ad, .sb-block'
  );
  revealEls.forEach(el => {
    if (!el.classList.contains('kd-reveal')) {
      el.classList.add('kd-reveal');
    }
  });
  const globalObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('kd-visible');
        globalObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => globalObs.observe(el));

  /* ── 6. GLITCH TITLE au hover ── */
  document.querySelectorAll('.art-title, .hero-title, .feat-title').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.textShadow = '2px 0 var(--cyan), -2px 0 rgba(255,0,80,.3)';
      setTimeout(() => el.style.textShadow = '', 300);
    });
  });

  /* ── 7. IMAGE TILT 3D au hover ── */
  document.querySelectorAll('.ed-card, .card').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 10;
      const y = ((e.clientY - r.top) / r.height - .5) * -10;
      el.style.transform = `translateY(-6px) perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
    });
  });

});
