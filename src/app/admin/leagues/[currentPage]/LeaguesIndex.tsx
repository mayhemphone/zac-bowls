"use client";

import FilePenIcon from "@/components/icons/FilePen";
import TrashIcon from "@/components/icons/Trash";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IndexProps } from "@/components/CRUD-Template/Index";
import { getPaginatedLeagues } from "@/db/queries/leagues";

// style={{
//   wordBreak: "break-all",
//   wordWrap: "break-word",
//   overflowWrap: "break-word",
//   whiteSpace: "normal",
// }}

type Props = Omit<
  IndexProps,
  | "handleCreateItem"
  | "handleEditItem"
  | "handleDeleteItem"
  | "schema"
  | "items"
> & {
  items: Awaited<ReturnType<typeof getPaginatedLeagues>>;
};

const LeaguesIndex = ({ items, pageSize, currentPage, totalRows }: Props) => {
  console.log("✅", { items });

  const handleCreateItem = () => {
    // Logic to handle item creation, such as a database call
  };

  const handleEditItem = (id: number | string) => {
    // Logic to handle item editing
  };

  const handleDeleteItem = (id: number | string) => {
    // Logic to handle item deletion
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
        <h1 className="text-2xl font-bold uppercase">Leagues</h1>
        {handleCreateItem && (
          <Button onClick={() => handleCreateItem()} size="sm">
            Create New
          </Button>
        )}
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="uppercase font-extrabold">
              <TableHead className="">id</TableHead>
              <TableHead className="">name</TableHead>
              <TableHead className="">ls league id</TableHead>
              <TableHead className="">day</TableHead>
              <TableHead className="">time</TableHead>
              <TableHead className="">start date</TableHead>
              <TableHead className="">end date</TableHead>
              <TableHead className="">season</TableHead>
              <TableHead className="">position</TableHead>
              <TableHead className="w-[120px] text-center">actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <p>{item.id}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item.name}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item.lsLeagueId}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item.day}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item.time}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item.startDate}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item.endDate}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item.season}</p>
                  </TableCell>
                  <TableCell>
                    <p>{item.position}</p>
                  </TableCell>
                  <TableCell>
                    {item.leagueTrimesters.map((tri) => (
                      <p key={tri.id}>{tri.name}</p>
                    ))}
                  </TableCell>
                  <TableCell>
                    <p>{item.leagueNights.length}</p>
                  </TableCell>

                  {/* actions column */}
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

export default LeaguesIndex;
