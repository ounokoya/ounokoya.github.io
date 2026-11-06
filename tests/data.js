// Contenu attendu : specs/reference/contenu.md et spec §2.2 (textes et adresses exacts)

export const PROFILES = [
  ['Upwork', 'https://www.upwork.com/freelancers/~015a3a87ce1365b8c5'],
  ['Contra', 'https://contra.com/koya_esdras_sezqkhrm'],
  ['Freelancer', 'https://www.freelancer.com/u/ounokoya'],
  ['LinkedIn', 'https://www.linkedin.com/in/koya-esdras-4b554b142'],
  ['GitHub', 'https://github.com/ounokoya'],
]
export const FM_PROFILE = 'https://www.frontendmentor.io/profile/ounokoya'
export const REPO = 'https://github.com/ounokoya/ounokoya.github.io'

export const NAV = [['Method', '#method'], ['Work', '#work'], ['About', '#about'], ['Contact', '#contact']]

export const HERO = {
  place: "Abidjan, Côte d'Ivoire · Remote",
  title: 'Front-end developer .NET & Rust',
  subtitle: 'MVP & SaaS, fixed price',
  bio: 'Director of R&D at JooL International (Abidjan) and full-stack developer (.NET, Rust, Svelte). On Frontend Mentor I sharpen my front-end craft: semantic HTML, WCAG AA, Tailwind CSS and Playwright tests written from a spec before the code. Open to freelance MVP and SaaS work.',
  availability: 'Available for freelance missions',
  photo: 'Portrait of Koya Esdras',
}

export const METHOD = {
  kicker: 'Spec-Driven Lifecycle',
  intro: 'Every project follows my own method. Each Frontend Mentor repository shows it: specs, decisions and tests sit next to the code.',
  steps: [
    ['01', 'Written spec', 'The design becomes a written spec: content, states, accessibility contracts and acceptance criteria.'],
    ['02', 'Mockup', 'I rebuild the design in Penpot at 375 and 1440 px; the code takes its measurements from there.'],
    ['03', 'Tests before the code', 'Playwright, axe-core and the W3C validator check the spec. They fail first, for the right reason.'],
    ['04', 'Real-browser check', 'Once the tests pass, I walk through the page in a real browser: widths, keyboard, first load.'],
  ],
}

export const PRODUCTS = [
  {
    name: 'LaunchKit',
    text: 'A SaaS starter kit: accounts, organizations, roles, invitations and an admin back office, on web and mobile.',
    tags: ['SvelteKit 2', 'ASP.NET Core 10', 'ArangoDB', 'Rust', 'Flutter'],
    links: [
      ['Live demo', 'https://saas.koyad.com'],
      ['Web code', 'https://github.com/ounokoya/launchkit-web'],
      ['API code', 'https://github.com/ounokoya/launchkit-server'],
      ['Mobile code', 'https://github.com/ounokoya/launchkit-mobile'],
    ],
  },
  {
    name: 'Radar',
    text: 'My own job radar. A Rust worker scores missions with a local AI model, behind an ASP.NET Core API, a live web app and an Android app.',
    tags: ['Rust', 'Local AI', 'ASP.NET Core', 'Android'],
    links: [['Radar on Contra', 'https://contra.com/p/rkPlYBNU-radar-ai-job-radar-rust-local-embeddings-on-cpu']],
  },
]

export const FM_SENTENCE = '14 solutions, each built from a written spec and tested in a real browser.'

const fm = (slug) => `https://www.frontendmentor.io/solutions/${slug}`
const site = (repo) => `https://ounokoya.github.io/${repo}/`
const code = (repo) => `https://github.com/ounokoya/${repo}`

export const FEATURED = [
  { title: 'REST Countries API', level: 'Advanced', line: 'Hash routing, an accessible combobox and a dark theme.', repo: 'rest-countries-api', fm: fm('rest-countries-api-with-tailwind-v4-hash-routing-and-apg-combobox-vn9b1fV3r1') },
  { title: 'Multi-step form', level: 'Advanced', line: 'Native validation, FormData and a plan summary.', repo: 'multi-step-form', fm: fm('multi-step-form-with-tailwind-v4-native-validation-and-formdata-UGQKLcYaCP') },
  { title: 'E-commerce product page', level: 'Intermediate', line: 'A native dialog lightbox, a cart and a mobile menu.', repo: 'ecommerce-product-page', fm: fm('e-commerce-product-page-with-tailwind-v4-native-dialog-and-playwright-Ll7Dgb9LKU') },
  { title: 'Newsletter sign-up form', level: 'Junior', line: 'Native validation and a success state.', repo: 'newsletter-signup-form', fm: fm('newsletter-form-with-tailwind-v4-native-validation-and-playwright-zqE-xVEsyZ') },
  { title: 'Recipe page', level: 'Newbie', line: 'Native lists and a nutrition data table.', repo: 'recipe-page', fm: fm('recipe-page-with-native-lists-a-data-table-tailwind-v4-and-playwright-NFulTTqYoZ') },
  { title: 'Product preview card', level: 'Newbie', line: 'A responsive picture and prices read aloud.', repo: 'front-ui-cart', fm: fm('product-preview-card-component-93Wlm6snAB') },
]

