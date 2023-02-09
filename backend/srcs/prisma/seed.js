const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
 
(async function main() {
  try {
    const martinFowler = await prisma.user.upsert({
      where: { username: 'Martin Fowler' },
      update: {},
      create: {
        username: 'Martin Fowler',
        avatar: 'no-logo',
        status: 1,
        balance: 1000,
      },
    });
 
    console.log('Create 1 author with 2 quotes: ', martinFowler);
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();