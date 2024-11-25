# Variables
API_CONTAINER_NAME=marquei-api
WEB_CONTAINER_NAME=marquei-api

# Default target
.PHONY: help
help:
	@echo "Usage:"
	@echo "  Prisma commands:"
	@echo "    make prisma.generate                     - Generate Prisma JS files"
	@echo "    make prisma.migrate.new NAME=myMigration - Create a new migration with a dynamic name"
	@echo "    make prisma.migrate.reset                - Reset and regenerate models"
	@echo "  Docker commands:"
	@echo "    make containers.rebuild                  - Rebuild containers without cache"
	@echo "    make containers.stop                     - Stop and remove containers"
	@echo "    make containers.start                    - Start the containers"
	@echo "    make containers.start.detached           - Start the containers in detached mode"
	@echo "    make containers.log.web                  - See the logs of the web container"
	@echo "    make containers.log.api                  - See the logs of the api container"
	@echo " Access commands:"
	@echo "    make access.web                          - Access the web container"
	@echo "    make access.api                          - Access the api container"

# Group target for Prisma commands
.PHONY: prisma
prisma: help

# Use this command when you update the schema.prisma file
# so you'll update the Prisma JS files inside the container
# everytime you run a npx prisma generate locally you should run this command

# command: make prisma.generate
.PHONY: prisma.generate
prisma.generate:
	docker container exec $(API_CONTAINER_NAME) npx prisma generate

# Use this command to create a new migration
# Everytime you change the schema.prisma file you should create a new migration
# so the changes are reflected in the database

# command: make prisma.migrate.new NAME=nameOfYourMigration (e.g., make prisma.migrate.new NAME=createUsersTable)
.PHONY: prisma.migrate.new
prisma.migrate.new:
ifndef NAME
	$(error NAME is required, e.g., make prisma new migration NAME=myMigration)
endif
	docker container exec $(API_CONTAINER_NAME) npx prisma migrate dev --name $(NAME)

# Use this command to reset the database and regenerate the models
# If you mess everything up or want to start from scratch you can run this command

# command: make prisma.migrate.reset
.PHONY: prisma.migrate.reset
prisma.migrate.reset:
	docker container exec $(API_CONTAINER_NAME) npx prisma migrate reset --force

# Use this command to rebuild the containers without cache
# If you change the Dockerfile or the docker-compose.yml file you should run this command

# command: make containers.rebuild
.PHONY: containers.rebuild
containers.rebuild:
	docker compose build --no-cache

# Use this command to stop and remove the containers
# If you want to stop the containers you should run this command
# if you're getting are error telling you some port is already in use you might run this command

# command: make containers.stop
.PHONY: containers.stop
containers.stop:
	docker compose down

# Use this command to start the containers
# If you want to start the containers and see the logs you should run this command

# command: make containers.start
.PHONY: containers.start
containers.start:
	docker compose up

# Use this command to start the containers in detached mode
# If you want to start the containers in the background you should run this command
# it'll enable you to use the terminal for something else

# command: make containers.start.detached
.PHONY: containers.start.detached
containers.start.detached:
	docker compose up -d

# Use this command to see the logs of the web container
# If you want to see the logs of the web container you should run this command
# you'll need this command only if you started the containers in detached mode

# command: make containers.log.web
.PHONY: containers.log.web
containers.log.web:
	docker logs -f $(WEB_CONTAINER_NAME)

# Use this command to see the logs of the api container
# If you want to see the logs of the api container you should run this command
# you'll need this command only if you started the containers in detached mode

# command: make containers.log.api
.PHONY: containers.log.api
containers.log.api:
	docker logs -f $(API_CONTAINER_NAME)

# Use this command to access the web container
# If you want to access the web container you should run this command
# you'll need this command only if you want to run some command inside the container

# command: make access.web
.PHONY: access.web
access.web:
	docker container exec -it $(WEB_CONTAINER_NAME) sh

# Use this command to access the api container
# If you want to access the api container you should run this command
# you'll need this command only if you want to run some command inside the container

# command: make access.api
.PHONY: access.api
access.api:
	docker container exec -it $(API_CONTAINER_NAME) sh
