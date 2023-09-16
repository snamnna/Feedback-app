/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTest.js"],
    coverage: {
      provider: "v8",
      reporter: "text",
      all: true,
      include: ["src/**/*.jsx"],
      exclude: ["src/**/*.test.jsx"],
    },
  },
});
