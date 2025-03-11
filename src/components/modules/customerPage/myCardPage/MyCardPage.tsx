import { Button } from "@/components/ui/button";
import Cart from "./Cart";



const MyCardPage = () => {

    return (
        <div>
            <div className='mb-24  border-t'>
                <div className='mx-auto max-w-[1440px] pt-9'>
                    <div className='lg:flow-row mx-auto flex w-[90%] flex-col gap-20 lg:w-[85%] lg:flex-row'>
                        {/* cards */}
                        <div className='flex-1'>
                            <h3 className='text-2xl font-semibold'>An overview order</h3>

                            {/* single cards */}
                            <div className='gap mt-9 flex flex-col rounded-xl bg-gray-200 p-6'>
                                {/* {cart?.map((shoe, idx) => <Cart key={shoe._id} idx={idx} length={cart.length} shoe={shoe}></Cart>)} */}
                                <Cart  />
                            </div>
                        </div>

                        {/* order details part */}
                        <div>
                            <h3 className='text-2xl font-semibold'>Oder details</h3>
                            <div className=''>
                                <div className='mb-4 mt-9 w-full rounded-xl border bg-[#FAFAFA] p-5 text-lg font-semibold *:w-full md:w-80'>
                                    <div className='flex justify-between text-lg font-normal text-[#656565]'>
                                        <h5>Subtotal</h5>
                                        <p>
                                            {/* € {grandTotal.toFixed(2)} */}
                                            Total Price
                                        </p>
                                    </div>
                                    <div className='mt-2 flex justify-between text-lg font-normal text-[#656565]'>
                                        <h5>Shipping</h5>
                                        <p>Free</p>
                                    </div>
                                    <div className='mt-2 flex justify-between border-b pb-4 text-lg font-normal text-[#656565]'>
                                        <h5 className='flex items-center gap-2'>
                                            Estimated Tax
                                        </h5>
                                        <p>€ 0</p>
                                    </div>
                                    <div>
                                        <div className='mt-1 flex justify-between pt-4 text-xl font-semibold text-[#656565]'>
                                            <h5 className='flex items-center gap-2 text-[#656565]'>Total</h5>
                                            <p className='text-black'>
                                                {/* € {grandTotal.toFixed(2)} */}
                                                Grand Total
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full">
                                    <span className='-mb-1'>Go to Checkout</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCardPage;
