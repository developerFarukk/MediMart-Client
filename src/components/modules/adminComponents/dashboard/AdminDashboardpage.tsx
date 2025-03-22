
"use client"

interface TDashboard {
    totalOrders: number;
}


const AdminDashboardpage = ({ totalOrders }: TDashboard) => {

    return (
        <div className="flex justify-center gap-8 p-4 items-center mt-4">

            <div className="w-60 mt-4 px-4 py-3 hover:bg-blue-100 bg-blue-50 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800">
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
            
        </div>
    );
};

export default AdminDashboardpage;
