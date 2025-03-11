import Banner from "@/components/modules/homePage/brandingSection/Banner";
import FeaturedMedicines from "@/components/modules/homePage/featuredMedicines/FeaturedMedicines";



const Home = () => {

    return (
        <div className="">

            {/* Branding Banner Sction */}
            <div>
                <Banner />
            </div>


            <div className="px-2 sm:px-4 lg:px-6">

                {/* featuredMedicines Section */}
                <div>
                    <FeaturedMedicines />
                </div>
            </div>
        </div>
    );
};

export default Home;
