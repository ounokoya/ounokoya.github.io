# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) · Versions : [SemVer](https://semver.org/lang/fr/).

## [1.0.0] — 2026-11-06

Première version du portfolio (étape E de la remise à niveau ; SDL 21.0.0 avec les ajouts du SDL-FM 1.5.0).

### Added
- Page unique en anglais : accueil (photo, positionnement, disponibilité, 5 profils), Method (4 étapes), Work (LaunchKit, Radar, 6 solutions FM mises en avant et 8 autres), About, Contact (liens seulement) ; contenu validé en Pré-dev 2 et en G3.
- Trois paliers : une colonne sous 768 px, 2 colonnes jusqu'à 1023 px, desktop ensuite ; contenu de 1120 px au plus (ADR-0007).
- Aucun script ; noms de liens complétés par du texte masqué, jamais `aria-label` (ADR-0005).
- Tokens de la maquette dans `@theme` (ADR-0003) ; Space Grotesk et Inter par Fontsource (ADR-0004) ; photo et captures préparées par `scripts/images.py` (ADR-0006) ; icône SVG.
- Tests : 24 scénarios de la spec (positions, contenu, 65 liens, interactions, axe-core, W3C Nu, html-validate, eslint), gardes des règles FM, fitness functions des ADR, comparaisons visuelles par section (1,26 à 4,53 % ; About mobile 7,58 %, seuil calibré à 8,6 % validé par Koya).
- Publication sur GitHub Pages à la racine par `npm run deploy` (ADR-0008).
