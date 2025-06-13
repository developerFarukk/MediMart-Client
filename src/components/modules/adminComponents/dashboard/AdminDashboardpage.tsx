
// "use client"

// interface TDashboard {
//     totalOrders: number;
//     totalMedicine: number;
//     stockOutMedi: number;
//     pandingPrescripOrderImage: number;
// }


// const AdminDashboardpage = (
//     { totalOrders, totalMedicine, stockOutMedi, pandingPrescripOrderImage }: TDashboard

// ) => {

//     return (
//         <div>

//             {/* Dashboard card */}
//             <div className="flex flex-wrap justify-center gap-10 p-4 items-center mt-4">

//                 {/* Total medicins board */}
//                 <div className="w-60 mt-4 px-4 py-3 hover:bg-blue-100 bg-blue-50 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800">
//                     <div>
//                         <h1 className="uppercase text-center font-bold">Total Medicins </h1>
//                         {totalMedicine > 0 ?
//                             <h2 className="text-center text-4xl mb-5 font-bold mt-4">
//                                 {totalMedicine}
//                                 {/* total order */}
//                             </h2> :
//                             <h2 className="text-center text-4xl mb-5 font-bold mt-4">0</h2>
//                         }
//                     </div>
//                 </div>

//                 {/* Total Stock out board */}
//                 <div className="w-60 mt-4 px-4 py-3 hover:bg-red-800 bg-red-700 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800">
//                     <div>
//                         <h1 className="uppercase text-center font-bold">Stock Out Medicins </h1>
//                         {stockOutMedi > 0 ?
//                             <h2 className="text-center text-4xl mb-5 font-bold mt-4">
//                                 {stockOutMedi}
//                             </h2> :
//                             <h2 className="text-center text-4xl mb-5 font-bold mt-4">0</h2>
//                         }
//                     </div>
//                 </div>

//                 {/* Total orders board */}
//                 <div className="w-60 mt-4 px-4 py-3 hover:bg-green-100 bg-green-50 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800">
//                     <div>
//                         <h1 className="uppercase text-center font-bold">Total Orders </h1>
//                         {totalOrders > 0 ?
//                             <h2 className="text-center text-4xl mb-5 font-bold mt-4">
//                                 {totalOrders}
//                                 {/* total order */}
//                             </h2> :
//                             <h2 className="text-center text-4xl mb-5 font-bold mt-4">0</h2>
//                         }
//                     </div>
//                 </div>


//                 {/* Total panding prescription image board */}
//                 <div className="w-60 mt-4 px-4 py-3 hover:bg-yellow-100 bg-yellow-50 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800">
//                     <div>
//                         <h1 className="uppercase text-center font-bold"> Panding Prescription </h1>
//                         {pandingPrescripOrderImage > 0 ?
//                             <h2 className="text-center text-4xl mb-5 font-bold mt-4">
//                                 {pandingPrescripOrderImage}
//                                 {/* total order */}
//                             </h2> :
//                             <h2 className="text-center text-4xl mb-5 font-bold mt-4">0</h2>
//                         }
//                     </div>
//                 </div>

//             </div>

//             {/* bar Chart */}
//             <div>

//             </div>

//         </div>
//     );
// };

// export default AdminDashboardpage;


"use client";

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart";

interface TDashboard {
    totalOrders: number;
    totalMedicine: number;
    stockOutMedi: number;
    pandingPrescripOrderImage: number;
}

const AdminDashboardpage = ({
    totalOrders,
    totalMedicine,
    stockOutMedi,
    pandingPrescripOrderImage
}: TDashboard) => {

    // Sample data for the bar chart - replace with your actual data
    const chartData = [
        {
            name: "Medicines",
            total: totalMedicine,
            stockOut: stockOutMedi,
        },
        {
            name: "Orders",
            total: totalOrders,
            pending: pandingPrescripOrderImage,
        },
    ];

    return (
        <div className="p-4">
            {/* Dashboard cards */}
            <div className="flex flex-wrap justify-center gap-6 p-4 items-center mt-4">
                {/* Total medicins board */}
                <div className="w-60 px-4 py-3 hover:bg-blue-100 bg-blue-50 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800 transition-colors duration-200">
                    <div>
                        <h1 className="uppercase text-center font-bold text-gray-700">Total Medicines</h1>
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4 text-blue-600">
                            {totalMedicine > 0 ? totalMedicine : 0}
                        </h2>
                    </div>
                </div>

                {/* Total Stock out board */}
                <div className="w-60 px-4 py-3 hover:bg-red-100 bg-red-50 border-red-50 border-2 rounded-md shadow-md dark:bg-gray-800 transition-colors duration-200">
                    <div>
                        <h1 className="uppercase text-center font-bold text-gray-700">Stock Out</h1>
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4 text-red-600">
                            {stockOutMedi > 0 ? stockOutMedi : 0}
                        </h2>
                    </div>
                </div>

                {/* Total orders board */}
                <div className="w-60 px-4 py-3 hover:bg-green-100 bg-green-50 border-green-50 border-2 rounded-md shadow-md dark:bg-gray-800 transition-colors duration-200">
                    <div>
                        <h1 className="uppercase text-center font-bold text-gray-700">Total Orders</h1>
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4 text-green-600">
                            {totalOrders > 0 ? totalOrders : 0}
                        </h2>
                    </div>
                </div>

                {/* Total pending prescription image board */}
                <div className="w-60 px-4 py-3 hover:bg-yellow-100 bg-yellow-50 border-yellow-50 border-2 rounded-md shadow-md dark:bg-gray-800 transition-colors duration-200">
                    <div>
                        <h1 className="uppercase text-center font-bold text-gray-700">Pending Prescriptions</h1>
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4 text-yellow-600">
                            {pandingPrescripOrderImage > 0 ? pandingPrescripOrderImage : 0}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Dashboard Analytics</h2>
                <div className="h-[400px]">
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
                            <Bar 
                                dataKey="total" 
                                fill="#3b82f6" 
                                activeBar={<Rectangle fill="#1d4ed8" />} 
                                name="Total"
                            />
                            <Bar 
                                dataKey="stockOut" 
                                fill="#ef4444" 
                                activeBar={<Rectangle fill="#b91c1c" />} 
                                name="Stock Out"
                            />
                            <Bar 
                                dataKey="pending" 
                                fill="#f59e0b" 
                                activeBar={<Rectangle fill="#d97706" />} 
                                name="Pending"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardpage;