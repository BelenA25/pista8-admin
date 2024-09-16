"use client"

import { useCallback, useEffect, useState } from "react";
import { estimateTotalItems, fetchAllKeys, fetchData, handleResize } from "@/lib/utils";
import LinkedInButton from "@/components/LinkedinButton";
import SearchCard from "@/components/SearchCard";
import TableSection from "@/components/TableSection";
import PaginationSection from "@/components/PaginationSection";
import QuestionButton from "@/components/QuestionButton";
import TitleSection from "@/components/TitleSection";
import useAuth from "@/hooks/useAuth";
import AuthHandler from "@/components/AuthHandler";

const TYPE = 'mentor-applications'

export default function MentorApplications() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [lastKeys, setLastKeys] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allKeys, setAllKeys] = useState<string[]>([]);
    const { user, loading} = useAuth();


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
        genericButton: item.linkedin_link ? (
            <LinkedInButton link={item.linkedin_link} />
        ) : undefined,
        detailButton: (
            <QuestionButton
                details={{
                    title: item.full_name,
                    subtitle: item.city,
                    sections: [
                        {
                            title: "Datos personales",
                            items: [
                                { label: "Teléfono", value: item.phone },
                                { label: "Email", value: <a href={`mailto:${item.email}`}>{item.email}</a> },
                                item.linkedin_link && { label: "LinkedIn", value: <a href={item.linkedin_link}>Perfil de LinkedIn</a> },
                                item.facebook_link && { label: "Facebook", value: <a href={item.facebook_link}>Perfil de Facebook</a> },
                                item.twitter_link && { label: "Twitter", value: <a href={item.twitter_link}>Perfil de Twitter</a> },
                            ].filter(Boolean),
                        },
                        {
                            title: "Experiencia",
                            items: [
                                { label: "Áreas de experiencia", value: item.areas_of_experience || "N/A" },
                                { label: "Apreciación de startups", value: item.startup_appreciation || "N/A" },
                            ],
                        },
                    ],
                }}
            />)
    });

    return (
        <AuthHandler user={user} loading={loading}>
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
        </AuthHandler>
    )
}