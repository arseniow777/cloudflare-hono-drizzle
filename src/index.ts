import { Hono } from 'hono'
import { logger } from 'hono/logger'
import authRoutes from './routes/auth'
import usersRoutes from './routes/user'
import ordersRoutes from './routes/order'
import weddingRoutes from './routes/wedding'

const app = new Hono<{ Bindings: Env }>()

app.use(logger())

app.route('/users', usersRoutes)
app.route('/weddings', weddingRoutes)
app.route('/auth', authRoutes)
app.route('/orders', ordersRoutes)

export default app

// app.post('/user', async (c) => {
//   const db = getDb(c.env.DB)
//   const body = await c.req.json()

//   try {
//     const [created] = await db
//       .insert(usersTable)
//       .values({
//         name: body.name,
//         age: body.age,
//         email: body.email,
//       })
//       .returning()
//     return c.json(created, 201)
//   } catch (e) {
//     return c.json({ err: 'Failed to create customer' }, 500)
//   }
// })

// app.get('users', async (c) => {
//   const db = getDb(c.env.DB)
//   try {
//     const row = await db.select().from(usersTable)
//     return c.json(row)
//   } catch (e) {
//     return c.json({ err: 'blabla' }, 500)
//   }
// })
