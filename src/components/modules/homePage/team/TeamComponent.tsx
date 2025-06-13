


"use client";

import TitleButton from "@/components/shared/TitleButton";
import Image from "next/image";

export interface TeamMember {
    id: string;
    name: string;
    position: string;
    image: string;
    description: string;
}

const TeamComponent = () => {
    const teamMembers: TeamMember[] = [
        {
            id: "member-1",
            name: "Dr. Arthur Melo",
            position: "Chief Medical Officer",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80",
            description: "Board-certified physician with 15+ years of clinical experience leading our medical team."
        },
        {
            id: "member-2",
            name: "Amelia Anderson",
            position: "Pharmaceutical Director",
            image: "https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
            description: "Pharmacist with expertise in medication management and pharmaceutical operations."
        },
        {
            id: "member-3",
            name: "Olivia Wathan",
            position: "Head of Customer Care",
            image: "https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
            description: "Dedicated to ensuring exceptional patient experience and support services."
        },
        {
            id: "member-4",
            name: "Dr. John Doe",
            position: "Clinical Pharmacologist",
            image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80",
            description: "Specializes in medication therapy management and drug interaction research."
        }
    ];

    return (
        <section className=" py-16">
            <div className="container px-6 mx-auto">
                <div className="text-center mb-12">
                    <div>
                        <TitleButton title="Our Medical Leadership" />
                    </div>
                    <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-300">
                        Meet the experienced professionals dedicated to your health and wellness through our pharmacy services.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="px-8 py-6 transition-all duration-300 transform bg-white border border-gray-200 rounded-xl hover:shadow-lg dark:bg-gray-800 dark:border-gray-700"
                        >
                            <div className="flex flex-col items-center sm:flex-row sm:items-start">
                                <div className="relative mb-4 sm:mb-0 sm:mr-6">
                                    <Image
                                        className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-100 dark:ring-gray-700"
                                        src={member.image}
                                        alt={member.name}
                                        width={50}
                                        height={50}
                                    />
                                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                </div>

                                <div className="text-center sm:text-left">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        {member.name}
                                    </h3>
                                    <p className="mt-1 text-blue-600 dark:text-blue-400">
                                        {member.position}
                                    </p>
                                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamComponent;
