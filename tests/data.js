// Contenu attendu des deux pages : specs/reference/contenu-v2.md (textes et adresses exacts, ADR-0009)

export const EMAIL = 'mailto:koya.esdras@gmail.com'
export const REPO = 'https://github.com/ounokoya/ounokoya.github.io'
const CODINGAME = 'https://www.codingame.com/profile/6eb42e4339ad9f5038bbbf71d326d27c0031484'
const FM_PROFILE = 'https://www.frontendmentor.io/profile/ounokoya'

const platforms = (codingame) => [
  ['Upwork', 'https://www.upwork.com/freelancers/~015a3a87ce1365b8c5'],
  ['Contra', 'https://contra.com/koya_esdras_sezqkhrm'],
  ['Freelancer', 'https://www.freelancer.com/u/ounokoya'],
  ['LinkedIn', 'https://www.linkedin.com/in/koya-esdras-4b554b142'],
  ['GitHub', 'https://github.com/ounokoya'],
  [codingame, CODINGAME],
]

const fm = (slug) => `https://www.frontendmentor.io/solutions/${slug}`
const SOLUTIONS = [
  { title: 'REST Countries API', repo: 'rest-countries-api', fm: fm('rest-countries-api-with-tailwind-v4-hash-routing-and-apg-combobox-vn9b1fV3r1') },
  { title: 'Multi-step form', repo: 'multi-step-form', fm: fm('multi-step-form-with-tailwind-v4-native-validation-and-formdata-UGQKLcYaCP') },
  { title: 'E-commerce product page', repo: 'ecommerce-product-page', fm: fm('e-commerce-product-page-with-tailwind-v4-native-dialog-and-playwright-Ll7Dgb9LKU') },
]
export const SOLUTION_TITLES = SOLUTIONS.map((s) => s.title)
export const SECTIONS = ['#services', '#work', '#codingame', '#method', '#about', '#contact']

