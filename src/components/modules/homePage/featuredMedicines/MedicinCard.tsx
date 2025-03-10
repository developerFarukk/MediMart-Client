

"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { addMedicin } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TMedicine } from "@/types/medicins";
import Image from "next/image";


interface TMedicinss {
    medici: TMedicine;
}

const MedicinCard = ({ medici }: TMedicinss) => {

const dispatch = useAppDispatch();

const handleAddProduct = (medici: TMedicine) => {
    dispatch(addMedicin(medici));
}


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
                                        {/* Category */}
                                        <h4 className="text-base font-semibold uppercase text-gray-500 mb-2">
                                            {medici?.category}
                                        </h4>

                                        {/* Medicine Name */}
                                        <h1 className="text-3xl font-bold uppercase italic text-black mb-4">
                                            {medici?.name}
                                        </h1>

                                        {/* Description */}
                                        <p className="text-base text-gray-600 mb-6 leading-relaxed">
                                            {medici?.description}
                                        </p>

                                        {/* Price and Quantity */}
                                        <div className="grid grid-cols-2 gap-6 mb-8">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Price</p>
                                                <h5 className="text-2xl font-bold text-[#DF2626]">
                                                    {medici?.price} TK
                                                </h5>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Quantity</p>
                                                <h5 className="text-2xl font-bold text-black">
                                                    {medici?.quantity}
                                                </h5>
                                            </div>
                                        </div>

                                        {/* Manufacturer Details */}
                                        <div className="mb-8">
                                            <p className="text-sm font-semibold text-gray-600 uppercase mb-4">
                                                Manufacturer Details
                                            </p>
                                            <div className="space-y-3">
                                                <div className="flex items-center">
                                                    <span className="text-base font-medium text-gray-700 mr-2">Name:</span>
                                                    <span className="text-base text-gray-600">{medici?.manufacturerDetails?.name}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-base font-medium text-gray-700 mr-2">Address:</span>
                                                    <span className="text-base text-gray-600">{medici?.manufacturerDetails?.address}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-base font-medium text-gray-700 mr-2">Contact:</span>
                                                    <span className="text-base text-gray-600">{medici?.manufacturerDetails?.contactNumber}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex items-center gap-4">
                                            <Button
                                                onClick={ () => handleAddProduct(medici)}
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