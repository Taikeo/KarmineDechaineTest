/* ── ALERTE SÉCURITÉ — Mode urgence ── */

document.addEventListener('DOMContentLoaded', () => {

  const msg = "KARMINÉA EN ÉTAT D'ALERTE MAXIMALE — NETHER VERROUILLÉ — LES HOMMES EN NOIR ONT ATTAQUÉ — RESPECTEZ LES CONSIGNES — SERVICE MILITAIRE INSTAURÉ — ";
  const repeat = msg.repeat(6);

  /* ── BANDEAU ── */
  if (!document.getElementById('kd-alert-bar')) {
    const bar = document.createElement('div');
    bar.id = 'kd-alert-bar';
    bar.innerHTML = `
      <div class="al-label"><span class="al-dot"></span> ALERTE</div>
      <div class="al-track">
        <span>${repeat}</span>
        <span>${repeat}</span>
      </div>
    `;
    document.body.prepend(bar);
  }

  /* ── FLASH ROUGE ALÉATOIRE ── */
  function randomFlash() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:9988;
      background:rgba(183,28,28,.08);
      pointer-events:none;
      animation:none;
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 80);
    // Prochain flash dans 8-18 secondes
    setTimeout(randomFlash, 8000 + Math.random() * 10000);
  }
  setTimeout(randomFlash, 3000 + Math.random() * 5000);

  /* ── GLITCH sur les titres h1 ── */
  document.querySelectorAll('h1, .art-title, .hero-title').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'text-shadow .05s';
      el.style.textShadow = '3px 0 #ff1744, -3px 0 rgba(0,180,216,.4)';
      setTimeout(() => { el.style.textShadow = ''; }, 180);
    });
  });

  /* ── ICÔNE FAVICON ROUGE ── */
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#b71c1c';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚠', 16, 17);
    favicon.href = canvas.toDataURL();
  }

  /* ── TITRE PAGE — alerte clignotante ── */
  const originalTitle = document.title;
  let titleToggle = true;
  setInterval(() => {
    document.title = titleToggle ? '🔴 ALERTE — ' + originalTitle : originalTitle;
    titleToggle = !titleToggle;
  }, 1500);

});
