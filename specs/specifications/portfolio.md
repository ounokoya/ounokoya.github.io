# Spec — Portfolio `ounokoya.github.io` (v1.0.0)

> SDL 21.0.0 Phase 2 avec les ajouts du SDL-FM 1.5.0 (étape E de la remise à niveau). Sources : page et plan validés (`specs/brainstorming/2026-11-06-portfolio.md`, `specs/visuel/portfolio-plan.png`), maquette validée (G3) `specs/visuel/penpot/maquette.md`, textes `specs/reference/contenu.md`, tokens `specs/reference/tokens.md`.
> Cette spec dit **quoi** et **pourquoi**, jamais **comment**.

## 1. Objectif

Une page en anglais qui présente Koya Esdras aux clients et recruteurs : son positionnement, sa méthode (Spec-Driven Lifecycle), ses produits LaunchKit et Radar, ses 14 solutions Frontend Mentor et sa bio ; elle relie ses profils Upwork, Contra, Freelancer, LinkedIn, GitHub et Frontend Mentor, sans e-mail ni téléphone (P3). Elle doit être aussi rigoureuse que ses solutions FM : accessible (WCAG 2.2 AA), valide, testée.

## 2. Composants et contenu

Textes exacts : `specs/reference/contenu.md` (validés en Pré-dev 2 et en G3-5). Adresses des liens : §2.2.

### 2.1 Structure

| Bloc | Contenu | Élément attendu |
|---|---|---|
| En-tête | Lien « Koya Esdras » vers le haut de la page ; navigation Method, Work, About, Contact vers les sections (G3-3) | `header` ; `nav` avec ses liens |
| Accueil | Photo (Portrait of Koya Esdras) ; lieu ; titre sur deux lignes « Front-end developer » / « .NET & Rust » (G3-2) ; sous-titre ; bio courte ; disponibilité (point décoratif) ; 5 liens des profils | dans `main` : `img`, `h1`, liste des liens |
| Method | Surtitre, titre, introduction ; 4 étapes numérotées 01 à 04 (titre et texte) | `section` nommée par son `h2` ; liste ordonnée, un `h3` par étape |
| Work | Titre ; partie Products : LaunchKit et Radar (nom, texte, technologies, liens) ; partie Frontend Mentor solutions : phrase (G3-4), lien vers le profil FM, 6 cartes (capture décorative, niveau, nom, ligne, liens Live site, Code, Frontend Mentor), puis « 8 more solutions » (Newbie) en liste | `section` nommée par son `h2` ; `h3` par partie ; `h4` par produit, par solution et pour la liste ; listes |
| About | Titre et bio longue (3 paragraphes) | `section` nommée par son `h2` |
| Contact | Titre, phrase, 6 liens des profils, ligne finale « © 2026 Koya Esdras · » et « Source code on GitHub » | `footer` avec son `h2` |

La page a pour titre « Koya Esdras · Front-end developer, .NET & Rust », la langue `en`, une description (`meta name="description"`) reprenant le titre et le sous-titre, et une icône (favicon) servie avec le site. Aucun script.

### 2.2 Liens

| Nom accessible | Adresse |
|---|---|
| Koya Esdras | `#top` (haut de la page) |
| Method · Work · About · Contact | `#method` · `#work` · `#about` · `#contact` |
| Upwork | https://www.upwork.com/freelancers/~015a3a87ce1365b8c5 |
| Contra | https://contra.com/koya_esdras_sezqkhrm |
| Freelancer | https://www.freelancer.com/u/ounokoya |
| LinkedIn | https://www.linkedin.com/in/koya-esdras-4b554b142 |
| GitHub | https://github.com/ounokoya |
| Frontend Mentor (pied de page) · My Frontend Mentor profile | https://www.frontendmentor.io/profile/ounokoya |
| Live demo | https://saas.koyad.com |
| Web code · API code · Mobile code | https://github.com/ounokoya/launchkit-web · `launchkit-server` · `launchkit-mobile` |
| Radar on Contra | https://contra.com/p/rkPlYBNU-radar-ai-job-radar-rust-local-embeddings-on-cpu |
| « Live site for X » · « Code for X » · « Frontend Mentor for X » (X = nom de la solution ; « for X » masqué à l’écran) | site, dépôt et page FM de la table de `contenu.md` |
| Source code on GitHub | https://github.com/ounokoya/ounokoya.github.io |

Tous les liens s'ouvrent dans le même onglet. Les profils de l'accueil et du pied de page portent le même nom et la même adresse.

## 3. Tokens

Couleurs, polices, tailles et mesures : `specs/reference/tokens.md` (G3-1, G3-2) et la bibliothèque Penpot. Rappel des rôles :

| Zone | Fond | Texte | Liens |
|---|---|---|---|
| En-tête, accueil, pied de page | Navy 900 | White ; bio et phrases Mist ; lieu Orange 400 | White |
| Method, About | Paper | Navy 900 ; textes secondaires Slate 600 ; surtitre et numéros Orange 700 | Green 700 |
| Work | Sand ; cartes White, bordure Line | idem ; niveaux Orange 700 ; technologies Navy 900 sur Paper | Green 700 |

