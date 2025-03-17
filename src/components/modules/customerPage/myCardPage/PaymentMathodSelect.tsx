"use client"

import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";




const PaymentMathodSelect = () => {

    return (
        <div>

            <div className=''>
                <div className='mb-4 mt-9 w-full rounded-xl border bg-[#FAFAFA] p-5 text-lg font-semibold *:w-full md:w-80'>
                    <div className="flex flex-col justify-between h-full">
                        <h1 className="text-2xl font-bold">Slecte Payment Mathod</h1>
                        <div className="mt-5">
                            <RadioGroup defaultValue="comfortable">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="default" id="r1" />
                                    <Label htmlFor="r1">Default</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="comfortable" id="r2" />
                                    <Label htmlFor="r2">Comfortable</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="compact" id="r3" />
                                    <Label htmlFor="r3">Compact</Label>
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
