# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) · Versions : [SemVer](https://semver.org/lang/fr/).

## [2.0.0] — 2026-11-17

Portfolio de freelance, en anglais et en français (`specs/brainstorming/2026-11-17-portfolio-freelance.md`).

### Added
- Page française `/fr/` et lien de langue dans l'en-tête ; balises `hreflang` (ADR-0009).
- Sections Services (4 cartes) et CodinGame (rang, tableau des 4 meilleures ligues, techniques des bots).
- Trois chiffres clés dans l'accueil ; partie « R&D at JooL International » (2 cartes sans lien).
- Contact par e-mail `koya.esdras@gmail.com` (`mailto:`), dans l'accueil et le pied de page (ADR-0011).
- Tests : contenu, liens, focus, mise en page et accessibilité des deux pages ; structure commune des pages (ADR-0009) ; lien de langue (S25) ; tableau sans défilement (S4).

### Changed
- Positionnement : « AI & full-stack engineer · Rust · Python · .NET », missions au forfait.
- Method réécrite pour les clients ; About et Contact réécrits.
- Front-end réduit à 3 solutions Frontend Mentor et un lien vers le profil.
- Fonds : Method sur Paper (filet de séparation), About sur Sand ; les surtitres orange restent sur Paper (contraste AA).

### Removed
- Règle P3 (« ni e-mail ni téléphone ») : remplacée par l'ADR-0011.
- Tests S1, S2, S23 et S24, liés à la maquette Penpot v1 (ADR-0010).
- 3 captures et 8 solutions FM de la liste compacte.

## [1.0.2] — 2026-11-17

### Changed
- Photo : celle du profil LinkedIn (chemise violette, 360 × 360 en source, agrandie à 480 × 480 par `scripts/images.py`) remplace la photo du CV, à la demande de Koya.

### Fixed
- Tests S23 et S24 : la zone de la photo est exclue de la comparaison avec la maquette, qui garde l'ancienne photo ; sa place et sa taille restent vérifiées par S1, S2 et le test ADR-0006 (`diffRatio` accepte une zone exclue).

## [1.0.1] — 2026-11-06

### Fixed
- Ligne de REST Countries : « a native radio filter » au lieu de « an accessible combobox » ; la solution v1.0.2 a remplacé le combobox par des boutons radio natifs (erreur de Claude, reprise du titre d'origine de la solution ; correction acceptée par Koya).

## [1.0.0] — 2026-11-06

Première version du portfolio (étape E de la remise à niveau ; SDL 21.0.0 avec les ajouts du SDL-FM 1.5.0).

### Added
- Page unique en anglais : accueil (photo, positionnement, disponibilité, 5 profils), Method (4 étapes), Work (LaunchKit, Radar, 6 solutions FM mises en avant et 8 autres), About, Contact (liens seulement) ; contenu validé en Pré-dev 2 et en G3.
- Trois paliers : une colonne sous 768 px, 2 colonnes jusqu'à 1023 px, desktop ensuite ; contenu de 1120 px au plus (ADR-0007).
- Aucun script ; noms de liens complétés par du texte masqué, jamais `aria-label` (ADR-0005).
- Tokens de la maquette dans `@theme` (ADR-0003) ; Space Grotesk et Inter par Fontsource (ADR-0004) ; photo et captures préparées par `scripts/images.py` (ADR-0006) ; icône SVG.
- Tests : 24 scénarios de la spec (positions, contenu, 65 liens, interactions, axe-core, W3C Nu, html-validate, eslint), gardes des règles FM, fitness functions des ADR, comparaisons visuelles par section (1,26 à 4,53 % ; About mobile 7,58 %, seuil calibré à 8,6 % validé par Koya).
- Publication sur GitHub Pages à la racine par `npm run deploy` (ADR-0008).
