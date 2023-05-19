all		:	build

build	:
	docker compose -f docker-compose.yml build

up		:
	docker compose -f docker-compose.yml up --detach

stop	:
	docker compose -f docker-compose.yml stop

purge	:
	docker system prune -af

re 		:
	make stop
	make purge
	make rmvol
	make build
	make up

VOL:=$(shell docker volume ls -q)

rmvol	: 		
	docker volume rm $(VOL)


.PHONY: all, build, up, stop, purge, re, rmvol
