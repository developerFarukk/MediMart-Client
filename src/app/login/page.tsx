import Login from "@/components/modules/auth/login/Login";
import Loader from "@/components/shared/Loader";
import { Suspense } from "react";



const LoginPage = () => {

    return (
        <div>

            <Suspense fallback={<Loader />}>
                <Login />
            </Suspense>


        </div>
    );
};

export default LoginPage;
