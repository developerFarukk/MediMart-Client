import AllMedi from "@/components/modules/adminComponents/allmedicinpage/AllMedi";
import { getAllMedicins } from "@/services/MedicinManagment";



const AllMedicinPage = async () => {

    const { data: medicins, isLoading } = await getAllMedicins()

    return (
        <div>
            <AllMedi medicins={medicins} isLoading={isLoading} />
        </div>
    );
};

export default AllMedicinPage;
