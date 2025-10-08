import { test } from "../fixtures";
import { expect } from "@playwright/test";

const timeout = 2000;

test.describe("Catalog Page", () => {
    test("Displays shoes and can add to cart", async ({ page, login }) => {
        await page.goto("/");
        await login();
        await page.waitForTimeout(timeout);

        await expect(page.getByText("Catalog")).toBeVisible();

        const firstCard = page.locator("text=Add to Cart").first();
        await firstCard.click();
        await page.waitForTimeout(timeout);

        const cartButton = page.getByTestId("cart-badge");
        await expect(cartButton).toContainText("1");

        await cartButton.click();
        await page.waitForTimeout(timeout);
        await expect(page.getByText(/your cart/i)).toBeVisible();
    });

    test("Add and remove an item from a cart", async ({ page, login }) => {
        await page.goto("/");
        await login();
        await page.waitForTimeout(timeout);

        const firstCard = page.locator("text=Add to Cart").first();
        await firstCard.click();
        await page.waitForTimeout(timeout);

        const cartButton = page.getByTestId("cart-badge");

        await cartButton.click();
        await page.waitForTimeout(timeout);

        await page.getByTestId("remove-cart-item-0").first().click();

        await expect(page.getByText(/your cart is empty/i)).toBeVisible();
        await page.waitForTimeout(timeout);
    });

    test("Out of stock item buttons are disabled", async ({ page, login }) => {
        await page.goto("/");
        await login();
        await page.waitForTimeout(timeout);

        const button = page.getByRole("button").getByText("Unavailable").first();
        expect(button.isDisabled).toBeTruthy();
        await page.waitForTimeout(timeout);

    });
});
