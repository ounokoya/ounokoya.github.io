import { test, expect } from '@playwright/test'
import { open, nav, footer, region, link, style, sameColor } from './helpers.js'
import { ALL_LINKS, ON_NAVY, COLORS, FEATURED } from './data.js'

// Spec §5 et §7 — S15 à S18

const KINDS = [
  // [type, lien, propriété, normal, survol]
  ['lien pilule (fond)', (p) => link(p.getByRole('main'), 'Upwork'), 'backgroundColor', 'rgba(0, 0, 0, 0)', COLORS.white],
  ['lien pilule (texte)', (p) => link(p.getByRole('main'), 'Upwork'), 'color', COLORS.white, COLORS.navy],
  ['navigation', (p) => link(nav(p), 'Method'), 'textDecorationLine', 'none', 'underline'],
  ['lien du pied de page', (p) => link(footer(p), 'Source code on GitHub'), 'color', COLORS.white, COLORS.orange4],
  ['lien de texte', (p) => link(p.getByRole('main'), `Code: ${FEATURED[0].title}`), 'color', COLORS.green, COLORS.green9],
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
    await page.mouse.move(0, 0) // coin vide de l'en-tête
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

test('S17 — ordre clavier et contour de focus de chaque lien (A5)', async ({ page }) => {
  await open(page, 1440)
  const seen = []
  for (const [name] of ALL_LINKS) {
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => {
      const a = document.activeElement; const s = getComputedStyle(a)
      return { name: a.textContent.replace(/\s+/g, ' ').trim(), href: a.getAttribute('href'), style: s.outlineStyle, width: s.outlineWidth, offset: s.outlineOffset, color: s.outlineColor }
    })
    seen.push([focused.name, focused.href])
    expect.soft(focused.style, `${name} : contour`).toBe('solid')
    expect.soft(focused.width, `${name} : épaisseur`).toBe('2px')
    expect.soft(focused.offset, `${name} : décalage`).toBe('3px')
    const color = ON_NAVY.has(name) ? COLORS.orange4 : COLORS.green
    expect.soft(await sameColor(page, focused.color, color), `${name} : couleur du contour`).toBe(true)
  }
  expect(seen).toEqual(ALL_LINKS)
})

test('S18 — la navigation mène à la section, en haut de la fenêtre', async ({ page }) => {
  await open(page, 1440)
  await link(nav(page), 'Work').click()
  await expect(page).toHaveURL(/#work$/)
  const top = (await region(page, 'Work').boundingBox()).y
  expect(Math.abs(top)).toBeLessThanOrEqual(1)
})