const EN = {
  code: 'en',
  path: './',
  title: 'Koya Esdras · AI & full-stack engineer, freelance',
  description: 'Koya Esdras, freelance AI & full-stack engineer (Rust, Python, .NET): AI agents, SaaS and MVPs at a fixed price, built from a written spec. Top 0.6% on CodinGame.',
  other: { name: 'Français', href: '/fr/', lang: 'fr' },
  nav: ['Services', 'Work', 'CodinGame', 'Method', 'About', 'Contact'],
  hero: {
    place: "Abidjan, Côte d'Ivoire · Remote",
    title: 'AI & full-stack engineer Rust · Python · .NET',
    subtitle: 'AI agents, SaaS & MVPs, fixed price',
    bio: 'Self-taught engineer with 9 years at JooL International (agritech, Abidjan), from Python expert to Technical Director and Director of R&D. I build AI systems and SaaS products end to end, directing AI coding agents with my own spec-driven method: a written spec you approve, tests before the code, measured delivery.',
    figures: [['worldwide on CodinGame', 'Top 0.6%'], ['shipping to production', '9 years'], ['people led', '16']],
    availability: 'Available for freelance missions',
    email: 'Email me',
    photo: 'Portrait of Koya Esdras',
  },
  platforms: platforms('CodinGame profile'),
  services: {
    name: 'Services',
    kicker: 'What I build',
    intro: 'Fixed-price missions, from a written spec to a product in production.',
    cards: [
      ['AI agents & LLMs', 'Assistants and agents that call tools, retrieval-augmented generation (RAG), local models with Ollama or llama.cpp, and evaluations that measure quality.'],
      ['SaaS & MVPs', 'Web and mobile products with accounts, roles and an admin back office, from the spec to the live version.'],
      ['Back end & infrastructure', 'APIs in .NET, Rust or Python, ArangoDB and MongoDB databases, deployment on Kubernetes (k3s) or Nomad.'],
      ['Algorithms & performance', 'Simulation, search and optimization in Rust, the skills behind my CodinGame rankings, for the parts of a product that must be fast.'],
    ],
  },
  work: {
    name: 'Work',
    parts: ['Products', 'R&D at JooL International', 'Front-end craft'],
    products: [
      {
        name: 'LaunchKit',
        text: 'A SaaS starter kit: accounts, organizations, roles, invitations and an admin back office, on web and mobile.',
        tags: ['SvelteKit 2', 'ASP.NET Core 10', 'ArangoDB', 'Rust', 'Flutter'],
        links: [['Live demo', 'https://saas.koyad.com'], ['Web code', 'https://github.com/ounokoya/launchkit-web'], ['API code', 'https://github.com/ounokoya/launchkit-server'], ['Mobile code', 'https://github.com/ounokoya/launchkit-mobile']],
      },
      {
        name: 'Radar',
        text: 'My own job radar. A Rust worker scores missions with a local AI model, behind an ASP.NET Core API, a live web app and an Android app.',
        tags: ['Rust', 'Local AI', 'ASP.NET Core', 'Android'],
        links: [['Radar on Contra', 'https://contra.com/p/rkPlYBNU-radar-ai-job-radar-rust-local-embeddings-on-cpu']],
      },
    ],
    rnd: {
      sentence: 'Systems I built as Director of R&D; the code belongs to JooL.',
      cards: [
        ['Terrain analysis engine', 'Drone-based terrain models (DTM/DSM): 43% lower elevation error than the open-source reference, validated on 800 NASA satellite points; in production.'],
        ['On-premise AI assistant', 'An agronomy assistant (RAG and vision) built on Ivorian agricultural documentation, running fully on-premise.'],
      ],
    },
    front: {
      sentence: '14 Frontend Mentor solutions, each built from a written spec and tested in a real browser.',
      profile: ['My Frontend Mentor profile', FM_PROFILE],
      levels: ['Advanced', 'Advanced', 'Intermediate'],
      lines: ['Hash routing, a native radio filter and a dark theme.', 'Native validation, FormData and a plan summary.', 'A native dialog lightbox, a cart and a mobile menu.'],
      links: (t) => [`Live site for ${t}`, `Code for ${t}`, `Frontend Mentor for ${t}`],
    },
  },
  codingame: {
    name: 'Competitive programming',
    kicker: 'CodinGame',
    sentence: 'Ranked #2,015 worldwide, top 0.6%, with the Master title (November 2026).',
    caption: 'My best leagues in bot programming',
    columns: ['Game', 'League', 'Rank'],
    rows: [
      ['Summer Challenge 2024 — Olymbits', 'Legend', '#10 of 6,428'],
      ['Mad Pod Racing', 'Legend', '#259 of 236,744'],
      ['Code Royale', 'Gold', '#165 of 6,335'],
      ['Fall Challenge 2026 (contest)', 'Gold', '#224 of 1,047'],
    ],
    text: 'My bots are written in Rust: game simulators checked against real matches, Smitsimax search, genetic algorithms and neural networks. I build them with the same method as client work: specs, tests, and proof in the arena before each submission.',
    profile: 'My CodinGame profile',
  },
  method: {
    name: 'Method',
    kicker: 'Spec-Driven Lifecycle',
    intro: 'Every project follows my own method, refined since 2023 to direct AI coding agents with rigor and traceability.',
    steps: [
      ['01', 'Written spec', 'Your need becomes a written spec: scope, acceptance criteria and a fixed price you approve before any code.'],
      ['02', 'Traceable decisions', 'Each architecture choice is written down with its reasons, so you always know why the product is built this way.'],
      ['03', 'Agents under control', 'AI coding agents write the code, guided by the spec and checked by tests written before it.'],
      ['04', 'Measured delivery', 'Each release ships with passing tests, a usage guide and a changelog.'],
    ],
  },
  about: {
    name: 'About',
    paragraphs: [
      "I'm a self-taught engineer based in Abidjan, Côte d'Ivoire, working remotely. I joined JooL International in 2017 as a Python expert to optimize the image processing of JooL Monitor, then became Technical Director, leading 14 developers and 2 electronics engineers, and later Director of R&D.",
      'There I built applied AI systems for agriculture: an on-premise agronomy assistant, a drone terrain-analysis engine in production, weather services and distributed infrastructure. I trained several cohorts of developers and ran an AI masterclass as a vibe-coding workshop at INP-HB Yamoussoukro.',
      'Today I offer freelance missions at a fixed price: AI agents, SaaS products and MVPs, built with AI coding agents under a written spec. I work in French and in written English.',
    ],
  },
  contact: {
    sentence: 'Write to me about your project, or reach me on the platform you prefer.',
    email: 'koya.esdras@gmail.com',
    copyright: '© 2026 Koya Esdras ·',
    source: 'Source code on GitHub',
  },
}

