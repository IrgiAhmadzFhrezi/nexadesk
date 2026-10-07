import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const databaseUrl = (
  globalThis as typeof globalThis & {
    process?: {
      env?: Record<string, string | undefined>;
    };
  }
).process?.env?.DATABASE_URL;

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl!
  }
});