#!/bin/bash
npm install &
npx prisma db push && npx prisma generate &
npx prisma db seed &
npm run start:dev