const FR = {
  code: 'fr',
  path: './fr/',
  title: 'Koya Esdras · Ingénieur IA et full-stack, freelance',
  description: "Koya Esdras, ingénieur IA et full-stack freelance (Rust, Python, .NET) : agents IA, SaaS et MVP au forfait, construits à partir d'une spec écrite. Top 0,6 % sur CodinGame.",
  other: { name: 'English', href: '/', lang: 'en' },
  nav: ['Services', 'Réalisations', 'CodinGame', 'Méthode', 'À propos', 'Contact'],
  hero: {
    place: "Abidjan, Côte d'Ivoire · À distance",
    title: 'Ingénieur IA et full-stack Rust · Python · .NET',
    subtitle: 'Agents IA, SaaS et MVP, au forfait',
    bio: "Ingénieur autodidacte, 9 ans chez JooL International (agritech, Abidjan), d'expert Python à Directeur technique puis Directeur R&D. Je construis des systèmes d'IA et des produits SaaS de bout en bout, en dirigeant des agents IA de code avec ma propre méthode pilotée par les spécifications : une spec écrite que vous validez, des tests avant le code, une livraison mesurée.",
    figures: [['mondial sur CodinGame', 'Top 0,6 %'], ['de mises en production', '9 ans'], ['personnes dirigées', '16']],
    availability: 'Disponible pour des missions freelance',
    email: "M'écrire",
    photo: 'Portrait de Koya Esdras',
  },
  platforms: platforms('Profil CodinGame'),
  services: {
    name: 'Services',
    kicker: 'Ce que je construis',
    intro: "Des missions au forfait, d'une spec écrite à un produit en production.",
    cards: [
      ['Agents IA et LLM', 'Assistants et agents qui appellent des outils, recherche augmentée (RAG), modèles en local avec Ollama ou llama.cpp, et évaluations qui mesurent la qualité.'],
      ['SaaS et MVP', 'Produits web et mobiles avec comptes, rôles et back-office, de la spec à la mise en ligne.'],
      ['Back-end et infrastructure', 'API en .NET, Rust ou Python, bases ArangoDB et MongoDB, déploiement sur Kubernetes (k3s) ou Nomad.'],
      ['Algorithmes et performance', "Simulation, recherche et optimisation en Rust, les compétences derrière mes classements CodinGame, pour les parties d'un produit qui doivent être rapides."],
    ],
  },
  work: {
    name: 'Réalisations',
    parts: ['Produits', 'R&D chez JooL International', 'Front-end'],
    products: [
      {
        name: 'LaunchKit',
        text: "Un kit de démarrage SaaS : comptes, organisations, rôles, invitations et back-office d'administration, sur le web et le mobile.",
        tags: ['SvelteKit 2', 'ASP.NET Core 10', 'ArangoDB', 'Rust', 'Flutter'],
        links: [['Démo en ligne', 'https://saas.koyad.com'], ['Code web', 'https://github.com/ounokoya/launchkit-web'], ["Code de l'API", 'https://github.com/ounokoya/launchkit-server'], ['Code mobile', 'https://github.com/ounokoya/launchkit-mobile']],
      },
      {
        name: 'Radar',
        text: "Mon propre radar de missions. Un worker Rust note les missions avec un modèle d'IA local, derrière une API ASP.NET Core, une application web en ligne et une application Android.",
        tags: ['Rust', 'IA locale', 'ASP.NET Core', 'Android'],
        links: [['Radar sur Contra', 'https://contra.com/p/rkPlYBNU-radar-ai-job-radar-rust-local-embeddings-on-cpu']],
      },
    ],
    rnd: {
      sentence: "Systèmes que j'ai construits comme Directeur R&D ; le code appartient à JooL.",
      cards: [
        ["Moteur d'analyse de relief", "Modèles de terrain par drone (MNT/MNS) : erreur d'altitude réduite de 43 % face à la référence open source, validée sur 800 points satellite de la NASA ; en production."],
        ['Assistant IA 100 % local', 'Un assistant agronomique (RAG et vision) fondé sur la documentation agricole ivoirienne, qui fonctionne entièrement en local.'],
      ],
    },
    front: {
      sentence: "14 solutions Frontend Mentor, chacune construite à partir d'une spec écrite et testée dans un vrai navigateur.",
      profile: ['Mon profil Frontend Mentor', FM_PROFILE],
      levels: ['Avancé', 'Avancé', 'Intermédiaire'],
      lines: ['Routage par ancre, un filtre en boutons radio natifs et un thème sombre.', "Validation native, FormData et un récapitulatif de l'offre.", 'Une visionneuse en dialog natif, un panier et un menu mobile.'],
      links: (t) => [`Site en ligne de ${t}`, `Code de ${t}`, `Frontend Mentor de ${t}`],
    },
  },
  codingame: {
    name: 'Programmation compétitive',
    kicker: 'CodinGame',
    sentence: '2 015e mondial, top 0,6 %, titre Maître (novembre 2026).',
    caption: 'Mes meilleures ligues en programmation de bots',
    columns: ['Jeu', 'Ligue', 'Rang'],
    rows: [
      ['Summer Challenge 2024 — Olymbits', 'Légende', '10e sur 6 428'],
      ['Mad Pod Racing', 'Légende', '259e sur 236 744'],
      ['Code Royale', 'Or', '165e sur 6 335'],
      ['Fall Challenge 2026 (concours)', 'Or', '224e sur 1 047'],
    ],
    text: 'Mes bots sont écrits en Rust : simulateurs du jeu vérifiés sur de vraies parties, recherche Smitsimax, algorithmes génétiques et réseaux de neurones. Je les construis avec la même méthode que mes missions : specs, tests, et preuve en arène avant chaque soumission.',
    profile: 'Mon profil CodinGame',
  },
  method: {
    name: 'Méthode',
    kicker: 'Spec-Driven Lifecycle',
    intro: 'Chaque projet suit ma propre méthode, affinée depuis 2023 pour diriger des agents IA de code avec rigueur et traçabilité.',
    steps: [
      ['01', 'Spec écrite', "Votre besoin devient une spec écrite : périmètre, critères d'acceptation et prix forfaitaire, validés par vous avant tout code."],
      ['02', 'Décisions tracées', "Chaque choix d'architecture est écrit avec ses raisons : vous savez toujours pourquoi le produit est construit ainsi."],
      ['03', 'Agents sous contrôle', 'Des agents IA écrivent le code, guidés par la spec et vérifiés par des tests écrits avant lui.'],
      ['04', 'Livraison mesurée', "Chaque version est livrée avec ses tests au vert, un guide d'utilisation et un historique des changements."],
    ],
  },
  about: {
    name: 'À propos',
    paragraphs: [
      "Je suis un ingénieur autodidacte basé à Abidjan, en Côte d'Ivoire, et je travaille à distance. Je suis entré chez JooL International en 2017 comme expert Python pour optimiser le traitement d'images de JooL Monitor, puis je suis devenu Directeur technique, à la tête de 14 développeurs et 2 électroniciens, et enfin Directeur R&D.",
      "J'y ai construit des systèmes d'IA appliqués à l'agriculture : un assistant agronomique 100 % local, un moteur d'analyse de relief par drone en production, des services météo et une infrastructure distribuée. J'ai formé plusieurs promotions de développeurs et animé une masterclass IA en atelier de vibe coding à l'INP-HB de Yamoussoukro.",
      "Aujourd'hui, je propose des missions freelance au forfait : agents IA, produits SaaS et MVP, construits avec des agents IA de code encadrés par une spec écrite. Je travaille en français et en anglais écrit.",
    ],
  },
  contact: {
    sentence: 'Écrivez-moi pour parler de votre projet, ou contactez-moi sur la plateforme de votre choix.',
    email: 'koya.esdras@gmail.com',
    copyright: '© 2026 Koya Esdras ·',
    source: 'Code source sur GitHub',
  },
}

