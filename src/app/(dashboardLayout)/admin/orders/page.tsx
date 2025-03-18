import AllOrdersByAdmin from "@/components/modules/adminComponents/ordersByAdmin/AllOrdersByAdmin";
import { getAllOrders } from "@/services/OrderMangment";
import { Loader } from "lucide-react";




const page = async ({ searchParams }: { searchParams: Promise<{ page: number }> }) => {

    const { page } = await searchParams;

    const { data: orders, isLoading, isError } = await getAllOrders(page, 10);


    // console.log("orders", orders);
    

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Data no fatch</div>;
    }

    return (
        <div>
            <AllOrdersByAdmin orders={orders} />
        </div>
    );
};

export default page;
