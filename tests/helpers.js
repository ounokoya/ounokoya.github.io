import { expect } from '@playwright/test'
import { PNG } from 'pngjs'

// Les tests ne s'appuient que sur la spec : rôles et noms accessibles (§6), contenu (§2), comportement (§5),
// jamais sur des classes ou une structure HTML précise.

// path : './' (anglais) ou './fr/' (français), ADR-0009
export async function open(page, width, height = 900, path = './') {
  await page.setViewportSize({ width, height })
  await page.goto(path)
  await page.evaluate(() => document.fonts.ready)
}

export const banner = (page) => page.getByRole('banner')
export const nav = (page) => page.getByRole('navigation')
export const footer = (page) => page.getByRole('contentinfo')
export const region = (page, name) => page.getByRole('region', { name, exact: true })
export const heading = (page, level, name) => page.getByRole('heading', { level, name, exact: true })
export const link = (scope, name) => scope.getByRole('link', { name, exact: true })
export const photo = (page, name) => page.getByRole('img', { name, exact: true })
export const text = (scope, value) => scope.getByText(value, { exact: true })

// Boîte dans la page (et non dans la fenêtre), arrondie au pixel
export const pageBox = (locator) => locator.evaluate((el) => {
  const b = el.getBoundingClientRect()
  return { x: Math.round(b.x + scrollX), y: Math.round(b.y + scrollY), width: Math.round(b.width), height: Math.round(b.height) }
})

// La carte d'un élément : son plus proche ancêtre au fond non transparent (les cartes sont White)
export const cardOf = (locator) => locator.evaluateHandle((el) => {
  let node = el.parentElement
  while (node && getComputedStyle(node).backgroundColor === 'rgba(0, 0, 0, 0)') node = node.parentElement
  return node
})
export const cardBox = async (locator) => (await cardOf(locator)).evaluate((el) => {
  const b = el.getBoundingClientRect()
  return { x: Math.round(b.x + scrollX), y: Math.round(b.y + scrollY), width: Math.round(b.width), height: Math.round(b.height) }
})

// Union des boîtes de plusieurs éléments (ex. les paragraphes d'un texte)
export async function unionBox(locator) {
  const boxes = await locator.evaluateAll((els) => els.map((el) => { const b = el.getBoundingClientRect(); return [b.left + scrollX, b.top + scrollY, b.right + scrollX, b.bottom + scrollY] }))
  const [l, t, r, b] = [Math.min(...boxes.map((x) => x[0])), Math.min(...boxes.map((x) => x[1])), Math.max(...boxes.map((x) => x[2])), Math.max(...boxes.map((x) => x[3]))]
  return { x: Math.round(l), y: Math.round(t), width: Math.round(r - l), height: Math.round(b - t) }
}

// Position à `tol` px près
export function near(actual, expected, label, tol = 1) {
  for (const [k, v] of Object.entries(expected)) expect.soft(Math.abs(actual[k] - v), `${label} ${k} : ${actual[k]} au lieu de ${v}`).toBeLessThanOrEqual(tol)
}

export const style = (locator, prop) => locator.evaluate((el, p) => getComputedStyle(el)[p], prop)

// Couleur rendue (r, g, b, a sur 255) : compare deux écritures d'une même couleur (hex, rgb(), oklab() de Tailwind)
export const paint = (page, value) => page.evaluate((v) => {
  const c = document.createElement('canvas'); c.width = c.height = 1; const g = c.getContext('2d')
  g.fillStyle = v; g.fillRect(0, 0, 1, 1); return [...g.getImageData(0, 0, 1, 1).data]
}, value)
export const sameColor = async (page, a, b) => JSON.stringify(await paint(page, a)) === JSON.stringify(await paint(page, b))

// Couleur d'un pixel de la page entière
export async function pixel(page, x, y) {
  const shot = PNG.sync.read(await page.screenshot({ fullPage: true, clip: { x, y, width: 1, height: 1 } }))
  return [shot.data[0], shot.data[1], shot.data[2]]
}
export const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
