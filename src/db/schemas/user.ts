import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const UserTable = sqliteTable('users', {
  id: text()
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  username: text().unique().notNull(),
  name: text().notNull().default('Admin'),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// role

export type User = typeof UserTable.$inferSelect
export type NewUser = typeof UserTable.$inferInsert
