import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../";
import { InsertManufacturer, manufacturers } from "../schema";

export async function createManufacturer(data: InsertManufacturer) {
  "use server";
  const res = await db.insert(manufacturers).values(data).returning();
  revalidatePath("/admin/manufacturers/");
  return res;
}

export async function deleteManufacturer(id: number) {
  "use server";
  await db.delete(manufacturers).where(eq(manufacturers.id, id));
  revalidatePath("/admin/manufacturers/");
}

export async function getManufacturers() {
  return await db.query.manufacturers.findMany({});
}

export async function getPaginatedManufacturers({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
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
