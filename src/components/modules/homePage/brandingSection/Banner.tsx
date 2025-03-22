'use client'

import { Button } from "@/components/ui/button";


const Banner = () => {
    return (
        <div>
            <div>
                <div className='relative mx-auto flex justify-center'>
                    <video className='' autoPlay loop muted>
                        <source
                            src='https://res.cloudinary.com/dmolqac67/video/upload/v1741451844/medicinvidio_ai18hh.mp4'
                            type='video/mp4'
                        />
                    </video>
                    <div className='absolute bottom-[1.5rem] left-1/2 z-20 w-full -translate-x-1/2 text-center lg:bottom-40'>
                        <h1 className=' font-medium italic leading-none text-white lg:text-[120px]'>
                            Your Health, Our Priority, Find the Right Medicine
                        </h1>
                        <Button className="p-4 mt-8 hover:bg-green-200 hover:text-black">Explore Our Medicine Collection</Button>
                    </div>
                    <span className='absolute inset-0 hidden h-full w-full bg-black opacity-20 lg:flex'></span>
                </div>
            </div>
        </div>
    );
};

export default Banner;