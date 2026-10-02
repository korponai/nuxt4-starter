import { PrismaClient as SQLitePrismaClient } from '@prisma/client-sqlite'
import { PrismaClient as MySQLPrismaClient } from '@prisma/client-mysql'

let prisma: SQLitePrismaClient | MySQLPrismaClient

const isMySQL = process.env.SQL_PROVIDER === 'mysql'

function createClient() {
  if (isMySQL) {
    return new MySQLPrismaClient()
  } else {
    return new SQLitePrismaClient()
  }
}

if (process.env.NODE_ENV === 'production') {
  prisma = createClient()
} else {
  if (!(global as any).prisma) {
    ;(global as any).prisma = createClient()
  }
  prisma = (global as any).prisma
}

export { prisma }
export default prisma
