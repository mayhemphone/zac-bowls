ALTER TABLE "LEAGUE_NIGHT" RENAME TO "LEAGUE_NIGHTS";--> statement-breakpoint
ALTER TABLE "LEAGUE_TRIMESTER" RENAME TO "LEAGUE_TRIMESTERS";--> statement-breakpoint
ALTER TABLE "LEAGUE_NIGHTS" ALTER COLUMN "leagueId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "LEAGUE_NIGHTS" ALTER COLUMN "leagueTrimesterId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "LEAGUE_TRIMESTERS" ALTER COLUMN "leagueId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "OIL_PATTERN_DURATIONS" ALTER COLUMN "leagueTrimesterId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "GAMES" ADD COLUMN "leagueNightId" integer;--> statement-breakpoint
ALTER TABLE "LEAGUE_NIGHTS" ADD COLUMN "oilPatternId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BALLS" ADD CONSTRAINT "BALLS_manufacturerId_MANUFACTURERS_id_fk" FOREIGN KEY ("manufacturerId") REFERENCES "public"."MANUFACTURERS"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FRAMES" ADD CONSTRAINT "FRAMES_gameId_GAMES_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."GAMES"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GAMES" ADD CONSTRAINT "GAMES_linkId_LINKS_id_fk" FOREIGN KEY ("linkId") REFERENCES "public"."LINKS"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GAMES" ADD CONSTRAINT "GAMES_leagueNightId_LEAGUE_NIGHTS_id_fk" FOREIGN KEY ("leagueNightId") REFERENCES "public"."LEAGUE_NIGHTS"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "LEAGUE_NIGHTS" ADD CONSTRAINT "LEAGUE_NIGHTS_leagueId_LEAGUES_id_fk" FOREIGN KEY ("leagueId") REFERENCES "public"."LEAGUES"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "LEAGUE_NIGHTS" ADD CONSTRAINT "LEAGUE_NIGHTS_leagueTrimesterId_LEAGUE_TRIMESTERS_id_fk" FOREIGN KEY ("leagueTrimesterId") REFERENCES "public"."LEAGUE_TRIMESTERS"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "LEAGUE_NIGHTS" ADD CONSTRAINT "LEAGUE_NIGHTS_oilPatternId_OIL_PATTERNS_id_fk" FOREIGN KEY ("oilPatternId") REFERENCES "public"."OIL_PATTERNS"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "LEAGUE_TRIMESTERS" ADD CONSTRAINT "LEAGUE_TRIMESTERS_leagueId_LEAGUES_id_fk" FOREIGN KEY ("leagueId") REFERENCES "public"."LEAGUES"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OIL_PATTERN_DURATIONS" ADD CONSTRAINT "OIL_PATTERN_DURATIONS_leagueTrimesterId_LEAGUE_TRIMESTERS_id_fk" FOREIGN KEY ("leagueTrimesterId") REFERENCES "public"."LEAGUE_TRIMESTERS"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "THROWS" ADD CONSTRAINT "THROWS_ballId_BALLS_id_fk" FOREIGN KEY ("ballId") REFERENCES "public"."BALLS"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "THROWS" ADD CONSTRAINT "THROWS_frameId_FRAMES_id_fk" FOREIGN KEY ("frameId") REFERENCES "public"."FRAMES"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
