import { TMedicine } from "@/types/medicins";
import { Trash } from "lucide-react";
import Image from "next/image";


interface CartProps {
    idx: number;
    length: number;
    medicin: TMedicine
}

const Cart = ( { idx, length, medicin }: CartProps ) => {

    return (
        <div>
            <div>
                <div className='flex justify-between gap-4 bg-gray-200'>
                    <div className='flex gap-5'>
                        <div className='flex flex-col items-center gap-3 md:flex-row'>

                            <div className='relative h-32 w-32 bg-cover'>
                                <Image
                                    className='w-full rounded-md border bg-[#EAEAEA] p-1'
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5GoZzI6363LYhvWJrtfncBfsZ23U-rA6C9BDSyQRLXOe3Z3rij0vk9DhvpyG2k-nKWE&usqp=CAU"
                                    alt='asdf'
                                    layout='fill'
                                    objectFit='cover'
                                // height={50}
                                // width={50}
                                />
                            </div>
                        </div>
                        <h3 className='items-start justify-start  text-xl font-bold text-[#434343]'>
                            {medicin?.name}
                        </h3>
                    </div>
                    <div className='flex flex-col justify-between'>
                        {/* <GoPlus
                            onClick={() => deleteCart(id)}
                            className='ml-auto rotate-45 cursor-pointer text-3xl text-[#939393]'
                        /> */}
                        <div className="">
                            <Trash
                                // onClick={() => deleteCart(id)}
                                className='ml-auto hover:text-blue-500 cursor-pointer text-3xl'
                            />
                        </div>
                        <p className='text-xl font-semibold text-black'>
                            {/* €{discountPrice} */}
                            1300TK
                        </p>
                    </div>
                </div>

                {idx + 1 === length ? '' : <div className='divider my-5 border-none border-[#F4F4F4]'></div>}
            </div>
        </div>
    );
};

export default Cart;
