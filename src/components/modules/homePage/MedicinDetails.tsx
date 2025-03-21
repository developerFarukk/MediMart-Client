"use client"

import { useState } from "react";
import MedicinCard from "./featuredMedicines/MedicinCard";


interface Tmedidetais {
    medici: any;
}

const MedicinDetails = ({ medici }: Tmedidetais) => {

    const [isDialogOpen, setIsDialogOpen] = useState(true);

    return (
        <div>
            <MedicinCard
                medici={medici}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </div>
    );
};

export default MedicinDetails;