export const MORE = [
  { title: 'Results summary component', repo: 'results-summary-component', fm: fm('results-summary-with-tailwind-v4-wcag-aa-colours-and-playwright-tests-1ASfJTaZbq') },
  { title: 'Social proof section', repo: 'social-proof-section', fm: fm('social-proof-section-tailwind-v4-staggered-layout-and-semantic-quotes-WV--E9iokR') },
  { title: 'QR code component', repo: 'front-ui-qrcode', fm: fm('qr-code-component-EZNAAGXXm_') },
  { title: 'Order summary component', repo: 'front-ui-order', fm: fm('order-summary-component-cN1_pZjfrM') },
  { title: 'NFT preview card component', repo: 'front-ui-nft', fm: fm('nft-preview-card-component-jwtHXCl0-D') },
  { title: 'Profile card component', repo: 'front-profile-card', fm: fm('profile-card-component-7M77igoS7f') },
  { title: '3-column preview card component', repo: 'front-3-column-preview-card', fm: fm('3column-preview-card-component-yqth3VC8P6') },
  { title: 'Stats preview card component', repo: 'stats-preview-card', fm: fm('stats-preview-card-component-EdVUT3IUiV') },
]

export const solutionLinks = (s) => [
  [`Live site for ${s.title}`, site(s.repo)],
  [`Code for ${s.title}`, code(s.repo)],
  [`Frontend Mentor for ${s.title}`, s.fm],
]

export const ABOUT = [
  "I'm a senior developer based in Abidjan, Côte d'Ivoire, working remotely. I joined JooL International in 2017 as a Python expert, became Technical Director, and I am now Director of R&D.",
  "On the front end, I build accessible, responsive pages: semantic HTML, WCAG AA contrast and keyboard support, Tailwind CSS and vanilla JavaScript. Every project follows my Spec-Driven Lifecycle: I analyse the design, rebuild it as a mockup, write a spec and its tests (Playwright, axe-core, the W3C validator) before the code, then check the result in a real browser. My recent Frontend Mentor solutions pass the platform's automated checks with zero issues, and my screenshots match the designs within 5 % of pixels.",
  'For clients, I build MVPs and SaaS products at a fixed price, from a written spec: .NET and Rust on the back end, Svelte or Blazor on the web. Available for freelance missions.',
]

export const CONTACT = {
  sentence: "Let's talk about your project on the platform you prefer.",
  copyright: '© 2026 Koya Esdras ·',
}

// Tous les liens de la page, dans l'ordre de lecture (spec A5) : [nom accessible, adresse]
export const ALL_LINKS = [
  ['Koya Esdras', '#top'],
  ...NAV,
  ...PROFILES,
  ...PRODUCTS.flatMap((p) => p.links),
  ['My Frontend Mentor profile', FM_PROFILE],
  ...FEATURED.flatMap(solutionLinks),
  ...MORE.flatMap(solutionLinks),
  ...PROFILES,
  ['Frontend Mentor', FM_PROFILE],
  ['Source code on GitHub', REPO],
]

// Liens dans les zones Navy (focus Orange 400) : nom, navigation, profils, pied de page
export const ON_NAVY = new Set(['Koya Esdras', ...NAV.map(([n]) => n), ...PROFILES.map(([n]) => n), 'Frontend Mentor', 'Source code on GitHub'])

export const COLORS = {
  navy: '#14213d', paper: '#faf7f2', sand: '#f1ebe0', white: '#ffffff', mist: '#d0d3d8', slate: '#4b5563',
  green: '#0b6e4f', green9: '#084c37', orange: '#c2410c', orange4: '#fb923c', mint: '#34d399', line: '#e7e1d6',
}
