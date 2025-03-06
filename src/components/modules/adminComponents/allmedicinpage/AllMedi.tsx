

"use client";

import Loader from "@/components/shared/Loader";
import TitleMedicin from "@/components/shared/TitleMedicin";
import ToolTipePage from "@/components/shared/ToolTipePage";
import { TMedicine } from "@/types/medicins";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const AllMedi = ({ medicins }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [medicinss, setMedicins] = useState(medicins);
    console.log(medicinss);
    

    const totalMedicins = medicinss?.meta?.total || 0;
    const limit = medicinss?.meta?.limit || 10;
    const totalPage = medicinss?.meta?.totalPage || 1;
    const medici = medicinss?.result || [];

    const [isLoading, setIsLoading] = useState(false)
    if (isLoading) {
        return <Loader />;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
                                    medici
                                        .slice((currentPage - 1) * limit, currentPage * limit) // Pagination logic
                                        .map((medi: TMedicine, index: number) => {
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
                                                                src={medi?.mediImage || "/default-image.png"} // Fallback image
                                                                alt="medi"
                                                            />
                                                            <div>
                                                                <h2 className="font-medium text-gray-800 dark:text-white">{medi?.name}</h2>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{formatDate(medi?.createdAt)}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.manufacturerDetails?.manufacturerName || "N/A"}</td>

                                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.manufacturerDetails?.contact || "N/A"}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.stockAvailability}</td>

                                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.massUnit}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{medi?.quantity}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">${medi?.price}</td>

                                                    {/* <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                                                       
                                                        <button className="text-blue-500 hover:underline"><Pencil /></button>
                                                    </td> */}
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

                    {/* <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                        <ol className="flex justify-end gap-1 text-xs font-medium">
                            <li>
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180 hover:bg-gray-50"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-3"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </li>

                            {Array.from({ length: totalPage }, (_, index) => (
                                <li key={index + 1}>
                                    <button
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 text-center leading-8 ${currentPage === index + 1
                                            ? "bg-blue-100/60 text-blue-500"
                                            : "bg-white text-gray-900"
                                            } hover:bg-gray-50`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPage}
                                    className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180 hover:bg-gray-50"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-3"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </li>
                        </ol>
                    </div> */}
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



