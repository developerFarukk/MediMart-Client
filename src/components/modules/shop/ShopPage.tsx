

"use client";

import { useEffect, useState, useCallback } from "react";
import Loader from "@/components/shared/Loader";
import { getAllMedicins } from "@/services/MedicinManagment";
import { TMedicine } from "@/types/medicins";
import MedicinCard from "../homePage/featuredMedicines/MedicinCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ShopPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [medicins, setMedicins] = useState<TMedicine[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [priceSort, setPriceSort] = useState<"asc" | "desc" | "none">("none");
    const [prescriptionFilter, setPrescriptionFilter] = useState<"all" | "Yes" | "No">("all");

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

    // Filter and sort medicines
    const filteredMedicins = medicins
        .filter((medici) => {
            const matchesName = medici.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === "all" ? true : medici.category === categoryFilter;
            const matchesPrescription =
                prescriptionFilter === "all" ? true : medici.requiredPrescription === prescriptionFilter;
            return matchesName && matchesCategory && matchesPrescription;
        })
        .sort((a, b) => {
            if (priceSort === "asc") {
                return a.price - b.price;
            } else if (priceSort === "desc") {
                return b.price - a.price;
            } else {
                return 0;
            }
        });

    // Reset filters
    const resetFilters = () => {
        setCategoryFilter("all");
        setPriceSort("none");
        setPrescriptionFilter("all");
    };

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
            <div className="flex justify-center mb-4">
                <Input
                    type="text"
                    placeholder="Search by medicines name, category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="lg:w-[40%] md:w-[60%] w-[95%]"
                />
            </div>

            {/* Filters */}
            <div className="mb-6 p-2 flex flex-col lg:flex-row justify-center items-center gap-4">
                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="lg:w-[200px] w-[95%]">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Analgesics">Analgesics</SelectItem>
                        <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                        <SelectItem value="Antipyretics">Antipyretics</SelectItem>
                        <SelectItem value="Antihistamines">Antihistamines</SelectItem>
                        <SelectItem value="Antidepressants">Antidepressants</SelectItem>
                        <SelectItem value="Antacids">Antacids</SelectItem>
                        <SelectItem value="Antidiabetics">Antidiabetics</SelectItem>
                        <SelectItem value="Cardiovascular">Cardiovascular</SelectItem>
                        <SelectItem value="Respiratory">Respiratory</SelectItem>
                        <SelectItem value="Vitamins & Supplements">Vitamins & Supplements</SelectItem>
                    </SelectContent>
                </Select>

                {/* Price Sort */}
                <Select value={priceSort} onValueChange={(value) => setPriceSort(value as "asc" | "desc" | "none")}>
                    <SelectTrigger className="lg:w-[200px] w-[95%]">
                        <SelectValue placeholder="Sort by price" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">Price</SelectItem>
                        <SelectItem value="asc">Price: Low to High</SelectItem>
                        <SelectItem value="desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>

                {/* Prescription Filter */}
                <Select value={prescriptionFilter} onValueChange={(value) => setPrescriptionFilter(value as "all" | "Yes" | "No")}>
                    <SelectTrigger className="lg:w-[200px] w-[95%]">
                        <SelectValue placeholder="Prescription Required" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Prescription</SelectItem>
                        <SelectItem value="Yes">Required Prescription</SelectItem>
                        <SelectItem value="No">Not Required Prescription</SelectItem>
                    </SelectContent>
                </Select>

                {/* Reset Filters Button */}
                <Button onClick={resetFilters} variant="outline">
                    Reset Filters
                </Button>
            </div>

            {/* Medicine Cards */}
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
                {filteredMedicins.map((medici: TMedicine, index: number) => (
                    <MedicinCard
                        medici={medici}
                        key={index + 1}
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
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