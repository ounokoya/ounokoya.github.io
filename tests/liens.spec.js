import { test, expect } from '@playwright/test'
import { open, link } from './helpers.js'
import { LANGS, allLinks, EMAIL, REPO, SOLUTION_TITLES } from './data.js'

// Spec v2 §2.2 et §7 — S9, S10 ; ADR-0011 (contact par e-mail)

const links = (page) => page.locator('a[href]').evaluateAll((els) => els.map((a) => [a.textContent.replace(/\s+/g, ' ').trim(), a.getAttribute('href')]))

for (const L of LANGS) {
  test(`S9 — chaque lien a son nom et son adresse exacts, dans l'ordre ; 2 liens mailto:, aucun tel: (${L.code})`, async ({ page }) => {
    await open(page, 1440, 900, L.path)
    expect(await links(page)).toEqual(allLinks(L))
    // le nom accessible est bien celui du texte (pas d'aria-label qui le remplacerait)
    for (const name of [L.work.front.links(SOLUTION_TITLES[0])[0], L.work.products[1].links[0][0], L.codingame.profile]) await expect(link(page, name)).toHaveCount(1)
    expect(await page.locator('a[href^="mailto:"]').evaluateAll((els) => els.map((a) => a.getAttribute('href')))).toEqual([EMAIL, EMAIL])
    expect(await page.locator('a[href^="tel:"]').count()).toBe(0)
  })
}

test('S10 — les liens vers ounokoya.github.io, github.com et codingame.com répondent', async ({ page, request }) => {
  test.setTimeout(180_000)
  await open(page, 1440)
  // le dépôt du portfolio n'existe qu'après la publication : vérifié sur le site en ligne (BASE_URL)
  const own = [...new Set((await links(page)).map(([, href]) => href).filter((href) => /^https:\/\/(ounokoya\.github\.io|github\.com|www\.codingame\.com)\//.test(href)))]
    .filter((href) => process.env.BASE_URL || href !== REPO)
  expect(own.length).toBeGreaterThan(10)
  const broken = []
  for (const url of own) {
    const status = (await request.get(url, { failOnStatusCode: false, maxRedirects: 5 })).status()
    if (status >= 400) broken.push(`${status} ${url}`)
  }
  expect(broken).toEqual([])
})
