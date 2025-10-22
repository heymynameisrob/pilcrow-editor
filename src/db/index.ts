import { drizzle as drizzleBetterSqlite } from 'drizzle-orm/better-sqlite3'
import { drizzle as drizzleLibsql } from 'drizzle-orm/libsql'
import Database from 'better-sqlite3'
import { createClient } from '@libsql/client'
import * as schema from './schema'

// Use Turso in production, local SQLite in development
const isProduction = process.env.NODE_ENV === 'production'

export const db = isProduction
  ? drizzleLibsql(
      createClient({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      }),
      { schema }
    )
  : drizzleBetterSqlite(new Database('sqlite.db'), { schema })
