ALTER TABLE "frames_table" RENAME COLUMN "frameNumber" TO "frame_number";--> statement-breakpoint
ALTER TABLE "throws_table" RENAME COLUMN "throwNumber" TO "throw_number";--> statement-breakpoint
ALTER TABLE "throws_table" ADD COLUMN "ball_id" integer;