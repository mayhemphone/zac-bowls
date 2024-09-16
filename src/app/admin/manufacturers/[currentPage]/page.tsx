import ActionsCell from "@/components/CRUD/index/ActionsCell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createManufacturer,
  deleteManufacturer,
  getManufacturersCount,
  getPaginatedManufacturers,
} from "@/db/queries/manufacturers";
import { TableName } from "@/db/schema";
import { redirect } from "next/navigation";
import { default as Index } from "../../../../components/CRUD/index/Index";

interface ManufacturerPageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: ManufacturerPageProps) => {
  const tableName: TableName = "manufacturers";

  const { currentPage } = params;
  // redirect to first page if no page is provided
  if (!parseInt(currentPage, 10)) redirect(`/admin/${tableName}/1`);

  const pageSize = 10;

  const totalRows = await getManufacturersCount();
  const parsedCurrentPage = parseInt(currentPage, 10);

  // if they are on a currentPage that exceeds the number of rows*pageSize
  // rdirect to the last page

  const rowCeil = Math.ceil(totalRows / pageSize);
  const test = parsedCurrentPage !== 1 && parsedCurrentPage > rowCeil;

  const url = `/admin/${tableName}/${rowCeil}`;

  if (test) {
    redirect(url);
  }

  const manufacturers = await getPaginatedManufacturers({
    page: parsedCurrentPage,
    pageSize,
  });
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <Index
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      insertRecord={createManufacturer}
      deleteFunction={deleteManufacturer}
      tableName={tableName}
    >
      <Table>
        <TableHeader>
          <TableRow className="uppercase font-extrabold">
            <TableHead className="">id</TableHead>
            <TableHead className="">name</TableHead>
            <TableHead className=""># of balls</TableHead>
            <TableHead className="w-[120px] text-center">actions</TableHead>
          </TableRow>
        </TableHeader>
        {/*  */}
        <TableBody>
          {manufacturers.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="">
                  <p>{item.id}</p>
                </TableCell>
                <TableCell>
                  <p>{item.name}</p>
                </TableCell>
                <TableCell className="">
                  <p>{item.balls.length}</p>
                </TableCell>
                {/* actions column */}
                <ActionsCell
                  id={item.id}
                  deleteFunction={deleteManufacturer}
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
