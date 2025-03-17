

"use client";

import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { updatePaymentMathod } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

const PaymentMathodSelect = () => {
    const dispatch = useAppDispatch();

    const handleSlectPaymentMathod = (selectedMethod: 'Cash' | 'Online') => {
        dispatch(updatePaymentMathod(selectedMethod));
    };

    return (
        <div>
            <div className=''>
                <div className='mb-4 mt-9 w-full rounded-xl border bg-[#FAFAFA] p-5 text-lg font-semibold *:w-full md:w-80'>
                    <div className="flex flex-col justify-between h-full">
                        <h1 className="text-2xl font-bold">Select Payment Method</h1>
                        <div className="mt-5">
                            <RadioGroup defaultValue="Online" onValueChange={handleSlectPaymentMathod}>
                                <div className="lg:flex md:flex lg:justify-between md:justify-between lg:ml-4 lg:mr-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Cash" id="r1" />
                                        <Label htmlFor="r1">Cash</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Online" id="r2" />
                                        <Label htmlFor="r2">Online</Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMathodSelect;