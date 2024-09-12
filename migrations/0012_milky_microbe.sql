CREATE TABLE IF NOT EXISTS "LEAGUE_NIGHT" (
	"id" serial PRIMARY KEY NOT NULL,
	"week" integer NOT NULL,
	"trimester" integer NOT NULL,
	"leagueId" integer NOT NULL,
	"leagueTrimesterId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LEAGUE_TRIMESTER" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LEAGUES" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"lsLeagueId" integer NOT NULL,
	"day" varchar NOT NULL,
	"time" varchar NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"season" varchar NOT NULL,
	"position" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OIL_PATTERN_DURATIONS" (
	"id" serial PRIMARY KEY NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"leagueTrimesterId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OIL_PATTERNS" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"link" varchar
);
--> statement-breakpoint
ALTER TABLE "GAMES" ADD COLUMN "leagueNightId" integer;--> statement-breakpoint
ALTER TABLE "GAMES" DROP COLUMN IF EXISTS "oil";