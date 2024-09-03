"use server";

import { getLinksCount, getPaginatedLinks } from "@/db/queries/links";
import { redirect } from "next/navigation";
import LinksIndex from "./LinksIndex";

interface LinkPageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: LinkPageProps) => {
  const { currentPage } = params;

  if (!parseInt(currentPage, 10)) redirect("/admin/links/1");

  const links = await getPaginatedLinks(parseInt(currentPage, 10), 10);
  const totalRows = await getLinksCount();
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <LinksIndex
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      items={links}
    />
  );
};

export default Page;
