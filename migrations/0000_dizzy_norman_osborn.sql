CREATE TABLE IF NOT EXISTS "balls_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"year" integer NOT NULL,
	"weight" numeric NOT NULL,
	"rg" numeric NOT NULL,
	"diff" numeric NOT NULL,
	"purchaseDate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "frames_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"frameNumber" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"score" integer NOT NULL,
	"oil" varchar DEFAULT 'house',
	"location" varchar DEFAULT 'west seattle bowl' NOT NULL,
	"comments" text,
	"number" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufacturers_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "throws_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"pins" varchar,
	"throwNumber" integer
);
