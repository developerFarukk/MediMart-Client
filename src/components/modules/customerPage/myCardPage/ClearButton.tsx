"use client"

import { Button } from "@/components/ui/button";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";




const ClearButton = () => {
    const dispatch = useAppDispatch();

    const handelClearButton = () => {
        dispatch(clearCart());
        toast.success("Clear cart successfully!");
    }

    return (
        <div className="p-1">
            <Button
            onClick={ () => handelClearButton()}
            >
                Clear cart
            </Button>
        </div>
    );
};

export default ClearButton;
