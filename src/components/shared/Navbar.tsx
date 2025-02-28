

import Image from "next/image";

import medimart from '@/assets/nextmart.png'
import Link from "next/link";

const Navbar = () => {

    return (
        <div>
            <header className="">
                <div className="mx-auto  px-4 sm:px-6 lg:px-8">
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
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Blog </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <a
                                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                                    href="#"
                                >
                                    Login
                                </a>

                                <div className="hidden sm:flex">
                                    <a
                                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                                        href="#"
                                    >
                                        Register
                                    </a>
                                </div>
                            </div>

                            <div className="block md:hidden">
                                <button
                                    className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                                >
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
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
