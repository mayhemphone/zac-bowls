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
  createLink,
  deleteLink,
  getLinksCount,
  getPaginatedLinks,
} from "@/db/queries/links";
import { TableName } from "@/db/schema";
import { redirect } from "next/navigation";

interface LinkPageProps {
  params: { currentPage: string };
}

const Page = async ({ params }: LinkPageProps) => {
  const tableName: TableName = "links";

  const { currentPage } = params;
  // redirect to first page if no page is provided
  if (!parseInt(currentPage, 10)) redirect(`/admin/${tableName}/1`);

  const pageSize = 10;

  const totalRows = await getLinksCount();
  const parsedCurrentPage = parseInt(currentPage, 10);

  // if they are on a currentPage that exceeds the number of rows*pageSize
  // rdirect to the last page

  const rowCeil = Math.ceil(totalRows / pageSize);
  const test = parsedCurrentPage !== 1 && parsedCurrentPage > rowCeil;

  const url = `/admin/${tableName}/${rowCeil}`;

  if (test) {
    redirect(url);
  }

  const links = await getPaginatedLinks({
    page: parsedCurrentPage,
    pageSize,
  });
  const currentPageInt = parseInt(currentPage, 10);

  return (
    <Index
      currentPage={currentPageInt}
      pageSize={10}
      totalRows={totalRows}
      insertRecord={createLink}
      deleteFunction={deleteLink}
      tableName={tableName}
    >
      <Table>
        <TableHeader>
          <TableRow className="uppercase font-extrabold">
            <TableHead className="">id</TableHead>
            <TableHead className="">email date</TableHead>
            <TableHead className="">url</TableHead>
            <TableHead className=""># of games</TableHead>
          </TableRow>
        </TableHeader>
        {/*  */}
        <TableBody>
          {links.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="">
                  <p>{item.id}</p>
                </TableCell>
                <TableCell className="">
                  <p>{item.emailDate}</p>
                </TableCell>
                <TableCell className="">
                  <p>{item.url}</p>
                </TableCell>
                <TableCell className="">
                  <p>{item.games.length}</p>
                </TableCell>
                {/* actions column */}
                <ActionsCell
                  id={item.id}
                  deleteFunction={deleteLink}
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
