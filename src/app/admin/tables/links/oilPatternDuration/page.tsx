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
  createOilPatternDuration,
  deleteOilPatternDuration,
  getOilPatternDurationsCount,
  getPaginatedOilPatternDurations,
} from "@/db/queries/oilPatternDurations";
import { TableName } from "@/db/schema";
import { redirect } from "next/navigation";

interface OilPatternDurationPageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: OilPatternDurationPageProps) => {
  const tableName: TableName = "oilPatternDurations";

  const { currentPage } = params;
  // redirect to first page if no page is provided
  if (!parseInt(currentPage, 10)) redirect(`/admin/${tableName}/1`);

  const pageSize = 10;

  const totalRows = await getOilPatternDurationsCount();
  const parsedCurrentPage = parseInt(currentPage, 10);

  // if they are on a currentPage that exceeds the number of rows*pageSize
  // rdirect to the last page

  const rowCeil = Math.ceil(totalRows / pageSize);
  const test = parsedCurrentPage !== 1 && parsedCurrentPage > rowCeil;

  const url = `/admin/${tableName}/${rowCeil}`;

  if (test) {
    redirect(url);
  }

  const oilPatternDurations = await getPaginatedOilPatternDurations({
    page: parsedCurrentPage,
    pageSize,
  });
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <Index
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      insertRecord={createOilPatternDuration}
      deleteFunction={deleteOilPatternDuration}
      tableName={tableName}
    >
      <Table>
        <TableHeader>
          <TableRow className="uppercase font-extrabold">
            <TableHead className="">id</TableHead>
            <TableHead className="">name</TableHead>
            <TableHead className="">league</TableHead>
            <TableHead className="">start</TableHead>
            <TableHead className="">end</TableHead>
            <TableHead className="w-[120px] text-center">actions</TableHead>
          </TableRow>
        </TableHeader>
        {/*  */}
        <TableBody>
          {oilPatternDurations.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="">
                  <p>{item.id}</p>
                </TableCell>

                <TableCell className="">
                  <p>{item.oilPattern?.name}</p>
                </TableCell>

                <TableCell className="">
                  <p>{item.leagueTrimester?.league.name}</p>
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

                {/* actions column */}
                <ActionsCell
                  id={item.id}
                  deleteFunction={deleteOilPatternDuration}
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
