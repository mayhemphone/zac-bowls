"use server";

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

export async function createCompleteGameTransaction(data: InsertGame) {
  // const newGame: number = await db.transaction(async (tx) => {
  //   await db.insert(games).values(data).returning({ id: games.id })
  //   await tx.update(accounts).set({ balance: sql`${accounts.balance} - 100.00` }).where(eq(users.name, 'Dan'));
  //   await tx.update(accounts).set({ balance: sql`${accounts.balance} + 100.00` }).where(eq(users.name, 'Andrew'));
  //   const [account] = await tx.select({ balance: accounts.balance }).from(accounts).where(eq(users.name, 'Dan'));
  //   return account.balance;
  // });
}
