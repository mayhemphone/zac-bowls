import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../";
import { InsertOilPatternDuration, oilPatternDurations } from "../schema";

export async function createOilPatternDuration(data: InsertOilPatternDuration) {
  "use server";
  const res = await db.insert(oilPatternDurations).values(data).returning();
  revalidatePath("/admin/oilPatternDurations/");
  return res;
}

export async function deleteOilPatternDuration(id: number) {
  "use server";
  await db.delete(oilPatternDurations).where(eq(oilPatternDurations.id, id));
  revalidatePath("/admin/oilPatternDurations/");
}

export async function getOilPatternDurations() {
  return await db.query.oilPatternDurations.findMany({
    with: { oilPattern: true },
  });
}

export async function getPaginatedOilPatternDurations({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  return await db.query.oilPatternDurations.findMany({
    orderBy: (oilPatternDurations, { asc }) => asc(oilPatternDurations.id),
    with: { oilPattern: true, leagueTrimester: { with: { league: true } } },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

export async function getOilPatternDurationsCount() {
  const res = await db.select({ count: count() }).from(oilPatternDurations);
  return res[0].count;
}

export async function getOilPatternDurationById(id: number) {
  return await db.query.oilPatternDurations.findFirst({
    where: (oilPatternDurations, { eq }) => eq(oilPatternDurations.id, id),
    with: { oilPattern: true },
  });
}
