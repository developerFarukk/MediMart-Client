

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
    const { user, setIsLoading, setUser } = useUser();
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        { title: 'Home', path: '/' },
        { title: 'Shop', path: '/shop' },
        { title: 'About', path: '#about' },
        { title: 'Blogs', path: '#blog' },
        { title: 'Contacts', path: '#contact' },
        { title: 'FAQ', path: '#faq' },
    ];

    return (
        <section>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <Image src={medimart} height={40} width={40} alt="medimart" />
                                <span className="ml-2 text-xl font-bold text-blue-700">MediMart</span>
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`px-3 py-2 rounded-xl font-medium transition duration-300 ${pathname === item.path ? "bg-amber-400 text-blue-700 font-bold" : "hover:bg-blue-100 text-gray-700"}`}
                                >
                                    {item.title}
                                </Link>
                            ))}

                            {user?.role === "customer" && (
                                <Link href={`${user?.role}/cart`} className="relative">
                                    <ShoppingCart className="w-6 h-6 text-gray-700" />
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{medicins?.length}</span>
                                </Link>
                            )}
                        </div>

                        {/* Account */}
                        <div className="hidden md:flex items-center gap-4">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="border-none focus:outline-none">
                                        <Avatar>
                                            <AvatarImage src={user?.image} />
                                            <AvatarFallback>User</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-48">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link href={`/${user?.role}/profile`}>Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>My Shop</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogOut}>
                                            <LogOut className="mr-2" />
                                            Log Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link href="/login">
                                    <Button>Login</Button>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="p-2 bg-gray-100 rounded-full">
                                {isMenuOpen ? (
                                    <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg">
                        <div className="flex flex-col gap-4 p-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`block text-base font-medium px-4 py-2 rounded-xl transition ${pathname === item.path ? "bg-amber-400 text-blue-700 font-bold" : "hover:bg-blue-100 text-gray-700"}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}

                            {user?.role === "customer" && (
                                <Link href={`${user?.role}/cart`} className="relative px-4 py-2">
                                    <ShoppingCart className="w-6 h-6 inline-block mr-2" />
                                    Cart 
                                    <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{medicins?.length}</span>
                                </Link>
                            )}

                            {user ? (
                                <div className="border-t pt-4">
                                    <Link href={`/${user?.role}/profile`} className="block px-4 py-2 hover:bg-blue-100 rounded-xl">Profile</Link>
                                    <Link href={`/${user?.role}/dashboard`} className="block px-4 py-2 hover:bg-blue-100 rounded-xl">Dashboard</Link>
                                    <button onClick={handleLogOut} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-xl">Log Out</button>
                                </div>
                            ) : (
                                <Link href="/login" className="block px-4 py-2">
                                    <Button className="w-full">Login</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </section>
    );
};

export default Navbar;
