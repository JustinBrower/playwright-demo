import { defineConfig } from "@playwright/test";

export default defineConfig({
//   testDir: "./src/tests/catalog",
  testDir: "./src/tests/other",
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    trace: "on-first-retry",
  },
  webServer: {
    command: "yarn start",
    port: 5173,
    // reuseExistingServer: !process.env.CI,
  },
});
