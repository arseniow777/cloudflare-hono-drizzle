import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import z from 'zod'
import { getDb } from '../db/db'
import { UserTable } from '../db/schema'

const app = new Hono<{ Bindings: Env }>()

const createUserSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  passwordHash: z.string().min(8),
})

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
  passwordHash: z.string().min(1).optional(),
})

app.get('/check', (c) => {
  return c.text('hi')
})

app.get('/', async (c) => {
  const db = getDb(c.env.DB)
  const data = await db.query.UserTable.findMany()
  return c.json(data)
})

// get 1 user, dan ganti create dan update. pake zod select schema docs: https://orm.drizzle.team/docs/sqlite/zod

app.get('/:id', async (c) => {
  const db = getDb(c.env.DB)
  const id = c.req.param('id')
  const user = await db.query.UserTable.findFirst({ where: { id } })

  if (user == null) {
    return c.json({ error: 'User not found' }, 404)
  }
  return c.json(user)
})

app.put('/:id', zValidator('json', updateUserSchema), async (c) => {
  const db = getDb(c.env.DB)
  const id = c.req.param('id')
  const data = c.req.valid('json')
  const [user] = await db
    .update(UserTable)
    .set(data)
    .where(eq(UserTable.id, id))
    .returning()

  return c.json(user)
})

app.delete('/:id', zValidator('json', updateUserSchema), async (c) => {
  const db = getDb(c.env.DB)
  const id = c.req.param('id')

  // partial return
  const [deletedUser]: { deletedUsername: string }[] = await db
    .delete(UserTable)
    .where(eq(UserTable.id, id))
    .returning({ deletedUsername: UserTable.username })

  return c.json(deletedUser)
})

export default app
