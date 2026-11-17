import { test, expect } from '@playwright/test'
import { open, banner, footer, region, heading, link, photo, text, pageBox, style, sameColor, pixel, hex } from './helpers.js'
import { LANGS, SOLUTION_TITLES, COLORS } from './data.js'

// Spec v2 §2, §3, §6 et §7 — S6 à S8, S11 à S14, pour chaque langue (ADR-0009)

const item = (page, level, name) => page.getByRole('listitem').filter({ has: heading(page, level, name) })

for (const L of LANGS) {
  test.describe(`${L.code}`, () => {
    test(`S6 — titre, langue, description, alternates, favicon ; aucun script (${L.code})`, async ({ page, request }) => {
      await open(page, 1440, 900, L.path)
      await expect(page).toHaveTitle(L.title)
      await expect(page.locator('html')).toHaveAttribute('lang', L.code)
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', L.description)
      const alternates = await page.locator('link[rel="alternate"]').evaluateAll((els) => els.map((el) => [el.hreflang, el.getAttribute('href')]))
      expect(alternates).toEqual([['en', 'https://ounokoya.github.io/'], ['fr', 'https://ounokoya.github.io/fr/'], ['x-default', 'https://ounokoya.github.io/']])
      const icon = await page.locator('link[rel="icon"]').getAttribute('href')
      expect((await request.get(new URL(icon, page.url()).href)).status()).toBe(200)
      const html = await (await request.get(L.path)).text()
      expect(html).not.toMatch(/<script/i)
    })

    test(`S7 — les textes de contenu-v2.md, dans l'ordre (${L.code})`, async ({ page }) => {
      await open(page, 1440, 900, L.path)
      const main = page.getByRole('main')
      for (const value of [L.hero.place, L.hero.subtitle, L.hero.bio, L.hero.availability]) await expect(text(main, value)).toBeVisible()
      await expect(heading(page, 1, L.hero.title)).toBeVisible()
      const figures = await main.locator('dl > div').evaluateAll((els) => els.map((el) => [el.querySelector('dt').textContent.trim(), el.querySelector('dd').textContent.replace(/\s+/g, ' ').trim()]))
      expect(figures).toEqual(L.hero.figures)

      const services = region(page, L.services.name)
      for (const value of [L.services.kicker, L.services.intro]) await expect(text(services, value)).toBeVisible()
      await expect(services.getByRole('heading', { level: 3 })).toHaveText(L.services.cards.map(([title]) => title))
      for (const [title, body] of L.services.cards) await expect(text(item(page, 3, title), body)).toBeVisible()

      const work = region(page, L.work.name)
      await expect(work.getByRole('heading', { level: 3 })).toHaveText(L.work.parts)
      await expect(work.getByRole('heading', { level: 4 })).toHaveText([...L.work.products.map((p) => p.name), ...L.work.rnd.cards.map(([t]) => t), ...SOLUTION_TITLES])
      for (const p of L.work.products) {
        const card = item(page, 4, p.name)
        await expect(text(card, p.text)).toBeVisible()
        await expect(card.getByRole('list').first().locator(':scope > li')).toHaveText(p.tags)
      }
      await expect(text(work, L.work.rnd.sentence)).toBeVisible()
      for (const [title, body] of L.work.rnd.cards) {
        await expect(text(item(page, 4, title), body)).toBeVisible()
        await expect(item(page, 4, title).getByRole('link')).toHaveCount(0)
      }
      await expect(text(work, L.work.front.sentence)).toBeVisible()
      for (const [i, title] of SOLUTION_TITLES.entries()) {
        const card = item(page, 4, title)
        await expect(text(card, L.work.front.levels[i])).toBeVisible()
        await expect(text(card, L.work.front.lines[i])).toBeVisible()
      }

      const cg = region(page, L.codingame.name)
      for (const value of [L.codingame.kicker, L.codingame.sentence, L.codingame.text]) await expect(text(cg, value)).toBeVisible()
      const table = cg.getByRole('table', { name: L.codingame.caption, exact: true })
      await expect(table.getByRole('columnheader')).toHaveText(L.codingame.columns)
      const rows = await table.locator('tbody tr').evaluateAll((trs) => trs.map((tr) => [...tr.children].map((c) => c.textContent.replace(/\s+/g, ' ').trim())))
      expect(rows).toEqual(L.codingame.rows)
      await expect(table.getByRole('rowheader')).toHaveText(L.codingame.rows.map(([game]) => game))

      const method = region(page, L.method.name)
      for (const value of [L.method.kicker, L.method.intro]) await expect(text(method, value)).toBeVisible()
      await expect(method.getByRole('heading', { level: 3 })).toHaveText(L.method.steps.map(([, title]) => title))
      for (const [n, title, body] of L.method.steps) {
        const step = item(page, 3, title)
        await expect(text(step, n)).toBeVisible()
        await expect(text(step, body)).toBeVisible()
      }

      await expect(region(page, L.about.name).locator('p')).toHaveText(L.about.paragraphs)

      const foot = footer(page)
      await expect(heading(foot, 2, 'Contact')).toBeVisible()
      for (const value of [L.contact.sentence, L.contact.copyright]) await expect(text(foot, value)).toBeVisible()
    })

    test(`S8 — un seul h1, titres sans saut de niveau (A1) (${L.code})`, async ({ page }) => {
      await open(page, 1440, 900, L.path)
      const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) => els.map((el) => Number(el.localName[1])))
      expect(levels.filter((l) => l === 1)).toHaveLength(1)
      expect(levels[0]).toBe(1)
      expect(levels.slice(1).map((l, i) => [levels[i], l]).filter(([prev, l]) => l > prev + 1)).toEqual([])
      for (const name of [L.services.name, L.work.name, L.codingame.name, L.method.name, L.about.name]) await expect(heading(page, 2, name)).toBeVisible()
    })

    test(`S11 — photo nommée et chargée ; 3 captures 16:10 chargées et décoratives (A2) (${L.code})`, async ({ page }) => {
      await open(page, 1440, 900, L.path)
      await page.evaluate(() => Promise.all([...document.images].map((img) => { img.loading = 'eager'; return img.decode().catch(() => {}) })))
      expect(await photo(page, L.hero.photo).evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true)
      await expect(page.getByRole('main').getByRole('img')).toHaveCount(1)
      for (const title of SOLUTION_TITLES) {
        const img = item(page, 4, title).locator('img')
        await expect(img).toHaveAttribute('alt', '')
        expect(await img.evaluate((el) => el.complete && el.naturalWidth > 0), title).toBe(true)
        const b = await pageBox(img)
        expect.soft(Math.abs(b.width / b.height - 1.6), `${title} : ${b.width} × ${b.height}`).toBeLessThan(0.01)
      }
    })

    const TYPE = [
      // [description, élément, famille, graisse, taille 1440, taille 375, interligne 1440, interligne 375]
      ['h1', (p) => heading(p, 1, L.hero.title), 'Space Grotesk', '700', '56px', '32px', '60px', '38px'],
      ['h2', (p) => heading(p, 2, L.method.name), 'Space Grotesk', '700', '40px', '32px', '48px', '40px'],
      ['h3 (partie)', (p) => heading(p, 3, L.work.parts[0]), 'Space Grotesk', '700', '28px', '24px', '36px', '32px'],
      ['h3 (carte)', (p) => heading(p, 3, L.services.cards[0][0]), 'Space Grotesk', '700', '22px', '20px', '28px', '28px'],
      ['h4', (p) => heading(p, 4, 'LaunchKit'), 'Space Grotesk', '700', '22px', '20px', '28px', '28px'],
      ['nom', (p) => link(banner(p), 'Koya Esdras'), 'Space Grotesk', '700', '20px', '20px', '28px', '28px'],
      ['sous-titre', (p) => text(p.getByRole('main'), L.hero.subtitle), 'Space Grotesk', '500', '24px', '20px', '32px', '28px'],
      ['bio', (p) => text(p.getByRole('main'), L.hero.bio), 'Inter', '400', '18px', '16px', '30px', '26px'],
      ['texte de carte', (p) => text(p.getByRole('main'), L.work.front.lines[0]), 'Inter', '400', '16px', '16px', '26px', '26px'],
      ['lien de carte', (p) => link(p.getByRole('main'), L.work.front.links(SOLUTION_TITLES[0])[1]), 'Inter', '500', '16px', '16px', '24px', '24px'],
    ]

    test(`S12 — polices et tailles de tokens.md (1440 et 375 px) (${L.code})`, async ({ page }) => {
      for (const [width, i] of [[1440, 0], [375, 1]]) {
        await open(page, width, 900, L.path)
        for (const [label, el, family, weight, ...sizes] of TYPE) {
          const l = el(page)
          expect.soft(await style(l, 'fontFamily'), `${label} à ${width}`).toContain(family)
          expect.soft(await style(l, 'fontWeight'), `${label} à ${width}`).toBe(weight)
          expect.soft(await style(l, 'fontSize'), `${label} à ${width}`).toBe(sizes[i])
          expect.soft(await style(l, 'lineHeight'), `${label} à ${width}`).toBe(sizes[2 + i])
        }
      }
      const kicker = text(region(page, L.method.name), L.method.kicker)
      expect(await style(kicker, 'textTransform')).toBe('uppercase')
      expect(await style(kicker, 'fontSize')).toBe('14px')
      expect(await style(kicker, 'letterSpacing')).toBe('1.5px')
      const level = text(item(page, 4, SOLUTION_TITLES[0]), L.work.front.levels[0])
      expect(await style(level, 'textTransform')).toBe('uppercase')
      expect(await style(level, 'fontSize')).toBe('12px')
    })

    const INK = [
      ['h1', (p) => heading(p, 1, L.hero.title), 'white'],
      ['lieu', (p) => text(p.getByRole('main'), L.hero.place), 'orange4'],
      ['bio', (p) => text(p.getByRole('main'), L.hero.bio), 'mist'],
      ['valeur de chiffre', (p) => text(p.getByRole('main'), L.hero.figures[0][1]), 'orange4'],
      ['libellé de chiffre', (p) => text(p.getByRole('main'), L.hero.figures[0][0]), 'mist'],
      ['disponibilité', (p) => text(p.getByRole('main'), L.hero.availability), 'white'],
      ['titre Services', (p) => heading(p, 2, L.services.name), 'navy'],
      ['surtitre', (p) => text(region(p, L.services.name), L.services.kicker), 'orange'],
      ['introduction', (p) => text(region(p, L.services.name), L.services.intro), 'slate'],
      ['texte de service', (p) => text(region(p, L.services.name), L.services.cards[0][1]), 'slate'],
      ['numéro d\'étape', (p) => text(item(p, 3, L.method.steps[0][1]), '01'), 'orange'],
      ['niveau', (p) => text(item(p, 4, SOLUTION_TITLES[0]), L.work.front.levels[0]), 'orange'],
      ['lien de carte', (p) => link(p.getByRole('main'), L.work.front.links(SOLUTION_TITLES[0])[1]), 'green'],
      ['technologie', (p) => text(item(p, 4, 'LaunchKit'), 'Rust'), 'navy'],
      ['titre Contact', (p) => heading(footer(p), 2, 'Contact'), 'white'],
      ['phrase de contact', (p) => text(footer(p), L.contact.sentence), 'mist'],
      ['e-mail', (p) => link(footer(p), L.contact.email), 'white'],
      ['lien du code source', (p) => link(footer(p), L.contact.source), 'white'],
    ]

    const zones = async (page) => {
      const at = async (l) => (await pageBox(l)).y + 40
      return [
        ['accueil', 300, 'navy'],
        ['Services', await at(region(page, L.services.name)), 'paper'],
        ['Work', await at(region(page, L.work.name)), 'sand'],
        ['CodinGame', await at(region(page, L.codingame.name)), 'paper'],
        ['Method', await at(region(page, L.method.name)), 'paper'],
        ['About', await at(region(page, L.about.name)), 'sand'],
        ['Contact', await at(footer(page)), 'navy'],
      ]
    }

    test(`S13 — couleurs de la §3 : fonds, textes, liens (${L.code})`, async ({ page }) => {
      await open(page, 1440, 900, L.path)
      for (const [label, y, color] of await zones(page)) expect.soft(await pixel(page, 8, y), `fond ${label}`).toEqual(hex(COLORS[color]))
      for (const [label, el, color] of INK) expect.soft(await sameColor(page, await style(el(page), 'color'), COLORS[color]), `${label} en ${color}`).toBe(true)
    })

    test(`S14 — thème sombre de l'appareil : les fonds ne changent pas (A7) (${L.code})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' })
      await open(page, 1440, 900, L.path)
      for (const [label, y, color] of await zones(page)) expect.soft(await pixel(page, 8, y), `fond ${label}`).toEqual(hex(COLORS[color]))
    })
  })
}
