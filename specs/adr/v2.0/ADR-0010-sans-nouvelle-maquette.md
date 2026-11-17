# ADR-0010 : v2 sans nouvelle maquette Penpot ; rendu validé sur captures

## Statut
Accepté (2026-11-17) — proposé dans le plan validé par Koya ; le plugin Penpot MCP n'est pas connecté.

## Contexte
Le SDL-FM fait mesurer le code sur une maquette Penpot (Phase 3) et compare la page à ses rendus (S1, S2 : positions ; S23, S24 : pixels). La v2 change le contenu et l'ordre des sections : l'ancienne maquette ne lui correspond plus.

## Décision
- La v2 réutilise sans changement les tokens (ADR-0003), les polices (ADR-0004) et les composants validés en v1 (cartes, pilules, liens, étiquettes), dans la grille de l'ADR-0007.
- Les tests S1, S2, S23 et S24 de la v1 sont retirés. Restent : paliers (S3), absence de défilement horizontal (S4), hauteurs égales (S5), typographie (S12) et couleurs (S13).
- Le rendu est validé par Koya sur des captures du navigateur à 1440 et 375 px, dans les deux langues (✋, Phase 8).

## Conséquences
- (−) Plus de garde automatique sur les positions au pixel près.
- (+) La page peut évoluer sans refaire une maquette ; une maquette v2 pourra être ajoutée plus tard, avec ses tests.
