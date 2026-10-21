import { sql } from 'drizzle-orm'
import { index, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const AdminTable = sqliteTable('admins', {
  id: text()
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  username: text().unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})
