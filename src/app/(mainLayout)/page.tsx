import Banner from "@/components/modules/homePage/brandingSection/Banner";
import FeaturedMedicines from "@/components/modules/homePage/featuredMedicines/FeaturedMedicines";



const Home = () => {

    return (
        <div>

            {/* Branding Banner Sction */}
            <div>
                <Banner />
            </div>

            {/* featuredMedicines Section */}
            <div>
                <FeaturedMedicines />
            </div>
        </div>
    );
};

export default Home;
