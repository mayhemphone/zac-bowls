ALTER TABLE "BALLS" ALTER COLUMN "manufacturerId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "FRAMES" ALTER COLUMN "score" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "FRAMES" ALTER COLUMN "gameId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "LEAGUE_NIGHTS" ALTER COLUMN "leagueId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "LEAGUE_NIGHTS" ALTER COLUMN "leagueTrimesterId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "LEAGUE_TRIMESTERS" ALTER COLUMN "leagueId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "LEAGUES" ALTER COLUMN "lsLeagueId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "MANUFACTURERS" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "THROWS" ALTER COLUMN "pins" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "THROWS" ALTER COLUMN "throwNumber" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "THROWS" ALTER COLUMN "frameId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "LEAGUE_NIGHTS" DROP COLUMN IF EXISTS "trimester";