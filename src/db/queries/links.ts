import { count } from "drizzle-orm";
import { db } from "../";
import { InsertLink, links } from "../schema";

export async function createLink(data: InsertLink) {
  return await db.insert(links).values(data).returning();
}

export async function getPaginatedLinks(page: number, pageSize: number) {
  return await db.query.links.findMany({
    orderBy: (links, { asc }) => asc(links.id),
    with: {
      games: true,
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

export async function getLinksCount() {
  const res = await db.select({ count: count() }).from(links);
  return res[0].count;
}
