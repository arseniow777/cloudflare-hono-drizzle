import { isNotNull } from "drizzle-orm";
import { integer } from "drizzle-orm/gel-core";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const stuffTable = sqliteTable("stuff_table", {
  id: int().primaryKey({ autoIncrement: true }),
  stuffName: text().notNull(),
  price: int().notNull(),
});
