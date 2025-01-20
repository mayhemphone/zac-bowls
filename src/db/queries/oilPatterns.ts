import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../";
import { InsertOilPattern, oilPatterns } from "../schema";

export async function createOilPattern(data: InsertOilPattern) {
  "use server";
  const res = await db.insert(oilPatterns).values(data).returning();
  revalidatePath("/admin/oilPatterns/");
  return res;
}

export async function deleteOilPattern(id: number) {
  "use server";
  await db.delete(oilPatterns).where(eq(oilPatterns.id, id));
  revalidatePath("/admin/oilPatterns/");
}

export async function getOilPatterns() {
  return await db.query.oilPatterns.findMany({});
}

export async function getPaginatedOilPatterns({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  return await db.query.oilPatterns.findMany({
    orderBy: (oilPatterns, { asc }) => asc(oilPatterns.id),

    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

export async function getOilPatternsCount() {
  const res = await db.select({ count: count() }).from(oilPatterns);
  return res[0].count;
}

export async function getOilPatternById(id: number) {
  return await db.query.oilPatterns.findFirst({
    where: (oilPatterns, { eq }) => eq(oilPatterns.id, id),
  });
}
