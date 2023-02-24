import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { username: 'user1' },
    update: {},
    create: {
      username: 'user1',
      email: 'user1@gmail.com',
      password: '$2b$10$dvyo4z16Ubf2UMF8tz8zxOrQmNeoGNB.d/x9EHXi/dLl8PAD4E7zq',
      avatar: 'none',
      status: Status.CONNECTED,
      balance: 100000000,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'user2' },
    update: {},
    create: {
      username: 'user2',
      email: 'user2@gmail.com',
      password: '$2b$10$dvyo4z16Ubf2UMF8tz8zxOrQmNeoGNB.d/x9EHXi/dLl8PAD4E7zq',
      avatar: 'none',
      status: Status.CONNECTED,
      balance: 100000000,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { username: 'user3' },
    update: {},
    create: {
      username: 'user3',
      email: 'user3@gmail.com',
      password: '$2b$10$dvyo4z16Ubf2UMF8tz8zxOrQmNeoGNB.d/x9EHXi/dLl8PAD4E7zq',
      avatar: 'none',
      balance: 100000000,
    },
  });

  const user4 = await prisma.user.upsert({
    where: { username: 'user4' },
    update: {},
    create: {
      username: 'user4',
      email: 'user4@gmail.com',
      password: '$2b$10$dvyo4z16Ubf2UMF8tz8zxOrQmNeoGNB.d/x9EHXi/dLl8PAD4E7zq',
      avatar: 'none',
      balance: 100000000,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
