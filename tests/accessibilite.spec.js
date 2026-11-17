import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { open, heading } from './helpers.js'
import { LANGS } from './data.js'

// Spec v2 §6 et §7 — S19 : aucune violation sérieuse ou critique ; repères (A6), pour chaque langue

for (const L of LANGS) {
  for (const width of [375, 768, 1440]) {
    test(`S19 — axe-core à ${width} px (${L.code})`, async ({ page }) => {
      await open(page, width, 900, L.path)
      // présence d'abord : axe ne trouve rien à redire à une page vide
      await expect(heading(page, 1, L.hero.title)).toBeVisible()
      await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager' }))
      const { violations } = await new AxeBuilder({ page }).analyze()
      const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact))
      expect(serious.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([])
    })
  }

  test(`A6 — un en-tête, une navigation, un contenu, un pied de page ; sections nommées (${L.code})`, async ({ page }) => {
    await open(page, 1440, 900, L.path)
    for (const role of ['banner', 'navigation', 'main', 'contentinfo']) await expect(page.getByRole(role), role).toHaveCount(1)
    for (const name of [L.services.name, L.work.name, L.codingame.name, L.method.name, L.about.name]) await expect(page.getByRole('region', { name, exact: true }), name).toHaveCount(1)
  })
}
