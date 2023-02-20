import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    const user1 = await prisma.user.upsert({
        where: { username: 'Dylanus'},
        update: {},
        create: {
            username: 'Dylanus',
            email: 'bidon@gmail.com',
            password: 'grosmdpbb',
            avatar: 'none',
            status: Status.CONNECTED,
            balance: 100000000,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { username: 'Hugus'},
        update: {},
        create: {
            username: 'Hugus',
            email: 'hugorecolet@gmail.com',
            password: 'grosmdpbb',
            avatar: 'none',
            status: Status.CONNECTED,
            balance: 100000000,
        },
    });

    const user3 = await prisma.user.upsert({
        where: { username: 'Dominus'},
        update: {},
        create: {
            username: 'Dominus',
            email: 'dominus@gmail.com',
            password: 'grosmdpbb',
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