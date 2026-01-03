// import { PrismaClient } from '../generated/prisma/client'
// import { PrismaMariaDb } from '@prisma/adapter-mariadb'

// const globalForPrisma = global as unknown as {
//     prisma: PrismaClient
// }

// const adapter = new PrismaMariaDb({
//   host: "localhost",
//   port: 3306,
//   database: "test",
//   connectionLimit: 5
// })

// const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })


// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// export default prisma

import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  database: "test",
  connectionLimit: 5
})

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma

