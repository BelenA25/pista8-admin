"use client"

import { useCallback, useEffect, useState } from "react";
import { estimateTotalItems, fetchAllKeys, fetchData, handleResize } from "@/lib/utils";
import LinkedInButton from "@/components/LinkedinButton";
import SearchCard from "@/components/SearchCard";
import TableSection from "@/components/TableSection";
import PaginationSection from "@/components/PaginationSection";
import QuestionButton from "@/components/QuestionButton";
import TitleSection from "@/components/TitleSection";

const TYPE = 'mentor-applications'

export default function MentorApplications() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [lastKeys, setLastKeys] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allKeys, setAllKeys] = useState<string[]>([]);

    useEffect(() => {
        const onResize = () => handleResize(setItemsPerPage);

        window.addEventListener('resize', onResize);
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const fetchDataCallback = useCallback(() => {
        fetchData(TYPE, searchTerm, currentPage, itemsPerPage, "full_name", allKeys, setData, setLastKeys);
    }, [searchTerm, currentPage, itemsPerPage, allKeys]);

    useEffect(() => {
        fetchAllKeys(TYPE, setAllKeys, setTotalItems);
    }, []);
    useEffect(() => {
        estimateTotalItems(TYPE, setTotalItems);
        fetchDataCallback();
        console.log(totalItems);
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

    const mapMentorApplicationsToRowDataProps = (item: any) => ({
        itemId: item.id,
        itemName: item.full_name,
        itemGeneric1: item.city,
        itemGeneric2: item.email,
        itemGeneric3: item.phone,
        imageUrl: item.imageUrl || "",
        LinkedInButton: item.linkedin_link ? (
            <LinkedInButton link={item.linkedin_link} />
        ) : undefined,
        detailButton: (
            <QuestionButton
                mentorDetails={{
                    name: item.full_name,
                    city: item.city,
                    phone: item.phone,
                    email: item.email,
                    linkedin: item.linkedin_link || "",
                    facebook: item.facebook_link || "",
                    twitter: item.twitter_link || "",
                    experience: item.areas_of_experience || "",
                    satisfaction: item.startup_appreciation || ""
                }}
            />)
    });

    return (
        <>
            <TitleSection text={"Lista de Postulaciones a Mentores"} typeName={TYPE} showAddButton={false}></TitleSection>
            <SearchCard onSearchClick={handleSearchClick} entityName={"mentor"} ></SearchCard>
            <TableSection
                data={data}
                searchTerm={searchTerm}
                handleDelete={handleDelete}
                itemType={TYPE}
                mapItemToRowDataProps={mapMentorApplicationsToRowDataProps}
            />
            {!searchTerm && (
                <PaginationSection
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalItems / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    )
}