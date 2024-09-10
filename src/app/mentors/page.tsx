"use client"

import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSection from "@/components/table-section";
import Title from "@/components/title";
import { useCallback, useEffect, useState } from "react";
import { estimateTotalItems, fetchAllKeys, fetchData, handleResize } from "@/lib/utils";
import LinkedInButton from "@/components/linkedin-button";

const TYPE = 'mentors'

export default function Mentors() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [lastKeys, setLastKeys] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allKeys, setAllKeys] = useState<string[]>([]);

    useEffect(() => {
        const onResize = () => handleResize(setItemsPerPage);

        window.addEventListener('resize', onResize);
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const fetchDataCallback = useCallback(() => {
        fetchData(TYPE, searchTerm, currentPage, itemsPerPage, allKeys, setData, setLastKeys);
    }, [searchTerm, currentPage, itemsPerPage, allKeys]);

    useEffect(() => {
        fetchAllKeys(TYPE, setAllKeys, setTotalItems);
    }, []);
    useEffect(() => {
        estimateTotalItems(TYPE, setTotalItems);
        fetchDataCallback();
    }, [currentPage, itemsPerPage, searchTerm, fetchDataCallback]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchClick = (term: string) => {
        setSearchTerm(term);
    };

    const handleDelete = () => {
        fetchDataCallback();
    };

    const mapMentorsToRowDataProps = (item: any) => ({
        itemId: item.id,
        itemName: item.name,
        imageUrl: item.imageUrl,
        itemGeneric1: item.title,
        itemGeneric2: item.city,
        LinkedInButton: item.linkedin_link ? (
            <LinkedInButton link={item.linkedin_link} />
        ) : undefined
    });

    return (
        <>
            <Title text={"Lista de Mentores"} typeName={TYPE} ></Title>
            <SearchCard onSearchClick={handleSearchClick} ></SearchCard>
            <TableSection
                data={data}
                searchTerm={searchTerm}
                handleDelete={handleDelete}
                itemType={"mentors"}
                mapItemToRowDataProps={mapMentorsToRowDataProps}
            >
            </TableSection>
            {!searchTerm && (<PaginationSection currentPage={currentPage} totalPages={Math.ceil(totalItems / itemsPerPage)} onPageChange={handlePageChange}></PaginationSection>)}
        </>
    )
}