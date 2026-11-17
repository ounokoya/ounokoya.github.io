# Brainstorming — portfolio de freelance, en français et en anglais (v2.0.0)

> Phase 0 : trace de l'échange du 2026-11-17 et du plan validé par Koya. Pas de code ici.

## Le besoin

Koya veut que son portfolio devienne un **portfolio de freelance** et qu'il montre son **rang CodinGame** et des informations utiles aux clients. La v1 le présente comme « Front-end developer · .NET & Rust » et met surtout en avant 14 solutions Frontend Mentor.

## Le plan proposé, puis les décisions de Koya

Sections proposées : accueil repositionné (« AI & full-stack engineer », 3 chiffres clés), **Services** (4 cartes), Work (produits, R&D chez JooL, une partie front-end réduite), **CodinGame** (rang, ligues, techniques), Method réécrite pour les clients, About, Contact.

| Question | Décision de Koya (2026-11-17) |
|---|---|
| Langue | **Français et anglais, au choix du visiteur.** |
| Projet de recommandation photo (client) | **Ne pas l'ajouter.** |
| Tarifs | **Pas de prix affiché** : on garde « au forfait ». |
| Contact | **Ajouter son e-mail `koya.esdras@gmail.com`, qui ouvre la messagerie au clic** (lien `mailto:`). Cela remplace la règle P3 de la v1 (« ni e-mail ni téléphone »). |

## Options écartées, et pourquoi

- **Une page qui change de langue par JavaScript** : contenu absent sans script, contraire à l'ADR-0005 (page statique). Retenu : **deux pages statiques**, `/` (anglais) et `/fr/` (français), reliées par un lien de langue (ADR-0009).
- **Refaire la maquette Penpot avant le code** (Phase 3 du SDL-FM) : le plugin Penpot MCP n'est pas connecté. Retenu : garder les tokens et les composants validés en v1, retirer les tests de positions et de pixels qui comparent à l'ancienne maquette, et faire valider le rendu par Koya sur des captures du navigateur (ADR-0010). Proposé dans le plan, sans objection de Koya.
- **Garder les 14 solutions FM en cartes** : trop de place pour un portfolio de freelance. Retenu : 3 cartes (les deux « Advanced » et l'« Intermediate ») et un lien vers le profil FM.
- **Montrer le code de JooL** : il appartient à JooL. Retenu : une carte de R&D sans lien ni capture.

## Sources des chiffres

- CodinGame : profil public relevé le 2026-11-14 (2 015e, top 0,6 %, Maître ; Légende Olymbits 10e / 6 428 et Mad Pod Racing 259e / 236 744 ; Or Code Royale 165e / 6 335 et Fall Challenge 2026 224e / 1 047).
- JooL : spec du CV (`nouveau_cv/specs/specifications/cv-contenu.md`) : 9 ans, 14 développeurs et 2 électroniciens, –43 % sur 800 points NASA.
- Techniques des bots : dépôt `codingame` (Smitsimax, algorithmes génétiques, réseaux de neurones, Rust).

## Plan validé

1. Phase 0 à 2 : ce fichier, `IDEAS.md`, spec v2 (`specs/specifications/portfolio.md`) et contenu FR/EN (`specs/reference/contenu-v2.md`).
2. Phase 3 : ADR-0009 (deux pages par langue), ADR-0010 (sans nouvelle maquette), ADR-0011 (contact par e-mail).
3. Build : `index.html` (anglais) et `fr/index.html` (français), mêmes composants et tokens.
4. Tests : contenu des deux langues, liens, accessibilité, mise en page, validateurs ; retrait des tests S1, S2, S23 et S24 liés à la maquette v1.
5. Exécution : captures du navigateur à 1440 et 375 px, relues par Koya (✋).
6. CHANGELOG v2.0.0, commit, publication : avec l'accord de Koya.
