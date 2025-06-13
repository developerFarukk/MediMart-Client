

"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

interface TMyOrders {
    myOrders: number
}

const CustomerDashboardPage = ({ myOrders }: TMyOrders) => {

    const orderMedicinss = useAppSelector((state: RootState) => state.cart);
    const pendingOrders = orderMedicinss?.medicins?.length as number;

    const completedOrders = myOrders - pendingOrders;

    const chartData = [
        {
            name: "Completed Orders",
            orders: completedOrders > 0 ? completedOrders : 0,
        },
        {
            name: "Pending Orders",
            orders: pendingOrders > 0 ? pendingOrders : 0,
        },
        {
            name: "Total Orders",
            orders: myOrders > 0 ? myOrders : 0,
        }
    ]

    return (
        <div className="p-4">
            {/* Dashboard cards */}
            <div className="flex flex-wrap justify-center gap-6 p-4 items-center">

                {/* Total orders card */}
                <div className="w-60 px-4 py-3 hover:bg-blue-100 bg-blue-50 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800 transition-colors duration-200">
                    <div>
                        <h1 className="uppercase text-center font-bold text-gray-700">My Total Orders</h1>
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4 text-blue-600">
                            {myOrders > 0 ? myOrders : 0}
                        </h2>
                    </div>
                </div>

                {/* Total Pending orders card */}
                <div className="w-60 px-4 py-3 hover:bg-yellow-100 bg-yellow-50 border-yellow-50 border-2 rounded-md shadow-md dark:bg-gray-800 transition-colors duration-200">
                    <div>
                        <h1 className="uppercase text-center font-bold text-gray-700">Total Pending Orders</h1>
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4 text-yellow-600">
                            {pendingOrders > 0 ? pendingOrders : 0}
                        </h2>
                    </div>
                </div>

                {/* Completed Orders card */}
                <div className="w-60 px-4 py-3 hover:bg-green-100 bg-green-50 border-green-50 border-2 rounded-md shadow-md dark:bg-gray-800 transition-colors duration-200">
                    <div>
                        <h1 className="uppercase text-center font-bold text-gray-700">Completed Orders</h1>
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4 text-green-600">
                            {completedOrders > 0 ? completedOrders : 0}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Analytics</h2>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="orders" fill="#3b82f6" name="Orders" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default CustomerDashboardPage
