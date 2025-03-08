
"use client"

import Loader from "@/components/shared/Loader";
import TitleMedicin from "@/components/shared/TitleMedicin";
import { getAllUsers } from "@/services/UserService";
import { useEffect, useState } from "react";



const AllUsersPage = ({ users }: any) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUsers] = useState(users?.result || []);
    const [totalUsers, setTotalUsers] = useState(users?.meta?.total || 0);
    const [limit, setLimit] = useState(users?.meta?.limit || 10);
    const [totalPage, setTotalPage] = useState(users?.meta?.totalPage || 1);
    const [isLoading, setIsLoading] = useState(false);

    console.log(users?.meta);


    const handlePageChange = async (page: number) => {
        setIsLoading(true);
        setCurrentPage(page);
        try {
            const { data: newUsers } = await getAllUsers(page, 10);

            if (newUsers) {
                setUsers(newUsers?.result);
                setTotalUsers(newUsers?.meta?.total);
                setLimit(newUsers?.meta?.limit);
                setTotalPage(newUsers?.meta?.totalPage);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handlePageChange(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };


    return (
        <div>
            <div className="mt-2">
                <TitleMedicin title={`ALL USER - `} />
            </div>

        </div>
    );
};

export default AllUsersPage;
