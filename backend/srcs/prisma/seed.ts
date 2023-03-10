import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const dominique = await prisma.user.create({
    data: {
      username: "Dominique",
      email: "dominique@example.com",
      password: await bcrypt.hash("password", 10),
    },
  });
  const hugo = await prisma.user.create({
    data: {
      username: "Hugo",
      email: "hugo@example.com",
      password: await bcrypt.hash("password", 10),
    },
  });
  const dylan = await prisma.user.create({
    data: {
      username: "Dylan",
      email: "dylan@example.com",
      password: await bcrypt.hash("password", 10),
    },
  });
  const ryad = await prisma.user.create({
    data: {
      username: "Ryad",
      email: "ryad@example.com",
      password: await bcrypt.hash("password", 10),
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
