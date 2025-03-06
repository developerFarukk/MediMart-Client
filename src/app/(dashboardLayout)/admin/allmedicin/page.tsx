import AllMedi from "@/components/modules/adminComponents/allmedicinpage/AllMedi";
import { getAllMedicins } from "@/services/MedicinManagment";



const AllMedicinPage = async () => {

    const { data: medicins } = await getAllMedicins()

    return (
        <div>
            <AllMedi medicins={medicins} />
        </div>
    );
};

export default AllMedicinPage;
