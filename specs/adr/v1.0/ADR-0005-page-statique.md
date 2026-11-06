# ADR-0005 : Page statique, sans script ; contenu écrit dans le HTML

## Statut
Accepté (2026-11-06).

## Contexte
La page présente des textes et des liens (§2 de la spec) ; aucune interaction n'a besoin de JavaScript (navigation par ancres, liens externes). Les données des travaux (2 produits, 14 solutions) changent rarement. FM et les relecteurs lisent le HTML.

## Options
| Option | Pour | Contre |
|---|---|---|
| **HTML écrit à la main, aucun script (choisie)** | Page lisible sans JavaScript, la plus rapide ; rien à valider côté script ; le HTML servi est celui du dépôt | Ajouter une solution = copier un bloc de HTML |
| Données en JSON + script qui construit les cartes | Une solution = une ligne de données | Contenu absent sans JavaScript ; code et tests en plus pour 14 lignes |
| Générateur de site (Astro, 11ty…) | Gabarits | Une dépendance et une pile de plus pour une page |

## Décision
- `index.html` contient tout le contenu ; aucun élément `<script>`.
- Noms de liens complétés par un texte masqué (`sr-only` de Tailwind) : « Live site: REST Countries API » ; jamais d'`aria-label` (règle FM).
- Liens externes dans le même onglet ; ancres natives, sans défilement animé.
- Décors (point de disponibilité, anneau de la photo) en CSS, hors de l'arbre d'accessibilité ; captures en `alt=""`.

## Conséquences
- Ajouter une solution : un bloc dans `index.html`, une ligne dans `tests/data.js`, une capture (ADR-0006).
- Vérifié par S6 (aucun script) et S9 (noms et adresses des liens).
