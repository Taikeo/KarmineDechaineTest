# Le Karmine Déchaîné

## Structure
```
karmine-dechaine/
├── index.html              ← Archive (liste toutes les éditions)
├── editions/
│   ├── edition-001.html    ← Template de base / première édition
│   └── edition-002.html    ← (à créer pour la prochaine)
├── assets/img/
│   ├── logo-mascot.png
│   ├── logo-banner.png
│   └── [vos images d'articles]
└── README.md
```

## Déploiement GitHub Pages
```bash
git init
git add .
git commit -m "Le Karmine Déchaîné — init"
git remote add origin https://github.com/TON-USER/karmine-dechaine.git
git push -u origin main
```
Puis GitHub → Settings → Pages → branch `main` → `/root`

## Nouvelle édition
1. Copier `editions/edition-001.html` → `editions/edition-002.html`
2. Remplacer toutes les zones `[ENTRE CROCHETS]`
3. Ajouter les images dans `assets/img/`
4. Ajouter la edition-card dans `index.html`
5. Mettre à jour le bloc "Dernière édition" dans `index.html`
6. Push

## Workflow avec Claude
Envoyer : numéro + date + articles (texte) + images (upload) + pubs + infos en bref + ticker
→ Claude génère le HTML complet prêt à push
