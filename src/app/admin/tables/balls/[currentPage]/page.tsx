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
  createBall,
  deleteBall,
  getBallsCount,
  getPaginatedBalls,
} from "@/db/queries/balls";
import { TableName } from "@/db/schema";
import { redirect } from "next/navigation";

interface BallPageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: BallPageProps) => {
  const tableName: TableName = "balls";

  const { currentPage } = params;
  // redirect to first page if no page is provided
  if (!parseInt(currentPage, 10)) redirect(`/admin/${tableName}/1`);

  const pageSize = 10;

  const totalRows = await getBallsCount();
  const parsedCurrentPage = parseInt(currentPage, 10);

  // if they are on a currentPage that exceeds the number of rows*pageSize
  // rdirect to the last page

  const rowCeil = Math.ceil(totalRows / pageSize);
  const test = parsedCurrentPage !== 1 && parsedCurrentPage > rowCeil;

  const url = `/admin/${tableName}/${rowCeil}`;

  if (test) {
    redirect(url);
  }

  const balls = await getPaginatedBalls({
    page: parsedCurrentPage,
    pageSize,
  });
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <Index
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      insertRecord={createBall}
      deleteFunction={deleteBall}
      tableName={tableName}
    >
      <Table>
        <TableHeader>
          <TableRow className="uppercase font-extrabold">
            <TableHead className="">id</TableHead>
            <TableHead className="">name</TableHead>
            <TableHead className="">manufacturer</TableHead>
            <TableHead className="">year</TableHead>
            <TableHead className="">weight</TableHead>
            <TableHead className="">rg</TableHead>
            <TableHead className="">diff</TableHead>
            <TableHead className="">purchaseDate</TableHead>
            <TableHead className="w-[120px] text-center">actions</TableHead>
          </TableRow>
        </TableHeader>
        {/*  */}
        <TableBody>
          {balls.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="">
                  <p>{item.id}</p>
                </TableCell>
                <TableCell className="">
                  <p>{item.name}</p>
                </TableCell>
                <TableCell className="">
                  <p>{item.manufacturer?.name}</p>
                </TableCell>
                <TableCell className="">
                  <p>{item.year}</p>
                </TableCell>
                <TableCell className="">
                  <p>{item.weight}</p>
                </TableCell>
                <TableCell className="">
                  <p>{item.rg}</p>
                </TableCell>
                <TableCell className="">
                  <p>{item.diff}</p>
                </TableCell>
                <TableCell className="">
                  <p>
                    {new Date(item.purchaseDate).toLocaleDateString("en-us", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </TableCell>
                {/* actions column */}
                <ActionsCell
                  id={item.id}
                  deleteFunction={deleteBall}
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
