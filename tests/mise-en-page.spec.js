import { test, expect } from '@playwright/test'
import { open, banner, nav, footer, region, heading, link, photo, text, pageBox, cardBox, unionBox, near } from './helpers.js'
import { HERO, PROFILES, METHOD, PRODUCTS, FEATURED } from './data.js'

// Spec §4 et §7 — S1 à S5 : positions de la maquette validée (G3), à 1 px près dans le premier écran, à 2 px plus bas

const LAYOUT = {
  desktop: {
    w: 1440, h: 900,
    name: { x: 160, y: 24, width: 118, height: 28 }, nav: { x: 977, y: 26, width: 303, height: 24 },
    photo: { x: 160, y: 254, width: 240, height: 240 }, h1: { x: 464, y: 176, width: 816, height: 120 }, bio: { x: 464, y: 360, width: 720, height: 120 },
    pills: [[464, 560, 104], [584, 560, 96], [696, 560, 126], [838, 560, 109], [963, 560, 97]],
    sections: { Method: [704, 648], Work: [1352, 2198], About: [3550, 622], footer: [4172, 443] },
    steps: [160, 448, 736, 1024].map((x) => ({ x, y: 1000, width: 256, height: 256 })),
    products: [160, 736].map((x) => ({ x, y: 1620, width: 544, height: 272 })),
    solutions: [2050, 2506].flatMap((y) => [160, 544, 928].map((x) => ({ x, y, width: 352, height: 424 }))),
    more: { x: 160, y: 2954, width: 1120, height: 500 }, about: { x: 576, y: 3646, width: 704, height: 430 },
  },
  mobile: {
    w: 375, h: 812,
    name: { x: 24, y: 20, width: 118, height: 28 }, nav: { x: 24, y: 60, width: 279, height: 24 },
    photo: { x: 24, y: 144, width: 160, height: 160 }, h1: { x: 24, y: 372, width: 327, height: 76 }, bio: { x: 24, y: 508, width: 327, height: 208 },
    pills: [[24, 796, 104], [140, 796, 96], [24, 856, 126], [162, 856, 109], [24, 916, 97]],
    sections: { Method: [1028, 1204], Work: [2232, 4446], About: [6678, 856], footer: [7534, 537] },
    steps: [1312, 1530, 1748, 1966].map((y) => ({ x: 24, y, width: 327 })),
    products: [2440, 2804].map((y) => ({ x: 24, y, width: 327 })),
    solutions: [0, 1, 2, 3, 4, 5].map((n) => ({ x: 24, y: 3330 + 432 * n, width: 327, height: 408 })),
    more: { x: 24, y: 5922, width: 327, height: 692 }, about: { x: 24, y: 6806, width: 327, height: 664 },
  },
}

for (const [id, screen] of [['S1', 'desktop'], ['S2', 'mobile']]) {
  const L = LAYOUT[screen]
  test(`${id} — ${L.w} px : positions de la maquette`, async ({ page }) => {
    await open(page, L.w, L.h)
    near(await pageBox(link(banner(page), 'Koya Esdras')), L.name, 'nom')
    near(await pageBox(nav(page)), L.nav, 'navigation')
    near(await pageBox(photo(page)), L.photo, 'photo')
    near(await pageBox(heading(page, 1, HERO.title)), L.h1, 'h1')
    near(await pageBox(text(page, HERO.bio)), L.bio, 'bio courte')
    const main = page.getByRole('main')
    for (const [i, [name]] of PROFILES.entries()) {
      const [x, y, width] = L.pills[i]
      near(await pageBox(link(main, name)), { x, y, width, height: 48 }, `lien ${name}`)
    }

    near(await pageBox(banner(page)), { y: 0 }, 'en-tête')
    for (const [name, [y, height]] of Object.entries(L.sections)) {
      const area = name === 'footer' ? footer(page) : region(page, name)
      near(await pageBox(area), { y, height }, `section ${name}`, 2)
    }
    for (const [i, [, title]] of METHOD.steps.entries()) near(await cardBox(heading(page, 3, title)), L.steps[i], `étape ${title}`, 2)
    for (const [i, p] of PRODUCTS.entries()) near(await cardBox(heading(page, 4, p.name)), L.products[i], `produit ${p.name}`, 2)
    for (const [i, s] of FEATURED.entries()) near(await cardBox(heading(page, 4, s.title)), L.solutions[i], `solution ${s.title}`, 2)
    near(await cardBox(heading(page, 4, '8 more solutions')), L.more, 'liste des 8', 2)
    near(await unionBox(region(page, 'About').locator('p')), L.about, 'texte About', 2)
  })
}

const columns = async (page, locators) => new Set(await Promise.all(locators.map(async (l) => (await cardBox(l)).x))).size
const steps = (page) => METHOD.steps.map(([, title]) => heading(page, 3, title))
const solutions = (page) => FEATURED.map((s) => heading(page, 4, s.title))

test('S3 — paliers : 2 colonnes de 768 à 1023 px, une colonne en dessous, 4 et 3 colonnes dès 1024 px', async ({ page }) => {
  await open(page, 768, 1024)
  expect(await columns(page, steps(page)), 'étapes à 768').toBe(2)
  expect(await columns(page, PRODUCTS.map((p) => heading(page, 4, p.name))), 'produits à 768').toBe(2)
  expect(await columns(page, solutions(page)), 'solutions à 768').toBe(2)
  const title = await pageBox(heading(page, 2, 'About'))
  const body = await unionBox(region(page, 'About').locator('p'))
  expect(title.y + title.height, 'About : titre au-dessus du texte').toBeLessThanOrEqual(body.y)
  expect(title.x).toBe(body.x)

  await open(page, 767, 1024)
  expect(await columns(page, steps(page)), 'étapes à 767').toBe(1)
  expect(await columns(page, solutions(page)), 'solutions à 767').toBe(1)

  await open(page, 1024, 900)
  expect(await columns(page, steps(page)), 'étapes à 1024').toBe(4)
  expect(await columns(page, solutions(page)), 'solutions à 1024').toBe(3)
})

test('S4 — pas de défilement horizontal de 320 à 1920 px ; contenu de 1120 px centré à 1920', async ({ page }) => {
  for (const width of [320, 375, 767, 768, 1023, 1024, 1440, 1920]) {
    await open(page, width, 900)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
    expect.soft(overflow, `${width} px`).toBeLessThanOrEqual(0)
  }
  near(await pageBox(heading(page, 2, 'Method')), { x: 400 }, 'titre Method à 1920')
  near(await cardBox(heading(page, 4, '8 more solutions')), { x: 400, width: 1120 }, 'liste des 8 à 1920')
})

test('S5 — les cartes d\'une même ligne ont la même hauteur (1440 et 375 px)', async ({ page }) => {
  for (const width of [1440, 375]) {
    await open(page, width, 900)
    const groups = [steps(page), PRODUCTS.map((p) => heading(page, 4, p.name)), solutions(page)]
    for (const group of groups) {
      const boxes = await Promise.all(group.map((l) => cardBox(l)))
      const rows = new Map()
      for (const b of boxes) rows.set(b.y, [...(rows.get(b.y) ?? []), b.height])
      for (const heights of rows.values()) expect.soft(Math.max(...heights) - Math.min(...heights), `${width} px : hauteurs ${heights}`).toBeLessThanOrEqual(1)
    }
  }
})
