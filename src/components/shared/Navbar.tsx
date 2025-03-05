/* eslint-disable @typescript-eslint/no-unused-vars */


"use client"

import React, { useState } from 'react';
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
import { LogOut } from 'lucide-react';

const Navbar = () => {
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


    return (
        <header className="">
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
                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
                                </li>
                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Careers </a>
                                </li>
                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> History </a>
                                </li>
                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Services </a>
                                </li>
                                <li>
                                    <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
                                </li>
                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="/dashboard"> Dashboard </Link>
                                </li>
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
                                                <DropdownMenuTrigger>
                                                    <Avatar>
                                                        <AvatarImage src={user?.image} />
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
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
                            </li>
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Careers </a>
                            </li>
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> History </a>
                            </li>
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Services </a>
                            </li>
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
                            </li>
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Blog </a>
                            </li>

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
    );
};

export default Navbar;