run:
	@docker compose up --build

exec-api:
	@docker compose exec api sh

exec-web:
	@docker compose exec web sh

