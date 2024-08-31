CREATE TABLE IF NOT EXISTS "links_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar NOT NULL,
	"emailDate" date NOT NULL,
	"game_id" integer
);
--> statement-breakpoint
ALTER TABLE "games_table" ADD COLUMN "link_id" integer;