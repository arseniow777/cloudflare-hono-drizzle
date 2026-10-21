import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { OrderTable } from '../db/schema'
import z from 'zod'
import { getDb } from '../db/db'
import { nanoid } from 'nanoid'
import { addDays } from 'date-fns'

const app = new Hono<{ Bindings: Env }>()

const orderSchema = z.object({
  shopeeOrderId: z.string(),
})

app.get('/check', (c) => {
  return c.text('hi')
})

app.post('/admin/orders', zValidator('json', orderSchema), async (c) => {
  const db = getDb(c.env.DB)

  //baca req shopee order id
  const { shopeeOrderId } = c.req.valid('json')

  //generate token form dan expired
  const formToken = nanoid()
  const formExpiresAt = addDays(new Date(), 7)

  //insert into orders table row baru isinya shopee order id sama tokennya apaan, expires kapan, user id nya null dulu
  try {
    await db
      .insert(OrderTable)
      .values({ shopeeOrderId, formToken, formExpiresAt })
  } catch {
    return c.json({ error: 'order id sudah tersedia' }, 409)
  }

  //return link untuk dipakai sama user /form token
  return c.json({ link: `http://127.0.0.1:8787/orders/${formToken}` }, 201)
})

export default app
