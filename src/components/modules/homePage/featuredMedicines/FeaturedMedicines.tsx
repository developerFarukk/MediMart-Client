
"use client"

import Loader from "@/components/shared/Loader";
import { getAllMedicins } from "@/services/MedicinManagment";
import { useEffect, useState } from "react";
import MedicinCard from "./MedicinCard";
import { TMedicine } from "@/types/medicins";


const FeaturedMedicines = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [medicins, setMedicin] = useState([]);

    const getMedicin = async (page: number) => {
        setIsLoading(true);

        try {
            const { data: newMedicins } = await getAllMedicins(page, 6);
            if (newMedicins) {
                setMedicin(newMedicins?.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getMedicin(1);
    }, []);


    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <div>
                <div className="flex items-center justify-center space-x-4 p-4 mb-4 mt-4">
                    <div>
                        <h1 className="text-3xl font-semibold">Featured Medicines</h1>
                    </div>
                </div>
            </div>

            <div>
                <div className='mx-auto mt-10 grid max-w-[1440px] grid-cols-1 gap-9 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-0'>
                    {medicins?.map((medici: TMedicine) => <MedicinCard medici={medici} key={medici._id} />)}
                </div>
            </div>

        </div>
    );
};

export default FeaturedMedicines;
