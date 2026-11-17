import { test, expect } from '@playwright/test'
import { open, nav, banner, footer, region, link, style, sameColor } from './helpers.js'
import { LANGS, allLinks, onNavy, COLORS, SOLUTION_TITLES } from './data.js'

// Spec v2 §5 et §7 — S15 à S18, S25

const [EN] = LANGS
const KINDS = [
  // [type, lien, propriété, normal, survol]
  ['lien pilule (fond)', (p) => link(p.getByRole('main'), 'Upwork'), 'backgroundColor', 'rgba(0, 0, 0, 0)', COLORS.white],
  ['lien pilule (texte)', (p) => link(p.getByRole('main'), 'Upwork'), 'color', COLORS.white, COLORS.navy],
  ['navigation', (p) => link(nav(p), 'Method'), 'textDecorationLine', 'none', 'underline'],
  ['lien de langue', (p) => link(banner(p), EN.other.name), 'textDecorationLine', 'none', 'underline'],
  ['e-mail du pied de page', (p) => link(footer(p), EN.contact.email), 'color', COLORS.white, COLORS.orange4],
  ['lien du pied de page', (p) => link(footer(p), EN.contact.source), 'color', COLORS.white, COLORS.orange4],
  ['lien de texte', (p) => link(p.getByRole('main'), EN.work.front.links(SOLUTION_TITLES[0])[1]), 'color', COLORS.green, COLORS.green9],
]

const matches = async (page, prop, actual, expected) => prop === 'textDecorationLine' ? actual === expected : sameColor(page, actual, expected)

test('S15 — survol de chaque type de lien, puis retour à l\'état normal', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }) // lecture immédiate, sans attendre une transition
  await open(page, 1440)
  for (const [label, el, prop, normal, hover] of KINDS) {
    const l = el(page)
    await l.scrollIntoViewIfNeeded()
    await l.hover()
    expect.soft(await matches(page, prop, await style(l, prop), hover), `${label} survolé : ${prop}`).toBe(true)
    await page.mouse.move(0, 0)
    expect.soft(await matches(page, prop, await style(l, prop), normal), `${label} quitté : ${prop}`).toBe(true)
  }
})

test('S16 — prefers-reduced-motion : aucune transition (A8)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(page, 1440)
  for (const [label, el] of KINDS) {
    const l = el(page)
    await l.hover()
    const durations = (await style(l, 'transitionDuration')).split(',').map((d) => parseFloat(d))
    expect.soft(Math.max(...durations), label).toBe(0)
  }
})

for (const L of LANGS) {
  test(`S17 — ordre clavier et contour de focus de chaque lien (A5) (${L.code})`, async ({ page }) => {
    await open(page, 1440, 900, L.path)
    const expected = allLinks(L)
    const navy = onNavy(L)
    const seen = []
    for (const [name] of expected) {
      await page.keyboard.press('Tab')
      const focused = await page.evaluate(() => {
        const a = document.activeElement; const s = getComputedStyle(a)
        return { name: a.textContent.replace(/\s+/g, ' ').trim(), href: a.getAttribute('href'), style: s.outlineStyle, width: s.outlineWidth, offset: s.outlineOffset, color: s.outlineColor }
      })
      seen.push([focused.name, focused.href])
      expect.soft(focused.style, `${name} : contour`).toBe('solid')
      expect.soft(focused.width, `${name} : épaisseur`).toBe('2px')
      expect.soft(focused.offset, `${name} : décalage`).toBe('3px')
      expect.soft(await sameColor(page, focused.color, navy.has(name) ? COLORS.orange4 : COLORS.green), `${name} : couleur du contour`).toBe(true)
    }
    expect(seen).toEqual(expected)
  })

  test(`S18 — la navigation mène à la section, en haut de la fenêtre (${L.code})`, async ({ page }) => {
    await open(page, 1440, 900, L.path)
    await link(nav(page), L.nav[1]).click()
    await expect(page).toHaveURL(/#work$/)
    expect(Math.abs((await region(page, L.work.name).boundingBox()).y)).toBeLessThanOrEqual(1)
  })

  test(`S25 — le lien de langue mène à l'autre page (A9) (${L.code})`, async ({ page }) => {
    await open(page, 1440, 900, L.path)
    const other = link(banner(page), L.other.name)
    await expect(other).toHaveAttribute('lang', L.other.lang)
    await expect(other).toHaveAttribute('hreflang', L.other.lang)
    await other.click()
    await expect(page.locator('html')).toHaveAttribute('lang', L.other.lang)
  })
}
