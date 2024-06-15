import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  decimal,
  varchar,
} from "drizzle-orm/pg-core";

export const games = pgTable("games_table", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  score: integer("score").notNull(),
  oil: varchar("oil").default("house"),
  location: varchar("location").default("west seattle bowl").notNull(), // do i migrate this to locations? idk
  comments: text("comments"),
  number: integer("number"),
  //frames [] >
});

export const gamesRelations = relations(games, ({ many }) => ({
  frames: many(frames),
}));

export const frames = pgTable("frames_table", {
  id: serial("id").primaryKey(),
  frameNumber: integer("frameNumber").notNull(),
  // throws [] >
});

export const framesRelations = relations(frames, ({ many }) => ({
  throws: many(throws),
}));

export const throws = pgTable("throws_table", {
  id: serial("id").primaryKey(),
  pins: varchar("pins"),
  throwNumber: integer("throwNumber"), // ???
  // ball >
});

export const throwsRelations = relations(throws, ({ one }) => ({
  ball: one(balls),
}));

export const balls = pgTable("balls_table", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  year: integer("year").notNull(),
  weight: decimal("weight").notNull(),
  rg: decimal("rg").notNull(),
  diff: decimal("diff").notNull(),
  purchaseDate: date("purchaseDate").notNull(),
  // manufacturer >
});

export const ballsRelations = relations(balls, ({ one }) => ({
  manufacturers: one(manufacturers),
}));

export const manufacturers = pgTable("manufacturers_table", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
});

// games, frames, throws, balls, manufacturers

export type InsertGames = typeof games.$inferInsert;
export type SelectGames = typeof games.$inferSelect;

export type InsertFrames = typeof frames.$inferInsert;
export type SelectFrames = typeof frames.$inferSelect;

export type InsertThrows = typeof throws.$inferInsert;
export type SelectThrows = typeof throws.$inferSelect;

export type InsertBalls = typeof balls.$inferInsert;
export type SelectBalls = typeof balls.$inferSelect;

export type InsertManufacturers = typeof manufacturers.$inferInsert;
export type SelectManufacturers = typeof manufacturers.$inferSelect;
