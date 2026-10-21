/**
 * docs: https://github.com/dcodeIO/bcrypt.js
 * origin: https://community.cloudflare.com/t/options-for-password-hashing/138077/9
 *
 * $ bun add bcryptjs
 *
 * jika runtime bun bisa lihat: https://bun.com/docs/runtime/hashing#bun-password
 *
 */

import bcrypt from 'bcryptjs'

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  console.log(hash)

  return hash
}

export async function verifyPassword(password: string, storedHash: string) {
  const res = await bcrypt.compare(password, storedHash)

  return res
}
