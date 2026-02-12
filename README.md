DOCKER & DOCKER COMPOSE CHEAT SHEET

======================== 1. DOCKER COMPOSE COMMANDS
========================

docker-compose up - Start all services in docker-compose.yml - Create
container if not exists - Do NOT rebuild image

docker-compose up –build - Rebuild image - Then start containers - Use
when changing Dockerfile or dependencies

docker-compose down - Stop and remove containers - Keep volumes
(database data remains)

docker-compose down -v - Stop and remove containers - Remove volumes
(database will reset)

docker-compose restart - Restart all services

docker-compose restart backend - Restart only backend service

docker-compose build backend - Build only backend image

======================== 2. DOCKER CONTAINER COMMANDS
========================

docker ps - Show running containers

docker ps -a - Show all containers (including stopped)

docker start  - Start existing container

docker stop  - Stop container

docker rm  - Remove container (must stop first)

======================== 3. DOCKER VOLUME ========================

docker volume ls - List all volumes

docker volume rm  - Remove volume (data will be lost)

======================== 4. LOGS & DEBUGGING ========================

docker logs  - Show container logs

docker logs -f  - Show realtime logs

docker exec -it bash - Enter inside container

======================== 5. IMPORTANT NOTES ========================

-   Containers communicate using service name: Example: mysql:3306
    redis:6379

-   NEVER use localhost inside Docker containers

-   Reset database only happens when using: docker-compose down -v

-   Use –build only when changing dependencies

-   Normal development should use: docker-compose up
