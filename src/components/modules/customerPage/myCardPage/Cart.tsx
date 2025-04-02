import { Input } from "@/components/ui/input";
import { decrementOrderQuantity, incrementOrderQuantity, removeFromMedicin } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TCartItem } from "@/types/medicins";
import { BadgeMinus, BadgePlus, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";


interface CartProps {
    idx: number;
    length: number;
    medicin: TCartItem
}



const Cart = ({ idx, length, medicin }: CartProps) => {

    const dispatch = useAppDispatch()

    // Increment Quantity
    const handleIncrementQuantity = (id: string) => {
        if (medicin?.orderQuantity < medicin?.quantity) {
            dispatch(incrementOrderQuantity(id));
            toast.success("Increment order quantity successfully");
        } else {

            toast.error("Limited Stock");
        }

    };

    // Decrement Quantity
    const handleDecrementQuantity = (id: string) => {
        if (medicin?.orderQuantity > 1) {
            dispatch(decrementOrderQuantity(id));
            toast.success("Decrement order quantity successfully");

        } else {
            toast.error("Minimum  order quantity 1");

        }


    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
            <div>
                <div className='flex justify-between gap-4 bg-gray-200 rounded-lg p-4'>
                    <div className='flex gap-5'>
                        <div className='flex flex-col items-center gap-3 md:flex-row'>

                            <div className='relative h-32 w-32 bg-cover'>
                                <Image
                                    className='w-full rounded-md border bg-[#EAEAEA] p-1'
                                    src={medicin?.mediImage || "https://img.freepik.com/free-photo/medicines-palm-hand_1150-13867.jpg?ga=GA1.1.1943003916.1738404104&semt=ais_hybrid"}
                                    alt='asdf'
                                    layout='fill'
                                    objectFit="cover"
                                    
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className='items-start justify-start  text-xl font-bold text-[#434343]'>
                                {medicin?.name}
                            </h3>
                            <h3 className='items-start justify-start  text-base font-medium text-[#434343]'>
                                Category: <span className="text-black font-normal ml-1">{medicin?.category}</span>
                            </h3>
                            <h3 className='items-start justify-start  text-base font-medium text-[#434343]'>
                                Required Prescription: <span className="text-blue-600 font-normal ml-1">{medicin?.requiredPrescription}</span>
                            </h3>
                            <h3 className='items-start justify-start  text-base font-medium text-[#434343]'>
                                Expiry Date: <span className="text-black font-normal ml-1">{formatDate(medicin?.expiryDate)}</span>
                            </h3>
                            <h3 className='items-start justify-start  text-base font-medium text-[#434343]'>
                                Mass Unit: <span className="text-black font-normal ml-1">{medicin?.massUnit}</span>
                            </h3>
                            <h3 className='items-start justify-start  text-base font-medium text-[#434343]'>
                            Unit Price: <span className="text-black font-normal ml-1">{medicin?.price}</span>
                            </h3>

                            {/* Inpute Quantity */}
                            <div>
                                <div className="lg:flex lg:items-center lg:justify-start lg:gap-2">
                                    <label htmlFor="Quantity" className="font-bold text-gray-700 dark:text-gray-300 mr-2">
                                        Order Quantity :
                                    </label>
                                    <div className="flex items-center rounded-sm border w-fit">
                                        <button
                                            type="button"
                                            onClick={() => handleDecrementQuantity(medicin?._id)}
                                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 p-2"
                                        >
                                            <BadgeMinus />
                                        </button>
                                        <Input
                                            type="number"
                                            id="orderQuantity"
                                            value={medicin?.orderQuantity}
                                            className="h-6 w-10 border-blue-600 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none mx-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleIncrementQuantity(medicin?._id)}
                                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 p-2"
                                        >
                                            <BadgePlus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div className="">
                            <Trash
                                onClick={() => dispatch(removeFromMedicin(medicin?._id))}
                                className='ml-auto hover:text-blue-500 cursor-pointer text-3xl'
                            />
                        </div>
                        <p className='text-xl font-semibold text-black'>
                            {medicin?.subTotalPrice}TK
                        </p>
                    </div>
                </div>

                {idx + 1 === length ? '' : <div className='divider my-5 border-none border-[#F4F4F4]'></div>}
            </div>
        </div>
    );
};

export default Cart;
