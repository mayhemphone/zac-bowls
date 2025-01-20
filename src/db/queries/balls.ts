import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../";
import { InsertBall, balls } from "../schema";

export async function createBall(data: InsertBall) {
  "use server";
  const res = await db.insert(balls).values(data).returning();
  revalidatePath("/admin/balls/");
  return res;
}

export async function deleteBall(id: number) {
  "use server";
  await db.delete(balls).where(eq(balls.id, id));
  revalidatePath("/admin/balls/");
}

export async function getBalls() {
  return await db.query.balls.findMany({
    with: {
      manufacturer: true,
    },
  });
}

export async function getPaginatedBalls({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  return await db.query.balls.findMany({
    orderBy: (balls, { asc }) => asc(balls.id),
    with: {
      manufacturer: true,
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

export async function getBallsCount() {
  const res = await db.select({ count: count() }).from(balls);
  return res[0].count;
}

export async function getBallById(id: number) {
  return await db.query.balls.findFirst({
    where: (balls, { eq }) => eq(balls.id, id),
    with: {
      manufacturer: true,
    },
  });
}
