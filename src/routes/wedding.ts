import { zValidator } from '@hono/zod-validator'
import { createInsertSchema } from 'drizzle-orm/zod'
import { Hono } from 'hono'
import z from 'zod'
import { getDb } from '../db/db'
import { WeddingTable } from '../db/schema'

const app = new Hono<{ Bindings: Env }>()

const createWeddingSchema = createInsertSchema(WeddingTable, {
  weddingDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
}).omit({ id: true, createdAt: true, updatedAt: true })

app.get('/', async (c) => {
  const db = getDb(c.env.DB)
  const data = await db.query.WeddingTable.findMany()
  return c.json(data)
})
app.get('/:id', async (c) => {
  const db = getDb(c.env.DB)
  const id = c.req.param('id')
  const data = await db.query.WeddingTable.findFirst({ where: { id } })
  return c.json(data)
})

app.post('/', zValidator('json', createWeddingSchema), async (c) => {
  const db = getDb(c.env.DB)

  const data = c.req.valid('json')
  const [wedding] = await db.insert(WeddingTable).values(data).returning()
  return c.json({ message: 'success', wedding }, 201)
})

export default app
