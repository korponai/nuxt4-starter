import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto'

/**
 * Hashes a password using scrypt with a random 16-byte salt.
 * Returns formatted string: `${salt}:${hash}`
 */
export function hashPasswordScrypt(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

/**
 * Verifies a plain text password against a stored `${salt}:${hash}` string
 * using constant-time comparison to prevent timing attacks.
 */
export function verifyPasswordHash(plainPassword: string, storedHash: string): boolean {
  if (!plainPassword || !storedHash) {
    return false
  }

  const parts = storedHash.split(':')
  if (parts.length !== 2) {
    return false
  }

  const [salt, originalHash] = parts
  if (!salt || !originalHash) {
    return false
  }

  try {
    const derivedHash = scryptSync(plainPassword, salt, 64).toString('hex')
    const originalBuffer = Buffer.from(originalHash, 'hex')
    const derivedBuffer = Buffer.from(derivedHash, 'hex')

    if (originalBuffer.length !== derivedBuffer.length) {
      return false
    }

    return timingSafeEqual(originalBuffer, derivedBuffer)
  } catch {
    return false
  }
}

/**
 * Constant-time comparison for API bearer tokens.
 * Rejects empty or undefined tokens immediately.
 */
export function verifyApiToken(providedToken: string | null | undefined, expectedToken: string | null | undefined): boolean {
  if (!providedToken || !expectedToken || expectedToken.trim() === '') {
    return false
  }

  const provided = Buffer.from(providedToken)
  const expected = Buffer.from(expectedToken)

  if (provided.length !== expected.length) {
    return false
  }

  return timingSafeEqual(provided, expected)
}

