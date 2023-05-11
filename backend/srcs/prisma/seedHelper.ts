import { EItem } from '@prisma/client';
const fs = require('fs');

function generateBase64Image(path) {
  const buffer = fs.readFileSync(path);
  const base64String = buffer.toString('base64');
  return base64String;
}

export const item = [
  {
    name: 'Base Paddle',
    image: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
    price: 0,
    type: EItem.PADDLE,
  },
  {
    name: 'Red Paddle',
    image: generateBase64Image('/app/assets/paddle/red-paddle.gif'),
    price: 1500,
    type: EItem.PADDLE,
  },
  // {
  //   name: 'Blue Paddle',
  //   image: generateBase64Image('/app/assets/paddle/blue-paddle.gif'),
  //   price: 1500,
  //   type: EItem.PADDLE,
  // },
  {
    name: 'Orange Paddle',
    image: generateBase64Image('/app/assets/paddle/orange-paddle.gif'),
    price: 1500,
    type: EItem.PADDLE,
  },
  // {
  //   name: 'Green Paddle',
  //   image: generateBase64Image('/app/assets/paddle/green-paddle.gif'),
  //   price: 1500,
  //   type: EItem.PADDLE,
  // },
  {
    name: 'Purple Paddle',
    image: generateBase64Image('/app/assets/paddle/purple-paddle.gif'),
    price: 1500,
    type: EItem.PADDLE,
  },
];
