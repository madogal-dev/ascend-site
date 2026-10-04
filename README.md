# ascend-site

Site vitrine public d'Ascend Intelligences — [ascendintelligences.com](https://ascendintelligences.com).

Site statique bilingue EN/FR servi par GitHub Pages, sans étape de build. Le
domaine est déclaré dans `CNAME`.

- `index.html`, `services.html`, `expertise.html`, `experience.html`,
  `kotiza.html`, `contact.html` — les pages ; chaque texte porte ses deux
  versions dans `data-en` / `data-fr`.
- `assets/site.css` — la feuille de style commune.
- `assets/site.js` — bascule de langue (mémorisée dans le navigateur), menu
  mobile, envoi du formulaire de contact via Formspree.

La page `kotiza.html` documente publiquement le lien entre le produit Kotiza
et ses deux sociétés (la LLC américaine et la SUARL sénégalaise) : c'est la
pièce demandée par Meta et la Sonatel pour approuver le nom d'expéditeur.

**Ce dépôt est public : n'y placer que le contenu du site.** Les documents
d'entreprise (statuts, EIN, contrats, stratégie) restent dans le dépôt privé
séparé — jamais ici.

## Déploiement

Pousser sur `main` suffit : GitHub Pages republie le site.
