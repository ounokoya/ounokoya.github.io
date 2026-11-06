# ADR-0003 : Tokens Penpot → thème Tailwind (`@theme`)

## Statut
Accepté (2026-11-06) — même décision que les challenges FM.

## Contexte
La bibliothèque Penpot validée (G3-1, `specs/visuel/penpot/maquette.md`) fixe 12 couleurs, deux polices, 17 styles de texte et les mesures (`specs/reference/tokens.md`). Décisions communes : ADR-0001 et ADR-0002 (`frontmentor/specs/adr/`).

## Décision
- `src/style.css` déclare les tokens dans un seul bloc `@theme` et vide la palette par défaut (`--color-*: initial`).
- Les longueurs des tokens sont écrites en rem (règle FM).
- Correspondance :

| Penpot | `@theme` |
|---|---|
| Couleurs | `--color-navy-900`, `--color-paper`, `--color-sand`, `--color-white`, `--color-mist`, `--color-slate-600`, `--color-green-700`, `--color-green-900`, `--color-orange-700`, `--color-orange-400`, `--color-mint-400`, `--color-line` |
| Polices | `--font-display` (Space Grotesk), `--font-sans` (Inter) ; chargement : ADR-0004 |
| Styles de texte | `--text-hero` (56 / 60) et `--text-hero-mobile` (32 / 38), `--text-section` (40 / 48 ; 32 / 40), `--text-part` (28 / 36 ; 24 / 32), `--text-card-title` (22 / 28 ; 20 / 28), `--text-lead` (24 / 32 ; 20 / 28), `--text-body` (18 / 30 ; 16 / 26), `--text-card` (16 / 26), `--text-link` (16 / 24), `--text-kicker` (14 / 20, espacement 1,5 px), `--text-label` (12 / 16, espacement 1 px) |
| Rayons | `--radius-card` (16) ; pilules en `rounded-full` |

## Conséquences
- Changer une couleur du design = changer une ligne de `@theme`.
- Fitness function (test « ADR-0003 » de `tests/statique.spec.js`) : aucune couleur (`#…`, `rgb(`, `hsl(`, `oklch(`) dans les classes, les styles et les blocs `<style>` de `index.html`, ni dans `src/style.css` hors des valeurs de tokens.
