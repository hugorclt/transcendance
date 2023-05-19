import { EMap, EMode, LobbyState, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { item } from './seedHelper';

const prisma = new PrismaClient();

async function main() {
  await prisma.item.deleteMany({
    where: {},
  });
  await prisma.user.deleteMany({
    where: {},
  });
  await prisma.lobby.deleteMany({
    where: {},
  });
  await prisma.lobbyMember.deleteMany({
    where: {},
  });
  await Promise.all(
    item.map(async (item) => {
      await prisma.item.create({
        data: item,
      });
    }),
  );

  const basePaddle = await prisma.item.findFirst({
    where: {
      name: 'Base Paddle',
    },
  });

  const dominique = await prisma.user.create({
    data: {
      username: 'Dominique',
      email: 'dominique@example.com',
      password: await bcrypt.hash('password', 10),
      preferences: {
        create: {
          visibility: 'VISIBLE',
        },
      },
      stat: {
        create: {},
      },
      items: {
        connect: {
          id: basePaddle.id,
        },
      },
    },
  });
  const ryad = await prisma.user.create({
    data: {
      username: 'Ryad',
      email: 'ryad@example.com',
      password: await bcrypt.hash('password', 10),
      preferences: {
        create: {
          visibility: 'VISIBLE',
        },
      },
      stat: {
        create: {},
      },
      items: {
        connect: {
          id: basePaddle.id,
        },
      },
    },
  });

  /* ---------------------- Both friends + lobby created ---------------------- */
  const hugo = await prisma.user.create({
    data: {
      username: 'Hugo',
      email: 'hugo@example.com',
      password: await bcrypt.hash('password', 10),
      balance: 10000,
      preferences: {
        create: {
          visibility: 'VISIBLE',
        },
      },
      stat: {
        create: {},
      },
      items: {
        connect: {
          id: basePaddle.id,
        },
      },
    },
  });
  const dylan = await prisma.user.create({
    data: {
      username: 'Dylan',
      email: 'dylan@example.com',
      password: await bcrypt.hash('password', 10),
      balance: 10000000,
      preferences: {
        create: {
          visibility: 'VISIBLE',
        },
      },
      stat: {
        create: {},
      },
      items: {
        connect: {
          id: basePaddle.id,
        },
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
