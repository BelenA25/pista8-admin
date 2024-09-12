"use client"

import PaginationSection from "@/components/PaginationSection";
import { useCallback, useEffect, useState } from "react";
import { estimateTotalItems, fetchAllKeys, fetchData, handleResize } from "@/lib/utils";
import Title from "@/components/title";
import SearchCard from "@/components/SearchCard";
import TableSection from "@/components/TableSection";

const TYPE = 'startups'

export default function Startups() {
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
    const mapStartupsToRowDataProps = (item: any) => ({
        itemId: item.id,
        itemName: item.name,
        imageUrl: item.imageUrl,
        itemGeneric1: item.sector
    });

    return (
        <>
            <Title text={"Lista de Startups"} typeName={TYPE} ></Title>
            <SearchCard onSearchClick={handleSearchClick} ></SearchCard>
            <TableSection
                data={data}
                searchTerm={searchTerm}
                handleDelete={handleDelete}
                itemType={"startups"}
                mapItemToRowDataProps={mapStartupsToRowDataProps}
            >
            </TableSection>
            {!searchTerm && (<PaginationSection currentPage={currentPage} totalPages={Math.ceil(totalItems / itemsPerPage)} onPageChange={handlePageChange}></PaginationSection>)}
        </>
    )
}