# Spec — Portfolio `ounokoya.github.io` (v2.0.0)

> Phase 2. Sources : plan validé (`specs/brainstorming/2026-11-17-portfolio-freelance.md`), textes `specs/reference/contenu-v2.md`, tokens `specs/reference/tokens.md`, ADR-0009 à ADR-0011. Version précédente : `specs/specifications/archive/portfolio-v1.0.2.md`.
> Cette spec dit **quoi** et **pourquoi**, jamais **comment**.

## 1. Objectif

Un portfolio de freelance, en anglais (`/`) et en français (`/fr/`), qui présente Koya Esdras comme ingénieur IA et full-stack : ses services, ses réalisations (produits, R&D chez JooL, front-end), son rang CodinGame, sa méthode et son parcours. Il permet de le contacter par e-mail (ADR-0011) ou sur ses plateformes. Il reste aussi rigoureux que la v1 : accessible (WCAG 2.2 AA), valide, testé, sans script.

## 2. Composants et contenu

Textes exacts des deux langues : `specs/reference/contenu-v2.md`.

### 2.1 Structure (identique dans les deux pages)

| Bloc | Contenu | Élément attendu |
|---|---|---|
| En-tête | Nom (lien vers le haut) ; navigation Services, Work, CodinGame, Method, About, Contact ; lien vers l'autre langue | `header` ; `nav` ; lien de langue avec `lang` et `hreflang` |
| Accueil | Photo ; lieu ; titre sur deux lignes ; sous-titre ; bio ; 3 chiffres clés ; disponibilité ; lien e-mail puis 6 profils | `main` : `img`, `h1`, liste de chiffres, liste de liens |
| Services | Surtitre, titre, introduction ; 4 cartes (titre, texte) | `section` nommée par son `h2` ; un `h3` par carte |
| Work | Titre ; Products (LaunchKit, Radar) ; R&D chez JooL (phrase, 2 cartes sans lien) ; Front-end (phrase, lien FM, 3 solutions avec capture décorative, niveau, ligne, 3 liens) | `section` nommée ; `h3` par partie ; `h4` par carte |
| CodinGame | Surtitre, titre, phrase du rang ; tableau des 4 ligues (Jeu, Ligue, Classement) ; texte ; lien vers le profil | `section` nommée ; `table` avec légende et en-têtes de colonnes |
| Method | Surtitre, titre, introduction ; 4 étapes numérotées 01 à 04 | `section` nommée ; liste ordonnée, un `h3` par étape |
| About | Titre et 3 paragraphes | `section` nommée |
| Contact | Titre, phrase, lien e-mail, 7 profils, ligne finale (© et code source) | `footer` avec son `h2` |

Chaque page a son titre, sa langue (`lang`), sa description, les balises `link rel="alternate" hreflang` des deux langues et l'icône du site. Aucun script.

### 2.2 Liens

Adresses communes : table « Liens communs » de `contenu-v2.md`. Les noms sont ceux de la langue de la page. Les liens Live site, Code et Frontend Mentor nomment leur solution par un texte masqué. Tous les liens s'ouvrent dans le même onglet ; le lien e-mail ouvre la messagerie (`mailto:`). Aucun lien `tel:`.

## 3. Tokens

Inchangés depuis la v1 (ADR-0003, ADR-0010) :

| Zone | Fond | Texte | Liens |
|---|---|---|---|
| En-tête, accueil, pied de page | Navy 900 | White ; bio, libellés des chiffres et phrases Mist ; lieu et valeurs des chiffres Orange 400 | White |
| Services, CodinGame, Method | Paper (Method séparée de CodinGame par un filet Line) | Navy 900 ; secondaires Slate 600 ; surtitres Orange 700 | Green 700 |
| Work, About | Sand ; cartes White, bordure Line | idem ; niveaux et numéros Orange 700 | Green 700 |

Les surtitres Orange 700 restent sur Paper : sur Sand, leur contraste tombe à 4,4:1, sous le seuil AA de 4,5:1 (A4).

## 4. Responsive

| Largeur | Disposition |
|---|---|
| < 768 px | Une colonne ; contenu à 24 px des bords ; photo de 160 px au-dessus du texte ; cartes empilées ; tableau CodinGame lisible sans défilement horizontal de la page |
| 768 à 1023 px | Accueil en ligne (photo de 160 px) ; services, étapes, produits, cartes R&D et solutions sur 2 colonnes |
| ≥ 1024 px | Contenu de 1120 px au plus, centré ; photo de 240 px ; 4 services et 4 étapes par ligne ; 2 produits, 2 cartes R&D, 3 solutions par ligne ; About : titre à gauche |

