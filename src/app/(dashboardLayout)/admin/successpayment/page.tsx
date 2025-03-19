import PaymentSuccess from "@/components/modules/adminComponents/paymentManage/PaymentSuccess";
import Loader from "@/components/shared/Loader";
import { getAllOrders } from "@/services/OrderMangment";




const PaymentManageByAdmin = async ({ searchParams }: { searchParams: Promise<{ page: number }> }) => {

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
            <PaymentSuccess orders={orders} />
        </div>
    );
};

export default PaymentManageByAdmin;
