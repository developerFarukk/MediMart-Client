import CoustomerOrders from "@/components/modules/customerPage/orderPage/CoustomerOrders";
import Loader from "@/components/shared/Loader";
import { getAllMyOrders } from "@/services/OrderMangment";


const CoustomerOrderPage = async ({ searchParams }: { searchParams: Promise<{ page: number }> }) => {

    const { page } = await searchParams;

    const { data: orders, isLoading, isError } = await getAllMyOrders(page, 10);


    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Data no fatch</div>;
    }

    return (
        <div>
            <CoustomerOrders orders={orders} />
        </div>
    );
};

export default CoustomerOrderPage;
