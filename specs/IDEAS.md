# Idées — portfolio `ounokoya.github.io`

> SDL 21.0.0, Phase 1 (concept). Trace de l'exploration : `specs/brainstorming/2026-11-06-portfolio.md`.

### Portfolio d'une page
- **Problème** : les profils de Koya (FM, Upwork, Contra, Freelancer, LinkedIn, GitHub) sont dispersés ; le champ Website du profil FM est vide ; Contra exige 4 travaux et n'en a que 2. Rien ne montre en un seul endroit sa méthode, ses produits et ses 14 solutions FM.
- **Solution proposée** : une page en anglais, accessible et testée comme les solutions FM, qui présente Koya, sa méthode (Spec-Driven Lifecycle), LaunchKit et Radar, les solutions FM, et relie tous ses profils, sans e-mail ni téléphone.
- **Impact** : nouveau dépôt public `ounokoya.github.io` (GitHub Pages à la racine) ; champ Website du profil FM ; travaux Contra et Upwork ; aucune solution FM modifiée.
- **Statut** : ✅ Validé (Koya, 2026-11-06 : page et plan)

### Portfolio de freelance, en français et en anglais (v2.0.0)
- **Problème** : la page présente Koya comme développeur front-end ; elle ne montre ni ses services, ni son rang CodinGame, ni son travail d'IA, et elle n'existe qu'en anglais, sans e-mail.
- **Solution proposée** : repositionner la page en « ingénieur IA et full-stack » freelance, avec Services, CodinGame et R&D, en deux pages `/` et `/fr/`, et un lien e-mail.
- **Impact** : `index.html`, nouveau `fr/index.html`, `vite.config.js`, tests, captures (3 au lieu de 6) ; règle P3 remplacée ; tests de la maquette v1 retirés. Trace : `specs/brainstorming/2026-11-17-portfolio-freelance.md`.
- **Statut** : ✅ Validé (Koya, 2026-11-17 : plan, langues, pas de projet photo, pas de tarif, e-mail)
