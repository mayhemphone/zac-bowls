"use server";

import { db } from "@/db";
import { TableName, tables } from "@/db/schema";

// generic query function to query a table by its name
export async function queryTable<T extends TableName>(tableName: T) {
  if (!tables[tableName]) throw new Error(`Table ${tableName} not found`);
  return await db.query[tableName].findMany({});
}
