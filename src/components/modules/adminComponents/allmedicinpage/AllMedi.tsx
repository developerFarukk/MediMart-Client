"use client"

import TitleMedicin from "@/components/shared/TitleMedicin";
import ToolTipePage from "@/components/shared/ToolTipePage";
import { TMedicine } from "@/types/medicins";
import Image from "next/image";
import { useState } from "react";



const AllMedi = ({ medicins }: any) => {
    const [currentPage, setCurrentPage] = useState(1);

    // console.log(medicins);


    const totalMedicins = medicins?.meta?.total
    const limit = medicins?.meta?.limit;
    const totalPage = medicins?.meta?.totalPage;
    const medici = medicins?.result
    console.log(medici);


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
                                    <th className="px-4 py-2 font-medium whitespace-nowrap ">
                                        <ToolTipePage title="M. Name" tole="Manufacture Name" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap ">
                                        <ToolTipePage title="M. Address" tole="Manufacture Address" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap ">
                                        <ToolTipePage title="M. Contact" tole="Manufacture Contact" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap ">
                                        <ToolTipePage title="Stock" tole="Stock Availability" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap ">
                                        <ToolTipePage title="R. Prescription" tole="Required Prescription" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Mass Unit</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Quantity</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Price</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {
                                    medici.length > 0 ? (

                                        medici?.map((medi: TMedicine, index: number) => {
                                            const globalIndex = (currentPage - 1) * limit + index;
                                            return (
                                                <tr key={medi?._id}>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        {globalIndex + 1}
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center gap-x-2 p-1">
                                                            <Image height={20} width={20} className="object-cover w-10 h-10 rounded-full" src={medi?.mediImage} alt="medi" />
                                                            <div>
                                                                <h2 className="font-medium text-gray-800 dark:text-white ">{medi?.name}</h2>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{formatDate(medi?.createdAt)}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">Web Developer</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">$120,000</td>
                                                </tr>
                                            )
                                        }
                                        )
                                    ) : (
                                        <div className="text-center font-semibold text-xl justify-center flex">No Medicin Data</div>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>

                    <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                        <ol className="flex justify-end gap-1 text-xs font-medium">
                            <li>
                                <div

                                    className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                >
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className="sr-only">Prev Page</button>
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
                                </div>
                            </li>

                            <li>
                                <div className="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900" >
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
                            </li>

                            <li>
                                <div
                                    className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                >
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPage}
                                        className="sr-only">Next Page</button>
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
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AllMedi;
