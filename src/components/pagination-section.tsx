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

// Number of pages to display around the current page
const PAGE_RANGE = 2;

// Constants for adjusting page range
const ADJACENT_PAGES = PAGE_RANGE * 2;
const FIRST_PAGE = 1;
const ELLIPSIS = '...';

export default function PaginationSection({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationSectionProps) {
  const handlePageChange = (page: number) => {
    if (page >= FIRST_PAGE && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    let pages = [];
    let startPage: number, endPage: number;

    if (totalPages <= ADJACENT_PAGES + 1) {
      // If total pages is less than or equal to the range we want to show
      startPage = FIRST_PAGE;
      endPage = totalPages;
    } else {
      // Calculate the start and end page ranges dynamically
      if (currentPage <= PAGE_RANGE + 1) {
        startPage = FIRST_PAGE;
        endPage = ADJACENT_PAGES + 1;
      } else if (currentPage + PAGE_RANGE >= totalPages) {
        startPage = totalPages - ADJACENT_PAGES;
        endPage = totalPages;
      } else {
        startPage = currentPage - PAGE_RANGE;
        endPage = currentPage + PAGE_RANGE;
      }
    }

    // Push the page numbers to display
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis if necessary
    if (startPage > FIRST_PAGE) {
      pages.unshift(ELLIPSIS);
    }
    if (endPage < totalPages) {
      pages.push(ELLIPSIS);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > FIRST_PAGE && (
          <PaginationItem>
            <PaginationPrevious
              onClick={(event) => {
                event.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}
        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === ELLIPSIS ? (
              <PaginationLink>...</PaginationLink>
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={(event) => {
                  event.preventDefault();
                  handlePageChange(page as number);
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
