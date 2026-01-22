dev:
	docker compose -f compose.local.yml up -d --build

db:
	docker compose -f compose.local.yml up -d db