## 4. Responsive

| Largeur | Disposition |
|---|---|
| < 768 px | Une colonne ; contenu à 24 px des bords ; nom au-dessus de la navigation ; photo de 160 px au-dessus du texte ; étapes, produits, solutions empilés ; dans la liste des 8, les liens sous le nom |
| 768 à 1023 px (G3-6) | En-tête et accueil comme en desktop (photo de 160 px) ; contenu à 24 px des bords ; étapes, produits et solutions sur 2 colonnes ; About : titre au-dessus du texte |
| ≥ 1024 px | Contenu de 1120 px au plus (24 px des bords au moins), centré ; photo de 240 px à gauche du texte ; 4 étapes, 2 produits, 3 solutions par ligne ; About : titre à gauche, texte à droite |

Les cartes d'une même ligne ont la même hauteur. La page reste utilisable de 320 px aux grands écrans, sans défilement horizontal.

Positions de la maquette (px, coin haut gauche de la page) :

| Élément | 1440 | 375 |
|---|---|---|
| Nom (lien) | (160, 24) 118 × 28 | (24, 20) 118 × 28 |
| Navigation | (977, 26) 303 × 24 | (24, 60) 279 × 24 |
| Photo | (160, 254) 240 × 240 | (24, 144) 160 × 160 |
| Titre (`h1`) | (464, 176) 816 × 120 | (24, 372) 327 × 76 |
| Bio courte | (464, 360) 720 × 120 | (24, 508) 327 × 208 |
| Liens des profils (accueil) | y 560, hauteur 48 ; x 464, 584, 696, 838, 963 | x 24, 140 (y 796) ; 24, 162 (y 856) ; 24 (y 916) |
| Sections : haut + hauteur | accueil 0 + 704 ; Method 704 + 648 ; Work 1352 + 2198 ; About 3550 + 622 ; Contact 4172 + 443 | 0 + 1028 ; 1028 + 1204 ; 2232 + 4446 ; 6678 + 830 ; 7508 + 537 |
| Étapes | y 1000, 256 × 256 ; x 160, 448, 736, 1024 | x 24, 327 de large ; y 1312, 1530, 1748, 1966 |
| Produits | y 1620, 544 × 272 ; x 160, 736 | x 24, 327 de large ; y 2440, 2804 |
| Solutions | 352 × 424 ; x 160, 544, 928 ; y 2050, 2506 | x 24, 327 × 408 ; y 3330 + 432 × n |
| Liste des 8 | (160, 2954) 1120 × 500 | (24, 5922) 327 × 692 |
| About : texte | (576, 3646) 704 × 430 | (24, 6806) 327 × 638 (Penpot corrigé : il renvoyait « I » à la ligne) |

## 5. États et interactions

| Élément | Normal | Survol | Focus clavier |
|---|---|---|---|
| Liens pilules (accueil, contact) | contour 2 px White, texte White | fond White, texte Navy 900 | contour 2 px Orange 400, décalé de 3 px |
| Nom et navigation | White, non soulignés | soulignés | contour 2 px Orange 400, décalé de 3 px |
| « Source code on GitHub » | White, souligné | Orange 400 | contour 2 px Orange 400, décalé de 3 px |
| Liens de texte (fond clair) | Green 700, soulignés | Green 900 | contour 2 px Green 700, décalé de 3 px |

| Événement | Effet |
|---|---|
| Clic ou Entrée sur un lien de la navigation | la section est en haut de la fenêtre, l'adresse finit par son ancre |
| Clic sur un lien externe | ouverture dans le même onglet |

Les changements de couleur peuvent être progressifs ; toute transition est supprimée si `prefers-reduced-motion: reduce`. Pas de défilement animé.

## 6. Accessibilité

### Contrats

