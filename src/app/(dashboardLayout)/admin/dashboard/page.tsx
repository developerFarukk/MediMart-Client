import AdminDashboardpage from "@/components/modules/adminComponents/dashboard/AdminDashboardpage";
import Loader from "@/components/shared/Loader";
import { getAllOrders } from "@/services/OrderMangment";



const AdminDashboard = async (
    // { searchParams }: { searchParams: Promise<{ page: number }> }
) => {

    const { data: orders, isLoading, isError } = await getAllOrders();
    const totalOrder = orders?.meta?.total
    

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Data no fatch</div>;
    }

    return (
        <div>
            <AdminDashboardpage totalOrders={totalOrder} />
        </div>
    );
};

export default AdminDashboard;
