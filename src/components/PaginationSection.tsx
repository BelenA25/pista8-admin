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

    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={(event) => { event.preventDefault(); handlePageChange(currentPage - 1); }} />
                    </PaginationItem>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink href="#" isActive={page === currentPage} onClick={() => handlePageChange(page)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={(event) => { event.preventDefault(); handlePageChange(currentPage + 1); }} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}