import { defineConfig } from 'drizzle-orm';

export default defineConfig({
  client: 'postgresql',
  connection: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/reddit',
});
