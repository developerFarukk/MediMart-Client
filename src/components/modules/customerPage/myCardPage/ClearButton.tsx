"use client"

import { Button } from "@/components/ui/button";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";




const ClearButton = () => {
    const dispatch = useAppDispatch();

    const handelClearButton = () => {
        dispatch(clearCart())
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
