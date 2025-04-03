import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Optionally open the browser automatically
    // open: true,
    // Port defaults to 5173
    port: 5173,
    // HMR is enabled by default
  },
  build: {
    // Output directory defaults to 'dist'
    // outDir: 'dist',
    // Enable sourcemaps for production builds for easier debugging
    sourcemap: true,
  },
  // Rely on Vite's default handling for environment variables (.env files)
  // Rely on Vite's default CSS handling (detects postcss.config.js/tailwind.config.js)
  // Rely on Vite's default TypeScript handling (uses tsconfig.json)
})