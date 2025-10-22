import { defineConfig } from 'drizzle-kit'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: isProduction
    ? ({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      } as any)
    : {
        url: 'sqlite.db',
      },
})
