FROM    node:16.13.2

WORKDIR /app
EXPOSE  3000
EXPOSE 5555
COPY    ./tools/runNestCreateDB.sh /
RUN     chmod 777 /runNestCreateDB.sh

ENTRYPOINT  [".././runNestCreateDB.sh"]
