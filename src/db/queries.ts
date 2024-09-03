"use server";

import { db } from "./";
import {
  InsertBall,
  InsertFrame,
  InsertManufacturer,
  InsertThrow,
  balls,
  frames,
  manufacturers,
  throws,
} from "./schema";

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
