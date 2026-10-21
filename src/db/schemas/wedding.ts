import { sql } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { OrderTable } from './order'

const defaultQuote =
  'Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.'

export const WeddingTable = sqliteTable(
  'weddings',
  {
    id: text()
      .primaryKey()
      .$default(() => crypto.randomUUID()),
    slug: text().notNull().unique(),
    contactPhone: text('contact_phone').unique().notNull(),
    brideName: text('bride_name').notNull(),
    groomName: text('groom_name').notNull(),
    brideFather: text('bride_father').notNull(),
    brideMother: text('bride_mother').notNull(),
    groomFather: text('groom_father').notNull(),
    groomMother: text('groom_mother').notNull(),
    brideInstagram: text('bride_instagram').notNull(),
    groomInstagram: text('groom_instagram').notNull(),
    songTitle: text('song_title').notNull(),
    songUrl: text('song_url').notNull(),
    street: text().notNull(),
    village: text().notNull(),
    district: text().notNull(),
    city: text().notNull(),
    province: text().notNull(),
    quote: text().default(defaultQuote),
    weddingDate: integer('wedding_date', { mode: 'timestamp' }).notNull(),
    startTime: integer('start_time', { mode: 'timestamp_ms' }).notNull(),
    endTime: integer('end_time', { mode: 'timestamp_ms' }).notNull(),
    timezone: text().notNull(),
    gmapsUrl: text('gmaps_url'),
    youtubeUrl: text('youtube_url'),
    calendarUrl: text('calendar_url'),
    dresscode: text(),
    status: text({ enum: ['draft', 'published'] }).default('draft'),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    orderId: text('order_id')
      .notNull()
      .unique()
      .references(() => OrderTable.id, {
        onDelete: 'cascade',
      }),
  },
  (t) => [index('wedding_order_idx').on(t.orderId)],
)

export type Wedding = typeof WeddingTable.$inferSelect
export type NewWedding = typeof WeddingTable.$inferInsert
