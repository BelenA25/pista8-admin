
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationSection({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationSectionProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  const pageRange = (current: number, total: number) => {
    const delta = 2;
    const range: number[] = [];
    let start = Math.max(current - delta, 1);
    let end = Math.min(current + delta, total);

    if (start > 1) {
      range.push(1);
      if (start > 2) range.push(-1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < total) {
      if (end < total - 1) range.push(-1);
      range.push(total);
    }

    return range;
  };
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={(event) => {
                event.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}
        {pageRange(currentPage, totalPages).map((page, index) => (
          <PaginationItem key={index}>
            {page === -1 ? (
              <span className="pagination-ellipsis">…</span>
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={(event) => {
                  event.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={(event) => {
                event.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

