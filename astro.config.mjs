import { defineConfig } from "astro/config";
import { remarkModifiedTime } from "./src/utils/remark-modified-time.mjs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import pagefind from "astro-pagefind";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://jvinnick.github.io/veridian",
  base: "/veridian",                            
  output: "static",
  trailingSlash: "always",

  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
  integrations: [
    mdx(),
    sitemap(),
    pagefind(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
        debug: false,
      },
    }),
    icon({
      include: {
        tabler: ["*"],
      },
    }),
  ],
});