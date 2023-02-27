dev:
	yarn run dev

test:
	yarn run test ${file}

repopulate:
	ts-node src/db/migrations/drop.collections.ts && ts-node src/db/migrations/seed.db.ts