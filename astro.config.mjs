import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://devmo21x.github.io',
  base: '/DevMo21x-Website-Portfolio',
  integrations: [tailwind(), react()],
});
