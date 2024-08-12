import prisma from '@/lib/prisma'

async function main() {
  const response = await Promise.all([
    prisma.users.create({
      data: {
        email: process.env.USER_EMAIL || "",
        name: process.env.USER_NAME || "",
        username: process.env.USER_USERNAME || "",
      },
    }),
  ])
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
