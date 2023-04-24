import { EMap, EMode, LobbyState, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { item } from './seedHelper';

const prisma = new PrismaClient();

async function main() {
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

  await prisma.user.deleteMany({
    where: {},
  });
  await prisma.lobby.deleteMany({
    where: {},
  });
  await prisma.lobbyMember.deleteMany({
    where: {},
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
      preferences: {
        create: {
          visibility: 'VISIBLE',
        },
      },
      friends: {
        connect: {
          id: hugo.id,
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
  const hugoUpdate = await prisma.user.update({
    where: {
      id: hugo.id,
    },
    data: {
      friends: {
        connect: {
          id: dylan.id,
        },
      },
    },
  });
  const lobby = await prisma.lobby.create({
    data: {
      ownerId: dylan.id,
      nbPlayers: 2,
      maxDuration: 180,
      mode: EMode.CLASSIC,
      map: EMap.CLASSIC,
      state: LobbyState.FULL,
      private: true,
      members: {
        create: [
          {
            team: false,
            ready: true,
            user: {
              connect: { id: dylan.id },
            },
          },
          {
            team: true,
            ready: false,
            user: {
              connect: { id: hugo.id },
            },
          },
        ],
      },
    },
  });

  const match1 = await prisma.match.create({
    data: {
      duration: new Date(),
      winnerScore: 10,
      loserScore: 5,
      winners: {
        connect: { id: dylan.id },
      },
      losers: {
        connect: { id: hugo.id },
      },
    },
  });

  const match2 = await prisma.match.create({
    data: {
      duration: new Date(),
      winnerScore: 12,
      loserScore: 7,
      winners: {
        connect: { id: ryad.id },
      },
      losers: {
        connect: { id: dominique.id },
      },
    },
  });

  const match3 = await prisma.match.create({
    data: {
      duration: new Date(),
      winnerScore: 10,
      loserScore: 5,
      winners: {
        connect: { id: dylan.id },
      },
      losers: {
        connect: { id: ryad.id },
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
