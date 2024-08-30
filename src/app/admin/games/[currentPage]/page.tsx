"use server";

import { getGamesCount, getPaginatedGames } from "@/db/queries";
import { redirect } from "next/navigation";
import GamesIndex from "./GamesIndex";

interface GamePageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: GamePageProps) => {
  const { currentPage } = params;

  if (!parseInt(currentPage, 10)) redirect("/admin/games/1");

  const games = await getPaginatedGames(parseInt(currentPage, 10), 10);
  const totalRows = await getGamesCount();
  const currentPageInt = parseInt(currentPage, 10);
  return (
    <GamesIndex
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      items={games}
    />
  );
};

export default Page;
