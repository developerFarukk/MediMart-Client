/* eslint-disable @typescript-eslint/no-unused-vars */


"use client"

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import Image from 'next/image';
import medimart from '@/assets/nextmart.png'
import { Button } from '../ui/button';
import { useUser } from '@/context/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/services/AuthService';
import { protectedRoutes } from '@/contants';
import { toast } from 'sonner';
import { LogOut, ShoppingCart } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';
import { orderMedicinsSelector } from '@/redux/features/cart/cartSlice';

const Navbar = () => {
    const medicins = useAppSelector(orderMedicinsSelector);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const { user, setIsLoading, setUser } = useUser();

    const handleLogOut = () => {

        setIsLoading(true);

        try {
            logout();

            toast.success("Logout successful!");

            setUser(null);

            if (protectedRoutes.some((route) => pathname.match(route))) {
                router.push("/");
            }


        } catch (error) {
            toast.error("Logout failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems: { title: string; path: string }[] = [
        {
            title: 'Home',
            path: '/',
        },
        {
            title: 'Shop',
            path: '/shop',
        },
        {
            title: 'About',
            path: '#about',
        },

        {
            title: 'Blogs',
            path: '/blog',
        },
        {
            title: 'Contacts',
            path: '#contact',
        }
    ];





    return (
        <section
        // className={` fixed z-50   ${scrolled ? ' bg-blue-100' : 'bg-base'}`}
        >
            <header className={` fixed z-1000 w-full   ${scrolled ? ' bg-blue-50' : 'bg-base'}`} >
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <Link className="block text-teal-600" href="/">
                                <span className="sr-only">MediMart</span>
                                <div className="flex justify-center items-center">
                                    <Image src={medimart} height={40} width={40} alt="medimart" />
                                    <span className="ml-2 text-xl font-bold text-blue-700 shadow-2xl">MediMart</span>
                                </div>
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-sm">
                                    {navItems?.map((navItem) => (
                                        <li key={navItem.path}>
                                            <Link
                                                // className='rounded-full text-base font-medium duration-500 hover:bg-orange-200 hover:text-black'
                                                className={`${pathname === navItem.path ? "text-blue-700  font-bold bg-amber-400 p-2 rounded-xl" : "hover:bg-blue-100 duration-300 text-base font-medium p-2 rounded-xl "}`}
                                                href={navItem.path}
                                            >
                                                {navItem.title}
                                            </Link>
                                        </li>
                                    ))}
                                    {
                                        user?.role === "customer" && (
                                            <li>
                                                <div className="flex justify-center items-center md:block hover:bg-blue-100 duration-300 text-base font-medium p-4 rounded-full ">
                                                    <Link
                                                        href={`${user?.role}/cart`}
                                                    >
                                                        <div className="flex justify-center items-center text-center">
                                                            <div className="relative">
                                                                <div className="t-0 absolute left-3 z-50 ">
                                                                    <p className="flex h-1 text-2xl  w-1 items-center justify-center rounded-full text-black font-semibold  ml-3 ">
                                                                        {medicins?.length}
                                                                    </p>
                                                                </div>
                                                                <div className=''>
                                                                    <ShoppingCart />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </li>
                                        )
                                    }

                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className=" flex">



                                <div className="hidden sm:flex gap-4">

                                    {
                                        user ? (
                                            <>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className='border-none'>
                                                        <Avatar>
                                                            <AvatarImage src={user?.image} />
                                                            <AvatarFallback>User</AvatarFallback>
                                                        </Avatar>
                                                    </DropdownMenuTrigger>
                                                    <div className=''>
                                                        <DropdownMenuContent className='mr-16'>
                                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>My Shop</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="bg-red-500 cursor-pointer"
                                                                onClick={handleLogOut}
                                                            >
                                                                <LogOut />
                                                                <span>Log Out</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </div>
                                                </DropdownMenu>
                                            </>
                                        ) : (
                                            <Link href="/login" >
                                                <Button>Login</Button>
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="block md:hidden">
                                <button
                                    className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                                    onClick={toggleMenu}
                                >
                                    {isMenuOpen ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <nav aria-label="Global">
                            <ul className="flex flex-col items-center gap-4 text-sm py-4">
                                {navItems?.map((navItem) => (
                                    <li key={navItem.path}>
                                        <Link
                                            // className='rounded-full text-base font-medium duration-500 hover:bg-orange-200 hover:text-black'
                                            className={`${pathname === navItem.path ? "text-blue-700  font-bold bg-amber-400 p-2 rounded-xl" : "hover:bg-blue-100 duration-300 text-base font-medium p-2 rounded-xl "}`}
                                            href={navItem.path}
                                        >
                                            {navItem.title}
                                        </Link>
                                    </li>
                                ))}

                                {
                                    user?.role === "customer" && (
                                        <li>
                                            <div className="flex justify-center items-center md:block hover:bg-blue-100 duration-300 text-base font-medium p-4 rounded-full ">
                                                <Link
                                                    href={`${user?.role}/cart`}
                                                >
                                                    <div className="flex justify-center items-center text-center">
                                                        <div className="relative">
                                                            <div className="t-0 absolute left-3 z-50 ">
                                                                <p className="flex h-1 text-2xl  w-1 items-center justify-center rounded-full text-black font-semibold  ml-3 ">
                                                                    {medicins?.length}
                                                                </p>
                                                            </div>
                                                            <div className=''>
                                                                <ShoppingCart />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </li>
                                    )
                                }

                                <li>
                                    {
                                        user ? (
                                            <>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <Avatar>
                                                            <AvatarImage src="https://github.com/shadcn.png" />
                                                            <AvatarFallback>User</AvatarFallback>
                                                        </Avatar>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>My Shop</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="bg-red-500 cursor-pointer"
                                                            onClick={handleLogOut}
                                                        >
                                                            <LogOut />
                                                            <span>Log Out</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </>
                                        ) : (
                                            <Link href="/login" >
                                                <Button>Login</Button>
                                            </Link>
                                        )
                                    }
                                </li>

                            </ul>
                        </nav>
                    </div>
                )}
            </header>
        </section>
    );
};

export default Navbar;