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
import IngestionIcon from "@/components/icons/Ingest";
import LinkOutIcon from "@/components/icons/LinkOut";
import PopUpPre from "@/components/PopUpPre";
import { getPaginatedLinks } from "@/db/queries/links";

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
  items: Awaited<ReturnType<typeof getPaginatedLinks>>;
};

const LinksIndex = ({ items, pageSize, currentPage, totalRows }: Props) => {
  console.log("✅", { items });

  const handleCreateItem = () => {
    // Logic to handle item creation, such as a database call
  };

  const ingestLink = (id: number | string) => {
    // Logic to handle item ingestion
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
        <h1 className="text-2xl font-bold uppercase">Games</h1>
        {handleCreateItem && (
          <Button onClick={() => handleCreateItem()} size="sm">
            Create New
          </Button>
        )}
      </div>
      <div className="">
        <Table className="border rounded-lg">
          <TableHeader>
            <TableRow className="uppercase font-extrabold">
              <TableHead className="">id</TableHead>
              <TableHead className="">url</TableHead>
              <TableHead className="">email date</TableHead>
              <TableHead className="">games</TableHead>
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
                  <TableCell className="text-center">
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <LinkOutIcon className="h-4 w-4 m-auto " />
                    </a>
                  </TableCell>
                  <TableCell>
                    <p>{item.emailDate}</p>
                  </TableCell>
                  <TableCell>
                    <PopUpPre
                      str={JSON.stringify(
                        item.games.map((game: any) => ({
                          ...game,
                          rawData: JSON.parse(game.rawData),
                        })),
                        null,
                        2
                      )}
                    />
                  </TableCell>
                  {/* actions column */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => ingestLink(item.id)}
                        size="icon"
                        variant="ghost"
                        title="Ingest Game"
                      >
                        <IngestionIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleEditItem(item.id)}
                        size="icon"
                        variant="ghost"
                        title="Edit Link"
                      >
                        <FilePenIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteItem(item.id)}
                        size="icon"
                        variant="ghost"
                        title="Delete Link"
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

export default LinksIndex;
