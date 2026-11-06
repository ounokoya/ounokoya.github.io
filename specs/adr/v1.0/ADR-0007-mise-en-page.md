# ADR-0007 : Mise en page en trois paliers, contenu de 1120 px

## Statut
Accepté (2026-11-06) — dispositions validées en G3 (G3-6 pour la tablette).

## Contexte
La maquette dessine 375 et 1440 px ; G3-6 fixe la tablette (768 à 1023 px). Les cartes d'une même ligne ont la même hauteur (S5).

## Décision
- Paliers de Tailwind : `md` (48rem, 768 px) et `lg` (64rem, 1024 px).
- Conteneur : `inline-size: min(70rem, 100% - 3rem)` centré (1120 px au plus, 24 px des bords au moins).
- Grilles CSS : étapes 1 → 2 → 4 colonnes, produits 1 → 2, solutions 1 → 2 → 3 ; les cartes s'étirent à la hauteur de leur ligne (comportement par défaut de la grille).
- Accueil : colonne sous 768 px, ligne au-delà (photo de 160 px jusqu'à 1023 px, 240 px ensuite) ; About : titre à gauche dès 1024 px.

## Conséquences
- Vérifié par S1 à S5 (positions, paliers, débordement, hauteurs égales).
