
"use client"

import Cart from "./Cart";
import { useAppSelector } from "@/redux/hooks";
import { TCartItem } from "@/types/medicins";
import { RootState } from "@/redux/store";
import DeleverycartAddress from "./DeleverycartAddress";
import PrescriptionInpute from "./PrescriptionInpute";
import ClearButton from "./ClearButton";
import PaymentMathodSelect from "./PaymentMathodSelect";
import CheckOutButton from "./CheckOutButton";



const MyCardPage = () => {
    const orderMedicinss = useAppSelector((state: RootState) => state.cart);
    const medicins = orderMedicinss?.medicins;


    // console.log(medicins);
    // console.log(orderMedicinss);

    return (
        <div>
            <div className='mb-24  border-t'>
                <div className='mx-auto max-w-[1440px] pt-9'>
                    <div className='lg:flow-row mx-auto flex w-[90%] flex-col gap-20 lg:w-[85%] lg:flex-row'>
                        {/* cards */}
                        <div className='flex-1'>
                            <h3 className='text-2xl font-semibold'>
                                <div className="lg:flex md:flex justify-between">
                                    <h4>Overview Order</h4>
                                    <ClearButton />
                                    {/* <h4>clear Card</h4> */}
                                </div>
                                <span className="flex items-center">
                                    <span className="h-px flex-1 bg-black font-semibold"></span>
                                </span>
                            </h3>


                            {/* single cards */}
                            <div className=' mt-9 flex flex-col rounded-xl  p-1'>
                                {medicins.length > 0 ? (
                                    medicins?.map((medicin: TCartItem, idx: number) => <Cart key={medicin?._id} idx={idx} length={medicin.length} medicin={medicin} />)
                                ) :
                                    (
                                        <div>
                                            <h3 className='text-xl text-blue-600 font-semibold flex justify-center'>No Medicin cart data </h3>
                                        </div>
                                    )

                                }
                            </div>
                        </div>

                        {/* order details part */}
                        <div>
                            <h3 className='text-2xl font-semibold'>
                                Oder details
                                <span className="flex items-center">
                                    <span className="h-px flex-1 bg-black font-semibold"></span>
                                </span>
                            </h3>

                            <div>
                                <DeleverycartAddress />
                            </div>

                            <div>
                                <PrescriptionInpute />
                            </div>


                            <div className=''>
                                <div className='mb-4 mt-9 w-full rounded-xl border bg-[#FAFAFA] p-5 text-lg font-semibold *:w-full md:w-80'>
                                    <div className='flex justify-between text-lg font-normal text-[#656565]'>
                                        <h5>Total Quantity</h5>
                                        <p>
                                            {orderMedicinss?.totalQuantity}
                                        </p>
                                    </div>
                                    <div className='flex justify-between text-lg font-normal text-[#656565]'>
                                        <h5>Total Price</h5>
                                        <p>
                                            {orderMedicinss?.totalPrice} TK
                                        </p>
                                    </div>
                                    <div className='mt-2 flex justify-between text-lg font-normal text-[#656565]'>
                                        <h5>Shipping Charge</h5>
                                        <p>Free</p>
                                    </div>
                                    <div className='mt-2 flex justify-between border-b pb-4 text-lg font-normal text-[#656565]'>
                                        <h5 className='flex items-center gap-2'>
                                            Estimated Tax
                                        </h5>
                                        <p> 0 TK</p>
                                    </div>
                                    <div>
                                        <div className='mt-1 flex justify-between pt-4 text-xl font-semibold text-[#656565]'>
                                            <h5 className='flex items-center gap-2 text-[#656565]'>Grand Total</h5>
                                            <p className='text-black'>
                                                {orderMedicinss?.totalPrice}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <PaymentMathodSelect />
                                </div>

                                <div>
                                    <CheckOutButton order={orderMedicinss} />
                                </div>

                                {/* <Button className="w-full">
                                    <span className='-mb-1'>Go to Checkout</span>
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCardPage;
