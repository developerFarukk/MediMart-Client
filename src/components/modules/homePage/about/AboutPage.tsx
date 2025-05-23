"use client"

import TitleButton from "@/components/shared/TitleButton";
import Image from "next/image";
import Link from "next/link";




const AboutPage = () => {

    return (
        <div className="mt-8">
            <section>
                <div className="flex items-center justify-center space-x-4 p-2  ">
                    <div>
                        <TitleButton title="About Us" />
                    </div>
                </div>
                <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                        <div>
                            <div className="max-w-lg md:max-w-none">
                                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                                    Your Trusted Partner in Health and Wellness
                                </h2>

                                <p className="mt-4 text-gray-700">
                                    At MediMart, we are committed to providing high-quality medicines and healthcare products to support your well-being. Whether you need prescription medications, over-the-counter remedies, or wellness essentials, we have got you covered.
                                </p>

                                <Link
                                    href="/shop"
                                    className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Image
                                src="https://images.unsplash.com/photo-1579165466991-467135ad3110?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="rounded"
                                alt="Medicines and healthcare products"
                                height={600}
                                width={1000}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