Les cartes d'une même ligne ont la même hauteur. Pas de défilement horizontal de 320 px aux grands écrans.

## 5. États et interactions

Ceux de la v1 : pilules (survol fond White, texte Navy), navigation et lien de langue (soulignés au survol), liens de texte (Green 900 au survol), lien du pied de page (Orange 400) ; focus : contour de 2 px décalé de 3 px, Orange 400 sur Navy, Green 700 sur fond clair ; aucune transition si `prefers-reduced-motion: reduce`. Clic sur la navigation : la section en haut de la fenêtre, l'adresse finit par son ancre. Clic sur le lien de langue : l'autre page.

## 6. Accessibilité

| # | Contrat |
|---|---|
| A1 | Un seul `h1` ; `h2` par section, `h3` par carte de service, étape et partie de Work, `h4` par carte de Work ; aucun saut de niveau. |
| A2 | Photo décrite dans la langue de la page ; captures et décors ignorés par les lecteurs d'écran. |
| A3 | Chaque lien a un nom distinct ou la même destination qu'un lien de même nom ; liens de solution nommés par un texte masqué, jamais `aria-label`. |
| A4 | Contraste AA. |
| A5 | Ordre clavier = ordre de lecture ; focus visible. |
| A6 | Un `header`, un `nav`, un `main`, un `footer` ; sections Services, Work, CodinGame, Method, About nommées par leur titre. |
| A7 | La page reste la même en thème clair ou sombre de l'appareil. |
| A8 | Pas de transition si `prefers-reduced-motion: reduce`. |
| A9 | Le lien de langue porte la langue de sa cible (`lang`, `hreflang`) ; chaque page déclare sa langue. |

## 7. Critères d'acceptation (pour chaque langue)

```
Mise en page (ADR-0010 : plus de comparaison à la maquette v1)
S3  Given 768 px  Then 2 cartes par ligne (services, étapes, produits, R&D, solutions) ; 767 px : une colonne ;
    1024 px : 4 services, 4 étapes, 3 solutions par ligne ; About : titre au-dessus du texte sous 1024 px
S4  Given 320 à 1920 px  Then pas de défilement horizontal ; à 1920, contenu de 1120 px centré
S5  Given 1440 et 375 px  Then les cartes d'une même ligne ont la même hauteur

Contenu
S6  Given chaque page  Then titre, langue, description, alternates hreflang et favicon ; aucun script
S7  Given chaque page  Then les textes de contenu-v2.md dans l'ordre : accueil (chiffres), Services, Work, CodinGame (tableau), Method, About, Contact
S8  Given chaque page  Then un seul h1, aucun saut de niveau (A1)
S9  Given chaque page  Then chaque lien a son nom et son adresse exacts, dans l'ordre ; 2 liens mailto: vers koya.esdras@gmail.com ; aucun tel: (ADR-0011)
S10 Given les liens vers ounokoya.github.io, github.com et codingame.com  Then chacun répond (statut < 400)
S11 Given chaque page  Then photo nommée et chargée ; 3 captures 16:10 chargées et décoratives (A2)
S12 Given chaque page  Then polices et tailles de tokens.md (h1, h2, h3, h4, nom, sous-titre, bio, cartes, liens)
S13 Given chaque page  Then fonds des zones (§3), couleurs des textes et des liens
S14 Given le thème sombre de l'appareil  Then les fonds ne changent pas (A7)

Interactions
S15 Given chaque type de lien  When survol puis sortie  Then états de la §5
S16 Given prefers-reduced-motion: reduce  Then aucune transition
S17 Given chaque page  When Tab  Then ordre de lecture et contour de focus de la §5
S18 Given la navigation  When clic sur Work (Réalisations)  Then #work en haut de la fenêtre
S25 Given la page anglaise  When clic sur « Français »  Then la page française (et l'inverse avec « English »)

Accessibilité et règles FM
S19 Given 375, 768 et 1440 px  Then axe-core : aucune violation sérieuse ou critique
S20 Given le HTML servi des deux pages  Then validateur W3C Nu : aucune erreur
S21 Given le HTML servi des deux pages  Then html-validate au réglage de FM : aucune erreur
S22 Given le JavaScript du dépôt  Then eslint : aucune erreur (et règles FM : rem, aria-label, CSS logique)

Rendu (✋, ADR-0010)
S26 Given 1440 et 375 px, dans les deux langues  Then captures relues et validées par Koya
```
