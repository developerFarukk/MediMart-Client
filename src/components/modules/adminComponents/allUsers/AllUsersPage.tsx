

"use client"

import Loader from "@/components/shared/Loader";
import TitleMedicin from "@/components/shared/TitleMedicin";
import ToolTipePage from "@/components/shared/ToolTipePage";
import { getAllUsers } from "@/services/UserService";
import { TUser } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";

const AllUsersPage = ({ users }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersState, setUsersState] = useState(users?.result || []);
    const [totalUsers, setTotalUsers] = useState(users?.meta?.total || 0);
    const [limit, setLimit] = useState(users?.meta?.limit || 10);
    const [totalPage, setTotalPage] = useState(users?.meta?.totalPage || 1);
    const [isLoading, setIsLoading] = useState(false);

    console.log("Initial users:", users);
    console.log("Initial usersState:", usersState);

    const handlePageChange = async (page: number) => {
        setIsLoading(true);
        setCurrentPage(page);

        try {
            const { data: newUsers } = await getAllUsers(page, 10);
            console.log("Fetched newUsers:", newUsers);

            if (newUsers) {
                setUsersState(newUsers?.result || []);
                setTotalUsers(newUsers?.meta?.total || 0);
                setLimit(newUsers?.meta?.limit || 10);
                setTotalPage(newUsers?.meta?.totalPage || 1);
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
                <TitleMedicin title={`ALL USER - ${totalUsers}`} />
            </div>

            <div className="p-4">
                <div className="rounded-lg border border-gray-200">
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">SL</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Name</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Email</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                                        <ToolTipePage title="U.C Date" tole="User Created date" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                                        <ToolTipePage title="Number" tole="mobile Number" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Role</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Status</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Adress</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {usersState.length > 0 ? (
                                    usersState.map((user: TUser, index: number) => {
                                        const globalIndex = (currentPage - 1) * limit + index;
                                        return (
                                            <tr key={user?._id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    {globalIndex + 1}
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-x-2 p-1">
                                                        <Image
                                                            height={20}
                                                            width={20}
                                                            className="object-cover w-10 h-10 rounded-full"
                                                            src={user?.image || "/default-image.png"}
                                                            alt="medi"
                                                        />
                                                        <div>
                                                            <h2 className="font-medium text-gray-800 dark:text-white">{user?.name}</h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{user?.email}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{formatDate(user?.createdAt)}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{user?.number || "N/A"}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{user?.role}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{user?.status}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{user?.address || "N/A"}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={12} className="text-center font-semibold text-xl py-4">
                                            No User Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6 mb-10">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Previous</span>
                        </button>

                        <div className="items-center hidden md:flex gap-x-3">
                            {Array.from({ length: totalPage }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-2 py-1 text-sm ${currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60' : 'text-gray-500'} rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPage}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                            <span>Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsersPage;