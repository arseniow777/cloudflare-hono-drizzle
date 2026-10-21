import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import z from 'zod'
import { getDb } from '../db/db'
import { UserTable } from '../db/schema'
import { hashPassword } from '../lib/hash'

const app = new Hono<{ Bindings: Env }>()

const registerSchema = z.object({
  username: z.string().min(3),
  name: z.string().min(3).optional(),
  password: z.string().min(8),
})

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

app.post('/register', zValidator('json', registerSchema), async (c) => {
  const db = getDb(c.env.DB)
  const { username, password } = c.req.valid('json')
  const existing = await db.query.UserTable.findFirst({ where: { username } })

  if (existing != null) {
    return c.json({ message: 'Username already exist' }, 409)
  }

  const passwordHash = await hashPassword(password)

  const user = await db
    .insert(UserTable)
    .values({ username, passwordHash })
    .returning()

  return c.json(user, 201)
})

// login arsen wae

export default app
