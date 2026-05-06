import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const users = await prisma.user.findMany()
  console.log("Users:", users.length)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
