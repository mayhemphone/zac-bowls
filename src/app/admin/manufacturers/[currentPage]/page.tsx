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

  const pageSize = 10;

  const totalRows = await getManufacturersCount();
  const parsedCurrentPage = parseInt(currentPage, 10);

  // if they are on a currentPage that exceeds the number of rows*pageSize
  // rdirect to the last page

  const rowCeil = Math.ceil(totalRows / pageSize);
  const test = parsedCurrentPage !== 1 && parsedCurrentPage > rowCeil;

  const url = `/admin/manufacturers/${rowCeil}`;

  if (test) {
    redirect(url);
  }

  const manufacturers = await getPaginatedManufacturers({
    page: parsedCurrentPage,
    pageSize,
  });
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <ManufacturersIndex
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      items={manufacturers}
      insertRecord={createManufacturer}
      deleteFunction={deleteManufacturer}
      tableName={"manufacturers"}
    />
  );
};

export default Page;
