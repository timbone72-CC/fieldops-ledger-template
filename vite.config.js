import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/fieldops-ledger-template/",
  build: {
    outDir: "docs",
    emptyOutDir: false,
  },
  plugins: [react()],
});
