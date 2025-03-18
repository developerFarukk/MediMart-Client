

"use client";

import { useEffect, useState, useCallback } from "react";
import Loader from "@/components/shared/Loader";
import { getAllMedicins } from "@/services/MedicinManagment";
import { TMedicine } from "@/types/medicins";
import MedicinCard from "../homePage/featuredMedicines/MedicinCard";

const ShopPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [medicins, setMedicins] = useState<TMedicine[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch medicines
    const getMedicins = useCallback(async (page: number) => {
        setIsLoading(true);
        try {
            const { data: newMedicins } = await getAllMedicins(page, 10);
            if (newMedicins?.result.length > 0) {
                setMedicins((prevMedicins) => [...prevMedicins, ...newMedicins.result]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        getMedicins(page);
    }, [getMedicins, page]);

    // Infinite scroll logic
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore]);

    // Intersection Observer for card animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const card = entry.target as HTMLElement;
                        card.style.opacity = "1";
                        observer.unobserve(card);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = document.querySelectorAll(".medicine-card");
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, [medicins]);

    // Filter medicines by name and category
    const filteredMedicins = medicins.filter((medici) => {
        const matchesName = medici.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = medici.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesName || matchesCategory;
    });

    return (
        <div className="pt-12">
            <div>
                <div className="flex items-center justify-center space-x-4 p-4 mb-4 mt-4">
                    <div>
                        <h1 className="text-3xl font-semibold">All Medicines</h1>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6 p-2 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by medicines name, category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="lg:w-[60%] md:w-[80%] w-[95%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
                {filteredMedicins.map((medici: TMedicine, index: number) => (
                    <MedicinCard
                        medici={medici}
                        key={index + 1}
                    />
                ))}
            </div>

            {isLoading && <Loader />}
            {!hasMore && (
                <p className="text-center my-4">You have reached the end of the list.</p>
            )}
        </div>
    );
};

export default ShopPage;