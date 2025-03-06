import AllMedi from "@/components/modules/adminComponents/allmedicinpage/AllMedi";
import { getAllMedicins } from "@/services/MedicinManagment";



const AllMedicinPage = async () => {

    const { data: medicins } = await getAllMedicins()
    console.log(medicins);
    

    return (
        <div>
            <AllMedi />
        </div>
    );
};

export default AllMedicinPage;
