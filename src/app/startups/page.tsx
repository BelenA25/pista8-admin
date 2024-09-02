"use client"

import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSection from "@/components/table-section";
import Title from "@/components/title";
import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";

export default function Startups() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            const tableHeight = window.innerHeight - 200;
            const itemHeight = 80;
            const newItemsPerPage = Math.floor(tableHeight / itemHeight);
            setItemsPerPage(newItemsPerPage);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const startupsRef = ref(database, 'startups');
        onValue(startupsRef, (snapshot) => {
            const data = snapshot.val();
            const startupList = data ? Object.values(data) : [];
            setData(startupList);
        });
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <>
            <Title></Title>
            <SearchCard></SearchCard>
            <TableSection data={paginatedData}></TableSection>
            <PaginationSection currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}></PaginationSection>        </>
    )
}