import { sql } from 'drizzle-orm'
import { index, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { UserTable } from './user'

export const OrderTable = sqliteTable(
  'orders',
  {
    id: text()
      .primaryKey()
      .$default(() => crypto.randomUUID()),
    shopeeOrderId: text('shopee_order_id').unique().notNull(),
    formToken: text('form_token').unique().notNull(),
    formExpiresAt: integer('form_expires_at', { mode: 'timestamp' }).notNull(),
    userId: text('user_id').references(() => UserTable.id, {
      onDelete: 'set null',
    }),
    status: text({
      enum: ['awaiting_form', 'active', 'expired'],
    })
      .notNull()
      .default('awaiting_form'),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [index('orders_user_idx').on(t.userId)],
)

export type Order = typeof OrderTable.$inferSelect
export type NewOrder = typeof OrderTable.$inferInsert