| # | Contrat |
|---|---|
| A1 | Un seul `h1` (le titre de l'accueil) ; titres sans saut de niveau : `h2` par section, `h3` par étape et par partie de Work, `h4` par produit, par solution et pour la liste des 8. |
| A2 | La photo est décrite (« Portrait of Koya Esdras ») ; les captures, le point de disponibilité et les décors sont ignorés par les lecteurs d'écran. |
| A3 | Chaque lien a un nom distinct ou la même destination qu'un lien de même nom ; les liens Live site, Code et Frontend Mentor nomment leur solution (texte masqué, jamais `aria-label`). |
| A4 | Contraste AA : 4,5:1 pour les textes, 3:1 pour les titres de 24 px et plus et pour le point de disponibilité. |
| A5 | Ordre clavier = ordre de lecture : nom, navigation, profils de l'accueil, liens des produits, des solutions, du pied de page ; focus visible (contour de 2 px au moins). |
| A6 | Repères : un `header`, un `nav`, un `main`, un `footer` ; les sections Method, Work et About sont nommées par leur titre. |
| A7 | Fond déclaré : la page reste la même en thème clair ou sombre de l'appareil. |
| A8 | Pas de transition si `prefers-reduced-motion: reduce`. |

### Noms accessibles utilisés par les tests

| Élément | Rôle | Nom |
|---|---|---|
| En-tête · navigation · contenu · pied de page | banner · navigation · main · contentinfo | — |
| Titre de l'accueil | heading (1) | « Front-end developer .NET & Rust » |
| Photo | img | « Portrait of Koya Esdras » |
| Sections | region | « Method », « Work », « About » |
| Étapes | heading (3) | « Written spec », « Mockup », « Tests before the code », « Real-browser check » |
| Parties de Work | heading (3) | « Products », « Frontend Mentor solutions » |
| Produits, solutions, liste | heading (4) | « LaunchKit », « Radar », les 6 noms de solutions, « 8 more solutions » |
| Contact | heading (2) dans contentinfo | « Contact » |
| Liens | link | §2.2 |

## 7. Critères d'acceptation

```
Mise en page (positions de la §4 : à 1 px près dans le premier écran, à 2 px près plus bas ; navigation et liens des profils
            à 2 px : Penpot ne crène pas comme Chromium, « Freelancer » 82 px contre 80)
S1  Given 1440 × 900   Then nom, navigation (2 px : largeur issue du texte), photo, h1, bio, liens des profils à leurs positions ;
                       sections, étapes, produits, solutions, liste des 8 et texte About à leurs positions
S2  Given 375 × 812    Then mêmes éléments aux positions mobiles
S3  Given 768 × 1024   Then 2 étapes, 2 produits et 2 solutions par ligne, About : titre au-dessus du texte ;
                       given 767 px  Then une colonne ; given 1024 px  Then 4 étapes et 3 solutions par ligne
S4  Given 320, 375, 767, 768, 1023, 1024, 1440, 1920 px  Then pas de défilement horizontal ; à 1920, contenu de 1120 px centré
S5  Given 1440 et 375 px  Then les cartes d'une même ligne ont la même hauteur

Contenu
S6  Given la page  Then titre, langue, description et favicon de la §2.1 ; aucun script
S7  Given la page  Then les textes de contenu.md : accueil, Method (4 étapes dans l'ordre), produits (technologies),
                   6 solutions (niveau, nom, ligne) dans l'ordre, 8 autres (Newbie), About (3 paragraphes), Contact
S8  Given la page  Then les titres de la §6 (A1) : un seul h1, aucun saut de niveau
S9  Given la page  Then chaque lien de la §2.2 a son nom et son adresse exacts ; aucun lien mailto: ni tel: (P3)
S10 Given les liens vers ounokoya.github.io et github.com  Then chacun répond (statut < 400)
    (le lien « Source code on GitHub » : sur le site en ligne seulement, le dépôt naît à la publication)
S11 Given la page  Then photo nommée et chargée ; 6 captures chargées, au format 16:10, ignorées par les lecteurs d'écran (A2)
S12 Given la page  Then polices et tailles de tokens.md : h1 Space Grotesk 700 56 px (32 px sous 768) ; h2 40 px (32) ;
                   texte courant Inter 400 18 px (16) ; liens 16 px Inter 500 ; surtitres et niveaux en majuscules
S13 Given la page  Then couleurs de la §3 : fonds des zones, textes, liens ; contraste AA de chaque couple (A4)
S14 Given l'appareil en thème clair ou sombre  Then les fonds restent ceux de la §3 (A7)

Interactions
S15 Given chaque type de lien  When je le survole  Then l'état « Survol » de la §5 ; When je le quitte  Then l'état normal
S16 Given prefers-reduced-motion: reduce  When je survole un lien  Then aucune transition n'est jouée
S17 Given la page  When j'appuie sur Tab  Then l'ordre de A5 ; chaque lien montre le contour de focus de la §5 (2 px, décalé de 3 px)
S18 Given la navigation  When je clique sur « Work »  Then l'adresse finit par #work et le titre « Work » est en haut de la fenêtre

Accessibilité et règles FM
S19 Given 375, 768 et 1440 px  Then axe-core : aucune violation sérieuse ou critique
S20 Given le HTML servi  Then validateur W3C Nu : aucune erreur
S21 Given le HTML servi  Then html-validate au réglage de FM : aucune erreur
S22 Given le JavaScript du dépôt (tests, réglages)  Then eslint au réglage de FM : aucune erreur
    (et les tests de garde des règles FM déjà vues : longueurs en rem, aria-label, CSS logique)

Visuel (G3-7 : 5 % des pixels au plus, une comparaison par section)
S23 Given 1440 px  Then chaque section (accueil, Method, Work, About, Contact) vs sa zone de desktop.png ≤ 5,0 %
S24 Given 375 px   Then chaque section vs sa zone de mobile.png ≤ 5,0 % (About : 8,6 %, calibrage de la Phase 5, à valider)
```
