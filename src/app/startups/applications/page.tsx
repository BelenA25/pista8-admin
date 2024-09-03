"use client";
import { database } from "@/app/firebaseConfig";
import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSectionAplications from "@/components/table-section-applications";
import Title from "@/components/title";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

const ITEMS_PAGE = 6; // Mostrar 6 elementos por página


export default function Applications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const applicationsRef = ref(database, "applications");
    onValue(applicationsRef, (snapshot) => {
      const data = snapshot.val();
      const applicationList = data ? Object.values(data) : [];
      setData(applicationList);
    });
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PAGE,
    currentPage * ITEMS_PAGE
  );

//  console.log(`current: ${currentPage}, paginate: ${paginatedData.length} items, total: ${totalPages} pages`);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Title title="Lista De Postulaciones Startups " />
      <SearchCard />
      <TableSectionAplications data={paginatedData} />
      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
