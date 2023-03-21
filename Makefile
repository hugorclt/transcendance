all		:	build

build	:
	docker compose -f docker-compose.yml build

up		:
	docker compose -f docker-compose.yml up --detach

logs	:
	docker compose -f docker-compose.yml up

stop	:
	docker compose -f docker-compose.yml stop

purge	:
	docker system prune -af

re 		:
	make purge
	make build
	make up

restart	:
	make stop
	make build
	make up

clean	:
	docker compose -f docker-compose.yml down -v

VOL:=$(shell docker volume ls -q)

rmvol	: 		
	docker volume rm $(VOL)

deletus :
	make stop
	make purge
	make rmvol

.PHONY: all, build, up, logs, stop, purge, re, clean, rmvol, deletus