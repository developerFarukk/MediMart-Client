import TitleMedicin from "@/components/shared/TitleMedicin";
import ToolTipePage from "@/components/shared/ToolTipePage";
import Image from "next/image";



const AllMedi = () => {

    return (
        <div>

            <div className="mt-2">
                <TitleMedicin title="All Medicins" />
            </div>

            <div className="p-4">
                <div className="rounded-lg border border-gray-200">
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
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
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-x-2 p-1">
                                            <Image height={20} width={20} className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                                <div>
                                                    <h2 className="font-medium text-gray-800 dark:text-white ">Arthur Melo</h2>
                                                </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">John Doe</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">24/05/1995</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">Web Developer</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-700">$120,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                        <ol className="flex justify-end gap-1 text-xs font-medium">
                            <li>
                                <a
                                    href="#"
                                    className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                >
                                    <span className="sr-only">Prev Page</span>
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
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900"
                                >
                                    1
                                </a>
                            </li>

                            <li
                                className="block size-8 rounded-sm border-blue-600 bg-blue-600 text-center leading-8 text-white"
                            >
                                2
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900"
                                >
                                    3
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900"
                                >
                                    4
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                >
                                    <span className="sr-only">Next Page</span>
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
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllMedi;
