// /* eslint-disable @typescript-eslint/no-unused-vars */


// "use client"

// import React, { useEffect, useState } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import Link from 'next/link';
// import Image from 'next/image';
// import medimart from '@/assets/nextmart.png'
// import { Button } from '../ui/button';
// import { useUser } from '@/context/UserContext';
// import { usePathname, useRouter } from 'next/navigation';
// import { logout } from '@/services/AuthService';
// import { protectedRoutes } from '@/contants';
// import { toast } from 'sonner';
// import { LogOut, ShoppingCart } from 'lucide-react';
// import { useAppSelector } from '@/redux/hooks';
// import { orderMedicinsSelector } from '@/redux/features/cart/cartSlice';
// import { Input } from '../ui/input';
// import { TMedicine } from '@/types/medicins';

// const Navbar = () => {
//     const medicins = useAppSelector(orderMedicinsSelector);
//     const [medicinss, setMedicin] = useState<TMedicine[]>([]);
//      const [searchQuery, setSearchQuery] = useState("");

//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const pathname = usePathname();
//     const router = useRouter();

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     // Filter medicines based on search query
//     const filteredMedicins = medicinss.filter((medici) => {
//         const matchesName = medici.name.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchesCategory = medici.category.toLowerCase().includes(searchQuery.toLowerCase());
//         return matchesName || matchesCategory;
//     });

//     const { user, setIsLoading, setUser } = useUser();

//     const handleLogOut = () => {

//         setIsLoading(true);

//         try {
//             logout();

//             toast.success("Logout successful!");

//             setUser(null);

//             if (protectedRoutes.some((route) => pathname.match(route))) {
//                 router.push("/");
//             }


//         } catch (error) {
//             toast.error("Logout failed. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const [scrolled, setScrolled] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 50) {
//                 setScrolled(true);
//             } else {
//                 setScrolled(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const navItems: { title: string; path: string }[] = [
//         {
//             title: 'Home',
//             path: '/',
//         },
//         {
//             title: 'Shop',
//             path: '/shop',
//         },
//         {
//             title: 'About',
//             path: '#about',
//         },

//         {
//             title: 'Blogs',
//             path: '#blog',
//         },
//         {
//             title: 'Contacts',
//             path: '#contact',
//         },
//         {
//             title: 'FAQ',
//             path: '#faq',
//         }
//     ];





//     return (
//         <section
//         // className={` fixed z-50   ${scrolled ? ' bg-blue-100' : 'bg-base'}`}
//         >
//             <header className={` fixed z-1000 w-full   ${scrolled ? ' bg-blue-50' : 'bg-base'}`} >
//                 <div className="mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex h-16 items-center justify-between">
//                         <div className="md:flex md:items-center md:gap-12">
//                             <Link className="block text-teal-600" href="/">
//                                 <span className="sr-only">MediMart</span>
//                                 <div className="flex justify-center items-center">
//                                     <Image src={medimart} height={40} width={40} alt="medimart" />
//                                     <span className="ml-2 text-xl font-bold text-blue-700 shadow-2xl">MediMart</span>
//                                 </div>
//                             </Link>
//                         </div>

//                         <div className="hidden md:block">
//                             <nav aria-label="Global">
//                                 <ul className="flex items-center gap-6 text-sm">

//                                     {navItems?.map((navItem) => (
//                                         <li key={navItem.path}>
//                                             <Link
//                                                 // className='rounded-full text-base font-medium duration-500 hover:bg-orange-200 hover:text-black'
//                                                 className={`${pathname === navItem.path ? "text-blue-700  font-bold bg-amber-400 p-2 rounded-xl" : "hover:bg-blue-100 duration-300 text-base font-medium p-2 rounded-xl "}`}
//                                                 href={navItem.path}
//                                             >
//                                                 {navItem.title}
//                                             </Link>

