import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: path.resolve(__dirname, "vitest.setup.ts"),
  },
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./components"),
      "@/lib": path.resolve(__dirname, "./lib"),
      "@shared": path.resolve(__dirname, "../..", "packages/shared"),
    },
  },
});
