import AboutPage from "@/components/modules/homePage/about/AboutPage";
import BlogPage from "@/components/modules/homePage/blogs/BlogPage";
import Banner from "@/components/modules/homePage/brandingSection/Banner";
import Contacts from "@/components/modules/homePage/contacts/Contacts";
import FaqComponent from "@/components/modules/homePage/faqPage/FaqComponent";
import FeaturedMedicines from "@/components/modules/homePage/featuredMedicines/FeaturedMedicines";
import ReviewServerHome from "@/components/modules/homePage/reviewHomePage/ReviewServerHome";
import TeamComponent from "@/components/modules/homePage/team/TeamComponent";



const Home = () => {

    return (
        <div className="">

            {/* Branding Banner Sctions */}
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

                {/* Blog section */}
                <div id="blog">
                    <BlogPage />
                </div>

                {/* Contacts Section */}
                <div id="contact">
                    <Contacts />
                </div>

                {/* Contacts Section */}
                <div id="faq">
                    <FaqComponent />
                </div>

                {/* Team */}
                <div id="team">
                    <TeamComponent />
                </div>


            </div>
        </div>
    );
};

export default Home;
