


"use client";

import { useEffect, useRef } from "react";
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { TReview } from "@/types/review";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import TitleButton from "@/components/shared/TitleButton";

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
                    updateActiveSlide(slider);
                },
                slideChanged(slider) {
                    updateActiveSlide(slider);
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

    const updateActiveSlide = (slider: KeenSliderInstance) => {
        const activeElement = document.getElementById("keen-slider-active");
        const countElement = document.getElementById("keen-slider-count");

        if (activeElement && countElement) {
            activeElement.innerText = String(slider.track.details.rel + 1);
            countElement.innerText = String(slider.slides.length);
        }

        slider.slides.forEach((slide, index) => {
            if (index === slider.track.details.rel) {
                slide.classList.remove("opacity-40");
                slide.classList.add("scale-105");
            } else {
                slide.classList.add("opacity-40");
                slide.classList.remove("scale-105");
            }
        });
    };

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <TitleButton title="Customer Testimonials" />
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        What Our Customers Say
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Read genuine reviews from people who have used our medicines
                    </p>
                </div>

                {reviews?.length > 0 ? (
                    <div className="relative">
                        <div id="keen-slider" className="keen-slider pb-12" ref={sliderRef}>
                            {reviews.map((review: TReview) => (
                                <div key={review?._id} className="keen-slider__slide opacity-40 transition-all duration-300">
                                    <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="relative h-16 w-16 flex-shrink-0">
                                                <Image
                                                    src={review?.user?.image || "/default-avatar.png"}
                                                    width={64}
                                                    height={64}
                                                    className="rounded-full object-cover h-16 w-16"
                                                    alt={review?.user?.name || "User"}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-lg font-semibold text-gray-900">{review?.user?.name}</p>
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                        Verified Buyer
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">{review?.user?.email}</p>
                                                <div className="flex items-center mt-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`h-5 w-5 ${star <= review?.reviewCount ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                                        />
                                                    ))}
                                                    <span className="ml-2 text-sm text-gray-500">
                                                        {review?.reviewCount}.0
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                                                {review?.title}
                                            </h3>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(review?.createdAt)}
                                            </span>
                                        </div>

                                        <Textarea 
                                            value={review?.message} 
                                            className="text-gray-700 mb-6 flex-grow resize-none" 
                                            disabled 
                                        />

                                        <div className="mt-auto bg-blue-50 rounded-lg p-4">
                                            <h3 className="font-semibold text-blue-800 mb-2">Product Details</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <span className="text-gray-600">Medicine:</span>
                                                    <span className="ml-2 font-medium">{review?.product?.name}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Category:</span>
                                                    <span className="ml-2 font-medium">{review?.product?.category}</span>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <span className="text-gray-600">Manufacturer:</span>
                                                    <span className="ml-2 font-medium">{review?.product?.manufacturerDetails?.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-8">
                            <button
                                id="keen-slider-previous"
                                className="rounded-full bg-white p-3 shadow-md hover:bg-gray-100 transition-colors"
                                aria-label="Previous testimonial"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-gray-700"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            <div className="flex items-center gap-2">
                                <span id="keen-slider-active" className="font-medium text-gray-900"></span>
                                <span className="text-gray-500">of</span>
                                <span id="keen-slider-count" className="font-medium text-gray-900"></span>
                            </div>

                            <button
                                id="keen-slider-next"
                                className="rounded-full bg-white p-3 shadow-md hover:bg-gray-100 transition-colors"
                                aria-label="Next testimonial"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-gray-700"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No Reviews Yet</h3>
                        <p className="mt-2 text-gray-600 max-w-md mx-auto">
                            Be the first to share your experience with our medicines
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ReviewClientHome;