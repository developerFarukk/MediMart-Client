
"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { TInitialState } from "@/redux/features/cart/cartSlice";
// import { TCartItem } from "@/types/medicins";
// import { TOrder } from "@/types/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Torderss {
    // order: TCartItem
    order: TInitialState
    // order: TOrder
}


const CheckOutButton = ({order}: Torderss) => {

    console.log(order);
    

    const user = useUser();
    const router = useRouter();

    const handleOrder = async () => {
        const orderLoading = toast.loading("Order is being placed");
        try {
            if (!user.user) {
                router.push("/login");
                throw new Error("You are not loged customer!");
            }

            // if (!city) {
            //     throw new Error("City is missing");
            // }
            // if (!shippingAddress) {
            //     throw new Error("Shipping address is missing");
            // }

            // if (cartProducts.length === 0) {
            //     throw new Error("Cart is empty, what are you trying to order ??");
            // }

            // let orderData;

            // const res = await createOrder(orderData);

            // if (res.success) {
            //     toast.success(res.message, { id: orderLoading });
            //     dispatch(clearCart());
            //     router.push(res.data.paymentUrl);
            // }

            // if (!res.success) {
            //     toast.error(res.message, { id: orderLoading });
            // }
        } catch (error: any) {
            toast.error(error.message, { id: orderLoading });
        }
    };

    return (
        <div>
            <Button
                onClick={handleOrder}
                className="w-full bg-green-400">
                Go to Checkout
            </Button>
        </div>
    );
};

export default CheckOutButton;
