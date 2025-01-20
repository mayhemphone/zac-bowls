import ActionsCell from "@/components/CRUD/index/ActionsCell";
import { default as Index } from "@/components/CRUD/index/Index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createLeague,
  deleteLeague,
  getLeaguesCount,
  getPaginatedLeagues,
} from "@/db/queries/leagues";
import { TableName } from "@/db/schema";
import { redirect } from "next/navigation";

interface LeaguePageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: LeaguePageProps) => {
  const tableName: TableName = "leagues";

  const { currentPage } = params;
  // redirect to first page if no page is provided
  if (!parseInt(currentPage, 10)) redirect(`/admin/${tableName}/1`);

  const pageSize = 10;

  const totalRows = await getLeaguesCount();
  const parsedCurrentPage = parseInt(currentPage, 10);

  // if they are on a currentPage that exceeds the number of rows*pageSize
  // rdirect to the last page

  const rowCeil = Math.ceil(totalRows / pageSize);
  const test = parsedCurrentPage !== 1 && parsedCurrentPage > rowCeil;

  const url = `/admin/${tableName}/${rowCeil}`;

  if (test) {
    redirect(url);
  }

  const leagues = await getPaginatedLeagues({
    page: parsedCurrentPage,
    pageSize,
  });
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <Index
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      insertRecord={createLeague}
      deleteFunction={deleteLeague}
      tableName={tableName}
    >
      <Table>
        <TableHeader>
          <TableRow className="uppercase font-extrabold">
            <TableHead className="">id</TableHead>
            <TableHead className="">name</TableHead>
            <TableHead className="">lsLeagueId</TableHead>
            <TableHead className="">day</TableHead>
            <TableHead className="">time</TableHead>
            <TableHead className="">startDate</TableHead>
            <TableHead className="">endDate</TableHead>
            <TableHead className="">season</TableHead>
            <TableHead className="">position</TableHead>
            <TableHead className="w-[120px] text-center">actions</TableHead>
          </TableRow>
        </TableHeader>
        {/*  */}
        <TableBody>
          {leagues.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="">
                  <p>{item.id}</p>
                </TableCell>

                <TableCell className="">
                  <p>{item.name}</p>
                </TableCell>

                <TableCell className="">
                  <p>{item.lsLeagueId}</p>
                </TableCell>

                <TableCell className="">
                  <p>{item.day}</p>
                </TableCell>

                <TableCell className="">
                  <p>{item.time}</p>
                </TableCell>

                <TableCell className="">
                  <p>
                    {new Date(item.startDate).toLocaleDateString("en-us", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </TableCell>

                <TableCell className="">
                  <p>
                    {new Date(item.endDate).toLocaleDateString("en-us", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </TableCell>

                <TableCell className="">
                  <p>{item.season}</p>
                </TableCell>

                <TableCell className="">
                  <p>{item.position}</p>
                </TableCell>

                {/* actions column */}
                <ActionsCell
                  id={item.id}
                  deleteFunction={deleteLeague}
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