//                                         </li>
//                                     ))}
//                                     <Input
//                                         type="text"
//                                         className=" py-2 w-full rounded-full border border-gray-300 focus:outline-none  focus:ring-blue-500"
//                                         placeholder="Search by medicines name, category..."
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                     // value={searchQuery}
//                                     // onChange={onSearchChange}
//                                     />
//                                     {
//                                         user?.role === "customer" && (
//                                             <li>
//                                                 <div className="flex justify-center items-center md:block hover:bg-blue-100 duration-300 text-base font-medium p-4 rounded-full ">
//                                                     <Link
//                                                         href={`${user?.role}/cart`}
//                                                     >
//                                                         <div className="flex justify-center items-center text-center">
//                                                             <div className="relative">
//                                                                 <div className="t-0 absolute left-3 z-50 ">
//                                                                     <p className="flex h-1 text-2xl  w-1 items-center justify-center rounded-full text-black font-semibold  ml-3 ">
//                                                                         {medicins?.length}
//                                                                     </p>
//                                                                 </div>
//                                                                 <div className=''>
//                                                                     <ShoppingCart />
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </Link>
//                                                 </div>
//                                             </li>
//                                         )
//                                     }


//                                 </ul>
//                             </nav>
//                         </div>

//                         <div className="flex items-center gap-4">
//                             <div className=" flex">



//                                 <div className="hidden sm:flex gap-4">

//                                     {
//                                         user ? (
//                                             <>
//                                                 <DropdownMenu>
//                                                     <DropdownMenuTrigger className='border-none'>
//                                                         <Avatar>
//                                                             <AvatarImage src={user?.image} />
//                                                             <AvatarFallback>User</AvatarFallback>
//                                                         </Avatar>
//                                                     </DropdownMenuTrigger>
//                                                     <div className=''>
//                                                         <DropdownMenuContent className='mr-16'>
//                                                             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                                                             <DropdownMenuSeparator />
//                                                             <DropdownMenuItem>
//                                                                 <Link href={`/${user?.role}/profile`}>Profile</Link>
//                                                             </DropdownMenuItem>
//                                                             <DropdownMenuItem>
//                                                                 <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
//                                                             </DropdownMenuItem>
//                                                             <DropdownMenuItem>My Shop</DropdownMenuItem>
//                                                             <DropdownMenuSeparator />
//                                                             <DropdownMenuItem
//                                                                 className="bg-red-500 cursor-pointer"
//                                                                 onClick={handleLogOut}
//                                                             >
//                                                                 <LogOut />
//                                                                 <span>Log Out</span>
//                                                             </DropdownMenuItem>
//                                                         </DropdownMenuContent>
//                                                     </div>
//                                                 </DropdownMenu>
//                                             </>
//                                         ) : (
//                                             <Link href="/login" >
//                                                 <Button>Login</Button>
//                                             </Link>
//                                         )
//                                     }
//                                 </div>
//                             </div>

