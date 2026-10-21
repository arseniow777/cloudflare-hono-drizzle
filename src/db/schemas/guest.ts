import { sql } from 'drizzle-orm'
import { index, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { WeddingTable } from './wedding'

export const GuestTable = sqliteTable(
  'guests',
  {
    id: text()
      .primaryKey()
      .$default(() => crypto.randomUUID()),
    weddingId: text('wedding_id')
      .notNull()
      .references(() => WeddingTable.id, { onDelete: 'cascade' }),
    name: text().notNull(),
    phone: text(),
    status: text({ enum: ['attending', 'declined', 'pending'] })
      .notNull()
      .default('pending'),
    guestCount: integer('guest_count').notNull().default(1),
    message: text(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [index('guests_wedding_idx').on(t.weddingId)],
)

export type Guest = typeof GuestTable.$inferSelect
export type NewGuest = typeof GuestTable.$inferInsert
