import { prisma } from '../server/utils/prisma'
import { hashPasswordScrypt } from '../server/utils/password'

async function main() {
  console.log('[Seed] Seeding database...')

  const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  const existingAdmin = await prisma.user.findUnique({
    where: { email: defaultAdminEmail }
  })

  if (!existingAdmin) {
    const hashedPassword = hashPasswordScrypt(defaultAdminPassword)
    await prisma.user.create({
      data: {
        email: defaultAdminEmail,
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin'
      }
    })
    console.log(`[Seed] Created default admin: ${defaultAdminEmail} (password: ${defaultAdminPassword})`)
  } else {
    console.log(`[Seed] Admin user ${defaultAdminEmail} already exists.`)
  }

  console.log('[Seed] Database seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