export const LANGS = [EN, FR]

// Tous les liens d'une page, dans l'ordre de lecture (A5) : [nom accessible, adresse]
export const allLinks = (L) => [
  ['Koya Esdras', '#top'],
  ...L.nav.map((name, i) => [name, SECTIONS[i]]),
  [L.other.name, L.other.href],
  [L.hero.email, EMAIL],
  ...L.platforms,
  ...L.work.products.flatMap((p) => p.links),
  L.work.front.profile,
  ...SOLUTIONS.flatMap((s) => L.work.front.links(s.title).map((name, i) => [name, [`https://ounokoya.github.io/${s.repo}/`, `https://github.com/ounokoya/${s.repo}`, s.fm][i]])),
  [L.codingame.profile, CODINGAME],
  [L.contact.email, EMAIL],
  ...L.platforms,
  ['Frontend Mentor', FM_PROFILE],
  [L.contact.source, REPO],
]

// Liens des zones Navy (focus Orange 400) : nom, navigation, langue, accueil, pied de page
export const onNavy = (L) => new Set(['Koya Esdras', ...L.nav, L.other.name, L.hero.email, ...L.platforms.map(([n]) => n), L.contact.email, 'Frontend Mentor', L.contact.source])

export const COLORS = {
  navy: '#14213d', paper: '#faf7f2', sand: '#f1ebe0', white: '#ffffff', mist: '#d0d3d8', slate: '#4b5563',
  green: '#0b6e4f', green9: '#084c37', orange: '#c2410c', orange4: '#fb923c', mint: '#34d399', line: '#e7e1d6',
}
