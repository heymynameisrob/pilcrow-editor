import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// User table for BetterAuth
export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'boolean' }).notNull().default(false),
  image: text('image'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// Session table for BetterAuth
export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

// Account table for BetterAuth
export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: integer('accessTokenExpiresAt', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refreshTokenExpiresAt', { mode: 'timestamp' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// Verification table for BetterAuth
export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// Document table
export const document = sqliteTable('document', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content', { mode: 'json' }).notNull().$type<any>(), // TipTap JSON content
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// Note type for documents
export const note = sqliteTable('note', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  documentId: integer('documentId', { mode: 'number' })
    .notNull()
    .references(() => document.id, { onDelete: 'cascade' }),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// Types
export type User = typeof user.$inferSelect
export type InsertUser = typeof user.$inferInsert

export type Session = typeof session.$inferSelect
export type InsertSession = typeof session.$inferInsert

export type Account = typeof account.$inferSelect
export type InsertAccount = typeof account.$inferInsert

export type Verification = typeof verification.$inferSelect
export type InsertVerification = typeof verification.$inferInsert

export type Document = typeof document.$inferSelect
export type InsertDocument = typeof document.$inferInsert

export type Note = typeof note.$inferSelect
export type InsertNote = typeof note.$inferInsert
