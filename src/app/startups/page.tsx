"use client"

import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSection from "@/components/table-section";
import Title from "@/components/title";
import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { limitToFirst, onValue, orderByKey, query, ref, startAt } from "firebase/database";

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
        const fetchingData = async () => {
            const start = (currentPage - 1) * itemsPerPage;
            const startupsReference = ref(database, 'startups');
            const queryStartups = query(
                startupsReference,
                orderByKey(),
                startAt(start.toString()),
                limitToFirst(itemsPerPage)
            );
            onValue(queryStartups, (snapshot) => {
                const data = snapshot.val();
                const startupsData = data ? Object.values(data) : [];
                setData(startupsData);
            });
        };
        fetchingData();
    }, [currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Title></Title>
            <SearchCard></SearchCard>
            <TableSection data={data}></TableSection>
            <PaginationSection currentPage={currentPage} totalPages={1} onPageChange={handlePageChange}></PaginationSection>        
        </>
    )
}