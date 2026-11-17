import { test, expect } from '@playwright/test'
import { open, region, heading, pageBox, cardBox, unionBox, near } from './helpers.js'
import { LANGS, SOLUTION_TITLES } from './data.js'

// Spec v2 §4 et §7 — S3 à S5 (ADR-0007) ; les positions de la maquette v1 (S1, S2) sont retirées (ADR-0010)

const columns = async (locators) => new Set(await Promise.all(locators.map(async (l) => (await cardBox(l)).x))).size

for (const L of LANGS) {
  const groups = (page) => ({
    services: L.services.cards.map(([title]) => heading(page, 3, title)),
    steps: L.method.steps.map(([, title]) => heading(page, 3, title)),
    products: L.work.products.map((p) => heading(page, 4, p.name)),
    rnd: L.work.rnd.cards.map(([title]) => heading(page, 4, title)),
    solutions: SOLUTION_TITLES.map((title) => heading(page, 4, title)),
  })

  test(`S3 — paliers : 2 colonnes de 768 à 1023 px, une en dessous, 4 / 4 / 3 dès 1024 px (${L.code})`, async ({ page }) => {
    await open(page, 768, 1024, L.path)
    for (const [name, group] of Object.entries(groups(page))) expect.soft(await columns(group), `${name} à 768`).toBe(2)
    const title = await pageBox(heading(page, 2, L.about.name))
    const body = await unionBox(region(page, L.about.name).locator('p'))
    expect(title.y + title.height, 'About : titre au-dessus du texte').toBeLessThanOrEqual(body.y)

    await open(page, 767, 1024, L.path)
    for (const [name, group] of Object.entries(groups(page))) expect.soft(await columns(group), `${name} à 767`).toBe(1)

    await open(page, 1024, 900, L.path)
    const g = groups(page)
    expect.soft(await columns(g.services), 'services à 1024').toBe(4)
    expect.soft(await columns(g.steps), 'étapes à 1024').toBe(4)
    expect.soft(await columns(g.solutions), 'solutions à 1024').toBe(3)
    expect.soft(await columns(g.products), 'produits à 1024').toBe(2)
    expect.soft(await columns(g.rnd), 'R&D à 1024').toBe(2)
  })

  test(`S4 — pas de défilement horizontal de 320 à 1920 px ; contenu de 1120 px centré à 1920 (${L.code})`, async ({ page }) => {
    for (const width of [320, 375, 767, 768, 1023, 1024, 1440, 1920]) {
      await open(page, width, 900, L.path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
      expect.soft(overflow, `${width} px`).toBeLessThanOrEqual(0)
      // le tableau CodinGame tient dans sa carte, sans défilement interne
      const table = await page.getByRole('table').evaluate((t) => t.parentElement.scrollWidth - t.parentElement.clientWidth)
      expect.soft(table, `tableau à ${width} px`).toBeLessThanOrEqual(0)
    }
    near(await pageBox(heading(page, 2, L.method.name)), { x: 400 }, 'titre Method à 1920')
    near(await cardBox(page.getByRole('table')), { x: 400, width: 1120 }, 'carte du tableau à 1920')
  })

  test(`S5 — les cartes d'une même ligne ont la même hauteur (1440 et 375 px) (${L.code})`, async ({ page }) => {
    for (const width of [1440, 375]) {
      await open(page, width, 900, L.path)
      for (const [name, group] of Object.entries(groups(page))) {
        const boxes = await Promise.all(group.map((l) => cardBox(l)))
        const rows = new Map()
        for (const b of boxes) rows.set(b.y, [...(rows.get(b.y) ?? []), b.height])
        for (const heights of rows.values()) expect.soft(Math.max(...heights) - Math.min(...heights), `${name} à ${width} px : ${heights}`).toBeLessThanOrEqual(1)
      }
    }
  })
}
