"use server";

import { db } from "./";
import {
  InsertBall,
  InsertFrame,
  InsertThrow,
  TableName,
  balls,
  frames,
  tables,
  throws,
} from "./schema";

// generic query function to query a table by its name
export async function queryTable<T extends TableName>(tableName: T) {
  "use server";
  console.log("server side ", { tableName });
  if (!tables[tableName]) throw new Error(`Table ${tableName} not found`);
  return await db.query[tableName].findMany({});
}

// Not sure we can do a dynamic insert function
// export async function insertToTable<T extends TableName>(tableName: T, data:) {
//   "use server";
//   console.log("server side ", { tableName });
//   if (!tables[tableName]) throw new Error(`Table ${tableName} not found`);
//   return await db.query[tableName].findMany({});
// }

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
