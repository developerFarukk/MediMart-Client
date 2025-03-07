import AllMedi from "@/components/modules/adminComponents/allmedicinpage/AllMedi";
import Loader from "@/components/shared/Loader";
import { getAllMedicins } from "@/services/MedicinManagment";



const AllMedicinPage = async () => {

    const { data: medicins, isLoading, isError } = await getAllMedicins();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Data no fatch</div>;
    }

    return (
        <div>
            <AllMedi medicins={medicins} />
        </div>
    );
};

export default AllMedicinPage;
