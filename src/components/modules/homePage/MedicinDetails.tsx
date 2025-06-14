


"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { addMedicin, orderMedicinsSelector, updateQuantity } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TMedicine } from "@/types/medicins";
import { BadgeMinus, BadgePlus, ShoppingCart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Tmedidetais {
    medici: any;
}

const MedicinDetails = ({ medici }: Tmedidetais) => {
    const medicinsCard = useAppSelector(orderMedicinsSelector);
    const dispatch = useAppDispatch();
    const { user } = useUser();
    const [orderQuantity, setOrderQuantity] = useState<number>(1);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");

    const handleIncrementQuantity = () => {
        if (orderQuantity < medici?.quantity) {
            setOrderQuantity((prev) => prev + 1);
        } else {
            toast.error("You cannot add more than available stock.");
        }
    };

    const handleDecrementQuantity = () => {
        if (orderQuantity > 1) {
            setOrderQuantity((prev) => prev - 1);
        } else {
            toast.error("Order quantity cannot be negative.");
        }
    };

    const handleAddProduct = (medici: TMedicine) => {
        if (user?.role === "admin") {
            toast.error("Admins cannot place orders.");
            return;
        }

        if (!user) {
            toast.error("You must be logged in to add to cart.");
            return;
        }

        const isProductAlreadyAdded = medicinsCard.some((medis: any) => medis?._id === medici?._id);
        const subMediPrice = orderQuantity * medici?.price;

        if (!isProductAlreadyAdded) {
            const toastId = toast.loading("Adding to cart...");

            dispatch(
                addMedicin({
                    _id: medici?._id,
                    name: medici?.name,
                    description: medici?.description,
                    price: medici?.price,
                    category: medici?.category,
                    quantity: medici?.quantity,
                    orderQuantity: orderQuantity,
                    stockAvailability: medici?.stockAvailability,
                    requiredPrescription: medici?.requiredPrescription,
                    mediImage: medici?.mediImage,
                    massUnit: medici?.massUnit,
                    manufacturerDetails: medici?.manufacturerDetails,
                    expiryDate: medici?.expiryDate,
                    createdAt: medici?.createdAt,
                    updatedAt: medici?.updatedAt,
                    length: medici?.length,
                    subTotalPrice: subMediPrice,
                })
            );

            toast.success("Added to cart successfully", { id: toastId, duration: 1500 });

            if (redirect) {
                router.push(redirect);
            } else {
                router.push("/");
            }
        } else {
            const existingProduct = medicinsCard.find((medis: any) => medis?._id === medici?._id);

            if (existingProduct?.orderQuantity === orderQuantity) {
                toast.error("Product is already added to cart.");
            } else {
                dispatch(updateQuantity({ id: medici?._id, orderQuantity }));
                toast.success("Product is already added to cart and orderQuantity updated successfully.");
            }
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Medicine Image - Top Section */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div className="relative w-full h-64 md:h-80 lg:h-96">
                        {medici?.mediImage && (
                            <Image
                                src={medici.mediImage}
                                alt={medici?.name}
                                fill
                                className="object-contain rounded-lg"
                                priority
                            />
                        )}
                    </div>
                </div>

                {/* Medicine Details - Bottom Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                    {/* Medicine Name and Category */}
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full mb-2">
                            {medici?.category}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{medici?.name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`text-sm font-medium px-2 py-1 rounded ${medici?.stockAvailability === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {medici?.stockAvailability}
                            </span>
                            <span className="text-sm text-gray-500">
                                {medici?.quantity} units available
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-3xl font-bold text-primary">
                            {medici?.price} <span className="text-lg">TK</span>
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{medici?.description}</p>
                    </div>

                    {/* Key Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-500 mb-1">Mass Unit</p>
                            <p className="text-gray-900 font-medium">{medici?.massUnit}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-500 mb-1">Prescription</p>
                            <p className="text-gray-900 font-medium">{medici?.requiredPrescription}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-500 mb-1">Manufactured</p>
                            <p className="text-gray-900 font-medium">{formatDate(medici?.createdAt)}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-500 mb-1">Expiry Date</p>
                            <p className="text-gray-900 font-medium">{formatDate(medici?.expiryDate)}</p>
                        </div>
                    </div>

                    {/* Manufacturer */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Manufacturer Details</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-900">{medici?.manufacturerDetails?.name}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                <span className="font-medium">Contact:</span> {medici?.manufacturerDetails?.contactNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Address:</span> {medici?.manufacturerDetails?.address}
                            </p>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Order Quantity</label>
                        <div className="flex items-center max-w-xs">
                            <button
                                type="button"
                                onClick={handleDecrementQuantity}
                                className="p-3 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <BadgeMinus className="h-4 w-4 text-gray-600" />
                            </button>
                            <Input
                                type="number"
                                id="orderQuantity"
                                value={orderQuantity}
                                onChange={(e) => {
                                    const newQuantity = Number(e.target.value);
                                    if (newQuantity <= medici?.quantity && newQuantity >= 1) {
                                        setOrderQuantity(newQuantity);
                                    } else {
                                        toast.error("Quantity cannot exceed available stock.");
                                    }
                                }}
                                className="w-16 text-center border-t border-b border-gray-300 rounded-none h-11"
                            />
                            <button
                                type="button"
                                onClick={handleIncrementQuantity}
                                className="p-3 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <BadgePlus className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                            onClick={() => handleAddProduct(medici)}
                            className="w-full py-6 bg-green-300 hover:bg-green-500 text-black font-semibold uppercase transition-colors"
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>
                        <Link href={`/customer/cart`} passHref>
                            <Button
                                onClick={() => handleAddProduct(medici)}
                                className="w-full py-6 bg-gray-200 hover:bg-gray-300 text-black transition-colors font-semibold uppercase"
                            >
                                <Zap className="mr-2 h-5 w-5" />
                                Buy Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicinDetails;