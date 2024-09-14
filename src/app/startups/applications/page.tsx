"use client";

import { use, useCallback, useEffect, useState } from "react";
import PaginationSection from "@/components/PaginationSection";
import SearchCard from "@/components/SearchCard";
import TableSection from "@/components/TableSection";

import {
  estimateTotalItems,
  fetchAllKeys,
  fetchData,
  handleResize,
} from "@/lib/utils";
import TitleSection from "@/components/TitleSection";
import InformationButton from "@/components/InformationButton";
import QuestionButton from "@/components/QuestionButton";

const TYPE = "applications";

export default function Applications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  const [lastKeys, setLastKeys] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allKeys, setAllKeys] = useState<string[]>([]);

  useEffect(() => {
    const onResize = () => handleResize(setItemsPerPage);

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const fetchDataCallback = useCallback(() => {
    fetchData(
      TYPE,
      searchTerm,
      currentPage,
      itemsPerPage,
      "startup_name",
      allKeys,
      setData,
      setLastKeys
    );
  }, [searchTerm, currentPage, itemsPerPage, allKeys]);

  useEffect(() => {
    fetchAllKeys(TYPE, setAllKeys, setTotalItems);
  }, []);

  useEffect(() => {
    estimateTotalItems(TYPE, setTotalItems);
    fetchDataCallback();
  }, [currentPage, itemsPerPage, searchTerm, fetchDataCallback]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchClick = (term: string) => {
    setSearchTerm(term);
  };

  const handleDelete = () => {
    fetchDataCallback();
  };
  const mapStartupsApplicationsToRowDataProps = (item: any) => ({
    itemId: item.id,
    itemName: item.startup_name,
    itemGeneric1: item.full_name,
    itemGeneric2: item.email,
    itemGeneric3: item.phone,
    detailButton: (
      <QuestionButton
          mentorDetails={{
              name: item.full_name,
              city: item.city,
              phone: item.phone,
              email: item.email,
              experience: item.statup_description,
              satisfaction: item.startup_stage
          }}
      />)
});
  return (
    <>
      <TitleSection
        text="Lista De Postulaciones Startups"
        typeName= {`startups/applications/`}
      />
      <SearchCard onSearchClick={handleSearchClick} entityName="Startup"></SearchCard>

      <TableSection
        mapItemToRowDataProps={mapStartupsApplicationsToRowDataProps}
        data={data}
        handleDelete={handleDelete}
        searchTerm={searchTerm}
        itemType={"applications"}
      />
      {!searchTerm && (
        <PaginationSection
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={handlePageChange}
        ></PaginationSection>
      )}
      
    </>
  );
}
