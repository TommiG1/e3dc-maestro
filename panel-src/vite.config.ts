import { defineConfig } from "vite";

// The entry name is fixed because Python registers it as the panel module_url;
// lazily loaded chunks carry a content hash and resolve relative to the entry.
export default defineConfig({
  base: "./",
  build: {
    outDir: "../custom_components/e3dc_maestro/frontend/panel",
    emptyOutDir: true,
    target: "es2021",
    modulePreload: false,
    // ApexCharts alone is ~650 kB minified; it is a lazily loaded chunk.
    chunkSizeWarningLimit: 800,
    assetsInlineLimit: 81920,
    rollupOptions: {
      input: "src/maestro-panel.ts",
      preserveEntrySignatures: "strict",
      output: {
        format: "es",
        entryFileNames: "maestro-panel.js",
        chunkFileNames: "[name]-[hash].js",
      },
    },
  },
});
