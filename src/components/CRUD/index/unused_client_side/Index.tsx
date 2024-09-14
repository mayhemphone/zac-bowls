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
import { IndexProps } from "@/types";
import FilePenIcon from "../../../icons/FilePen";
import TrashIcon from "../../../icons/Trash";

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

  const lastPage = Math.ceil(totalRows / pageSize);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = totalRows > currentPage * pageSize;
  const hasTwoNextPage = totalRows > (currentPage + 1) * pageSize;
  const hasThreeNextPage = totalRows > (currentPage + 2) * pageSize;

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
                    <TableCell key={JSON.stringify(item[col.prop], null, 2)}>
                      {col.object && (
                        <pre>{JSON.stringify(item[col.prop], null, 2)}</pre>
                      )}
                      {col.length && item[col.prop].length}
                      {!col.length && !col.object && (
                        <p
                          style={{
                            wordBreak: "break-all",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {item[col.prop]}
                        </p>
                      )}
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

            <PaginationItem>
              <PaginationEllipsis
                className={cn(
                  !hasThreeNextPage && "pointer-events-none	opacity-0"
                )}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href={`${lastPage}`}
                className={cn(
                  !hasThreeNextPage && "pointer-events-none	opacity-0"
                )}
              >
                {lastPage}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href={`${currentPage + 1}`}
                className={cn(!hasNextPage && "pointer-events-none opacity-30")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
