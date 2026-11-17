# ADR-0009 : Deux pages statiques, une par langue

## Statut
Accepté (2026-11-17) — Koya : « français et anglais, la langue est un choix ».

## Contexte
La page doit exister en français et en anglais, au choix du visiteur. L'ADR-0005 impose une page sans script, au contenu écrit dans le HTML. Les liens déjà publiés (profils Upwork, Contra, FM) pointent vers `https://ounokoya.github.io/`.

## Options
| Option | Pour | Contre |
|---|---|---|
| **Deux pages : `/` (anglais) et `/fr/` (français) (choisie)** | Sans script ; chaque page a sa langue (`lang`), son titre et sa description ; adresses existantes inchangées | Le HTML est écrit deux fois |
| Une page, langue changée par JavaScript | Un seul HTML | Contenu absent sans script ; contraire à l'ADR-0005 ; une seule langue pour les moteurs de recherche |
| Gabarit + fichiers de traduction, générés au build | Pas de doublon | Un générateur et des tests en plus pour une page |

## Décision
- `index.html` (anglais) et `fr/index.html` (français), mêmes composants, mêmes classes, mêmes ancres (`#services`, `#work`…).
- Construites par Vite en mode multipage (`vite.config.js`, `build.rollupOptions.input`).
- Lien de langue dans l'en-tête : « Français » sur la page anglaise, « English » sur la page française, avec `lang` et `hreflang` ; balises `<link rel="alternate" hreflang>` dans le `head` des deux pages.

## Conséquences
- Toute modification de contenu se fait dans les deux fichiers ; les textes de référence sont dans `specs/reference/contenu-v2.md`.
- Fitness function : les deux pages ont les mêmes ancres, les mêmes adresses externes dans le même ordre et un lien vers l'autre langue (test « ADR-0009 »).
