import path from "path"
import { copyFileSync, existsSync } from "fs"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

/** GitHub Pages serves 404.html for unknown routes; mirror index.html for SPA routing. */
function ghPagesSpaFallback() {
  return {
    name: "gh-pages-spa-fallback",
    closeBundle() {
      const indexPath = path.resolve(__dirname, "dist/index.html")
      if (existsSync(indexPath)) {
        copyFileSync(indexPath, path.resolve(__dirname, "dist/404.html"))
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  // Use "/" for username.github.io repos, or "/repo-name/" for project pages
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), ghPagesSpaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
