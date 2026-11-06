import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { open, heading } from './helpers.js'
import { HERO } from './data.js'

// Spec §6 et §7 — S19 : aucune violation sérieuse ou critique ; repères (A6)

for (const width of [375, 768, 1440]) {
  test(`S19 — axe-core à ${width} px`, async ({ page }) => {
    await open(page, width)
    // présence d'abord : axe ne trouve rien à redire à une page vide
    await expect(heading(page, 1, HERO.title)).toBeVisible()
    await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager' }))

    const { violations } = await new AxeBuilder({ page }).analyze()
    const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact))
    expect(serious.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([])
  })
}

test('A6 — un en-tête, une navigation, un contenu, un pied de page ; sections nommées', async ({ page }) => {
  await open(page, 1440)
  for (const role of ['banner', 'navigation', 'main', 'contentinfo']) await expect(page.getByRole(role), role).toHaveCount(1)
  for (const name of ['Method', 'Work', 'About']) await expect(page.getByRole('region', { name, exact: true }), name).toHaveCount(1)
})
