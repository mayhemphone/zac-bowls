import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  lastPage: number;
  hasThreeNextPage: boolean;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalRows: number;
};

const Pagination = ({
  indexOfFirstItem,
  currentPage,
  hasPreviousPage,
  hasNextPage,
  lastPage,
  hasThreeNextPage,
  indexOfLastItem,
  totalRows,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-muted-foreground w-full">
        Showing {indexOfFirstItem + 1} - {indexOfLastItem} of {totalRows}
      </div>

      <BasePagination style={{ justifyContent: "end" }}>
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
              className={cn(!hasPreviousPage && "pointer-events-none	opacity-0")}
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
      </BasePagination>
    </div>
  );
};

export default Pagination;
