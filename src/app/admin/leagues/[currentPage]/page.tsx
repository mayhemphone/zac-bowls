"use server";

import {
  createLeague,
  deleteLeague,
  getLeaguesCount,
  getPaginatedLeagues,
} from "@/db/queries/leagues";
import { redirect } from "next/navigation";
import LeaguesIndex from "./LeaguesIndex";

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
    <LeaguesIndex
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      items={leagues}
      insertFunction={createLeague}
      deleteFunction={deleteLeague}
    />
  );
};

export default Page;
