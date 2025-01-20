import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../";
import { InsertLeagueTrimester, leagueTrimesters } from "../schema";

export async function createLeagueTrimester(data: InsertLeagueTrimester) {
  "use server";
  const res = await db.insert(leagueTrimesters).values(data).returning();
  revalidatePath("/admin/leagueTrimesters/");
  return res;
}

export async function deleteLeagueTrimester(id: number) {
  "use server";
  await db.delete(leagueTrimesters).where(eq(leagueTrimesters.id, id));
  revalidatePath("/admin/leagueTrimesters/");
}

export async function getLeagueTrimesters() {
  return await db.query.leagueTrimesters.findMany({});
}

export async function getPaginatedLeagueTrimesters({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  return await db.query.leagueTrimesters.findMany({
    orderBy: (leagueTrimesters, { asc }) => asc(leagueTrimesters.id),
    with: {
      oilPatternDurations: { with: { oilPattern: true } },
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

export async function getLeagueTrimestersCount() {
  const res = await db.select({ count: count() }).from(leagueTrimesters);
  return res[0].count;
}

export async function getLeagueTrimesterById(id: number) {
  return await db.query.leagueTrimesters.findFirst({
    where: (leagueTrimesters, { eq }) => eq(leagueTrimesters.id, id),
    with: {
      oilPatternDurations: { with: { oilPattern: true } },
    },
  });
}
