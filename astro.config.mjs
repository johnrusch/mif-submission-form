import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [preact(), tailwind()]
});