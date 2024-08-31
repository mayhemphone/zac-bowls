import { relations } from "drizzle-orm";
import {
  date,
  decimal,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const links = pgTable("LINKS", {
  id: serial("id").primaryKey(),
  url: varchar("url").notNull(),
  emailDate: date("emailDate").notNull(),
  // relationships >
  // gameId: integer("gameId"),
});

export const linksRelations = relations(links, ({ many }) => ({
  games: many(games),
}));

export const games = pgTable("GAMES", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  score: integer("score").notNull(),
  oil: varchar("oil").default("house"),
  location: varchar("location").default("west seattle bowl").notNull(), // do i migrate this to locations? idk
  comments: text("comments"),
  number: integer("number"),
  rawData: text("rawData"),
  // relationships >
  linkId: integer("linkId"),
});

export const gamesRelations = relations(games, ({ many, one }) => ({
  frames: many(frames),
  link: one(links, {
    fields: [games.linkId],
    references: [links.id],
  }),
}));

export const frames = pgTable("FRAMES", {
  id: serial("id").primaryKey(),
  frameNumber: integer("frameNumber").notNull(),
  // relationships >
  gameId: integer("gameId"),
});

export const framesRelations = relations(frames, ({ many, one }) => ({
  throws: many(throws),
  game: one(games, {
    fields: [frames.gameId],
    references: [games.id],
  }),
}));

export const throws = pgTable("THROWS", {
  id: serial("id").primaryKey(),
  pins: varchar("pins"),
  throwNumber: integer("throwNumber"), // ???
  // relationships >
  ballId: integer("ballId"),
  frameId: integer("frameId"),
});

export const throwsRelations = relations(throws, ({ one }) => ({
  ball: one(balls, {
    fields: [throws.ballId],
    references: [balls.id],
  }),
  frame: one(frames, {
    fields: [throws.frameId],
    references: [frames.id],
  }),
}));

export const balls = pgTable("BALLS", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  year: integer("year").notNull(),
  weight: decimal("weight").notNull(),
  rg: decimal("rg").notNull(),
  diff: decimal("diff").notNull(),
  purchaseDate: date("purchaseDate").notNull(),
  // relationships >
  manufacturerId: integer("manufacturerId"),
});

export const ballsRelations = relations(balls, ({ one, many }) => ({
  manufacturer: one(manufacturers, {
    fields: [balls.manufacturerId],
    references: [manufacturers.id],
  }),
  throws: many(throws),
}));

export const manufacturers = pgTable("MANUFACTURERS", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
});

export const manufacturerRelations = relations(manufacturers, ({ many }) => ({
  balls: many(balls),
}));

// games, frames, throws, balls, manufacturers

export type InsertLink = typeof links.$inferInsert;
export type SelectLinks = typeof links.$inferSelect;

export type InsertGame = typeof games.$inferInsert;
export type SelectGames = typeof games.$inferSelect;

export type InsertFrame = typeof frames.$inferInsert;
export type SelectFrames = typeof frames.$inferSelect;

export type InsertThrow = typeof throws.$inferInsert;
export type SelectThrows = typeof throws.$inferSelect;

export type InsertBall = typeof balls.$inferInsert;
export type SelectBalls = typeof balls.$inferSelect;

export type InsertManufacturer = typeof manufacturers.$inferInsert;
export type SelectManufacturers = typeof manufacturers.$inferSelect;
