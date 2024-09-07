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

const PAGE_RANGE = 2; // number of pages to display

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

  
  const getPageNumbers = () => {
    let pages = [];
    let startPage: number, endPage: number;

    if (totalPages <= PAGE_RANGE * 2 + 1) {
      
      startPage = 1;
      endPage = totalPages;
    } else {
   
      if (currentPage <= PAGE_RANGE + 1) {
        startPage = 1;
        endPage = PAGE_RANGE * 2 + 1;
      } else if (currentPage + PAGE_RANGE >= totalPages) {
        startPage = totalPages - PAGE_RANGE * 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - PAGE_RANGE;
        endPage = currentPage + PAGE_RANGE;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

   
    if (startPage > 1) {
      pages.unshift('...');
    }
    if (endPage < totalPages) {
      pages.push('...');
    }

    return pages;
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
        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === '...' ? (
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
