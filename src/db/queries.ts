"use server";

import { GamesData } from "@/app/api/ingest/route";
import { db } from "./";
import {
  InsertGame,
  games,
  InsertFrame,
  InsertBall,
  InsertManufacturer,
  InsertThrow,
  frames,
  balls,
  manufacturers,
  throws,
} from "./schema";

export async function createGame(data: InsertGame) {
  return await db.insert(games).values(data).returning({ id: games.id });
}

export async function createFrame(data: InsertFrame) {
  return await db.insert(frames).values(data).returning({ id: frames.id });
}

export async function createThrow(data: InsertThrow) {
  return await db.insert(throws).values(data).returning({ id: throws.id });
}
export async function createThrows(data: InsertThrow[]) {
  return await db.insert(throws).values(data).returning({ id: throws.id });
}

export async function createBall(data: InsertBall) {
  return await db.insert(balls).values(data).returning({ id: balls.id });
}

export async function createManufacturer(data: InsertManufacturer) {
  return await db
    .insert(manufacturers)
    .values(data)
    .returning({ id: manufacturers.id });
}

export async function getAverageScores() {
  const games = await db.query.games.findMany({});

  if (games.length > 0) {
    const allScores = games.reduce((acc, val) => acc + val.score, 0);
    return Math.round(allScores / games.length);
  } else return undefined;
}

export async function getGames() {
  const games = await db.query.games.findMany({});
  return games;
}

export async function insertGameData(
  gameData: GamesData
): Promise<number[] | undefined> {
  const gameIds: number[] = [];
  if (!gameData) return undefined;

  try {
    await db.transaction(async (tx) => {
      // Insert each game in scores array
      gameData.scores.forEach(async (game, index) => {
        if (!game) return;

        // Insert game
        const insertedGame = await tx
          .insert(games)
          .values({
            date: gameData.date,
            score: parseInt(game.score, 10),
            oil: gameData.oil,
            location: gameData.location,
            number: index + 1, // assuming game number should be 1 for all games; adjust if necessary
          })
          .returning({ id: games.id }); //.get();

        gameIds.push(insertedGame[0].id);

        // Insert frames
        for (const frameNumber in game.frames) {
          const frameValues = game.frames[frameNumber];
          const insertedFrame = await tx
            .insert(frames)
            .values({
              frameNumber: parseInt(frameNumber, 10),
              gameId: insertedGame[0].id,
            })
            .returning({ id: frames.id });

          // Insert throws for each frame
          let throwNumber = 1;
          for (const value of frameValues) {
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
      });
    });
    console.log("Transaction committed successfully");
  } catch (error) {
    console.error("Transaction failed: ", error);
    throw error; // rethrow the error after logging it
  }

  return gameIds;
}
