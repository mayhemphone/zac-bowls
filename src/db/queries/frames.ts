import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../";
import { InsertBall, balls, frames } from "../schema";

export async function createBall(data: InsertBall) {
  "use server";
  const res = await db.insert(balls).values(data).returning();
  revalidatePath("/admin/frames/");
  return res;
}

export async function deleteBall(id: number) {
  "use server";
  await db.delete(frames).where(eq(frames.id, id));
  revalidatePath("/admin/frames/");
}

export async function getFrames() {
  return await db.query.frames.findMany({
    with: {
      throws: true,
      game: true,
    },
  });
}

export async function getPaginatedFrames({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  return await db.query.frames.findMany({
    orderBy: (frames, { asc }) => asc(frames.id),
    with: {
      throws: true,
      game: true,
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

export async function getFramesCount() {
  const res = await db.select({ count: count() }).from(frames);
  return res[0].count;
}

export async function getBallById(id: number) {
  return await db.query.frames.findFirst({
    where: (frames, { eq }) => eq(frames.id, id),
    with: {
      throws: true,
      game: true,
    },
  });
}
