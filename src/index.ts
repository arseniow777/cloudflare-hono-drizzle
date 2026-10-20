import { Hono } from "hono";
import { getDb } from "./db/db";
import { usersTable } from "./db/schema";
import users from "./routes/users";
import stuff from "./routes/stuff";

const app = new Hono<{ Bindings: Env }>().basePath("/api/v1");

app.route("/users", users);
app.route("/stuff", stuff);

export default app;
