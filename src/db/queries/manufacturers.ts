import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../";
import { InsertManufacturer, manufacturers } from "../schema";

export async function createManufacturer(data: InsertManufacturer) {
  "use server";
  return await db.insert(manufacturers).values(data).returning();
}

export async function getManufacturers() {
  return await db.query.manufacturers.findMany({});
}

export async function getPaginatedManufacturers(
  page: number,
  pageSize: number
) {
  return await db.query.manufacturers.findMany({
    orderBy: (manufacturers, { asc }) => asc(manufacturers.id),
    with: {
      balls: true,
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

export async function getManufacturersCount() {
  const res = await db.select({ count: count() }).from(manufacturers);
  return res[0].count;
}

export async function getManufacturerById(id: number) {
  return await db.query.manufacturers.findFirst({
    where: (manufacturers, { eq }) => eq(manufacturers.id, id),
    with: {
      balls: true,
    },
  });
}

export async function deleteManufacturer(id: number) {
  "use server";
  await db.delete(manufacturers).where(eq(manufacturers.id, id));
  revalidatePath("/admin/manufacturers/1");
}
