all			:	build

build		:
				docker-compose -f docker-compose.yml build

up			:
				docker-compose -f docker-compose.yml up --detach

logs			:
				docker-compose -f docker-compose.yml up

stop		:
				docker-compose -f docker-compose.yml stop

purge		:
				docker system prune -af

re 			:
				make purge
				make build
				make up

clean		:
				docker-compose -f docker-compose.yml down -v

# remove all volumes
#docker volume rm $(docker volume ls -q)