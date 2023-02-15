#!/bin/bash
npm install
npm i -g @nestjs/cli --save-dev &&
export PATH="$PATH:$(npm bin -g)"
npx prisma db push && npx prisma generate &
npx prisma db seed &
npm run start:dev