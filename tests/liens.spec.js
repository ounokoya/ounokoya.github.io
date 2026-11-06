import { test, expect } from '@playwright/test'
import { open, link } from './helpers.js'
import { ALL_LINKS, REPO } from './data.js'

// Spec §2.2 et §7 — S9, S10

const links = (page) => page.locator('a[href]').evaluateAll((els) => els.map((a) => [a.textContent.replace(/\s+/g, ' ').trim(), a.getAttribute('href')]))

test('S9 — chaque lien a son nom et son adresse exacts, dans l\'ordre de lecture ; ni mailto: ni tel: (P3)', async ({ page }) => {
  await open(page, 1440)
  expect(await links(page)).toEqual(ALL_LINKS)
  // le nom accessible est bien celui du texte (pas d'aria-label qui le remplacerait)
  for (const name of ['Live site: REST Countries API', 'Frontend Mentor: Stats preview card component', 'Radar on Contra']) await expect(link(page, name)).toHaveCount(1)
  expect(await page.locator('a[href^="mailto:"], a[href^="tel:"]').count()).toBe(0)
})

test('S10 — les liens vers ounokoya.github.io et github.com répondent', async ({ page, request }) => {
  test.setTimeout(120_000)
  await open(page, 1440)
  // le dépôt du portfolio n'existe qu'après la publication (Phase 8) : vérifié sur le site en ligne (BASE_URL)
  const own = [...new Set((await links(page)).map(([, href]) => href).filter((href) => /^https:\/\/(ounokoya\.github\.io|github\.com)\//.test(href)))]
    .filter((href) => process.env.BASE_URL || href !== REPO)
  expect(own.length).toBeGreaterThan(30)
  const broken = []
  for (const url of own) {
    const status = (await request.get(url, { failOnStatusCode: false, maxRedirects: 5 })).status()
    if (status >= 400) broken.push(`${status} ${url}`)
  }
  expect(broken).toEqual([])
})
