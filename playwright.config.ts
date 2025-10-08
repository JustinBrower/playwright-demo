import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./src/tests",
    fullyParallel: false,
    retries: 1,
    use: {
        baseURL: "http://localhost:5173",
        headless: false,
        trace: "on-first-retry",
    },
    webServer: {
        command: "yarn start",
        port: 5173,
        // reuseExistingServer: !process.env.CI,
    },
});
