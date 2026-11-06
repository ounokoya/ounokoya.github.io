import { test, expect } from '@playwright/test'
import { open, banner, footer, region, heading, link, photo, text, pageBox, style, sameColor, pixel, hex } from './helpers.js'
import { HERO, METHOD, PRODUCTS, FEATURED, MORE, FM_SENTENCE, ABOUT, CONTACT, COLORS } from './data.js'

// Spec §2, §3, §6 et §7 — S6 à S8, S11 à S14

const item = (page, level, name) => page.getByRole('listitem').filter({ has: heading(page, level, name) })

test('S6 — titre, langue, description, favicon ; aucun script', async ({ page, request }) => {
  await open(page, 1440)
  await expect(page).toHaveTitle('Koya Esdras · Front-end developer, .NET & Rust')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  const description = await page.locator('meta[name="description"]').getAttribute('content')
  expect(description).toMatch(/front-end developer/i)
  expect(description).toMatch(/fixed price/i)
  const icon = await page.locator('link[rel="icon"]').getAttribute('href')
  expect((await request.get(new URL(icon, page.url()).href)).status()).toBe(200)
  const html = await (await request.get('./')).text()
  expect(html).not.toMatch(/<script/i)
})

test('S7 — les textes de contenu.md, dans l\'ordre', async ({ page }) => {
  await open(page, 1440)
  const main = page.getByRole('main')
  for (const value of [HERO.place, HERO.subtitle, HERO.bio, HERO.availability]) await expect(text(main, value)).toBeVisible()
  await expect(heading(page, 1, HERO.title)).toBeVisible()

  const method = region(page, 'Method')
  for (const value of [METHOD.kicker, METHOD.intro]) await expect(text(method, value)).toBeVisible()
  await expect(method.getByRole('heading', { level: 3 })).toHaveText(METHOD.steps.map(([, title]) => title))
  for (const [n, title, body] of METHOD.steps) {
    const step = item(page, 3, title)
    await expect(text(step, n)).toBeVisible()
    await expect(text(step, body)).toBeVisible()
  }

  const work = region(page, 'Work')
  await expect(work.getByRole('heading', { level: 3 })).toHaveText(['Products', 'Frontend Mentor solutions'])
  await expect(work.getByRole('heading', { level: 4 })).toHaveText([...PRODUCTS.map((p) => p.name), ...FEATURED.map((s) => s.title), '8 more solutions'])
  for (const p of PRODUCTS) {
    const card = item(page, 4, p.name)
    await expect(text(card, p.text)).toBeVisible()
    await expect(card.getByRole('list').first().locator(':scope > li')).toHaveText(p.tags)
  }
  await expect(text(work, FM_SENTENCE)).toBeVisible()
  for (const s of FEATURED) {
    const card = item(page, 4, s.title)
    await expect(text(card, s.level)).toBeVisible()
    await expect(text(card, s.line)).toBeVisible()
  }
  const more = page.getByRole('heading', { level: 4, name: '8 more solutions', exact: true }).locator('xpath=following::ul[1]')
  const rows = more.locator(':scope > li')
  await expect(rows).toHaveCount(MORE.length)
  for (const [i, s] of MORE.entries()) await expect(rows.nth(i)).toContainText(s.title)
  await expect(text(work, 'Newbie').last()).toBeVisible()

  await expect(region(page, 'About').locator('p')).toHaveText(ABOUT)

  const foot = footer(page)
  await expect(heading(foot, 2, 'Contact')).toBeVisible()
  for (const value of [CONTACT.sentence, CONTACT.copyright]) await expect(text(foot, value)).toBeVisible()
})

test('S8 — un seul h1, titres sans saut de niveau (A1)', async ({ page }) => {
  await open(page, 1440)
  const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) => els.map((el) => Number(el.localName[1])))
  expect(levels.filter((l) => l === 1)).toHaveLength(1)
  expect(levels[0]).toBe(1)
  const jumps = levels.slice(1).map((l, i) => [levels[i], l]).filter(([prev, l]) => l > prev + 1)
  expect(jumps).toEqual([])
  await expect(heading(page, 2, 'Method')).toBeVisible()
  await expect(heading(page, 2, 'Work')).toBeVisible()
  await expect(heading(page, 2, 'About')).toBeVisible()
})

test('S11 — photo nommée et chargée ; 6 captures 16:10 chargées et décoratives (A2)', async ({ page }) => {
  await open(page, 1440)
  await page.evaluate(() => Promise.all([...document.images].map((img) => { img.loading = 'eager'; return img.decode().catch(() => {}) })))
  expect(await photo(page).evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true)
  await expect(page.getByRole('main').getByRole('img')).toHaveCount(1)
  for (const s of FEATURED) {
    const img = item(page, 4, s.title).locator('img')
    await expect(img).toHaveCount(1)
    await expect(img).toHaveAttribute('alt', '')
    expect(await img.evaluate((el) => el.complete && el.naturalWidth > 0), s.title).toBe(true)
    const b = await pageBox(img)
    expect.soft(Math.abs(b.width / b.height - 1.6), `${s.title} : ${b.width} × ${b.height}`).toBeLessThan(0.01)
  }
})

