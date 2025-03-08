import AllUsersPage from "@/components/modules/adminComponents/allUsers/AllUsersPage";
import Loader from "@/components/shared/Loader";
import { getAllUsers } from "@/services/UserService";


const Alluser = async ({ searchParams }: { searchParams: Promise<{ page: number }> }) => {

    const { page } = await searchParams;

    const { data: users, isLoading, isError } = await getAllUsers(page, 10);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Data no fatch</div>;
    }

    return (
        <div>
            <AllUsersPage users={users} />
        </div>
    );
};

export default Alluser;
