// import Image from "next/image";
// import Link from "next/link";
// import medimart from '@/assets/nextmart.png'




// const Footer = () => {

//     return (
//         <div>
//             <footer className="">
//                 <div className="mx-auto bg-fuchsia-100 mt-8 space-y-8 px-4 py-4 sm:px-6  lg:px-8">
//                     <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
//                         <div>
//                             <div className="">
//                                 <Link className="block text-teal-600" href="/">
//                                     <span className="sr-only">MediMart</span>
//                                     <div className="flex ">
//                                         <Image src={medimart} height={40} width={40} alt="medimart" />
//                                         <span className="ml-2 text-xl font-bold text-blue-700 shadow-2xl">MediMart</span>
//                                     </div>
//                                 </Link>
//                             </div>

//                             <p className="mt-4 max-w-xs text-gray-500">
//                                 welcome to aout Medimart website
//                             </p>


//                         </div>

//                         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
//                             <div>
//                                 <p className="font-medium text-gray-900">Services</p>

//                                 <ul className="mt-6 space-y-4 text-sm">
//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> 1on1 Coaching </a>
//                                     </li>

//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> Company Review </a>
//                                     </li>

//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
//                                     </li>

//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> HR Consulting </a>
//                                     </li>

//                                 </ul>
//                             </div>

//                             <div>
//                                 <p className="font-medium text-gray-900">Company</p>

//                                 <ul className="mt-6 space-y-4 text-sm">
//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> About </a>
//                                     </li>

//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> Meet the Team </a>
//                                     </li>

//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
//                                     </li>
//                                 </ul>
//                             </div>

//                             <div>
//                                 <p className="font-medium text-gray-900">Helpful Links</p>

//                                 <ul className="mt-6 space-y-4 text-sm">
//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> Contact </a>
//                                     </li>

//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> FAQs </a>
//                                     </li>

//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> Live Chat </a>
//                                     </li>
//                                 </ul>
//                             </div>

//                             <div>
//                                 <p className="font-medium text-gray-900">Legal</p>

//                                 <ul className="mt-6 space-y-4 text-sm">
//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> Accessibility </a>
//                                     </li>

//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> Returns Policy </a>
//                                     </li>

//                                     <li>
//                                         <a href="#" className="text-gray-700 transition hover:opacity-75"> Refund Policy </a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>

//                     <p className=" text-gray-500 flex justify-center font-medium text-sm">&copy; 2025. MediMart. All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default Footer;


import Image from "next/image";
import Link from "next/link";
import medimart from '@/assets/nextmart.png';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-blue-50 to-white border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={medimart}
                                height={48}
                                width={48}
                                alt="MediMart"
                                className="h-12 w-auto"
                            />
                            <span className="ml-3 text-2xl font-bold text-blue-800">MediMart</span>
                        </Link>

                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Your trusted online pharmacy delivering quality medicines with care and convenience.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
                        <div>
                            <h3 className="text-lg font-semibold text-blue-800 mb-4">Services</h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Medicine Delivery', path: '/services/delivery' },
                                    { name: 'Doctor Consultation', path: '/services/consultation' },
                                    { name: 'Health Packages', path: '/services/packages' },
                                    { name: 'Lab Tests', path: '/services/lab-tests' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <div className="text-gray-600 ">
                                            {item.name}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-blue-800 mb-4">Company</h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'About Us', path: '#about' },
                                    { name: 'Our Team', path: '#team' },
                                    // { name: 'Careers', path: '/careers' },
                                    // { name: 'Blog', path: '/blog' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.path} className="text-gray-600 hover:text-blue-600 transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-blue-800 mb-4">Support</h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Contact Us', path: '#contact' },
                                    { name: 'FAQs', path: '#faq' },
                                    // { name: 'Privacy Policy', path: '/privacy-policy' },
                                    // { name: 'Terms of Service', path: '/terms' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.path} className="text-gray-600 hover:text-blue-600 transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-center items-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} MediMart. All rights reserved.
                    </p>

                    {/* <div className="mt-4 md:mt-0 flex space-x-6">
                        {[
                            { name: 'Privacy Policy', path: '/privacy-policy' },
                            { name: 'Terms of Use', path: '/terms' },
                            { name: 'Sitemap', path: '/sitemap' }
                        ].map((item) => (
                            <Link key={item.name} href={item.path} className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;