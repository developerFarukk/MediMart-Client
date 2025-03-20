import Banner from "@/components/modules/homePage/brandingSection/Banner";
import FeaturedMedicines from "@/components/modules/homePage/featuredMedicines/FeaturedMedicines";
import ReviewServerHome from "@/components/modules/homePage/reviewHomePage/ReviewServerHome";



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

                {/* Review Section */}
                <div>
                    <ReviewServerHome />
                </div>
            </div>
        </div>
    );
};

export default Home;
