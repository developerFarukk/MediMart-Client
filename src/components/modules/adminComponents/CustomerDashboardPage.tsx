
interface TMyOrders {
    myOrders: number
}


const CustomerDashboardPage = ({myOrders}: TMyOrders) => {

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-10 p-4 items-center mt-4">

                {/* Total medicins board */}
                <div className="w-60 mt-4 px-4 py-3 hover:bg-blue-100 bg-blue-50 border-blue-50 border-2 rounded-md shadow-md dark:bg-gray-800">
                    <div>
                        <h1 className="uppercase text-center font-bold">My Total Order </h1>
                        {myOrders > 0 ?
                            <h2 className="text-center text-4xl mb-5 font-bold mt-4">
                                {myOrders}
                            </h2> :
                            <h2 className="text-center text-4xl mb-5 font-bold mt-4">0</h2>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CustomerDashboardPage;
