"use server";

import { getLeaguesCount, getPaginatedLeagues } from "@/db/queries/leagues";
import { redirect } from "next/navigation";
import TableIndex from "./TableIndex";

interface GamePageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: GamePageProps) => {
  const { currentPage } = params;

  if (!parseInt(currentPage, 10)) redirect("/admin/leagues/1");

  const leagues = await getPaginatedLeagues(parseInt(currentPage, 10), 10);
  const totalRows = await getLeaguesCount();
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <TableIndex
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      items={leagues}
    />
  );
};

export default Page;
