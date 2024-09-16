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
  // redirect to first page if no page is provided

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
      insertRecord={createManufacturer} // is this the non plain object?
      deleteFunction={deleteManufacturer}
    />
  );
};

export default Page;
