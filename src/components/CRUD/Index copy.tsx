/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Je3eFIPjtS2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getGamesCount, getPaginatedGames } from "@/db/queries";
import { useEffect, useState } from "react";

type Games = Awaited<ReturnType<typeof getPaginatedGames>>;

export default function Index() {
  const [items, setItems] = useState<Games>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / pageSize);

  useEffect(() => {
    getPaginatedGames(currentPage, pageSize).then(setItems);
    getGamesCount().then(setTotalRows);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleCreateItem = () => {};
  const handleEditItem = (item: any) => {};
  const handleDeleteItem = (item: any) => {};

  return (
    <div className="w-full mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">CRUD Interface</h1>

        <Button onClick={handleCreateItem} size="sm">
          Create New
        </Button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>id</TableHead>
              <TableHead>date</TableHead>
              <TableHead>game #</TableHead>
              <TableHead>score</TableHead>
              <TableHead># of frames</TableHead>
              <TableHead>actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.frames?.length}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleEditItem(item)}
                      size="icon"
                      variant="ghost"
                    >
                      <FilePenIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteItem(item)}
                      size="icon"
                      variant="ghost"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-muted-foreground w-full">
          Showing {indexOfFirstItem + 1} - {indexOfLastItem} of {totalRows}{" "}
          games
        </div>
        <Pagination
        // currentPage={1}
        // totalPages={totalPages}
        // onPageChange={handlePageChange}
        />
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
