

'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const Banner = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showScrollHint, setShowScrollHint] = useState(true);

    // Auto-hide scroll hint after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowScrollHint(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // Handle scroll to indicate next section
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollHint(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative h-[70vh] max-h-[700px] min-h-[500px] w-full overflow-hidden">
            {/* Video Background */}
            <video
                className="h-full w-full object-cover"
                autoPlay={isPlaying}
                loop
                muted={isMuted}
                playsInline
            >
                <source
                    src='https://res.cloudinary.com/dmolqac67/video/upload/v1741451844/medicinvidio_ai18hh.mp4'
                    type='video/mp4'
                />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                {/* Content */}
                <div className="container mx-auto px-4 text-center z-10">
                    <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg'>
                        Your Health, Our Priority
                        <br />
                        <span className="text-green-300">Find the Right Medicine</span>
                    </h1>
                    <Link href="/shop" >
                        <Button
                            className="px-8 py-6 text-lg bg-green-600 hover:bg-green-700 transition-all transform hover:scale-105"
                            size="lg"
                        >
                            Explore Our Medicine Collection
                        </Button></Link>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                        {isMuted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.314m-11.314 0a7.975 7.975 0 010-11.314m0 0a7.975 7.975 0 015.657-2.343" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Scroll Hint */}
                {showScrollHint && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
                        <div className="flex flex-col items-center">
                            <span className="text-white text-sm mb-2">Scroll Down</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;