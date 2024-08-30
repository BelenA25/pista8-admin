"use client"

import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSection from "@/components/table-section";
import Title from "@/components/title";
import { useEffect, useState } from "react";

const ITEMS_PAGE = 8;

export default function Startups() {
    
    return (
        <>
            <Title></Title>
            <SearchCard></SearchCard>
            <TableSection data={}></TableSection>
            <PaginationSection currentPage={} totalPages={} onPageChange={}></PaginationSection>        </>
    )
}