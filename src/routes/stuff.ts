import { Hono } from "hono";
import { getDb } from "../db/db";
import { stuffTable } from "../db/schema";
import { get } from "node:http";

const stuff = new Hono<{ Bindings: Env }>();

stuff.post("/", async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();

  try {
    const [created] = await db
      .insert(stuffTable)
      .values({ stuffName: body.name, price: body.price })
      .returning();

    return c.json(created, 201);
  } catch (e) {
    console.log(e);
    return c.json({ err: "error to adding stuff" }, 500);
  }
});

stuff.get("/", async (c) => {
  const db = getDb(c.env.DB);

  try {
    const rows = await db.select().from(stuffTable);
    return c.json(rows);
  } catch (e) {
    console.log(e);
    c.json({ err: "blblabla" }, 500);
  }
});

stuff.get("/check", (c) => {
  return c.text("hi");
});

export default stuff;
