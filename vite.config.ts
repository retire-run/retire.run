/// <reference types="vite/client" />
/// <reference types="node" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";
import { dependencies } from "./package.json";

const groupedDeps = ["react", "react-dom", "react-icons"];

function renderChunks(deps: Record<string, string>) {
  const chunks: Record<string, string[]> = {};

  for (const key in deps) {
    if (!groupedDeps.includes(key)) {
      chunks[key] = [key];
    }
  }

  return chunks;
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA(),
    checker({
      typescript: true,
      eslint: {
        files: ["./src"],
        extensions: [".ts", ".tsx"],
      },
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    manifest: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: groupedDeps,
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
