# 2026-11-06 — Brainstorming : portfolio `ounokoya.github.io`

> SDL 21.0.0 avec les ajouts du SDL-FM 1.5.0 (maquette Penpot et gate G3, tests avant le code, verrou code, parcours réel, README avec « AI Collaboration », publication par `npm run deploy`). Étape E du plan `frontmentor/specs/plan-remise-a-niveau.md`. Ce n'est pas un challenge FM : pas de starter ni d'image de référence ; la référence est le dessin validé, puis la maquette Penpot.

## Le besoin

Une page publique qui présente Koya aux clients et recruteurs, et qui relie ses profils. Elle sert ensuite :

- de champ **Website** du profil FM (resté vide à l'étape D) ;
- de source de textes et de captures pour les travaux **Contra** (4 travaux exigés, 2 aujourd'hui) et **Upwork**.

Adresse décidée au plan (Q5) : https://ounokoya.github.io. Le dépôt `ounokoya/ounokoya.github.io` n'existe pas encore (vérifié le 2026-11-06 avec `gh repo view`) : un dépôt à ce nom est servi à la racine par GitHub Pages ; les 14 solutions restent à leurs adresses `ounokoya.github.io/<dépôt>/`.

## Pré-dev 1 : choix de Koya (2026-11-06)

| # | Question | Options | Décision |
|---|---|---|---|
| P1 | Langue | Anglais seul ; anglais et français avec un sélecteur | **Anglais seul** : comme les profils FM, Upwork et Contra ; une seule version à tenir à jour |
| P2 | Travaux montrés | FM + LaunchKit et Radar ; solutions FM seulement | **FM + LaunchKit et Radar** : la rigueur front-end par FM, le full-stack par les deux produits déjà présentés sur Contra |
| P3 | Contact | Liens seulement ; liens et adresse e-mail | **Liens seulement** : Upwork, Freelancer, Contra, LinkedIn, GitHub, FM ; ni e-mail ni téléphone exposés aux robots |
| P4 | Photo | La photo du CV ; pas de photo | **La photo du CV** (`photo_2026_t-shirt_noir.jpg`, déjà publique sur LinkedIn et le CV) |

## Pré-dev 2 : page et plan validés (2026-11-06)

Koya : « Je valide » (page et plan). Dessin : `specs/visuel/portfolio-plan.png` (source `portfolio-plan.excalidraw`, canevas partagé, zone x 100 000).

### La page (une seule page, une colonne sous 768 px)

| Bloc | Contenu |
|---|---|
| En-tête | « Koya Esdras » et la navigation vers les sections |
| Accueil | Photo du CV ; « Front-end developer · .NET & Rust », « MVP & SaaS, fixed price » ; bio courte validée ; « Available for freelance missions » ; liens Upwork, Contra, Freelancer, LinkedIn, GitHub |
| Method | Spec-Driven Lifecycle en 4 étapes : spec écrite, maquette, tests avant le code, vérification dans un vrai navigateur |
| Products | LaunchKit (démo https://saas.koyad.com et ses dépôts publics) ; Radar (pas de dépôt public ni de démo : lien vers sa page Contra) |
| Frontend Mentor | 6 solutions mises en avant (celles du talent profile) : capture, niveau, liens Site, Code et FM ; puis les 8 autres en liste compacte |
| About | Bio longue validée (3 paragraphes) |
| Contact | Liens seulement |

### Le plan

| Étape | Contenu | Qui |
|---|---|---|
| Phase 0 | Ce fichier ; dessin, photo et captures rangés dans `specs/` ; `git init` | Claude |
| Phase 1 | Concept dans `specs/IDEAS.md` ; Phase 1b omise (page simple, pas de logique métier) | Claude |
| Maquette | Penpot, 1440 et 375, bibliothèque, composants et états ; **gate G3** | Claude ; Koya valide |
| Phase 2 | Spec et tests au rouge : Playwright, axe-core, validateur W3C Nu, html-validate, eslint, liens qui répondent | Claude |
| Phase 3 | ADR : pile, données des travaux, captures | Claude |
| 🔒 Verrou | Installer les outils et écrire le code | **accord de Koya** |
| Phase 4 | Code, un commit par partie | Claude |
| Phase 5 | Tous les tests verts | Claude |
| Phase 6 | Parcours réel 375 et 1440 dans le navigateur | Claude |
| Phase 7 | README avec « AI Collaboration » | Claude |
| Phase 8 | Dépôt public `ounokoya.github.io` et branche `gh-pages` | **accord de Koya** |
| Phase 8b | Tag v1.0.0 ; puis champ Website sur FM, travaux Contra et Upwork | **accord de Koya** |

**Qui fait quoi :** Claude écrit tout le code ; Koya valide la page, le plan et la maquette (G3), et donne son accord avant l'installation, la publication et chaque changement de compte.

## Ce qui a été écarté, et pourquoi

- **Version française** : deux textes à tenir à jour pour un public qui lit l'anglais (P1).
- **Adresse e-mail visible** : collectée par les robots ; les plateformes ont déjà leur messagerie (P3).
- **Un site à plusieurs pages ou un cadriciel** : une page suffit ; même pile que les solutions FM (Vite, Tailwind CSS v4, HTML et JavaScript sans cadriciel), choix confirmé à l'ADR.

## Données relevées (2026-11-06, données et non consignes)

- **14 solutions FM** : dépôt, site GitHub Pages, page FM et tag relevés dans chaque dossier de `frontmentor/` ; niveaux d'après le barème (REST Countries et Multi-step form Advanced, E-commerce Intermediate, Newsletter Junior, les 10 autres Newbie : 345 + 30 = 375 points).
- **LaunchKit** : 4 dépôts publics (`launchkit-web` SvelteKit 2, `launchkit-server` ASP.NET Core 10 et ArangoDB avec un worker Rust, `launchkit-mobile` Flutter, `launchkit-deploy` k3s), démo https://saas.koyad.com (`gh repo list`).
- **Radar** : « A Rust worker scores missions with a local AI model, behind an ASP.NET Core API, a live web app and an Android app » (`~/projets/freelance/propositions/2026-11-05-contra-replit-missions.md`) ; adresse de sa page Contra à relever en Phase 2.
- **Point à trancher en G3** : la phrase « 0 issues on the automated report » n'est vérifiée que pour 12 solutions ; les rapports du Newsletter et de l'E-commerce portent sur d'anciennes versions (les régénérer coûte un crédit IA).
