ALTER TABLE "balls_table" RENAME TO "BALLS";--> statement-breakpoint
ALTER TABLE "frames_table" RENAME TO "FRAMES";--> statement-breakpoint
ALTER TABLE "games_table" RENAME TO "GAMES";--> statement-breakpoint
ALTER TABLE "links_table" RENAME TO "LINKS";--> statement-breakpoint
ALTER TABLE "manufacturers_table" RENAME TO "MANUFACTURERS";--> statement-breakpoint
ALTER TABLE "throws_table" RENAME TO "THROWS";--> statement-breakpoint
ALTER TABLE "BALLS" RENAME COLUMN "manufacturer_id" TO "manufacturerId";--> statement-breakpoint
ALTER TABLE "FRAMES" RENAME COLUMN "frame_number" TO "frameNumber";--> statement-breakpoint
ALTER TABLE "GAMES" RENAME COLUMN "link_id" TO "linkId";--> statement-breakpoint
ALTER TABLE "THROWS" RENAME COLUMN "throw_number" TO "throwNumber";--> statement-breakpoint
ALTER TABLE "THROWS" RENAME COLUMN "ball_id" TO "ballId";--> statement-breakpoint
ALTER TABLE "THROWS" RENAME COLUMN "frame_id" TO "frameId";