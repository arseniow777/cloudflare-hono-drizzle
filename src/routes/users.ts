import { Hono } from "hono";
import { getDb } from "../db/db";
import { usersTable } from "../db/schema";

const users = new Hono<{ Bindings: Env }>();

users.post("/create", async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();

  try {
    const [created] = await db
      .insert(usersTable)
      .values({
        name: body.name,
        age: body.age,
        email: body.email,
      })
      .returning();
    return c.json(created, 201);
  } catch (e) {
    console.log(e);
    return c.json({ err: "Failed to create customer" }, 500);
  }
});

users.get("/", async (c) => {
  const db = getDb(c.env.DB);

  try {
    const row = await db.select().from(usersTable);
    return c.json(row);
  } catch (e) {
    return c.json({ err: "blabla" }, 500);
  }
});

users.get("/check", (c) => {
  return c.text("🔥");
});

export default users;
