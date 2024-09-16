"use client";
import CreateForm from "@/components/CRUD/create/CreateForm";

import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { InsertRecordFunction, TableName } from "@/db/schema";
import { type IndexProps } from "@/types";
import { useState } from "react";

type Props<T extends TableName> = Omit<
  IndexProps,
  | "handleCreateItem"
  | "handleEditItem"
  | "handleDeleteItem"
  | "schema"
  | "items"
> & {
  insertRecord: InsertRecordFunction<T>;
  deleteFunction: (id: number) => void;
  tableName: T;
  children: React.ReactNode;
};

const Index = <T extends TableName>({
  pageSize,
  currentPage,
  totalRows,
  insertRecord,
  tableName,
  children,
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  const lastPage = Math.ceil(totalRows / pageSize);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = totalRows > currentPage * pageSize;
  const hasThreeNextPage = totalRows > (currentPage + 2) * pageSize;

  return (
    <div className="w-full mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold uppercase">{tableName}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Create New</Button>
          </DialogTrigger>
          <CreateForm
            tableName={tableName}
            insertRecord={insertRecord}
            setOpen={setOpen}
          />
        </Dialog>
      </div>
      <div className="border rounded-lg overflow-hidden">
        {/* if i pass in this table from the page, this can become a generic index! */}
        {children}
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

export default Index;
