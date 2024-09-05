"use client";

import React, { useState, useEffect } from "react";
import { ref, onValue, query, limitToFirst, remove, orderByKey, startAfter, endAt, orderByChild, startAt } from "firebase/database";
import { database } from "@/app/firebaseConfig";
import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSection from "@/components/table-section";
import Title from "@/components/title";


export default function Applications() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6); // Dynamic item count based on window size
    const [totalItems, setTotalItems] = useState<number>(0);
    const [lastKey, setLastKey] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(false);

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

    const fetchInitialData = async () => {
        const applicationsRef = ref(database, 'applications');
        let queryApplications;

        if (currentPage === 1) {
            queryApplications = query(
                applicationsRef,
                orderByKey(),
                limitToFirst(itemsPerPage)
            );
        } else {
            queryApplications = query(
                applicationsRef,
                orderByKey(),
                startAfter(lastKey),
                limitToFirst(itemsPerPage)
            );
        }

        onValue(queryApplications, (snapshot) => {
            const data = snapshot.val();
            const applicationsData = data 
                ? Object.entries(data).map(([id, value]) => ({ id, ...((value && typeof value === 'object') ? value : {}) }))
                : [];
            setLastKey(applicationsData.length ? Object.keys(data)[applicationsData.length - 1] : null);
            setData(applicationsData);
        });
    };

    const estimateTotalItems = async () => {
        const applicationsRef = ref(database, 'applications');
        const queryApplications = query(
            applicationsRef,
            orderByKey(),
            limitToFirst(100)
        );
        onValue(queryApplications, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const keys = Object.keys(data);
                setTotalItems(keys.length);
            }
        });
    };

    useEffect(() => {
        estimateTotalItems();
        fetchInitialData();
    }, [currentPage, itemsPerPage]);

    //delete application
    const handleDeleteApplication = (id: string) => {
        const applicationRef = ref(database, `applications/${id}`);
        remove(applicationRef)
            .then(() => {
                setData((prevData) => prevData.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.error("Error al eliminar la aplicación:", error);
            });
    };

    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setIsSearching(false);
            setCurrentPage(1); // Set to the first page
            fetchInitialData(); // Fetch initial data if search term is empty
            return;
        }
        setIsSearching(true);
        const applicationsRef = ref(database, 'applications');
        const searchQuery = query(
            applicationsRef,
            orderByChild('startup_name'),
            startAt(searchTerm),
            endAt(searchTerm + "\uf8ff")
        );

        onValue(searchQuery, (snapshot) => {
            const data = snapshot.val();
            const applicationsData = data 
                ? Object.entries(data).map(([id, value]) => ({ id, ...((value && typeof value === 'object') ? value : {}) }))
                : [];
            setData(applicationsData);
        });
    }

    return (
        <>
            <Title title="Lista De Postulaciones Startups " />
            <SearchCard onSearch={handleSearch} />
            <TableSection appl={data} onDelete={handleDeleteApplication} />
            {!isSearching && (
                <PaginationSection
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalItems / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
}
