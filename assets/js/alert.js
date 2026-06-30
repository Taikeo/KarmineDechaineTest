/* ── ALERTE SÉCURITÉ — Bandeau warning rouge ──
   Retirer ce script quand l'alerte est levée     */

document.addEventListener('DOMContentLoaded', () => {
  const msg = "KARMINÉA EN ÉTAT D'ALERTE MAXIMALE — NETHER VERROUILLÉ — HOMMES EN NOIR — RESPECTEZ LES CONSIGNES DE SÉCURITÉ — ";
  const repeat = msg.repeat(5);

  const bar = document.createElement('div');
  bar.id = 'kd-alert-bar';
  bar.innerHTML = `
    <div class="al-label">🔴 Alerte</div>
    <div class="al-track">
      <span>${repeat}</span>
      <span>${repeat}</span>
    </div>
  `;
  document.body.prepend(bar);
});
