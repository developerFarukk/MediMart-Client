

import CustomerDashboardPage from "@/components/modules/adminComponents/CustomerDashboardPage";
import Loader from "@/components/shared/Loader";
import { getAllMyOrders } from "@/services/OrderMangment";



const CustomerDashboard = async () => {

    const { data: orders, isLoading, isError } = await getAllMyOrders();

    const myOrders = orders?.meta?.total

    

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Data no fatch</div>;
    }

    return (
        <div>
            <CustomerDashboardPage myOrders={myOrders} />
        </div>
    );
};

export default CustomerDashboard;
