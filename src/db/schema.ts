import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
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

export const leagues = pgTable("LEAGUES", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  lsLeagueId: integer("lsLeagueId"),
  day: varchar("day").notNull(),
  time: varchar("time").notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  season: varchar("season").notNull(),
  position: varchar("position").notNull(), // sub or team member or captain?
});

export const leaguesRelations = relations(leagues, ({ many }) => ({
  leagueTrimesters: many(leagueTrimesters),
  leagueNights: many(leagueNights),
}));

export const leagueTrimesters = pgTable("LEAGUE_TRIMESTERS", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull(),
  name: varchar("name").notNull(),
  leagueId: integer("leagueId")
    .references(() => leagues.id)
    .notNull(),
});

export const leagueTrimestersRelations = relations(
  leagueTrimesters,
  ({ many, one }) => ({
    league: one(leagues, {
      fields: [leagueTrimesters.leagueId],
      references: [leagues.id],
    }),
    leagueNights: many(leagueNights),
    oilPatternDurations: many(oilPatternDurations),
  })
);

export const leagueNights = pgTable("LEAGUE_NIGHTS", {
  id: serial("id").primaryKey(),
  week: integer("week").notNull(),
  leagueId: integer("leagueId")
    .references(() => leagues.id)
    .notNull(),
  leagueTrimesterId: integer("leagueTrimesterId")
    .references(() => leagueTrimesters.id)
    .notNull(),
  oilPatternId: integer("oilPatternId").references(() => oilPatterns.id),
});

export const leagueNightRelations = relations(
  leagueNights,
  ({ many, one }) => ({
    league: one(leagues, {
      fields: [leagueNights.leagueId],
      references: [leagues.id],
    }),
    leagueTrimester: one(leagueTrimesters, {
      fields: [leagueNights.leagueTrimesterId],
      references: [leagueTrimesters.id],
    }),
    oilPattern: one(oilPatterns, {
      fields: [leagueNights.oilPatternId],
      references: [oilPatterns.id],
    }),
    games: many(games),
  })
);

export const oilPatterns = pgTable("OIL_PATTERNS", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  link: varchar("link"),
});

export const oilPatternsRelations = relations(oilPatterns, ({ many }) => ({
  leagueNights: many(leagueNights),
}));

export const oilPatternDurations = pgTable("OIL_PATTERN_DURATIONS", {
  id: serial("id").primaryKey(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  leagueTrimesterId: integer("leagueTrimesterId").references(
    () => leagueTrimesters.id
  ),
});

export const oilPatternDurationsRelations = relations(
  oilPatternDurations,
  ({ one }) => ({
    leagueTrimester: one(leagueTrimesters, {
      fields: [oilPatternDurations.leagueTrimesterId],
      references: [leagueTrimesters.id],
    }),
  })
);

// when adding a game, if it isn't a league date, its just practice, and it's just a loosy
// can fetch by searching for games with null leagueNightId
export const games = pgTable("GAMES", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  score: integer("score").notNull(),
  location: varchar("location").default("west seattle bowl").notNull(), // do i migrate this to locations? idk
  comments: text("comments"),
  number: integer("number"),
  rawData: text("rawData"),
  // relationships >
  linkId: integer("linkId").references(() => links.id),
  leagueNightId: integer("leagueNightId").references(() => leagueNights.id),
});

export const gamesRelations = relations(games, ({ many, one }) => ({
  frames: many(frames),
  link: one(links, {
    fields: [games.linkId],
    references: [links.id],
  }),
  leagueNight: one(leagueNights, {
    fields: [games.leagueNightId],
    references: [leagueNights.id],
  }),
}));

export const frames = pgTable("FRAMES", {
  id: serial("id").primaryKey(),
  frameNumber: integer("frameNumber").notNull(),
  score: varchar("score").notNull(),
  // relationships >
  gameId: integer("gameId")
    .references(() => games.id)
    .notNull(),
});

export const framesRelations = relations(frames, ({ many, one }) => ({
  game: one(games, {
    fields: [frames.gameId],
    references: [games.id],
  }),
  throws: many(throws),
}));

export const throws = pgTable("THROWS", {
  id: serial("id").primaryKey(),
  pins: varchar("pins").notNull(),
  throwNumber: integer("throwNumber").notNull(),
  // relationships >
  ballId: integer("ballId").references(() => balls.id),
  frameId: integer("frameId")
    .references(() => frames.id)
    .notNull(),
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
  manufacturerId: integer("manufacturerId")
    .references(() => manufacturers.id)
    .notNull(),
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
  name: varchar("name").notNull(),
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

export type InsertLeague = typeof leagues.$inferInsert;
export type SelectLeagues = typeof leagues.$inferSelect;

export type InsertLeagueTrimester = typeof leagueTrimesters.$inferInsert;
export type SelectLeagueTrimesters = typeof leagueTrimesters.$inferSelect;

export type InsertOilPattern = typeof oilPatterns.$inferInsert;
export type SelectOilPatterns = typeof oilPatterns.$inferSelect;

export type InsertOilPatternDuration = typeof oilPatternDurations.$inferInsert;
export type SelectOilPatternDurations = typeof oilPatternDurations.$inferSelect;

export type InsertLeagueNight = typeof leagueNights.$inferInsert;
export type SelectLeagueNights = typeof leagueNights.$inferSelect;

export type InsertManufacturer = typeof manufacturers.$inferInsert;
export type SelectManufacturers = typeof manufacturers.$inferSelect;

export const tables = {
  leagues,
  games,
  frames,
  throws,
  balls,
  manufacturers,
  leagueNights,
  oilPatterns,
  links,
  leagueTrimesters,
} as const;

export interface BaseTable {
  id: number;
  name: string;
}

// Derive TableName as the keys of the tables object
export type TableName = keyof typeof tables;

// Derive TableSelectTypes by mapping each table name to its inferred select model type
export type TableSelectTypes = {
  [K in TableName]: InferSelectModel<(typeof tables)[K]> & BaseTable;
};

// Derive TableInsertTypes by mapping each table name to its inferred insert model type
export type TableInsertTypes = {
  [K in TableName]: InferInsertModel<(typeof tables)[K]>;
};

/**
 * Type guard to check if a string is a valid TableName.
 *
 * @param name - The table name to validate.
 * @returns `true` if `name` is a valid TableName, otherwise `false`.
 */
export function isTableName(name: string): name is TableName {
  return Object.keys(tables).includes(name);
}
