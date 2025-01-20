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
  createOilPattern,
  deleteOilPattern,
  getOilPatternsCount,
  getPaginatedOilPatterns,
} from "@/db/queries/oilPatterns";
import { TableName } from "@/db/schema";
import { redirect } from "next/navigation";

interface OilPatternPageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: OilPatternPageProps) => {
  const tableName: TableName = "oilPatterns";

  const { currentPage } = params;
  // redirect to first page if no page is provided
  if (!parseInt(currentPage, 10)) redirect(`/admin/${tableName}/1`);

  const pageSize = 10;

  const totalRows = await getOilPatternsCount();
  const parsedCurrentPage = parseInt(currentPage, 10);

  // if they are on a currentPage that exceeds the number of rows*pageSize
  // rdirect to the last page

  const rowCeil = Math.ceil(totalRows / pageSize);
  const test = parsedCurrentPage !== 1 && parsedCurrentPage > rowCeil;

  const url = `/admin/${tableName}/${rowCeil}`;

  if (test) {
    redirect(url);
  }

  const oilPatterns = await getPaginatedOilPatterns({
    page: parsedCurrentPage,
    pageSize,
  });
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <Index
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      insertRecord={createOilPattern}
      deleteFunction={deleteOilPattern}
      tableName={tableName}
    >
      <Table>
        <TableHeader>
          <TableRow className="uppercase font-extrabold">
            <TableHead className="">id</TableHead>
            <TableHead className="">name</TableHead>
            <TableHead className="">link</TableHead>
            <TableHead className="w-[120px] text-center">actions</TableHead>
          </TableRow>
        </TableHeader>
        {/*  */}
        <TableBody>
          {oilPatterns.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="">
                  <p>{item.id}</p>
                </TableCell>

                <TableCell className="">
                  <p>{item.name}</p>
                </TableCell>

                <TableCell className="">
                  {item.link && <img src={item.link} />}
                </TableCell>

                {/* actions column */}
                <ActionsCell
                  id={item.id}
                  deleteFunction={deleteOilPattern}
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
