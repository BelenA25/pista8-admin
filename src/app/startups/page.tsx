"use client"

import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSection from "@/components/table-section";
import Title from "@/components/title";
import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { limitToFirst, onValue, orderByKey, query, ref, startAfter, startAt } from "firebase/database";

export default function Startups() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [lastKey, setLastKey] = useState<string | null>(null);

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
            const startupsReference = ref(database, 'startups');
            let queryStartups;

            if (currentPage === 1) {
                queryStartups = query(
                    startupsReference,
                    orderByKey(),
                    limitToFirst(itemsPerPage)
                );
            } else {
                queryStartups = query(
                    startupsReference,
                    orderByKey(),
                    startAfter(lastKey),
                    limitToFirst(itemsPerPage)
                );
            }
            onValue(queryStartups, (snapshot) => {
                const data = snapshot.val();
                const startupsData = data ? Object.values(data) : [];
                setLastKey(startupsData.length ? Object.keys(data)[startupsData.length - 1] : null);
                setData(startupsData);
            });
        };

        const estimateTotalItems = async () => {
            const startupsReference = ref(database, 'startups');
            const queryStartups = query(
                startupsReference,
                orderByKey(),
                limitToFirst(100)
            );
            onValue(queryStartups, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const keys = Object.keys(data);
                    setTotalItems(keys.length);
                }
            });
        };
        estimateTotalItems();
        fetchingData();
    }, [currentPage, itemsPerPage]);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Title
                title="Lista de Startups"
                href="startups/create"
            />
            <SearchCard ></SearchCard>
            <TableSection data={data} ></TableSection>
            <PaginationSection currentPage={currentPage} totalPages={Math.ceil(totalItems / itemsPerPage)} onPageChange={handlePageChange}></PaginationSection>        
        </>
    )
}