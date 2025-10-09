import { test } from "../fixtures";
import * as fs from "fs";

test.describe("Scraping", () => {
  test("Finds the catalog data on the page and dumps it to a JSON file locally", async ({page, login}) => {
    await page.goto("/");
    await login();

    await page.waitForSelector("img[alt]"); 

    const items = await page.$$eval('[data-testid^="catalog-item-"]', (elements) =>
      elements.map((el) => {
        const name = el.querySelector('text[font-size="lg"]')?.textContent?.trim();
        const brandColor = el
          .querySelector('[data-testid="color"]')
          ?.textContent?.trim();
        const price = el
          .querySelector('[data-testid="price"]')
          ?.textContent?.trim();
        const sizes = el
          .querySelector('[data-testid="sizes"]')
          ?.textContent?.replace("Sizes: ", "")
          .trim();
        const material = el
          .querySelector('[data-testid="material"]')
          ?.textContent?.replace("Material: ", "")
          .trim();
        const imageUrl = el.querySelector("img")?.src;
        const category = el
          .querySelector('badge[color-scheme="blue"]')
          ?.textContent?.trim();
        const stockBadge = el
          .querySelector('badge[color-scheme="red"], badge[color-scheme="green"]')
          ?.textContent?.trim();
        const outOfStock =
          stockBadge?.toLowerCase().includes("out of stock") ||
          stockBadge?.toLowerCase().includes("sold out");

        return {
          name,
          brandColor,
          price,
          sizes,
          material,
          imageUrl,
          category,
          stockBadge,
          outOfStock,
        };
      })
    );


    fs.writeFileSync("catalog-data.json", JSON.stringify(items, null, 2));
    console.log(
      "Catalog data saved to catalog-data.json",
      JSON.stringify(items, null, 2)
    );
  });
});
