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
	@echo " Access commands:"
	@echo "    make access.web                          - Access the web container"
	@echo "    make access.api                          - Access the api container"

# Group target for Prisma commands
.PHONY: prisma
prisma: help

.PHONY: prisma.generate
prisma.generate:
	docker container exec $(API_CONTAINER_NAME) npx prisma generate

.PHONY: prisma.migrate.new
prisma.migrate.new:
ifndef NAME
	$(error NAME is required, e.g., make prisma new migration NAME=myMigration)
endif
	docker container exec $(API_CONTAINER_NAME) npx prisma migrate dev --name $(NAME)

.PHONY: prisma.migrate.reset
prisma.migrate.reset:
	docker container exec $(API_CONTAINER_NAME) npx prisma migrate reset --force

# Docker commands
.PHONY: containers.rebuild
containers.rebuild:
	docker compose build --no-cache

.PHONY: containers.stop
containers.stop:
	docker compose down

.PHONY: containers.start
containers.start:
	docker compose up

.PHONY: containers.start.detached
containers.start.detached:
	docker compose up -d

.PHONY: containers.log.web
containers.log.web:
	docker logs -f $(WEB_CONTAINER_NAME)

.PHONY: containers.log.api
containers.log.api:
	docker logs -f $(API_CONTAINER_NAME)

.PHONY: access.web
access.web:
	docker container exec -it $(WEB_CONTAINER_NAME) sh

.PHONY: access.api
access.api:
	docker container exec -it $(API_CONTAINER_NAME) sh
