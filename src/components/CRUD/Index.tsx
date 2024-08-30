/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Je3eFIPjtS2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type IndexProps = {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  items: { [key: string]: any }[]; // this needs to be dynamic? or does it?
  handleCreateItem?: () => void;
  handleEditItem: (id: number | string) => void;
  handleDeleteItem: (id: number | string) => void;
  schema: {
    header: string;
    prop: string;
    length?: boolean;
  }[];
};

export default function Index({
  schema,
  items,
  pageSize,
  currentPage,
  totalRows,
  handleCreateItem,
  handleEditItem,
  handleDeleteItem,
}: IndexProps) {
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = totalRows > currentPage * pageSize;
  const hasTwoNextPage = totalRows > (currentPage + 1) * pageSize;

  return (
    <div className="w-full mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">CRUD Interface</h1>
        {handleCreateItem && (
          <Button onClick={() => handleCreateItem()} size="sm">
            Create New
          </Button>
        )}
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {schema.map((col) => (
                <TableHead key={col.header}>{col.header}</TableHead>
              ))}
              <TableHead>actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              console.log(item);
              return (
                <TableRow key={item.id}>
                  {schema.map((col) => (
                    <TableCell key={col.prop}>
                      {col.length ? item[col.prop].length : item[col.prop]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleEditItem(item.id)}
                        size="icon"
                        variant="ghost"
                      >
                        <FilePenIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteItem(item.id)}
                        size="icon"
                        variant="ghost"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-muted-foreground w-full">
          Showing {indexOfFirstItem + 1} - {indexOfLastItem} of {totalRows}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`${currentPage - 1}`}
                className={cn(
                  !hasPreviousPage && "pointer-events-none	opacity-30"
                )}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href={`${currentPage - 1}`}
                className={cn(
                  !hasPreviousPage && "pointer-events-none	opacity-0"
                )}
              >
                {currentPage - 1}
              </PaginationLink>
              <PaginationLink href="#" isActive>
                {currentPage}
              </PaginationLink>

              <PaginationLink
                href={`${currentPage + 1}`}
                className={cn(!hasNextPage && "pointer-events-none	opacity-0")}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>

            <>
              <PaginationItem>
                <PaginationEllipsis
                  className={cn(
                    !hasTwoNextPage && "pointer-events-none	opacity-0"
                  )}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={`${currentPage + 1}`}
                  className={cn(
                    !hasNextPage && "pointer-events-none opacity-30"
                  )}
                />
              </PaginationItem>
            </>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function FilePenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
