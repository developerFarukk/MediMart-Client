import AllMedi from "@/components/modules/adminComponents/allmedicinpage/AllMedi";
import Loader from "@/components/shared/Loader";
import { getAllMedicins } from "@/services/MedicinManagment";




const AllMedicinPage = async ({ searchParams }: {searchParams: Promise<{ page: number }>}) => {

    const { page } = await searchParams;

    const { data: medicins, isLoading, isError } = await getAllMedicins(page, 10);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Data no fatch</div>;
    }



    return (
        <div>
            <AllMedi medicins={medicins}  />
        </div>
    );
};



export default AllMedicinPage;


