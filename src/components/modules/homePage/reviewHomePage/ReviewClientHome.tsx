

"use client";

import { useEffect, useRef } from "react";
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { TReview } from "@/types/review";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface TReviewss {
    reviews: any;
}

const ReviewClientHome = ({ reviews }: TReviewss) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const sliderInstance = useRef<KeenSliderInstance | null>(null);

    useEffect(() => {
        if (sliderRef.current && !sliderInstance.current) {
            sliderInstance.current = new KeenSlider(sliderRef.current, {
                loop: true,

                defaultAnimation: {
                    duration: 750,
                },
                slides: {
                    origin: "center",
                    perView: 1,
                    spacing: 16,
                },
                breakpoints: {
                    "(min-width: 640px)": {
                        slides: {
                            origin: "center",
                            perView: 1.5,
                            spacing: 16,
                        },
                    },
                    "(min-width: 768px)": {
                        slides: {
                            origin: "center",
                            perView: 1.75,
                            spacing: 16,
                        },
                    },
                    "(min-width: 1024px)": {
                        slides: {
                            origin: "center",
                            perView: 3,
                            spacing: 16,
                        },
                    },
                },
                created(slider) {
                    const activeElement = document.getElementById("keen-slider-active");
                    const countElement = document.getElementById("keen-slider-count");

                    if (activeElement && countElement) {
                        activeElement.innerText = String(slider.track.details.rel + 1);
                        countElement.innerText = String(slider.slides.length);
                    }


                    slider.slides.forEach((slide, index) => {
                        if (index === slider.track.details.rel) {
                            slide.classList.remove("opacity-40");
                        } else {
                            slide.classList.add("opacity-40");
                        }
                    });
                },
                slideChanged(slider) {
                    const activeElement = document.getElementById("keen-slider-active");

                    if (activeElement) {
                        activeElement.innerText = String(slider.track.details.rel + 1);
                    }


                    slider.slides.forEach((slide, index) => {
                        if (index === slider.track.details.rel) {
                            slide.classList.remove("opacity-40");
                        } else {
                            slide.classList.add("opacity-40");
                        }
                    });
                },
            });

            const keenSliderPrevious = document.getElementById("keen-slider-previous");
            const keenSliderNext = document.getElementById("keen-slider-next");

            if (keenSliderPrevious && keenSliderNext) {
                keenSliderPrevious.addEventListener("click", () => sliderInstance.current?.prev());
                keenSliderNext.addEventListener("click", () => sliderInstance.current?.next());
            }
        }


        return () => {
            if (sliderInstance.current) {
                sliderInstance.current.destroy();
                sliderInstance.current = null;
            }
        };
    }, []);

    const starColors = {
        1: "bg-yellow-50",
        2: "bg-yellow-200",
        3: "bg-yellow-300",
        4: "bg-yellow-400",
        5: "bg-yellow-500",
    } as any;

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
            <section className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4  sm:px-6 mt-8">
                    <div className="flex items-center justify-center space-x-4 p-2  ">
                        <div>
                            <h1 className="text-3xl font-semibold">Review our Medicines</h1>
                        </div>
                    </div>
                    {
                        reviews?.length > 0 ? (
                            <div className="mt-8">
                                <div id="keen-slider" className="keen-slider" ref={sliderRef}>
                                    {reviews.map((review: TReview) => (
                                        <div key={review?._id} className="keen-slider__slide opacity-40 transition-opacity duration-500">
                                            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-xs sm:p-8">
                                                <div className="flex items-center gap-4">
                                                    {/* <Image
                                                        alt="review user image"
                                                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                                        // src={review?.user?.image}
                                                        width={70}
                                                        height={70}
                                                        className="rounded-full"
                                                    /> */}
                                                    <Image
                                                        src={review?.user?.image || "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"}
                                                        width={70}
                                                        height={70}
                                                        className="rounded-full"
                                                        alt="NO"
                                                    />
                                                    <div>
                                                        <p className="text-lg font-medium text-gray-900">{review?.user?.name}</p>
                                                        <p className="-mt-1 text-sm font-medium text-gray-900">{review?.user?.email}</p>
                                                        <div className="text-green-500">
                                                            <div className="flex justify-start mt-2">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <Star
                                                                        key={star}
                                                                        className={`cursor-pointer ${star <= review?.reviewCount ? starColors[star] : "bg-gray-300"
                                                                            } rounded-full`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="mt-4 font-bold text-2xl text-gray-700">
                                                        {review?.title} <span className="text-sm font-normal">{`(${formatDate(review?.createdAt)})`}</span>
                                                    </p>
                                                    <Textarea value={review?.message} className="text-lg" disabled />
                                                </div>
                                                <div className="mt-8">
                                                    <h2 className="font-bold text-xl underline">Review Details</h2>
                                                    <div>
                                                        <h3><span className="font-medium mr-2">Medicin Name:</span>{review?.product?.name}</h3>
                                                        <h3><span className="font-medium mr-2">Medicin Category:</span>{review?.product?.category}</h3>
                                                        <h3><span className="font-medium mr-2">Company Name:</span>{review?.product?.manufacturerDetails?.name}</h3>
                                                    </div>
                                                </div>
                                            </blockquote>
                                        </div>
                                    ))}
                                </div>

                                {/* নেভিগেশন বাটন */}
                                <div className="mt-6 flex items-center justify-center gap-4">
                                    <button
                                        aria-label="Previous slide"
                                        id="keen-slider-previous"
                                        className="text-gray-600 transition-colors hover:text-gray-900"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </button>

                                    <p className="w-16 text-center text-sm text-gray-700">
                                        <span id="keen-slider-active"></span>
                                        /
                                        <span id="keen-slider-count"></span>
                                    </p>

                                    <button
                                        aria-label="Next slide"
                                        id="keen-slider-next"
                                        className="text-gray-600 transition-colors hover:text-gray-900"
                                    >
                                        <svg
                                            className="size-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9 5l7 7-7 7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h2 className="font-medium text-lg text-blue-500">Review is Empty</h2>
                            </div>
                        )
                    }

                </div>
            </section>
        </div>
    );
};

export default ReviewClientHome;