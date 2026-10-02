import { prisma } from '../../utils/prisma'
import { verifyPasswordHash } from '../../utils/password'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Molimo unesite email i lozinku!' })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !verifyPasswordHash(password, user.password)) {
    throw createError({ statusCode: 401, message: 'Pogrešan email ili lozinka!' })
  }

  // Set user session
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  })

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  }
})
