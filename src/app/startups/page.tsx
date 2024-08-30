"use client"

import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSection from "@/components/table-section";
import Title from "@/components/title";
import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";

const ITEMS_PAGE = 6;

export default function Startups() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const startupsRef = ref(database, 'startups');
        onValue(startupsRef, (snapshot) => {
            const data = snapshot.val();
            const startupList = data ? Object.values(data) : [];
            setData(startupList);
        });
    }, []);

    const totalPages = Math.ceil(data.length / ITEMS_PAGE);
    const paginatedData = data.slice((currentPage - 1) * ITEMS_PAGE, currentPage * ITEMS_PAGE);

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