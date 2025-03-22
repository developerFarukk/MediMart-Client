
"use client"

interface TDashboard {
    totalOrders: number;
    totalMedicine: number;
    stockOutMedi: number;
    pandingPrescripOrderImage: number;
}


const AdminDashboardpage = (
    { totalOrders, totalMedicine, stockOutMedi, pandingPrescripOrderImage }: TDashboard

) => {

    return (
        <div className="flex flex-wrap justify-center gap-10 p-4 items-center mt-4">

            {/* Total medicins board */}
            <div className="w-60 mt-4 px-4 py-3 hover:bg-blue-100 bg-blue-50 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800">
                <div>
                    <h1 className="uppercase text-center font-bold">Total Medicins </h1>
                    {totalMedicine > 0 ?
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4">
                            {totalMedicine}
                            {/* total order */}
                        </h2> :
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4">0</h2>
                    }
                </div>
            </div>

            {/* Total Stock out board */}
            <div className="w-60 mt-4 px-4 py-3 hover:bg-red-800 bg-red-700 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800">
                <div>
                    <h1 className="uppercase text-center font-bold">Stock Out Medicins </h1>
                    {stockOutMedi > 0 ?
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4">
                            {stockOutMedi}
                        </h2> :
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4">0</h2>
                    }
                </div>
            </div>

            {/* Total orders board */}
            <div className="w-60 mt-4 px-4 py-3 hover:bg-green-100 bg-green-50 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800">
                <div>
                    <h1 className="uppercase text-center font-bold">Total Orders </h1>
                    {totalOrders > 0 ?
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4">
                            {totalOrders}
                            {/* total order */}
                        </h2> :
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4">0</h2>
                    }
                </div>
            </div>


            {/* Total panding prescription image board */}
            <div className="w-60 mt-4 px-4 py-3 hover:bg-yellow-100 bg-yellow-50 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800">
                <div>
                    <h1 className="uppercase text-center font-bold"> Panding Prescription </h1>
                    {pandingPrescripOrderImage > 0 ?
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4">
                            {pandingPrescripOrderImage}
                            {/* total order */}
                        </h2> :
                        <h2 className="text-center text-4xl mb-5 font-bold mt-4">0</h2>
                    }
                </div>
            </div>



        </div>
    );
};

export default AdminDashboardpage;
