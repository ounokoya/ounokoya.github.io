# ADR-0004 : Space Grotesk et Inter par Fontsource

## Statut
Accepté (2026-11-06) — même choix que les challenges FM (Fontsource plutôt que le lien Google Fonts) ; le téléchargement des paquets se fait au verrou, avec l'accord de Koya.

## Contexte
La maquette utilise Space Grotesk (500, 700) et Inter (400, 500, 600), toutes deux sur Google Fonts (G3-1). Les tests visuels comparent des pixels au rendu de la maquette fait avec ces polices (S23, S24).

## Options
| Option | Pour | Contre |
|---|---|---|
| **`@fontsource/space-grotesk` et `@fontsource/inter` (choisie)** | Les fichiers de Google Fonts, servis avec le site ; aucun appel à un tiers ; seules les graisses utilisées | Deux dépendances |
| Versions variables (`@fontsource-variable/…`) | Un fichier par police | Familles nommées « … Variable » ; rien à gagner pour 2 et 3 graisses |
| Lien Google Fonts | Rien à installer | Dépend du réseau et de Google (vie privée, captures des tests) |

## Décision
- `@fontsource/space-grotesk` (500, 700) et `@fontsource/inter` (400, 500, 600) en dépendances d'exécution, sous-ensemble latin.
- `--font-display: "Space Grotesk", sans-serif` ; `--font-sans: Inter, sans-serif`.

## Conséquences
- Aucun appel à un serveur de polices.
- Fitness function (test « ADR-0004 » de `tests/statique.spec.js`) : rien n'est chargé hors du domaine ; les 5 graisses se chargent.
