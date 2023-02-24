const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

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

  const hugoFriendship = await prisma.friendShip.create({
    data: {
      userOneId: dominique.id,
      userTwoId: hugo.id,
    },
  });
  const dylanFriendship = await prisma.friendShip.create({
    data: {
      userOneId: dylan.id,
      userTwoId: ryad.id,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });