import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface PaginationSectionProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationSection({ currentPage, totalPages, onPageChange }: PaginationSectionProps) {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    // Determine the range of pages to show
    const pageRange = 7;
    const startPage = Math.max(1, Math.min(currentPage - Math.floor(pageRange / 2), totalPages - pageRange + 1));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    const showEllipsisLeft = startPage > 1;
    const showEllipsisRight = endPage < totalPages;

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(event) => { 
                                event.preventDefault(); 
                                handlePageChange(currentPage - 1); 
                            }}
                        />
                    </PaginationItem>
                )}

               
                {showEllipsisLeft && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(event) => { 
                                    event.preventDefault(); 
                                    handlePageChange(1); 
                                }}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationEllipsis />
                    </>
                )}

                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(event) => { 
                                event.preventDefault(); 
                                handlePageChange(page); 
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

               
                {showEllipsisRight && (
                    <>
                        <PaginationEllipsis />
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(event) => { 
                                    event.preventDefault(); 
                                    handlePageChange(totalPages); 
                                }}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {/* Next Button */}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
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
