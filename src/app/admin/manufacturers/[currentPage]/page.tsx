"use server";

import {
  createManufacturer,
  deleteManufacturer,
  getManufacturersCount,
  getPaginatedManufacturers,
} from "@/db/queries/manufacturers";
import { redirect } from "next/navigation";
import ManufacturersIndex from "./ManufacturersIndex";

interface ManufacturerPageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: ManufacturerPageProps) => {
  const { currentPage } = params;

  if (!parseInt(currentPage, 10)) redirect("/admin/manufacturers/1");

  const manufacturers = await getPaginatedManufacturers(
    parseInt(currentPage, 10),
    10
  );
  const totalRows = await getManufacturersCount();
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <ManufacturersIndex
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      items={manufacturers}
      insertFunction={createManufacturer}
      deleteFunction={deleteManufacturer}
    />
  );
};

export default Page;
