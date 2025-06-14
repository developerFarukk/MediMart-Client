

"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { TMedicine } from "@/types/medicins";
import Image from "next/image";
import AddReviewModal from "../reviewPage/AddReviewModal";
import Link from "next/link";

interface TMedicinss {
    medici: TMedicine;
}

const MedicinCard = ({ medici }: TMedicinss) => {

    const { user } = useUser();

    return (

        <div className="border-2 p-2 rounded-xl">
            <div className="group">
                <div className="relative h-60 w-full rounded-md bg-cover">
                    {/* Quick View Button - Always Visible */}
                    <div className="absolute bottom-5 left-7 z-50 mt-5 flex items-center font-medium">

                        <Link href={`/medicine/${medici._id}`}>
                            <Button className=" mr-2 w-fit rounded-[4px] border px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm uppercase leading-4 shadow-md sm:shadow-xl duration-300   backdrop-blur-sm transition-all bg-green-300 text-black hover:bg-green-500">
                                Quick View
                            </Button>
                        </Link>

                       
                    </div>

                    {/* Medicine Image */}
                    {medici?.mediImage && (
                        <Image
                            src={medici.mediImage}
                            alt={medici?.name}
                            layout="fill"
                            objectFit="cover"
                            className="z-0 h-full w-full rounded-xl"
                        />
                    )}
                </div>

                {/* Medicine Name and Price */}
                <div className="mt-6">
                    <h3 className="z-50 w-fit cursor-pointer text-lg font-semibold duration-300 hover:text-[#DF2626]">
                        {medici?.name}
                    </h3>
                    <h4 className="text-base font-medium mb-2">
                        <span className="uppercase text-gray-500">Category: </span>
                        {medici?.category}
                    </h4>
                    <div className="flex justify-between p-1">
                        <div className="mt-2 flex items-end gap-1">
                            <p className="text-xl font-bold text-[#DF2626]">{medici?.price} TK</p>
                        </div>
                        <div>
                            {user?.role === "admin" ? null : <AddReviewModal medicinId={medici?._id} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicinCard;

