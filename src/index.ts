<<<<<<< HEAD
import { Hono } from "hono";
import { getDb } from "./db/db";
import { usersTable } from "./db/schema";
import users from "./routes/users";
import stuff from "./routes/stuff";

const app = new Hono<{ Bindings: Env }>().basePath("/api/v1");

app.route("/users", users);
app.route("/stuff", stuff);
=======
import { Hono } from 'hono'
import { getDb } from './db/db'
import { usersTable } from './db/schema'

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/query/customers/:id', async (c) => {
  const customerId = c.req.param('id')
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM Customers WHERE CustomerId = ?',
    )
      .bind(customerId)
      .run()
    return c.json(results)
  } catch (e) {
    return c.json({ err: 'Failed to query user' }, 500)
  }
})

app.post('/user', async (c) => {
  const db = getDb(c.env.DB)
  const body = await c.req.json()

  try {
    const [created] = await db
      .insert(usersTable)
      .values({
        name: body.name,
        age: body.age,
        email: body.email,
      })
      .returning()
    return c.json(created, 201)
  } catch (e) {
    return c.json({ err: 'Failed to create customer' }, 500)
  }
})

app.get('users', async (c) => {
  const db = getDb(c.env.DB)
  try {
    const row = await db.select().from(usersTable)
    return c.json(row)
  } catch (e) {
    return c.json({ err: 'blabla' }, 500)
  }
})
>>>>>>> f30d0f73daecb67225a6a6a04c1c58b9c69d890c

export default app
