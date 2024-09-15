import { count, eq } from "drizzle-orm";
import { db } from "../";
import { InsertLeague, leagues } from "../schema";

export async function createLeague(data: InsertLeague) {
  return await db.insert(leagues).values(data).returning();
}

export async function getPaginatedLeagues(page: number, pageSize: number) {
  return await db.query.leagues.findMany({
    orderBy: (leagues, { asc }) => asc(leagues.id),
    with: {
      leagueTrimesters: true,
      leagueNights: true,
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

export async function getLeaguesCount() {
  const res = await db.select({ count: count() }).from(leagues);
  return res[0].count;
}

export async function getLeagueById(id: number) {
  return await db.query.leagues.findFirst({
    where: (leagues, { eq }) => eq(leagues.id, id),
    with: {
      leagueTrimesters: true,
      leagueNights: true,
    },
  });
}

export async function deleteLeague(id: number) {
  "use server";
  return await db.delete(leagues).where(eq(leagues.id, id)).returning();
}
