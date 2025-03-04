'use client'

import { Input } from "@/components/ui/input";
import localImage from "../../../../../public/BannerImage.jpg";

const Banner = () => {
    return (
        <div>
            <header>
                <div
                    className="w-full bg-center bg-cover h-[38rem]"
                    style={{
                        backgroundImage: `url(${localImage.src})`,
                    }}
                >
                    <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                        <div className="text-center">
                            <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                                Wellcome to our <span className="text-blue-400">MediMart</span> Group
                            </h1>
                            <div className="flex justify-center items-center gap-4 mt-4 p-4">
                                <div>
                                    <Input className="lg:max-w-2xl" type="text" />
                                </div>
                                <button className="w-full px-5 py-2  text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none ">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Banner;