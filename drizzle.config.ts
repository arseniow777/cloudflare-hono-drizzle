// import "dotenv/config";
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle/migrations',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  // driver: 'd1-http',
  //   dbCredentials: {
  //     accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
  //     databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
  //     token: process.env.CLOUDFLARE_D1_TOKEN!,
  //   },
  dbCredentials: {
    url: './.wrangler/state/v3/d1/miniflare-D1DatabaseObject/a982d9f644fd3281b30f43b579ceac5ab40e3efb2f8e8f324fd7968f19d52294.sqlite',
  },
})
