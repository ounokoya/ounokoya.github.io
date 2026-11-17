# Rapport d'exécution — portfolio v2.0.0 (freelance, FR/EN)

**Date** : 2026-11-17 · **Plan** : `specs/brainstorming/2026-11-17-portfolio-freelance.md` · **Spec** : `specs/specifications/portfolio.md` (v2.0.0)

## Tests

`npm test` sur le build de production (`vite preview`) : **54 tests sur 54 verts**, dans les deux langues.

| Groupe | Résultat |
|---|---|
| Contenu (S6 à S8, S11 à S14) | vert, anglais et français |
| Liens (S9 : ordre, noms, 2 `mailto:`, aucun `tel:` ; S10 : liens GitHub, ounokoya.github.io et CodinGame) | vert |
| Mise en page (S3 paliers, S4 de 320 à 1920 px sans défilement ni tableau qui déborde, S5 hauteurs égales) | vert |
| Interactions (S15, S16, S17 ordre clavier et focus, S18 navigation, S25 lien de langue) | vert |
| Accessibilité (S19 axe-core à 375, 768 et 1440 px, A6 repères) | vert |
| Validateurs et règles FM (S20 W3C Nu, S21 html-validate, S22 eslint, ADR-0003, -0004, -0006, -0008, -0009) | vert |

## Écarts trouvés par les tests, et corrections

1. **Contraste** (S19) : le surtitre Orange 700 de Method sur fond Sand donnait 4,4:1 (seuil AA 4,5:1). Method passe sur Paper, avec un filet Line qui la sépare de CodinGame ; About passe sur Sand (aucun surtitre).
2. **Tableau CodinGame** (S4) : à 320 px, il débordait de sa carte (3 px en anglais, 27 px en français). Marges de la carte réduites sous 640 px, classement autorisé à revenir à la ligne sous 768 px, colonne française « Rang » au lieu de « Classement ».
3. Relu sur captures avant les tests : « full-stack » coupé en fin de ligne dans le titre mobile (mot gardé entier) ; nombres français coupés à l'espace des milliers (espaces insécables).

## Rendu (S26, ✋)

Captures pleine page à 1440 et 375 px, anglais et français, envoyées à Koya : **validées le 2026-11-17** (« Oui, publie »).
