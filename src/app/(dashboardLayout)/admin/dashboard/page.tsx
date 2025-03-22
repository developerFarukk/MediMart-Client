import AdminDashboardpage from "@/components/modules/adminComponents/dashboard/AdminDashboardpage";
import Loader from "@/components/shared/Loader";
import { getAllMedicins, getAllStockMedicins } from "@/services/MedicinManagment";
import { getAllOrders, getAllPandingPrescription } from "@/services/OrderMangment";



const AdminDashboard = async (
    // { searchParams }: { searchParams: Promise<{ page: number }> }
) => {

    // Orders data fatch
    const { data: orders, isLoading, isError } = await getAllOrders();
    const totalOrder = orders?.meta?.total

    // all panding Prescription
    const { data: pandingPrescrip, } = await getAllPandingPrescription();
    const pandingPrescripOrderImage = pandingPrescrip?.length

    // Medicin data fatch
    const { data: medicins, } = await getAllMedicins();
    const totalMedicine = medicins?.meta.total;

    // Stock Medicin
    const { data: stockMedicins, } = await getAllStockMedicins();
    const stockOutMedi = stockMedicins?.length;



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
                stockOutMedi={stockOutMedi}
                pandingPrescripOrderImage={pandingPrescripOrderImage}
            />
        </div>
    );
};

export default AdminDashboard;
