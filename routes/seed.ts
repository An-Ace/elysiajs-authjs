import prisma from "../prisma"
import bcrypt from "bcrypt"
export async function GET() {
  try {
    await prisma.userRole.create({ data: { name: "" } })
    await prisma.userRole.create({
      data: {
        name: 'SUPER_ADMIN',
        permissions: {
          create: [
            { name: "CRUD:ACCOUNT" },
            { name: "CRUD:USER" },
            { name: "CRUD:PRODUCT" },
          ]
        }
      }
    })
    .then(async () => {
      await prisma.user.create({
        data: {
          name: "Muhammad Nasrulloh",
          username: "An-Ace",
          email: "test.id@gmail.com",
          role: "SUPER_ADMIN",
          emailVerified: new Date(),
          credentialAccount: {
            create: {
              password: bcrypt.hashSync('mysecretpassword.!!!', 4),
            }
          },
        }
      }) 
    })
    await prisma.userRole.createMany({ data: [{ name: "ADMIN" }, { name: "USER" }] })
    console.log(`Seeding finished.`);
    return { seed: "Success" }
  } catch (error) {
    throw new Error("seed: Failed")
  }
}