dev:
	docker compose -f compose.local.yml up -d --build web

db:
	docker compose -f compose.local.yml up -d db