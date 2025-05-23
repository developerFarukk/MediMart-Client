import Login from "@/components/modules/auth/login/Login";
import Loader from "@/components/shared/Loader";
import { Suspense } from "react";



const LoginPage = () => {

    return (
        <div className="min-h-screen">

            <Suspense fallback={<Loader />}>
                <Login />
            </Suspense>
            {/* <Login /> */}

        </div>
    );
};

export default LoginPage;
