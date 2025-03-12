

"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addMedicin } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TMedicine } from "@/types/medicins";
import { BadgeMinus, BadgePlus } from "lucide-react";
import Image from "next/image";


interface TMedicinss {
    medici: TMedicine;
}

const MedicinCard = ({ medici }: TMedicinss) => {

    const dispatch = useAppDispatch();

    const handleAddProduct = (medici: TMedicine) => {
        dispatch(addMedicin(medici));
    }


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
            <div className='group'>
                <div className='relative h-60 w-full rounded-md bg-cover'>
                    <div className='absolute bottom-5 left-7 z-10 mt-5 flex scale-y-0 items-center font-medium opacity-0 transition-all duration-500 ease-out group-hover:scale-y-100 group-hover:opacity-100'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className='mr-2 w-fit rounded-[4px] border px-7 py-5 text-sm uppercase leading-4 shadow-2xl duration-500 hover:border-[#DF2626]'
                                >
                                    Quick View
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[90%] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl p-4 overflow-y-auto max-h-[90vh]">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-2xl">Medicine Details</DialogTitle>
                                </DialogHeader>
                                <div className="flex gap-8">
                                    {/* Medicine Image */}
                                    {medici?.mediImage && (
                                        <div className="relative flex-1 h-96">
                                            <Image
                                                src={medici.mediImage}
                                                alt={medici?.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="z-0 h-full w-full rounded-md"
                                            />
                                        </div>
                                    )}

                                    {/* Medicine Details */}
                                    <div className="flex-1">

                                        {/* Medicine Name */}
                                        <h1 className="text-2xl font-bold uppercase italic text-black mb-2">
                                            {medici?.name}
                                        </h1>

                                        {/* Category */}
                                        <h4 className="text-base font-medium  mb-2">
                                            <span className="uppercase text-gray-500">Category: </span>{medici?.category}
                                        </h4>

                                        {/* Description */}
                                        <h4 className="text-base font-medium  mb-2">
                                            <span className="uppercase text-gray-500">Desception: </span>{medici?.description}
                                        </h4>

                                        {/* requiredPrescription */}
                                        <div className="">
                                            <h4 className="text-base font-medium  mb-2">
                                                <span className="uppercase text-gray-500">Required Prescription: </span>{medici?.requiredPrescription}
                                            </h4>

                                        </div>

                                        {/* Price and Quantity */}
                                        <div className="grid grid-cols-2 gap-6 mb-2">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Price:</p>
                                                <h5 className="text-2xl font-bold text-[#DF2626]">
                                                    {medici?.price} TK
                                                </h5>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Quantity:</p>
                                                <h5 className="text-2xl font-bold text-black">
                                                    {medici?.quantity}
                                                </h5>
                                            </div>
                                        </div>

                                        {/* Stock Avility and Mass Unite */}
                                        <div className="lg:flex justify-between mb-2">
                                            <h4 className="text-base font-medium  mb-2">
                                                <span className="uppercase text-gray-500">Stock Availability: </span>{medici?.stockAvailability}
                                            </h4>
                                            <h4 className="text-base font-medium  mb-2 lg:mr-4">
                                                <span className="uppercase text-gray-500">Mass Unit: </span>{medici?.massUnit}
                                            </h4>
                                        </div>

                                        {/* Manufacturer Details */}
                                        <div className="mb-2">
                                            <p className="text-xl font-bold text-gray-600 uppercase mb-2 underline">
                                                Manufacturer Details
                                            </p>
                                            <div className="">
                                                {/* Stock Name  and Contact */}
                                                <div className="lg:flex justify-between">
                                                    <h4 className="text-base font-medium  mb-2">
                                                        <span className="uppercase text-gray-500">Company Name: </span>{medici?.manufacturerDetails?.name}
                                                    </h4>
                                                    <h4 className="text-base font-medium  mb-2 lg:mr-4">
                                                        <span className="uppercase text-gray-500">Contact: </span>{medici?.manufacturerDetails?.contactNumber}
                                                    </h4>
                                                </div>

                                                {/* Manufacture date and expire date */}
                                                <div className="lg:flex justify-between">
                                                    <h4 className="text-base font-medium  mb-2">
                                                        <span className="uppercase text-gray-500">Manufacture date: </span>{formatDate(medici?.createdAt)}
                                                    </h4>
                                                    <h4 className="text-base font-medium  mb-2 lg:mr-4">
                                                        <span className="uppercase text-gray-500">Expire Date: </span>{formatDate(medici?.expiryDate)}
                                                    </h4>
                                                </div>

                                                {/* Address */}
                                                <h4 className="text-base font-medium  mb-2">
                                                    <span className="uppercase text-gray-500">Address: </span>{medici?.manufacturerDetails?.address}
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="mb-4">

                                            <div className="lg:flex lg:items-center lg:justify-start lg:gap-2">
                                                <label htmlFor="Quantity" className="font-bold text-gray-700 dark:text-gray-300 mr-2">
                                                    Order Quantity :
                                                </label>
                                                <div className="flex items-center rounded-sm border w-fit">
                                                    <button
                                                        type="button"
                                                        // onClick={handleDecrement}
                                                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75 p-2"
                                                    >
                                                        <BadgeMinus />
                                                    </button>
                                                    <Input
                                                        type="number"
                                                        id="Quantity"
                                                        // value={quantity}
                                                        // onChange={(e) => {
                                                        //     const newQuantity = Number(e.target.value);
                                                        //     if (newQuantity <= bicycle.quantity && newQuantity >= 1) {
                                                        //         setQuantity(newQuantity);
                                                        //     } else {
                                                        //         toast.error("Quantity cannot exceed available stock.");
                                                        //     }
                                                        // }}
                                                        className="h-6 w-10 border-blue-600 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none mx-2"
                                                    />
                                                    <button
                                                        type="button"
                                                        // onClick={handleIncrement}
                                                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75 p-2"
                                                    >
                                                        <BadgePlus />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Buttons */}
                                        <div className="flex items-center gap-4">
                                            <Button
                                                onClick={() => handleAddProduct(medici)}
                                                className="flex-1 py-3 text-base font-semibold bg-[#DF2626] text-white hover:bg-[#BF1E1E] transition-all duration-300 shadow-lg hover:shadow-xl">
                                                ADD TO CART
                                            </Button>
                                            <Button className="flex-1 py-3 text-base font-semibold bg-black text-white hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                                                Buy Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Medicine Image */}
                    {medici?.mediImage && (
                        <Image
                            src={medici.mediImage}
                            alt={medici?.name}
                            layout='fill'
                            objectFit='cover'
                            className='z-0 h-full w-full'
                        />
                    )}
                </div>

                {/* Medicine Name and Price */}
                <div className='mt-6'>
                    <h3 className='z-50 w-fit cursor-pointer text-lg font-semibold duration-300 hover:text-[#DF2626]'>
                        {medici?.name}
                    </h3>
                    <div className='mt-2 flex items-end gap-1'>
                        <p className='text-xl font-bold text-[#DF2626]'>{medici?.price} TK</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicinCard;