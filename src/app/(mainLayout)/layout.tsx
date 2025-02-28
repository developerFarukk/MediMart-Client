import Navbar from "@/components/shared/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    return <div>
        <Navbar />
        {children}
    </div>;

};

export default DashboardLayout;