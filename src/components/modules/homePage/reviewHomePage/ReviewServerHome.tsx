// "use server"

// import Loader from "@/components/shared/Loader";
// import ReviewClientHome from "./ReviewClientHome";
// import { getAllReview } from "@/services/ReviewService";




// const ReviewServerHome = async (
//     // { searchParams }: { searchParams: Promise<{ page: number }> }
// ) => {

//     // const { page } = await searchParams;

//     const { data: review, isLoading, isError } = await getAllReview();

//     const reviews = review?.result.slice(0, 6);


//     if (isLoading) {
//         return <Loader />;
//     }

//     if (isError) {
//         return <div>Data no fatch</div>;
//     }

//     return (
//         <div>
//             <ReviewClientHome reviews={reviews} />
//         </div>
//     );
// };

// export default ReviewServerHome;



"use server";

import Loader from "@/components/shared/Loader";
import ReviewClientHome from "./ReviewClientHome";
import { getAllReview } from "@/services/ReviewService";

const ReviewServerHome = async () => {
    // ডেটা ফেচ করুন
    const { data: review, isLoading, isError } = await getAllReview();

    // ডেটা সর্ট করুন (সর্বশেষ ডেটা প্রথমে)
    const sortedReviews = review?.result.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt); // createdAt ফিল্ড ব্যবহার করে সর্ট করুন
    });

    // সর্বশেষ ৬টি ডেটা স্লাইস করুন
    const latestReviews = sortedReviews?.slice(0, 6);

    
    // লোডিং স্টেট
    if (isLoading) {
        return <Loader />;
    }

    // এরর স্টেট
    if (isError) {
        return <div>Data not fetched</div>;
    }

    // ক্লায়েন্ট কম্পোনেন্টে ডেটা পাঠান
    return (
        <div>
            <ReviewClientHome reviews={latestReviews} />
        </div>
    );
};

export default ReviewServerHome;