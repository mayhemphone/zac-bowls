import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../";
import { InsertLink, links } from "../schema";

export async function createLink(data: InsertLink) {
  "use server";
  const res = await db.insert(links).values(data).returning();
  revalidatePath("/admin/links/");
  return res;
}

export async function deleteLink(id: number) {
  "use server";
  await db.delete(links).where(eq(links.id, id));
  revalidatePath("/admin/links/");
}

export async function getLinks() {
  return await db.query.links.findMany({
    with: {
      games: true,
    },
  });
}

export async function getPaginatedLinks({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
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

export async function getBallById(id: number) {
  return await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.id, id),
    with: {
      games: true,
    },
  });
}
