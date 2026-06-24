/* ── Le Karmine Déchaîné — Effets globaux ── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. MASTHEAD STICKY + SHADOW ── */
  const mast = document.querySelector('.mast');
  if (mast) {
    window.addEventListener('scroll', () => {
      mast.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── 2. SCROLL REVEAL GLOBAL avec stagger ── */
  const revealEls = document.querySelectorAll(
    '.ed-card, .card, .hero, .featured, .art-resume, .banner-ad, .sb-block, .section-title'
  );
  revealEls.forEach(el => {
    if (!el.classList.contains('kd-reveal')) el.classList.add('kd-reveal');
  });

  const globalObs = new IntersectionObserver(entries => {
    // Regrouper par ordre d'apparition et stagger
    const visible = entries.filter(e => e.isIntersecting);
    visible.forEach((e, i) => {
      setTimeout(() => {
        e.target.classList.add('kd-visible');
        globalObs.unobserve(e.target);
      }, i * 60);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => globalObs.observe(el));

  /* ── 3. SECTION TITLES — ligne animée ── */
  const secTitles = document.querySelectorAll('.section-title');
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('kd-visible'); });
  }, { threshold: .5 });
  secTitles.forEach(el => secObs.observe(el));

  /* ── 4. SMOOTH IMAGE PARALLAX sur les heroes ── */
  const heroImg = document.querySelector('.hero-img, .hero-main-img');
  if (heroImg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const offset = Math.min(window.scrollY * 0.04, 30);
          heroImg.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 5. GLITCH sur les titres ── */
  document.querySelectorAll('.art-title, .hero-title, .feat-title').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'text-shadow .15s ease';
      el.style.textShadow = '2px 0 var(--cyan), -2px 0 rgba(255,0,80,.25)';
      setTimeout(() => { el.style.textShadow = ''; }, 220);
    });
  });

  /* ── 6. TILT 3D cards ── */
  document.querySelectorAll('.ed-card, .card').forEach(el => {
    let rafId;
    el.addEventListener('mousemove', e => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - .5) * 8;
        const y = ((e.clientY - r.top) / r.height - .5) * -8;
        el.style.transition = 'transform .1s ease, box-shadow .3s ease';
        el.style.transform = `translateY(-6px) perspective(700px) rotateX(${y}deg) rotateY(${x}deg)`;
      });
    });
    el.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafId);
      el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1), box-shadow .4s ease';
      el.style.transform = '';
    });
  });

  /* ── 7. PARTICULES RIP ── */
  const rip = document.querySelector('.bandeau-rip');
  if (rip) {
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('div');
      p.className = 'kd-particle';
      p.style.cssText = `
        left:${8+Math.random()*84}%;top:${15+Math.random()*70}%;
        animation-delay:${Math.random()*4}s;
        animation-duration:${2.5+Math.random()*2.5}s;
        width:${2+Math.random()*3}px;height:${2+Math.random()*3}px;
      `;
      rip.appendChild(p);
    }
  }

  /* ── 8. HIGHLIGHT strong au survol ── */
  document.querySelectorAll('.art-body strong').forEach(el => {
    el.style.transition = 'color .2s ease';
    el.addEventListener('mouseenter', () => el.style.color = 'var(--cyan)');
    el.addEventListener('mouseleave', () => el.style.color = '');
  });

});
