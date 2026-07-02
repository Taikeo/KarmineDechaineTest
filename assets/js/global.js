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

/* ============================================================
   SKIN 2.0 — MICRO-INTERACTIONS MODERNES
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  /* ── A. BURST D'ÉTOILES au clic sur les boutons ── */
  const burstTargets = '.hero-btn, .feat-link, .art-btn, .ed-link, .card-btn, .ba-cta, .mast-nav a, .nav-art-btn';
  document.querySelectorAll(burstTargets).forEach(btn => {
    btn.addEventListener('click', e => {
      const colors = ['#00B4D8', '#90E0EF', '#0A0A0A', '#48CAE4'];
      for (let i = 0; i < 7; i++) {
        const s = document.createElement('span');
        s.className = 'kd-spark';
        const angle = (Math.PI * 2 * i) / 7 + Math.random() * .6;
        const dist = 26 + Math.random() * 26;
        s.style.cssText = `
          left:${e.clientX}px; top:${e.clientY}px;
          --dx:${Math.cos(angle) * dist}px;
          --dy:${Math.sin(angle) * dist}px;
          background:${colors[i % colors.length]};
          width:${4 + Math.random() * 4}px; height:${4 + Math.random() * 4}px;
        `;
        document.body.appendChild(s);
        s.addEventListener('animationend', () => s.remove());
      }
    });
  });

  /* ── B. BOUTONS MAGNÉTIQUES (attirés par le curseur) ── */
  document.querySelectorAll('.hero-btn, .feat-link, .art-btn, .ba-cta, .mast-nav a').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1)';
      btn.style.transform = '';
      setTimeout(() => btn.style.transition = '', 400);
    });
  });

  /* ── C. COMPTEURS ANIMÉS (stats sidebar) ── */
  const counters = document.querySelectorAll('.stat-num, .sb-num, .art-sidebar-stat .num');
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const raw = el.textContent.trim();
      const num = parseInt(raw.replace(/\D/g, ''), 10);
      if (isNaN(num) || num === 0 || num > 99999) { cObs.unobserve(el); return; }
      const suffix = raw.replace(/^[\d\s]+/, '');
      const dur = 900, t0 = performance.now();
      function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(num * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cObs.unobserve(el);
    });
  }, { threshold: .6 });
  counters.forEach(el => cObs.observe(el));

  /* ── D. SHINE SWEEP sur les images au survol ── */
  document.querySelectorAll('.ed-placeholder, .hero-img, .feat-cover, .art-figure').forEach(el => {
    el.classList.add('kd-shine');
  });

  /* ── E. LOGO — wiggle au survol ── */
  const logo = document.querySelector('.mast-center img');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.animation = 'kd-wiggle .5s ease';
      logo.addEventListener('animationend', () => logo.style.animation = '', { once: true });
    });
  }

  /* ── F. TRANSITION DE PAGE (fondu sortant sur liens internes) ── */
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    a.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      e.preventDefault();
      document.body.classList.add('kd-page-out');
      setTimeout(() => { window.location = href; }, 200);
    });
  });

  /* ── G. TICKER — clic = pause/reprise ── */
  document.querySelectorAll('.ticker').forEach(t => {
    t.addEventListener('click', () => t.classList.toggle('kd-paused'));
  });
});
