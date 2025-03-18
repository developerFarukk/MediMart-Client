
"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { clearCart, TInitialState } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { createOrder } from "@/services/OrderMangment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Torderss {
    // order: TCartItem
    order: TInitialState
    // order: TOrder
}


const CheckOutButton = ({ order }: Torderss) => {

    const dispatch = useAppDispatch();

    // console.log(order);


    const user = useUser();
    const router = useRouter();

    const handleOrder = async () => {
        const orderLoading = toast.loading("Order is being placed");
        try {
            if (!user.user) {
                router.push("/login");
                throw new Error("You are not loged customer!");
            }

            if (!order?.city) {
                throw new Error("City is missing");
            }
            if (!order?.shippingAddress) {
                throw new Error("Shipping address is missing");
            }

            if (order?.medicins?.length === 0) {
                throw new Error("Cart is empty, Plese select order");
            }

            const requiresPrescription = order.medicins.some(medicine => medicine.requiredPrescription === "Yes");
            if (requiresPrescription && !order.precriptionImage) {
                throw new Error("Prescription is required.  Upload your prescription image or document!");
            }


            const orderData: any = {
                products: order.medicins.map(medicine => ({
                    medicins: medicine._id,
                    orderQuantity: medicine.orderQuantity,
                })),
                paymentMethod: order.paymentMethod,
                shippingAddress: order.shippingAddress,
                precriptionImage: order.precriptionImage,
                city: order.city,
            };

            // let orderData;

            const res = await createOrder(orderData);


            if (res.success) {
                toast.success(res.message, { id: orderLoading });
                dispatch(clearCart());

                if (res.data.paymentUrl) {
                    router.push(res.data.paymentUrl);
                } else {
                    router.push("/");
                }
            }

            if (!res.success) {
                toast.error(res.message, { id: orderLoading });
            }
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