const TYPE = [
  // [description, élément, famille, graisse, taille 1440, taille 375, interligne 1440, interligne 375]
  ['h1', (p) => heading(p, 1, HERO.title), 'Space Grotesk', '700', '56px', '32px', '60px', '38px'],
  ['h2', (p) => heading(p, 2, 'Method'), 'Space Grotesk', '700', '40px', '32px', '48px', '40px'],
  ['h3', (p) => heading(p, 3, 'Products'), 'Space Grotesk', '700', '28px', '24px', '36px', '32px'],
  ['h4', (p) => heading(p, 4, 'LaunchKit'), 'Space Grotesk', '700', '22px', '20px', '28px', '28px'],
  ['nom', (p) => link(banner(p), 'Koya Esdras'), 'Space Grotesk', '700', '20px', '20px', '28px', '28px'],
  ['sous-titre', (p) => text(p.getByRole('main'), HERO.subtitle), 'Space Grotesk', '500', '24px', '20px', '32px', '28px'],
  ['bio courte', (p) => text(p.getByRole('main'), HERO.bio), 'Inter', '400', '18px', '16px', '30px', '26px'],
  ['texte de carte', (p) => text(p.getByRole('main'), FEATURED[0].line), 'Inter', '400', '16px', '16px', '26px', '26px'],
  ['lien de carte', (p) => link(p.getByRole('main'), `Code for ${FEATURED[0].title}`), 'Inter', '500', '16px', '16px', '24px', '24px'],
]

test('S12 — polices et tailles de tokens.md (1440 et 375 px)', async ({ page }) => {
  for (const [width, i] of [[1440, 0], [375, 1]]) {
    await open(page, width)
    for (const [label, el, family, weight, ...sizes] of TYPE) {
      const l = el(page)
      expect.soft(await style(l, 'fontFamily'), `${label} à ${width}`).toContain(family)
      expect.soft(await style(l, 'fontWeight'), `${label} à ${width}`).toBe(weight)
      expect.soft(await style(l, 'fontSize'), `${label} à ${width}`).toBe(sizes[i])
      expect.soft(await style(l, 'lineHeight'), `${label} à ${width}`).toBe(sizes[2 + i])
    }
  }
  const kicker = text(region(page, 'Method'), METHOD.kicker)
  expect(await style(kicker, 'textTransform')).toBe('uppercase')
  expect(await style(kicker, 'fontSize')).toBe('14px')
  expect(await style(kicker, 'fontWeight')).toBe('600')
  expect(await style(kicker, 'letterSpacing')).toBe('1.5px')
  const level = text(item(page, 4, FEATURED[0].title), FEATURED[0].level)
  expect(await style(level, 'textTransform')).toBe('uppercase')
  expect(await style(level, 'fontSize')).toBe('12px')
  expect(await style(level, 'letterSpacing')).toBe('1px')
})

// Couleur du texte de chaque élément (§3)
const INK = [
  ['h1', (p) => heading(p, 1, HERO.title), 'white'],
  ['lieu', (p) => text(p.getByRole('main'), HERO.place), 'orange4'],
  ['bio courte', (p) => text(p.getByRole('main'), HERO.bio), 'mist'],
  ['disponibilité', (p) => text(p.getByRole('main'), HERO.availability), 'white'],
  ['titre Method', (p) => heading(p, 2, 'Method'), 'navy'],
  ['surtitre', (p) => text(region(p, 'Method'), METHOD.kicker), 'orange'],
  ['introduction', (p) => text(region(p, 'Method'), METHOD.intro), 'slate'],
  ['numéro d\'étape', (p) => text(item(p, 3, METHOD.steps[0][1]), '01'), 'orange'],
  ['texte d\'étape', (p) => text(region(p, 'Method'), METHOD.steps[0][2]), 'slate'],
  ['niveau', (p) => text(item(p, 4, FEATURED[0].title), FEATURED[0].level), 'orange'],
  ['lien de carte', (p) => link(p.getByRole('main'), `Code for ${FEATURED[0].title}`), 'green'],
  ['technologie', (p) => text(item(p, 4, 'LaunchKit'), 'Rust'), 'navy'],
  ['titre Contact', (p) => heading(footer(p), 2, 'Contact'), 'white'],
  ['phrase de contact', (p) => text(footer(p), CONTACT.sentence), 'mist'],
  ['lien du code source', (p) => link(footer(p), 'Source code on GitHub'), 'white'],
]

// Fond de chaque zone, lu sur un pixel près du bord gauche (§3)
const zones = async (page) => {
  const at = async (l) => (await pageBox(l)).y + 40
  return [
    ['accueil', 300, 'navy'],
    ['Method', await at(region(page, 'Method')), 'paper'],
    ['Work', await at(region(page, 'Work')), 'sand'],
    ['About', await at(region(page, 'About')), 'paper'],
    ['Contact', await at(footer(page)), 'navy'],
  ]
}

test('S13 — couleurs de la §3 : fonds, textes, liens, cartes', async ({ page }) => {
  await open(page, 1440)
  for (const [label, y, color] of await zones(page)) expect.soft(await pixel(page, 8, y), `fond ${label}`).toEqual(hex(COLORS[color]))
  for (const [label, el, color] of INK) expect.soft(await sameColor(page, await style(el(page), 'color'), COLORS[color]), `${label} en ${color}`).toBe(true)
  const tag = text(item(page, 4, 'LaunchKit'), 'Rust')
  expect(await sameColor(page, await tag.evaluate((el) => { let n = el; while (getComputedStyle(n).backgroundColor === 'rgba(0, 0, 0, 0)') n = n.parentElement; return getComputedStyle(n).backgroundColor }), COLORS.paper), 'fond des technologies').toBe(true)
  const card = item(page, 4, FEATURED[0].title)
  expect(await sameColor(page, await card.evaluate((el) => { let n = el; while (getComputedStyle(n).backgroundColor === 'rgba(0, 0, 0, 0)') n = n.parentElement; return getComputedStyle(n).backgroundColor }), COLORS.white), 'fond des cartes').toBe(true)
})

test('S14 — thème sombre de l\'appareil : les fonds ne changent pas (A7)', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await open(page, 1440)
  for (const [label, y, color] of await zones(page)) expect.soft(await pixel(page, 8, y), `fond ${label}`).toEqual(hex(COLORS[color]))
})
