import { defineConfig } from 'drizzle-orm/kit';

export default defineConfig({
  db: {
    url: process.env.DATABASE_URL,
  },
  outDir: './drizzle',
});
