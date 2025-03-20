
"use server";

import Loader from "@/components/shared/Loader";
import ReviewClientHome from "./ReviewClientHome";
import { getAllReview } from "@/services/ReviewService";

const ReviewServerHome = async () => {

    const { data: review, isLoading, isError } = await getAllReview();

    const sortedReviews = review?.result.sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });


    const latestReviews = sortedReviews?.slice(0, 6);



    if (isLoading) {
        return <Loader />;
    }


    if (isError) {
        return <div>Data not fetched</div>;
    }

    return (
        <div>
            <ReviewClientHome reviews={latestReviews} />
        </div>
    );
};

export default ReviewServerHome;