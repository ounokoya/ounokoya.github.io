# Maquette Penpot — portfolio

> **Validée par Koya (G3) le 2026-11-06**, toutes les propositions retenues. Maquette de la page validée en Pré-dev 2 (`specs/visuel/portfolio-plan.png`). Fichier Penpot **« portfolio »** (créé par Koya le 2026-11-06), page « Maquette ». Pas d'image FM ici : **la maquette est la référence** des mesures et du rendu ; les textes viennent de `specs/reference/contenu.md`, les couleurs et polices de `specs/reference/tokens.md`.

## Contenu du fichier

| Élément | Contenu |
|---|---|
| Bibliothèque | 12 couleurs et 17 typographies (dossier « Portfolio »), celles de `tokens.md` |
| Composants | Lien pilule (Normal, Survol), Lien de navigation (Normal, Survol), Lien de texte (Normal, Survol), Carte solution, Carte produit, Carte étape, Étiquette |
| Écrans | « Desktop 1440 » (1440 × 4615) et « Mobile 375 » (375 × 8071), en mise en page automatique (colonnes et lignes, comme le CSS) |
| États | Tableau « États » : normal, survol et focus clavier de chaque type de lien |
| Prototype | Aucune interaction scriptée : la page n'a que des liens natifs (ancres de la navigation et liens externes). Les états sont montrés dans le tableau « États » |

## Rendus (dans ce dossier)

| Fichier | Contenu |
|---|---|
| `desktop.png` | Écran 1440 |
| `mobile.png` | Écran 375 |
| `etats.png` | États des liens |
| `apercu-maquette.png` | Les deux écrans côte à côte, au quart |

L'exportateur PNG de Penpot n'a pas les polices : chaque écran est exporté en SVG, ses `<style>` retirés, ses images remplacées par les fichiers locaux, puis rendu dans Chromium avec Space Grotesk et Inter (méthode du SDL-FM 1.3.0).

## Mesures (lues dans Penpot, en px, coin haut gauche de l'écran)

| Élément | 1440 | 375 |
|---|---|---|
| En-tête + accueil (Navy) | y 0, hauteur 704 | y 0, hauteur 1028 |
| Navigation | (977, 26) 303 × 24, à droite du nom | (24, 60) sous le nom |
| Photo (cercle, anneau Orange 400 de 4 px à l'extérieur) | (160, 254) 240 × 240 | (24, 144) 160 × 160 |
| Titre de l'accueil (2 lignes) | (464, 176) 816 × 120 | (24, 372) 327 × 76 |
| Bio courte | (464, 360) 720 × 120 | (24, 508) 327 × 208 |
| Lien pilule « Upwork » | (464, 560) 104 × 48 | (24, 796) 104 × 48 |
| Method (Paper) | y 704, hauteur 648 | y 1028, hauteur 1204 |
| Carte étape 01 | (160, 1000) 256 × 256, 4 sur une ligne | (24, 1312) 327 × 202, empilées |
| Work (Sand) | y 1352, hauteur 2198 | y 2232, hauteur 4446 |
| Carte produit LaunchKit | (160, 1620) 544 × 272 | (24, 2440) 327 × 340 |
| Carte solution REST Countries | (160, 2050) 352 × 424 ; capture 352 × 220 | (24, 3330) 327 × 408 ; capture 327 × 204 |
| Carte solution Product preview | (928, 2506) 352 × 424 (grille 3 × 2, écart 32) | (24, 5490), empilées (écart 24) |
| Liste des 8 autres | (160, 2954) 1120 × 500 | (24, 5922) 327 × 692 |
| About (Paper) : bio longue | y 3550 ; texte (576, 3646) 704 × 430, titre à gauche | y 6678 ; texte (24, 6806) 327 × 664, sous le titre |
| Contact (Navy, pied de page) | y 4172, hauteur 443 | y 7534, hauteur 537 |

## Points à valider (G3)

| # | Point | Proposition |
|---|---|---|
| G3-1 | Couleurs et polices | Navy, Paper et Sand ; vert et orange pour un clin d'œil à la Côte d'Ivoire ; Space Grotesk pour les titres, Inter pour le texte. Tous les textes passent AA (`tokens.md`) |
| G3-2 | Titre de l'accueil | Sur deux lignes : « Front-end developer » puis « .NET & Rust » (sinon « Rust » reste seul sur sa ligne) ; 32 px en mobile au lieu de 36 (à 36, trois lignes) |
| G3-3 | Navigation | Dans l'ordre de la page : Method, Work, About, Contact ; « Work » regroupe Products et Frontend Mentor solutions |
| G3-4 | Phrase des solutions FM | « 14 solutions, each built from a written spec and tested in a real browser. » au lieu de « 0 issues on the automated report » : vérifié pour 12 solutions seulement (Newsletter et E-commerce : rapports sur d'anciennes versions, les régénérer coûte un crédit). La bio longue validée garde sa phrase « My recent … zero issues » |
| G3-5 | Textes nouveaux | Ceux marqués *proposé* dans `contenu.md` : lieu, Method, lignes des cartes, phrase de contact, ligne finale |
| G3-6 | Tablette (768 à 1023 px, non dessinée) | La disposition desktop, contenu à 24 px des bords, photo de 160 px, étapes et cartes sur 2 colonnes ; une colonne sous 768 px |
| G3-7 | Seuils visuels | Le site comparé aux rendus `desktop.png` et `mobile.png` : 5 % des pixels au plus (règle du SDL-FM) |
| G3-8 | Captures des solutions | Le haut de la capture du README de chaque dépôt, recadré en 16:10 |
