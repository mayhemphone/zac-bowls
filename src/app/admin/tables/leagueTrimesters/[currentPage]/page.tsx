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
  createLeagueTrimester,
  deleteLeagueTrimester,
  getLeagueTrimestersCount,
  getPaginatedLeagueTrimesters,
} from "@/db/queries/leagueTrimesters";
import { TableName } from "@/db/schema";
import { redirect } from "next/navigation";

interface LeagueTrimesterPageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: LeagueTrimesterPageProps) => {
  const tableName: TableName = "leagueTrimesters";

  const { currentPage } = params;
  // redirect to first page if no page is provided
  if (!parseInt(currentPage, 10)) redirect(`/admin/${tableName}/1`);

  const pageSize = 10;

  const totalRows = await getLeagueTrimestersCount();
  const parsedCurrentPage = parseInt(currentPage, 10);

  // if they are on a currentPage that exceeds the number of rows*pageSize
  // rdirect to the last page

  const rowCeil = Math.ceil(totalRows / pageSize);
  const test = parsedCurrentPage !== 1 && parsedCurrentPage > rowCeil;

  const url = `/admin/${tableName}/${rowCeil}`;

  if (test) {
    redirect(url);
  }

  const leagueTrimesters = await getPaginatedLeagueTrimesters({
    page: parsedCurrentPage,
    pageSize,
  });
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <Index
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      insertRecord={createLeagueTrimester}
      deleteFunction={deleteLeagueTrimester}
      tableName={tableName}
    >
      <Table>
        <TableHeader>
          <TableRow className="uppercase font-extrabold">
            <TableHead className="">id</TableHead>
            <TableHead className="">name</TableHead>
            <TableHead className="">lsLeagueTrimesterId</TableHead>
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
          {leagueTrimesters.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="">
                  <p>{item.id}</p>
                </TableCell>
                <TableCell>
                  <p>{item.name}</p>
                </TableCell>
                <TableCell>
                  <p>{item.leagueId}</p>
                </TableCell>
                <TableCell>
                  <p>{item.number}</p>
                </TableCell>
                <TableCell>
                  {item.oilPatternDurations.map((item) => (
                    <p key={item.oilPattern?.id}>{item.oilPattern?.name}</p>
                  ))}
                </TableCell>

                {/* actions column */}
                <ActionsCell
                  id={item.id}
                  deleteFunction={deleteLeagueTrimester}
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
