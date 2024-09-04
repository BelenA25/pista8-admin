"use client";

import { database } from "@/app/firebaseConfig";
import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSection from "@/components/table-section";
import Title from "@/components/title";
import { useEffect, useState } from "react";
import { ref, onValue, orderByKey, query, startAfter, limitToFirst, set, orderByChild, endAt, startAt } from "firebase/database";

export default function Applications() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6); // Dynamic item count based on window size
    const [totalItems, setTotalItems] = useState<number>(0);
    const [lastKey, setLastKey] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        // Function to handle resize events and set items per page accordingly
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
                const applicationsData = data ? Object.values(data) : [];
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

        estimateTotalItems();
        fetchingData();
    }, [currentPage, itemsPerPage]);

    const fetchInitialData = async () => {
        const applicationsRef = ref(database, 'applications');
        const queryApplications = query(
            applicationsRef,
            orderByKey(),
            limitToFirst(itemsPerPage)
        );
    
        onValue(queryApplications, (snapshot) => {
            const data = snapshot.val();
            const applicationsData = data ? Object.values(data) : [];
            setLastKey(applicationsData.length ? Object.keys(data)[applicationsData.length - 1] : null);
            setData(applicationsData);
            setTotalItems(applicationsData.length); // Ajusta si tienes una manera de contar todos los items
        });
    };
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (searchTerm: string) => {
        if(!searchTerm.trim()){
            setIsSearching(false);
            setCurrentPage(0);
            fetchInitialData();
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
            const applicationsData = data ? Object.values(data) : [];
            setData(applicationsData);
        });
    }
    

    return (
        <>
            <Title title="Lista De Postulaciones Startups " />
            <SearchCard  onSearch={handleSearch}/>
            <TableSection appl={data} />
            {!isSearching &&(

            <PaginationSection
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / itemsPerPage)}
                onPageChange={handlePageChange}
            />
            )}
        </>
    );
}
