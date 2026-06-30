/* ── Le Karmine Déchaîné — Prévention hydratation ── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── BANDEAU fixe en bas ── */
  const msg = "ALERTE CHALEUR — IL FAUT BOIRE ! — HYDRATE-TOI TOUTES LES 15 À 20 MINUTES — ";
  const repeat = msg.repeat(6);

  const banner = document.createElement('div');
  banner.id = 'kd-water-banner';
  banner.innerHTML = `
    <div class="water-label">⚠ Alerte</div>
    <div class="water-track-wrap">
      <div class="water-track">
        <span>${repeat}</span>
        <span>${repeat}</span>
      </div>
    </div>
    <button class="water-close" onclick="this.parentElement.style.transform='translateY(-100%)'">✕</button>
  `;
  document.body.prepend(banner);
  setTimeout(() => banner.classList.add('visible'), 800);

  /* ── POPUP au chargement ── */
  const overlay = document.createElement('div');
  overlay.id = 'kd-water-overlay';
  overlay.innerHTML = `
    <div id="kd-water-popup">
      <button class="water-popup-close" id="kd-water-close">✕</button>
      <div class="water-popup-top">
        <span class="water-popup-emoji">💧</span>
        <div class="water-popup-title">Reste hydraté !</div>
      </div>
      <div class="water-popup-body">
        <p class="water-popup-text">
          Tu lis le Karmine Déchaîné — c'est bien.<br/>
          Mais tu as pensé à <strong>boire de l'eau</strong> ?<br/><br/>
          Pense à t'hydrater toutes les <strong>15 à 20 minutes</strong>.<br/>
          Ton corps te remerciera. 🫶
        </p>
        <button class="water-popup-btn" id="kd-water-ok">C'est noté, je bois ! 💧</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Apparaît après 2 secondes
  setTimeout(() => overlay.classList.add('visible'), 2000);

  // Fermer
  const close = () => overlay.classList.remove('visible');
  document.getElementById('kd-water-ok').addEventListener('click', close);
  document.getElementById('kd-water-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  /* ── RAPPEL toutes les 15 minutes ── */
  setInterval(() => {
    overlay.classList.add('visible');
  }, 15 * 60 * 1000);

});
