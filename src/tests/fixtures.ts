import { test as base, expect } from "@playwright/test";

type MyFixtures = {
    login: () => Promise<void>;
};

export const test = base.extend<MyFixtures>({
    login: async ({ page }, use) => {
        const login = async () => {
            await page.goto("/");

            await page.fill('input[name="email"]', "test@example.com");
            await page.fill('input[name="password"]', "password123");

            await page.click('button[type="submit"]');

            await expect(page.getByText(/catalog/i)).toBeVisible();
        };

        await use(login);
    },
});