//                             <div className="block md:hidden">
//                                 <button
//                                     className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
//                                     onClick={toggleMenu}
//                                 >
//                                     {isMenuOpen ? (
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="size-5"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                             strokeWidth="2"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     ) : (
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="size-5"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                             strokeWidth="2"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                                         </svg>
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 {isMenuOpen && (
//                     <div className="md:hidden ">
//                         <nav aria-label="Global">
//                             <ul className="flex flex-col items-center gap-4 text-sm py-4 bg-sky-50 ml-10 mr-10 rounded-2xl">
//                                 {navItems?.map((navItem) => (
//                                     <li key={navItem.path}>
//                                         <Link
//                                             // className='rounded-full text-base font-medium duration-500 hover:bg-orange-200 hover:text-black'
//                                             className={`${pathname === navItem.path ? "text-blue-700  font-bold bg-amber-400 p-2 rounded-xl" : "hover:bg-blue-100 duration-300 text-base font-medium p-2 rounded-xl "}`}
//                                             href={navItem.path}
//                                         >
//                                             {navItem.title}
//                                         </Link>
//                                     </li>
//                                 ))}

//                                 {
//                                     user?.role === "customer" && (
//                                         <li>
//                                             <div className="flex justify-center items-center md:block hover:bg-blue-100 duration-300 text-base font-medium p-4 rounded-full ">
//                                                 <Link
//                                                     href={`${user?.role}/cart`}
//                                                 >
//                                                     <div className="flex justify-center items-center text-center">
//                                                         <div className="relative">
//                                                             <div className="t-0 absolute left-3 z-50 ">
//                                                                 <p className="flex h-1 text-2xl  w-1 items-center justify-center rounded-full text-black font-semibold  ml-3 ">
//                                                                     {medicins?.length}
//                                                                 </p>
//                                                             </div>
//                                                             <div className=''>
//                                                                 <ShoppingCart />
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </Link>
//                                             </div>
//                                         </li>
//                                     )
//                                 }

//                                 <li>
//                                     {
//                                         user ? (
//                                             <>
//                                                 <DropdownMenu>
//                                                     <DropdownMenuTrigger>
//                                                         <Avatar>
//                                                             <AvatarImage src="https://github.com/shadcn.png" />
//                                                             <AvatarFallback>User</AvatarFallback>
//                                                         </Avatar>
//                                                     </DropdownMenuTrigger>
//                                                     <DropdownMenuContent>
//                                                         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                                                         <DropdownMenuSeparator />
//                                                         <DropdownMenuItem>Profile</DropdownMenuItem>
//                                                         <DropdownMenuItem>
//                                                             <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem>My Shop</DropdownMenuItem>
//                                                         <DropdownMenuSeparator />
//                                                         <DropdownMenuItem
//                                                             className="bg-red-500 cursor-pointer"
//                                                             onClick={handleLogOut}
//                                                         >
//                                                             <LogOut />
//                                                             <span>Log Out</span>
//                                                         </DropdownMenuItem>
//                                                     </DropdownMenuContent>
//                                                 </DropdownMenu>
//                                             </>
//                                         ) : (
//                                             <Link href="/login" >
//                                                 <Button>Login</Button>
//                                             </Link>
//                                         )
//                                     }
//                                 </li>

//                             </ul>
//                         </nav>
//                     </div>
//                 )}
//             </header>
//         </section>
//     );
// };

// export default Navbar;



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
import { LogOut, ShoppingCart, Search } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';
import { orderMedicinsSelector } from '@/redux/features/cart/cartSlice';
import { Input } from '../ui/input';
import { TMedicine } from '@/types/medicins';

const Navbar = () => {
    const medicins = useAppSelector(orderMedicinsSelector);
    const [medicinss, setMedicin] = useState<TMedicine[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        // Clear search when closing
        if (isSearchOpen) {
            setSearchQuery("");
        }
    };

    const handleHomeClick = () => {
        setSearchQuery("");
        setIsSearchOpen(false);
    };

    const handleSearch = () => {
        // Filter medicines based on search query
        const filteredMedicins = medicinss.filter((medici) => {
            const matchesName = medici.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = medici.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesName || matchesCategory;
        });

        // Here you can do something with the filtered results
        // For example, navigate to a search results page:
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
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
            path: '#blog',
        },
        {
            title: 'Contacts',
            path: '#contact',
        },
        {
            title: 'FAQ',
            path: '#faq',
        }
    ];

    return (
        <section>
            <header className={`fixed z-1000 w-full ${scrolled ? 'bg-blue-50' : 'bg-base'}`}>
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <Link 
                                className="block text-teal-600" 
                                href="/"
                                onClick={handleHomeClick}
                            >
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
                                                className={`${pathname === navItem.path ? "text-blue-700 font-bold bg-amber-400 p-2 rounded-xl" : "hover:bg-blue-100 duration-300 text-base font-medium p-2 rounded-xl"}`}
                                                href={navItem.path}
                                                onClick={() => {
                                                    if (navItem.path === '/') {
                                                        handleHomeClick();
                                                    }
                                                }}
                                            >
                                                {navItem.title}
                                            </Link>
                                        </li>
                                    ))}

                                    {/* Search Bar */}
                                    <li className="relative">
                                        <div className="flex items-center">
                                            {isSearchOpen ? (
                                                <div className="flex items-center">
                                                    <Input
                                                        type="text"
                                                        className="py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-blue-500"
                                                        placeholder="Search medicines..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                    <Button 
                                                        variant="ghost" 
                                                        className="ml-2 p-2 rounded-full hover:bg-blue-100"
                                                        onClick={handleSearch}
                                                    >
                                                        <Search className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button 
                                                    variant="ghost" 
                                                    className="p-2 rounded-full hover:bg-blue-100"
                                                    onClick={toggleSearch}
                                                >
                                                    <Search className="h-5 w-5" />
                                                </Button>
                                            )}
                                        </div>
                                    </li>

                                    {user?.role === "customer" && (
                                        <li>
                                            <div className="flex justify-center items-center md:block hover:bg-blue-100 duration-300 text-base font-medium p-4 rounded-full">
                                                <Link href={`${user?.role}/cart`}>
                                                    <div className="flex justify-center items-center text-center">
                                                        <div className="relative">
                                                            <div className="t-0 absolute left-3 z-50">
                                                                <p className="flex h-1 text-2xl w-1 items-center justify-center rounded-full text-black font-semibold ml-3">
                                                                    {medicins?.length}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <ShoppingCart />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex">
                                <div className="hidden sm:flex gap-4">
                                    {user ? (
                                        <>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className='border-none'>
                                                    <Avatar>
                                                        <AvatarImage src={user?.image} />
                                                        <AvatarFallback>User</AvatarFallback>
                                                    </Avatar>
                                                </DropdownMenuTrigger>
                                                <div>
                                                    <DropdownMenuContent className='mr-16'>
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
                                        <Link href="/login">
                                            <Button>Login</Button>
                                        </Link>
                                    )}
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
                            <ul className="flex flex-col items-center gap-4 text-sm py-4 bg-sky-50 ml-10 mr-10 rounded-2xl">
                                {navItems?.map((navItem) => (
                                    <li key={navItem.path}>
                                        <Link
                                            className={`${pathname === navItem.path ? "text-blue-700 font-bold bg-amber-400 p-2 rounded-xl" : "hover:bg-blue-100 duration-300 text-base font-medium p-2 rounded-xl"}`}
                                            href={navItem.path}
                                            onClick={() => {
                                                if (navItem.path === '/') {
                                                    handleHomeClick();
                                                }
                                                setIsMenuOpen(false);
                                            }}
                                        >
                                            {navItem.title}
                                        </Link>
                                    </li>
                                ))}

                                {/* Mobile Search */}
                                <li className="w-full px-4">
                                    <div className="flex items-center">
                                        <Input
                                            type="text"
                                            className="py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-blue-500"
                                            placeholder="Search medicines..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <Button 
                                            variant="ghost" 
                                            className="ml-2 p-2 rounded-full hover:bg-blue-100"
                                            onClick={handleSearch}
                                        >
                                            <Search className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </li>

                                {user?.role === "customer" && (
                                    <li>
                                        <div className="flex justify-center items-center md:block hover:bg-blue-100 duration-300 text-base font-medium p-4 rounded-full">
                                            <Link href={`${user?.role}/cart`}>
                                                <div className="flex justify-center items-center text-center">
                                                    <div className="relative">
                                                        <div className="t-0 absolute left-3 z-50">
                                                            <p className="flex h-1 text-2xl w-1 items-center justify-center rounded-full text-black font-semibold ml-3">
                                                                {medicins?.length}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <ShoppingCart />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                )}

                                <li>
                                    {user ? (
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
                                        <Link href="/login">
                                            <Button>Login</Button>
                                        </Link>
                                    )}
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