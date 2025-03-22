import AdminDashboardpage from "@/components/modules/adminComponents/dashboard/AdminDashboardpage";
import Loader from "@/components/shared/Loader";
import { getAllMedicins } from "@/services/MedicinManagment";
import { getAllOrders } from "@/services/OrderMangment";



const AdminDashboard = async (
    // { searchParams }: { searchParams: Promise<{ page: number }> }
) => {

    // Orders data fatch
    const { data: orders, isLoading, isError } = await getAllOrders();
    const totalOrder = orders?.meta?.total

    // Medicin data fatch
    const { data: medicins,  } = await getAllMedicins();
    const totalMedicine = medicins?.meta.total;
    console.log(totalMedicine);
    


    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Data no fatch</div>;
    }

    return (
        <div>
            <AdminDashboardpage 
            totalOrders={totalOrder}
            totalMedicine={totalMedicine}
             />
        </div>
    );
};

export default AdminDashboard;
