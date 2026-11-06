# ADR-0008 : Publication à la racine de ounokoya.github.io

## Statut
Accepté (2026-11-06) — la création du dépôt et la publication se font avec l'accord de Koya, au moment de les faire (Phase 8).

## Contexte
Adresse décidée au plan (Q5) : https://ounokoya.github.io. GitHub Pages sert un dépôt nommé `<compte>.github.io` à la racine du domaine ; les 14 solutions restent sous `ounokoya.github.io/<dépôt>/`. Les challenges publient `dist/` sur la branche `gh-pages` par `npm run deploy` (ADR-0001 commun).

## Décision
- Dépôt public `ounokoya/ounokoya.github.io` ; `base: '/'` dans `vite.config.js`.
- `scripts/deploy-gh-pages.sh` (celui des challenges) publie `dist/` sur `gh-pages` ; la source de GitHub Pages est la branche `gh-pages` (réglage du dépôt).

## Conséquences
- Les adresses des fichiers du site partent de `/`.
- Fitness function (test « ADR-0008 » de `tests/statique.spec.js`) : feuilles de style, images et icône en adresses absolues depuis `/`.
- Le lien « Source code on GitHub » n'est vérifié qu'en ligne (S10).
