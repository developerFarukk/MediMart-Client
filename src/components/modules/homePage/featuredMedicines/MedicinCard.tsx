

"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TMedicine } from "@/types/medicins";
import Image from "next/image";

interface TMedicinss {
    medici: TMedicine;
}

const MedicinCard = ({ medici }: TMedicinss) => {
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
                                        <h4 className="text-base font-semibold uppercase text-gray-500">{medici?.category}</h4>
                                        <h1 className="text-2xl font-semibold uppercase italic text-black">{medici?.name}</h1>
                                        <p className="text-base font-semibold text-gray-500 mt-2">{medici?.description}</p>

                                        {/* Price */}
                                        <p className="mb-4 mt-6 text-sm font-semibold text-gray-600 uppercase">Price</p>
                                        <h5 className="text-2xl font-medium uppercase text-black">{medici?.price} TK</h5>

                                        {/* Quantity */}
                                        <p className="mb-4 mt-6 text-sm font-semibold text-gray-600 uppercase">Quantity</p>
                                        <h5 className="text-2xl font-medium uppercase text-black">{medici?.quantity}</h5>

                                        {/* Manufacturer Details */}
                                        <p className="mb-4 mt-6 text-sm font-semibold text-gray-600 uppercase">Manufacturer Details</p>
                                        <div className="space-y-2">
                                            <p className="text-base font-semibold text-gray-500">Name: {medici?.manufacturerDetails?.name}</p>
                                            <p className="text-base font-semibold text-gray-500">Address: {medici?.manufacturerDetails?.address}</p>
                                            <p className="text-base font-semibold text-gray-500">Contact: {medici?.manufacturerDetails?.contactNumber}</p>
                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-5 flex items-center font-medium transition-all duration-500 ease-out">
                                            <Button className="z-10 mr-2 rounded-[4px] border border-black px-6 py-3 leading-4 text-black shadow-2xl duration-500 hover:border-black hover:bg-black hover:text-white">
                                                ADD TO CART
                                            </Button>
                                            <Button className="z-10 rounded-[4px] bg-black px-6 py-[10px] text-white shadow-2xl duration-500 hover:bg-[#DF2626] hover:text-white hover:shadow-lg">
                                                Add To Wishlist
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