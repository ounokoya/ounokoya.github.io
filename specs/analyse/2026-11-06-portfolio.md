# 2026-11-06 — Rapport d'exécution : portfolio (v1.0.0)

> SDL 21.0.0, Phases 5 et 6, avec les ajouts du SDL-FM 1.5.0. Tests sur le build de production (`vite build` + `vite preview`, port 4240) ; parcours réel dans Chromium (navigateur intégré, puis script Playwright pour les pages entières).

## 1. Tests automatiques (Phase 5)

Contrôle rouge avant le code (page vide) : **27 échecs pour la bonne raison** (contenu absent) et 7 tests de garde verts (W3C, html-validate, eslint, ADR-0003, longueurs en rem, aria-label, CSS logique).

`npm test` sur le code : **34 réussis sur 34**.

| Groupe | Scénarios | Résultat |
|---|---|---|
| Mise en page | S1 à S5 (positions 1440 et 375, paliers 767 / 768 / 1024, 320 à 1920 sans défilement, hauteurs égales) | ✅ 5 / 5 |
| Contenu | S6 à S8, S11 à S14 (titre, description, favicon, aucun script ; textes ; titres ; images ; polices ; couleurs ; thème sombre) | ✅ 7 / 7 |
| Liens | S9 (65 liens, noms et adresses exacts), S10 (32 liens vers ounokoya.github.io et github.com répondent ; le dépôt du portfolio, en ligne seulement) | ✅ 2 / 2 |
| Interactions | S15 à S18 (survols, mouvements réduits, ordre clavier et focus des 65 liens, navigation) | ✅ 4 / 4 |
| Accessibilité | S19 (axe-core à 375, 768 et 1440 px), A6 (repères) | ✅ 4 / 4 |
| HTML, JavaScript, règles FM | S20 à S22, gardes FM, fitness ADR-0003, 0004, 0006, 0008 | ✅ 10 / 10 |
| Visuel | S23, S24 | ✅ 2 / 2 |

### Comparaison visuelle (chaque section vs le rendu de la maquette)

| Section | 1440 px | 375 px |
|---|---|---|
| Accueil | 1,70 % | 4,53 % |
| Method | 1,69 % | 3,42 % |
| Work | 1,80 % | 3,55 % |
| About | 3,14 % | 7,58 % (seuil calibré 8,6 %, à valider par Koya) |
| Contact | 1,26 % | 2,93 % |

### Corrections pendant la Phase 5

| # | Écart | Cause | Correction |
|---|---|---|---|
| E1 | Accueil, cartes des solutions et pied de page plus courts (16 à 24 px) | Les « espaces » de la maquette ajoutent un écart de part et d'autre | `mt-6` avant les liens de l'accueil, `mt-3` avant les liens des cartes, `mt-8` / `mt-10` avant le trait du pied de page |
| E2 | Contour de focus des pilules pas encore orange quand on le lit | `transition-colors` anime aussi `outline-color` | Transitions limitées à la couleur et au fond : le contour apparaît tout de suite |
| E3 | Noms « Code: REST Countries API » introuvables | Chrome ajoute une espace autour du texte masqué (`sr-only` est positionné) : « Code : … » | Noms « Code for REST Countries API », etc. (spec §2.2 mise à jour) |
| E4 | « Freelancer » 2 px plus étroit que dans Penpot | Penpot ne crène pas « Fr » comme Chromium | Tolérance de 2 px pour les largeurs issues du texte (S1, S2) |
| E5 | About mobile : une ligne de moins que la maquette | Penpot renvoyait « I » à la ligne (espace de fin de ligne compté) | Maquette corrigée (paragraphe élargi de 4 px) ; mesures de la spec suivies |
| E6 | Lettres décalées en bout de ligne dans les rendus | L'export SVG de Penpot impose sa largeur à chaque ligne | Rendus refaits avec `NATURAL=1` |

## 2. Parcours réel (Phase 6)

| Étape | 320 px | 375 px | 768 px | 1440 px |
|---|---|---|---|---|
| Premier affichage sans cache | ✅ | ✅ 112 ms jusqu'au plus grand texte | ✅ | ✅ 344 ms ; 14 requêtes, toutes sur le site |
| Console | ✅ aucune erreur | ✅ | ✅ | ✅ |
| Défilement horizontal | ✅ aucun | ✅ | ✅ | ✅ |
| Clavier : 65 liens dans l'ordre de lecture, contour visible | ✅ (deux liens dépassent le bas de la fenêtre de 0,06 px au focus : arrondi) | ✅ | ✅ | ✅ contour Orange 400 sur Navy, Green 700 sur fond clair |
| Navigation : clic sur « Work » | — | — | — | ✅ adresse `#work`, section en haut de la fenêtre |
| Survol d'un lien de carte | — | — | — | ✅ Green 900 |

**Écart E7 (768 px)** : « My Frontend Mentor profile » se coupait sur deux lignes à côté de la phrase. Le lien passe sous la phrase jusqu'à 1024 px (desktop et mobile inchangés) ; 34 / 34 après la retouche.

## 3. Reste à faire

- Valider le seuil calibré d'About en mobile (8,6 %).
- Publication (accord de Koya) : dépôt public `ounokoya.github.io`, branche `gh-pages`, tag v1.0.0 poussé ; tests sur le site en ligne (`BASE_URL=https://ounokoya.github.io/ npm test`, dont le lien du code source).
