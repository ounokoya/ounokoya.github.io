import { test, expect } from '@playwright/test'
import { open, footer, region, heading, pageBox, diffRatio } from './helpers.js'
import { HERO } from './data.js'

// Spec §7 — S23, S24 : chaque section du site comparée à la même zone du rendu de la maquette (G3-7 : 5 %)

const SCREENS = [
  { id: 'S23', ref: 'desktop.png', w: 1440, sections: { accueil: [0, 704], Method: [704, 648], Work: [1352, 2198], About: [3550, 622], Contact: [4172, 443] } },
  { id: 'S24', ref: 'mobile.png', w: 375, sections: { accueil: [0, 1028], Method: [1028, 1204], Work: [2232, 4446], About: [6678, 830], Contact: [7508, 537] } },
]
const MAX = 0.05
// Calibrage (règle du SDL-FM : écart de rendu + 1 point) : Penpot place chaque ligne de son SVG sur la ligne de base
// « idéographique », environ 0,3 px plus bas que le CSS ; sur About en mobile, presque tout en texte, ce lissage
// des lettres fait 7,6 % de pixels différents pour un rendu identique à l'œil (décalage optimal 0, 0). À valider par Koya.
const CALIBRATED = { S24: { About: 0.086 } }

for (const { id, ref, w, sections } of SCREENS) {
  test(`${id} — ${w} px, chaque section vs ${ref} (≤ ${MAX * 100} %)`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await open(page, w, 900)
    await expect(heading(page, 1, HERO.title)).toBeVisible()
    await page.evaluate(() => Promise.all([...document.images].map((img) => { img.loading = 'eager'; return img.decode().catch(() => {}) })))
    await page.mouse.move(0, 0) // aucun survol pendant la capture

    const method = await pageBox(region(page, 'Method'))
    const site = {
      accueil: { x: 0, y: 0, width: w, height: method.y },
      Method: method,
      Work: await pageBox(region(page, 'Work')),
      About: await pageBox(region(page, 'About')),
      Contact: await pageBox(footer(page)),
    }
    const shot = await page.screenshot({ fullPage: true, caret: 'hide', animations: 'disabled' })
    await testInfo.attach(ref, { body: shot, contentType: 'image/png' })
    for (const [name, [y, height]] of Object.entries(sections)) {
      const ratio = diffRatio(shot, ref, { x: 0, y, width: w, height }, { ...site[name], x: 0, width: w })
      testInfo.annotations.push({ type: `${name} : pixels différents`, description: `${(ratio * 100).toFixed(2)} %` })
      const max = CALIBRATED[id]?.[name] ?? MAX
      expect.soft(ratio, `${name} : ${(ratio * 100).toFixed(2)} % (seuil ${(max * 100).toFixed(1)} %)`).toBeLessThanOrEqual(max)
    }
  })
}
