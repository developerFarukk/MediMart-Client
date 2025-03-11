'use client'

import Link from "next/link";


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
                        <button className='group btn btn-outline relative mt-3 rounded-none border-white text-white hover:bg-transparent lg:mt-6'>
                            <Link href="#">
                                <p className='z-10 font-light group-hover:text-black lg:text-xl'>Explore Our Medicine Collection</p>
                            </Link>
                            <span className='absolute inset-0 w-0 bg-white duration-500 group-hover:w-full'></span>
                        </button>
                    </div>
                    <span className='absolute inset-0 hidden h-full w-full bg-black opacity-20 lg:flex'></span>
                </div>
            </div>
        </div>
    );
};

export default Banner;