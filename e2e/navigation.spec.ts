import { expect, test } from "@playwright/test";

test("welcome screen asks only for name and class", async ({ page }) => {
  await page.context().clearCookies();await page.goto("/");
  await expect(page.getByRole("heading",{name:"Bem-vindo ao IA Lab!"})).toBeVisible();
  await expect(page.getByLabel("Seu nome")).toBeVisible();await expect(page.getByLabel("Sua turma")).toBeVisible();
  await expect(page.locator('input[type="email"]')).toHaveCount(0);
});

test("teacher route never reveals results without a session", async ({ page }) => {
  await page.context().clearCookies();await page.goto("/professor");
  await expect(page.getByRole("heading",{name:"Área do Professor"})).toBeVisible();
  await expect(page.getByRole("columnheader",{name:"Nome"})).toHaveCount(0);
});
