# ADR-0006 : Photo et captures : fichiers préparés une fois, servis avec le site

## Statut
Accepté (2026-11-06).

## Contexte
La photo du CV fait 1000 × 1000 (P4) ; les captures des README des solutions font 1440 px de large et 720 à 1955 px de haut. La maquette affiche la photo en cercle de 240 px (160 en mobile) et les captures en 16:10, 352 × 220 au plus (G3-8).

## Décision
- `public/images/photo.jpg` : 480 × 480 (2 × 240), JPEG qualité 85.
- `public/images/<dépôt>.jpg` : haut de la capture du README, recadré en 16:10 (centré si la capture est plus basse que 900 px), réduit à 704 × 440 (2 × 352), JPEG qualité 85.
- Fichiers produits par `scripts/images.py` (Python et Pillow, outils déjà sur le poste) depuis `specs/reference/images/`, puis commités : rien n'est généré au build.
- Photo chargée tout de suite ; captures en `loading="lazy"` ; `width` et `height` déclarés (pas de saut de mise en page).
- Favicon : `public/favicon.svg` (carré Navy 900, anneau Orange 400, comme la photo).

## Mise à jour v1.0.2 (2026-11-17)
La photo du site est désormais celle du profil LinkedIn, disponible seulement en 360 × 360 : `scripts/images.py` l'agrandit à 480 × 480 (un peu moins nette sur écran haute densité). La photo du CV reste dans `nouveau_cv/assets/`.

## Mise à jour v2.0.0 (2026-11-17)
La page ne montre plus que 3 solutions : `scripts/images.py` ne produit plus que leurs 3 captures (REST Countries API, Multi-step form, E-commerce product page) ; les 3 autres fichiers sont retirés de `public/images/`.

## Conséquences
- Une nouvelle solution = relancer le script avec sa capture.
- Fitness function (test « ADR-0006 » de `tests/statique.spec.js`) : photo 480 × 480 non différée ; 6 captures 704 × 440, différées, dimensions déclarées.
