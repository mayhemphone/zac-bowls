"use client";

import CreateForm from "@/components/CRUD/create/CreateForm";
import FilePenIcon from "@/components/icons/FilePen";
import TrashIcon from "@/components/icons/Trash";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getPaginatedManufacturers } from "@/db/queries/manufacturers";
import { type IndexProps } from "@/types";
import { useRouter } from "next/navigation";

type Props = Omit<
  IndexProps,
  | "handleCreateItem"
  | "handleEditItem"
  | "handleDeleteItem"
  | "schema"
  | "items"
> & {
  items: Awaited<ReturnType<typeof getPaginatedManufacturers>>;
  insertFunction: any;
  deleteFunction: (id: number) => Promise<
    {
      [x: string]: any;
    }[]
  >;
};

const ManufacturersIndex = ({
  items,
  pageSize,
  currentPage,
  totalRows,
  insertFunction,
  deleteFunction,
}: Props) => {
  console.log("✅", { items });
  const router = useRouter();

  const handleCreateItem = () => {
    // Logic to handle item creation, such as a database call
  };

  const handleEditItem = (id: number | string) => {
    // Logic to handle item editing
  };

  const handleDeleteItem = async (id: number) => {
    // Logic to handle item deletion
    await deleteFunction(id);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  const lastPage = Math.ceil(totalRows / pageSize);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = totalRows > currentPage * pageSize;
  const hasThreeNextPage = totalRows > (currentPage + 2) * pageSize;

  return (
    <div className="w-full mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold uppercase">Manufacturers</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create New</Button>
          </DialogTrigger>
          <CreateForm
            tableName={"manufacturers"}
            insertRecord={insertFunction as any}
          />
        </Dialog>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="uppercase font-extrabold">
              <TableHead className="">id</TableHead>
              <TableHead className="">name</TableHead>
              <TableHead className="">ball #</TableHead>
              <TableHead className="w-[120px] text-center">actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
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
                  <TableCell className="w-[20px]">
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

      <Pagination
        currentPage={currentPage}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        lastPage={lastPage}
        hasThreeNextPage={hasThreeNextPage}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        totalRows={totalRows}
      />
    </div>
  );
};

export default ManufacturersIndex;
