# Variables
CONTAINER_NAME=marquei-api
PRISMA_CMD=npx prisma

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

# Group target for Prisma commands
.PHONY: prisma
prisma: help

.PHONY: prisma.generate
prisma.generate:
	docker container exec $(CONTAINER_NAME) $(PRISMA_CMD) generate

.PHONY: prisma.migrate.new
prisma.migrate.new:
ifndef NAME
	$(error NAME is required, e.g., make prisma new migration NAME=myMigration)
endif
	docker container exec $(CONTAINER_NAME) $(PRISMA_CMD) migrate dev --name $(NAME)

.PHONY: prisma.migrate.reset
prisma.migrate.reset:
	docker container exec $(CONTAINER_NAME) $(PRISMA_CMD) migrate reset --force

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
