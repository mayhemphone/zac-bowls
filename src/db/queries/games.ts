"use server";

import { GamesData } from "@/util/api/injestGame";
import { count, sql } from "drizzle-orm";
import { db } from "../";
import { InsertGame, frames, games, throws } from "../schema";

export async function createGame(data: InsertGame) {
  return await db.insert(games).values(data).returning({ id: games.id });
}

export async function getAverageScores({
  start,
  end,
}: {
  start?: string;
  end?: string;
}) {
  const hasDates = start && end;

  const games = await db.query.games.findMany({
    ...(hasDates && {
      where: (games, { between }) => between(games.date, start, end),
    }),
  });

  if (games.length > 0) {
    const allScores = games.reduce((acc, val) => acc + val.score, 0);
    return {
      average: Math.round(allScores / games.length),
      count: games.length,
      games,
    };
  } else return { average: undefined, count: 0 };
}

export async function getGames() {
  const games = await db.query.games.findMany({});
  return games;
}

export async function getLatestGame() {
  const newestGame = await db.query.games.findFirst({
    orderBy: (games, { desc }) => [desc(games.id)],
    with: {
      frames: { with: { throws: true } },
    },
  });

  return newestGame;
}

export async function getLatestCompleteGame() {
  const newestGame = await db.query.games.findFirst({
    where: (games, { eq }) =>
      eq(
        db
          .select({ count: count() })
          .from(frames)
          .where(sql`${frames.gameId} = ${games.id}`),
        10
      ),
    orderBy: (games, { desc }) => [desc(games.id)],
    with: {
      frames: { with: { throws: true } },
    },
  });
  console.log(newestGame?.id);
  return newestGame;
}

export async function getGameById(id: number) {
  const game = await db.query.games.findFirst({
    where: (games, { eq }) => eq(games.id, id),
    with: {
      frames: { with: { throws: true } },
    },
  });

  return game;
}

export async function getPaginatedGames(page: number, pageSize: number) {
  return await db.query.games.findMany({
    orderBy: (games, { asc }) => asc(games.id),
    with: {
      frames: true,
      link: true,
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

export async function getGamesCount() {
  const res = await db.select({ count: count() }).from(games);
  return res[0].count;
}

export async function insertGameData(
  gameData: GamesData,
  linkId: number
): Promise<number[] | undefined> {
  const gameIds: number[] = [];
  if (!gameData) return undefined;

  console.log(
    "👿 insertGameData",
    "\n\ngameData:\n",
    gameData,
    "\nlinkId:\n",
    linkId,
    "\n\ngameData.scores:\n",
    gameData.scores
  );

  try {
    await db.transaction(async (tx) => {
      // Insert each game in scores array
      for (const [index, game] of gameData.scores.entries()) {
        if (!game) continue;
        console.log("json", JSON.stringify(game));
        // Insert game
        const insertedGame = await tx
          .insert(games)
          .values({
            date: gameData.date,
            score: parseInt(game.score, 10),
            // oil: gameData.oil,
            location: gameData.location,
            number: index + 1, // assuming game number should be 1 for all games; adjust if necessary
            linkId,
            rawData: JSON.stringify(game),
          })
          .returning({ id: games.id });

        gameIds.push(insertedGame[0].id);

        // Insert frames
        for (const frameNumber in game.frames) {
          const frameValues = game.frames[frameNumber];
          const insertedFrame = await tx
            .insert(frames)
            .values({
              frameNumber: parseInt(frameNumber, 10),
              gameId: insertedGame[0].id,
              score: frameValues.score,
            })
            .returning({ id: frames.id });

          // Insert throws for each frame
          let throwNumber = 1;
          if (frameValues.throws) {
            for (const value of frameValues.throws) {
              if (value) {
                await tx
                  .insert(throws)
                  .values({
                    frameId: insertedFrame[0].id,
                    throwNumber,
                    pins: value,
                  })
                  .returning({ id: throws.id });
                throwNumber++;
              }
            }
          }
        }
      }
    });

    console.log("🌟GameInsert Transaction committed successfully");
  } catch (error) {
    console.error("❌ GameInsert Transaction failed: ", error);
    throw error; // rethrow the error after logging it
  }

  return gameIds;
}
