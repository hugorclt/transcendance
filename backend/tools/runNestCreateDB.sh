#!/bin/bash
npm install &
npx prisma db push && npx prisma generate &
npm run start:dev