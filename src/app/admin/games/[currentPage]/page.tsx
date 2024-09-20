import ActionsCell from "@/components/CRUD/index/ActionsCell";
import LinkOutIcon from "@/components/icons/LinkOut";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createGame,
  deleteGame,
  getGamesCount,
  getPaginatedGames,
} from "@/db/queries/games";
import { TableName } from "@/db/schema";
import Link from "next/link";
import { redirect } from "next/navigation";
import { default as Index } from "../../../../components/CRUD/index/Index";

interface GamePageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: GamePageProps) => {
  const tableName: TableName = "games";

  const { currentPage } = params;
  // redirect to first page if no page is provided
  if (!parseInt(currentPage, 10)) redirect(`/admin/${tableName}/1`);

  const pageSize = 10;

  const totalRows = await getGamesCount();
  const parsedCurrentPage = parseInt(currentPage, 10);

  // if they are on a currentPage that exceeds the number of rows*pageSize
  // rdirect to the last page

  const rowCeil = Math.ceil(totalRows / pageSize);
  const test = parsedCurrentPage !== 1 && parsedCurrentPage > rowCeil;

  const url = `/admin/${tableName}/${rowCeil}`;

  if (test) {
    redirect(url);
  }

  const games = await getPaginatedGames({
    page: parsedCurrentPage,
    pageSize,
  });
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <Index
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      insertRecord={createGame}
      deleteFunction={deleteGame}
      tableName={tableName}
    >
      <Table>
        <TableHeader>
          <TableRow className="uppercase font-extrabold">
            <TableHead className="">id</TableHead>
            <TableHead className="">link</TableHead>
            <TableHead className="">date</TableHead>
            <TableHead className="">score</TableHead>
            <TableHead className="">location</TableHead>
            <TableHead className="">comments</TableHead>
            <TableHead className="">game number</TableHead>
            <TableHead className="w-[120px] text-center">raw data</TableHead>
            <TableHead className="">leag night</TableHead>
            <TableHead className=""># of frames</TableHead>
            <TableHead className="w-[120px] text-center">actions</TableHead>
          </TableRow>
        </TableHeader>
        {/*  */}
        <TableBody>
          {games.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="">
                  <p>{item.id}</p>
                </TableCell>
                <TableCell>
                  {item.link?.url && (
                    <Link href={item.link?.url} target="_blank">
                      <LinkOutIcon />
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  <p>
                    {new Date(item.date).toLocaleDateString("en-us", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </TableCell>
                <TableCell>
                  <p>{item.score}</p>
                </TableCell>
                <TableCell>
                  <p>{item.location}</p>
                </TableCell>
                <TableCell>
                  {item.comments && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">open</Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Comments</DialogTitle>
                          <DialogDescription>
                            View comments for this game
                          </DialogDescription>
                        </DialogHeader>
                        <p>{item.comments}</p>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
                <TableCell>
                  <p>{item.gameNumber}</p>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Raw</Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Raw Data</DialogTitle>
                        <DialogDescription>
                          View raw injested data for this game
                        </DialogDescription>
                      </DialogHeader>
                      <pre className="overflow-auto w-full max-h-[400px]">
                        {JSON.stringify(
                          JSON.parse(item.rawData || ""),
                          null,
                          2
                        )}
                      </pre>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>{item.leagueNight?.league?.name}</TableCell>
                <TableCell className="">
                  <p>{item.frames.length}</p>
                </TableCell>

                {/* actions column */}
                <ActionsCell
                  id={item.id}
                  deleteFunction={deleteGame}
                  tableName={tableName}
                  // handleEditItem={handleEditItem}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Index>
  );
};

export default Page;
