FROM    node:12

WORKDIR /usr/src/app

RUN     npm install

RUN     npm run build

EXPOSE  8080
CMD [ "npm" , "start"]