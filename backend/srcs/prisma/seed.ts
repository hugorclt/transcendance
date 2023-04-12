import {
  LobbyState,
  MapName,
  Mode,
  PrismaClient,
  Status,
  VisibilityMode,
} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
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
    },
  });
  // const hugoUpdate = await prisma.user.update({
  //   where: {
  //     id: hugo.id,
  //   },
  //   data: {
  //     friends: {
  //       connect: {
  //         id: dylan.id,
  //       },
  //     },
  //   },
  // });
  // const lobby = await prisma.lobby.create({
  //   data: {
  //     ownerId: dylan.id,
  //     nbPlayers: 2,
  //     maxDuration: 180,
  //     mode: Mode.CLASSIC,
  //     map: MapName.CLASSIC,
  //     state: LobbyState.FULL,
  //     private: true,
  //     members: {
  //       create: [
  //         {
  //           team: false,
  //           ready: false,
  //           user: {
  //             connect: { id: dylan.id },
  //           },
  //         },
  //         {
  //           team: true,
  //           ready: false,
  //           user: {
  //             connect: { id: hugo.id },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });
  // const hugoInLobby = await prisma.user.update({
  //   where: { id: hugo.id },
  //   data: { status: Status.LOBBY },
  // });
  // const dylanInLobby = await prisma.user.update({
  //   where: { id: dylan.id },
  //   data: { status: Status.LOBBY },
  // });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
