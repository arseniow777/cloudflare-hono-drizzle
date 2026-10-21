import { drizzle } from 'drizzle-orm/d1'
import { relations } from './relation'

export const getDb = (d1: D1Database) => drizzle(d1, { relations })
