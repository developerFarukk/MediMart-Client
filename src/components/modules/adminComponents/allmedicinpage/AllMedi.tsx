




"use client";

import Loader from "@/components/shared/Loader";
import TitleMedicin from "@/components/shared/TitleMedicin";
import ToolTipePage from "@/components/shared/ToolTipePage";
import { getAllMedicins } from "@/services/MedicinManagment";
import { TMedicine } from "@/types/medicins";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const AllMedi = ({ medicins }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [medici, setMedici] = useState(medicins?.result || []);
    const [totalMedicins, setTotalMedicins] = useState(medicins?.meta?.total || 0);
    const [limit, setLimit] = useState(medicins?.meta?.limit || 10);
    const [totalPage, setTotalPage] = useState(medicins?.meta?.totalPage || 1);
    const [isLoading, setIsLoading] = useState(false);

    // const handlePageChange = async (page: number) => {
    //     setisLoading(true);
    //     setCurrentPage(page); // Update currentPage state
    //     const { data: newMedicins } = await getAllMedicins(page, 10); // Fetch new data
    //     if (newMedicins) {
    //         setMedici(newMedicins.result); // Update medici state
    //         setTotalMedicins(newMedicins.meta.total); // Update totalMedicins
    //         setLimit(newMedicins.meta.limit); // Update limit
    //         setTotalPage(newMedicins.meta.totalPage); // Update totalPage
    //     }
    // };

    const handlePageChange = async (page: number) => {
        setIsLoading(true); // Set loading to true
        setCurrentPage(page); // Update currentPage state
        try {
            const { data: newMedicins } = await getAllMedicins(page, 10); // Fetch new data
            if (newMedicins) {
                setMedici(newMedicins.result); // Update medici state
                setTotalMedicins(newMedicins.meta.total); // Update totalMedicins
                setLimit(newMedicins.meta.limit); // Update limit
                setTotalPage(newMedicins.meta.totalPage); // Update totalPage
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false); // Set loading to false
        }
    };


    useEffect(() => {
        handlePageChange(currentPage); // Fetch data when currentPage changes
    }, [currentPage]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1); // Go to next page
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); // Go to previous page
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <div className="mt-2">
                <TitleMedicin title={`All Medicins - ${totalMedicins}`} />
            </div>

            <div className="p-4">
                <div className="rounded-lg border border-gray-200">
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">SL</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Name</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Create Date</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                                        <ToolTipePage title="M. Name" tole="Manufacture Name" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                                        <ToolTipePage title="M. Contact" tole="Manufacture Contact" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Category</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                                        <ToolTipePage title="Stock" tole="Stock Availability" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Mass Unit</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Quantity</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Price</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {medici.length > 0 ? (
                                    medici.map((medi: TMedicine, index: number) => {
                                        const globalIndex = (currentPage - 1) * limit + index;
                                        return (
                                            <tr key={medi?._id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    {globalIndex + 1}
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-x-2 p-1">
                                                        <Image
                                                            height={20}
                                                            width={20}
                                                            className="object-cover w-10 h-10 rounded-full"
                                                            src={medi?.mediImage || "/default-image.png"}
                                                            alt="medi"
                                                        />
                                                        <div>
                                                            <h2 className="font-medium text-gray-800 dark:text-white">{medi?.name}</h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{formatDate(medi?.createdAt)}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.manufacturerDetails?.name || "N/A"}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.manufacturerDetails?.contactNumber || "N/A"}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.category}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.stockAvailability}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.massUnit}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.quantity}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.price}</td>
                                                <td className="flex justify-center gap-4 px-4 py-2 whitespace-nowrap text-gray-700">
                                                    <button className="text-blue-500 hover:underline" title="Update">
                                                        <Pencil />
                                                    </button>
                                                    <button className="text-blue-500 hover:underline" title="Delete">
                                                        <Trash2 />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={12} className="text-center font-semibold text-xl py-4">
                                            No Medicine Data
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

export default AllMedi;