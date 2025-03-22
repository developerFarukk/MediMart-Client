import AboutPage from "@/components/modules/homePage/about/AboutPage";
import Banner from "@/components/modules/homePage/brandingSection/Banner";
import Contacts from "@/components/modules/homePage/contacts/Contacts";
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

                {/* About section */}
                <div id="about">
                    <AboutPage />
                </div>

                {/* Contacts Section */}
                <div id="contact">
                    <Contacts />
                </div>
            </div>
        </div>
    );
};

export default Home;
