

"use client";

import Loader from "@/components/shared/Loader";
import TitleMedicin from "@/components/shared/TitleMedicin";
import ToolTipePage from "@/components/shared/ToolTipePage";
import { deleteOrder, getAllOrders } from "@/services/OrderMangment";
import { TOrder } from "@/types/order";
import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { TExtraError } from "@/types/global";
import UpdateStatusByAdmin from "./UpdateStatusByAdmin";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UpdateimageApproved from "./UpdateimageApproved";

interface TOrderAdmin {
    orders: any;
}

const AllOrdersByAdmin = ({ orders }: TOrderAdmin) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState(orders?.result || []);
    const [totalorder, setTotalOrder] = useState(orders?.meta?.total || 0);
    const [limit, setLimit] = useState(orders?.meta?.limit || 10);
    const [totalPage, setTotalPage] = useState(orders?.meta?.totalPage || 1);
    const [isLoading, setIsLoading] = useState(false);

    // console.log(order);


    const handlePageChange = async (page: number) => {
        setIsLoading(true);
        setCurrentPage(page);
        try {
            const { data: newOrder } = await getAllOrders(page, 10);
            if (newOrder) {
                setOrder(newOrder.result);
                setTotalOrder(newOrder.meta.total);
                setLimit(newOrder.meta.limit);
                setTotalPage(newOrder.meta.totalPage);
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

    const formatDate = (dateString: any) => {
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

    const handleDeleteOrder = async (order: any) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteOrder(order);

                    const { data: newOrder } = await getAllOrders(currentPage, 10);
                    if (newOrder) {
                        setOrder(newOrder.result);
                        setTotalOrder(newOrder.meta.total);
                        setTotalPage(newOrder.meta.totalPage);
                    }

                    Swal.fire({
                        title: "Deleted!",
                        text: "The Order has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error("Delete Error:", error);
                    toast.error((error as TExtraError)?.data?.message || 'Failed to delete order');
                    Swal.fire({
                        title: "Error!",
                        text: (error as TExtraError)?.data?.message || 'Failed to delete order',
                        icon: "error"
                    });
                }
            }
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <div className="mt-2">
                <TitleMedicin title={`All Orders - ${totalorder}`} />
            </div>

            <div className="p-4">
                <div className="rounded-lg border border-gray-200">
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">SL</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                                        <ToolTipePage title="O.C. Name" tole="Order Creator Name" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Order Email</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Order Number</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Order Date</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                                        <ToolTipePage title="Prescription" tole="Show Prescription Image" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                                        <ToolTipePage title="P. Status" tole="Show Prescription Image Status" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap">
                                        <ToolTipePage title="S. Status" tole="Shipping Status" />
                                    </th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Transaction ID</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Quantity</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Price</th>
                                    <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {order.length > 0 ? (
                                    order.map((order: TOrder, index: number) => {
                                        const globalIndex = (currentPage - 1) * limit + index;
                                        return (
                                            <tr key={order?._id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    {globalIndex + 1}
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-x-2 p-1">
                                                        <Image
                                                            height={20}
                                                            width={20}
                                                            className="object-cover w-10 h-10 rounded-full"
                                                            src={order?.user?.image || "/default-image.png"}
                                                            alt="user"
                                                        />
                                                        <div>
                                                            <h2 className="font-medium text-gray-800 dark:text-white">{order?.user?.name}</h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{order?.user?.email}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{order?.user?.number}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">
                                                    {formatDate(order?.createdAt)}
                                                </td>
                                                {
                                                    order?.precriptionImage === "" || !order?.precriptionImage ? (
                                                        <td className=" text-gray-700 text-center">
                                                            <Button variant="outline">No Need</Button>
                                                        </td>

                                                    ) : (
                                                        <td className="text-gray-700 text-center">
                                                            <Link href={order?.precriptionImage} target="_blank" className="text-blue-500">
                                                                <Button variant="outline">Open</Button>
                                                            </Link>
                                                        </td>
                                                    )
                                                }
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700 text-center">
                                                    {/* {order?.status} */}
                                                    <UpdateimageApproved orders={order} />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700 text-center">
                                                    {/* {order?.status} */}
                                                    <UpdateStatusByAdmin orders={order} />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700">{order?.transaction?.id || "N/A"}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700 text-center">{order?.totalQuantity}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-gray-700 text-center">{order?.totalPrice}</td>
                                                <td className="flex justify-center gap-4 px-4 py-2 whitespace-nowrap text-gray-700 ">
                                                    {/* <div className="text-blue-500 hover:underline" title="Update">
                                                        <UpdateMedicin title={<Pencil />} medicin={order} />
                                                    </div> */}
                                                    <button
                                                        onClick={() => handleDeleteOrder(order?._id)}
                                                        className="text-blue-500 hover:underline" title="Delete">
                                                        <Trash2 />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={14} className="text-center font-semibold text-xl py-4">
                                            No Order Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6 mb-10 p-2">
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

export default AllOrdersByAdmin;