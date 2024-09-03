"use client"

import { database } from "@/app/firebaseConfig";
import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card"
import TableSection from "@/components/table-section"
import Title from "@/components/title"
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";



const ITEMS_PAGE = 6;

export default function Applications () {

  
const [currentPage, setCurrentPage] = useState(1);
const [data, setData] = useState<any[]>([]);

useEffect(() => {
    const applicationsRef = ref(database, 'applications');
    onValue(applicationsRef, (snapshot) => {
        const data = snapshot.val();
        const applicationList = data ? Object.values(data) : [];
        setData(applicationList);
    });
}, []);

const totalPages = Math.ceil(data.length / ITEMS_PAGE);
const paginatedData = data.slice((currentPage - 1) * ITEMS_PAGE, currentPage * ITEMS_PAGE);

const handlePageChange = (page: number) => {
    setCurrentPage(page);
};
  return (
    <>
        <Title
         title="Lista De Postulaciones Startups "
        />
        <SearchCard/>
      <TableSection
       appl={paginatedData}
       />
        {/* <PaginationSection currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}></PaginationSection>   */}


    </>
  )
}
