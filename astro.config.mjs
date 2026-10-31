// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// Production domain, e.g. SITE_URL=https://www.example.com npm run build
// Used for canonical URLs, sitemap.xml, robots.txt and social-share previews.
const SITE_URL = process.env.SITE_URL || undefined;

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    tailwind(),
    react(),
  ],
  vite: {
    cacheDir: 'node_modules/.cache/.vite',
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'zustand',
        'framer-motion',
        'date-fns',
        'clsx',
        'class-variance-authority',
        'tailwind-merge',
        '@radix-ui/*',
        'zod',
      ],
    },
  },
  devToolbar: {
    enabled: false,
  },
  server: {
    allowedHosts: true,
    host: true,
  },
});
