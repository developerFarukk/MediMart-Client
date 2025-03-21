
import MedicinDetails from "@/components/modules/homePage/MedicinDetails";
import { getSinglemedicin } from "@/services/MedicinManagment";


const MedicineDetails = async ({ params }: { params: Promise<{ medicinId: string }> }) => {

    const { medicinId } = await params;

    const { data: medici } = await getSinglemedicin(medicinId);
    

    return (
        <div>
            <MedicinDetails medici={medici} />
        </div>
    );
};

export default MedicineDetails;

