import { test } from "../fixtures";
// import fs from "fs";

test.describe("Scraping", () => {
  test("Finds the catalog data on the page and dumps it to a JSON file locally", async ({page, login}) => {
    await page.goto("/");
    await login();

    await page.waitForSelector("img[alt]");

  const catalogData = await page.$$eval("img[alt]", (images) => {
    return (images as HTMLImageElement[]).map((img) => {
      const card = img.closest("div");

      console.log(card?.querySelector('[data-testid="price"]'));

      const name = img.alt;
      const imageUrl = img.src;

      const price = parseFloat(
        (
          card?.querySelector('[data-testid="price"]')?.textContent || ""
        ).replace(/[^0-9.]/g, "")
      );

      const sizes =
        card?.querySelector('[data-testid="sizes"]')?.textContent ||
        "".split(",").map((s) => s.trim());

      const material =
        card?.querySelector('[data-testid="material"]')?.textContent || "";

      return {
        name,
        imageUrl,
        price,
        sizes,
        material,
      };
    });
  });

    // Write to JSON file
    // fs.writeFileSync("catalog-data.json", JSON.stringify(catalogData, null, 2));
    console.log(
      "Catalog data saved to catalog-data.json",
      JSON.stringify(catalogData, null, 2)
    );
  });
});
