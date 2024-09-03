"use client"

import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSection from "@/components/table-section";
import Title from "@/components/title";
import { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { equalTo, limitToFirst, onValue, orderByChild, orderByKey, query, ref, startAfter } from "firebase/database";

export default function Startups() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [lastKey, setLastKey] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

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

            if (searchTerm) {
                queryStartups = query(
                  startupsReference,
                  orderByChild('name'), 
                  equalTo(searchTerm)
                );
              } else if (currentPage === 1) {
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
    }, [currentPage, itemsPerPage, searchTerm]);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleSearchClick = (term: string) => {
        setSearchTerm(term);
      };
    return (
        <>
            <Title></Title>
            <SearchCard onSearchClick={handleSearchClick} ></SearchCard>
            <TableSection data={data}></TableSection>
            {!searchTerm && (<PaginationSection currentPage={currentPage} totalPages={Math.ceil(totalItems / itemsPerPage)} onPageChange={handlePageChange}></PaginationSection>)}      
        </>
    )
}