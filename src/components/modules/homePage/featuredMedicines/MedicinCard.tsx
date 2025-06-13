

"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { addMedicin, orderMedicinsSelector, updateQuantity } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TMedicine } from "@/types/medicins";
import { BadgeMinus, BadgePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import AddReviewModal from "../reviewPage/AddReviewModal";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// import { RootState } from "@/redux/store";

interface TMedicinss {
    medici: TMedicine;
    isDialogOpen?: boolean;
    setIsDialogOpen?: (isOpen: boolean) => void;
}

const MedicinCard = ({ medici, isDialogOpen, setIsDialogOpen }: TMedicinss) => {
    const medicinsCard = useAppSelector(orderMedicinsSelector);
    // const orderMedicinss = useAppSelector((state: RootState) => state.cart);
    // const medicinsCard = orderMedicinss?.medicins;

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
        // console.log(medici);

        if (user?.role === "admin") {
            toast.error("Admins cannot place orders.");
            return;
        }

        if (!user) {
            toast.error("You must be logged in to add to cart.");
            return;
        }

        const isProductAlreadyAdded = medicinsCard.some((medis: any) => medis?._id === medici?._id);
        // console.log(isProductAlreadyAdded);
        
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
            setIsDialogOpen?.(false);
            if (redirect) {
                router.push(redirect);
            } else {
                router.push("/");
            }

        } else {
            const existingProduct = medicinsCard.find((medis: any) => medis?._id === medici?._id);

            if (existingProduct?.orderQuantity === orderQuantity) {
                toast.error("Product is already added to cart.");
                setIsDialogOpen?.(false);
            } else {
                dispatch(updateQuantity({ id: medici?._id, orderQuantity }));
                toast.success("Product is already added to cart and orderQuantity updated successfully.");
                setIsDialogOpen?.(false);
            }
        }
    };

    // const handleAddProduct = (medici: TMedicine) => {
    //     // const currentMedicinsCard = orderMedicinsSelector(store.getState());
    //     const currentMedicinsCard = useAppSelector((state: RootState) => state.cart);

    //     if (user?.role === "admin") {
    //         toast.error("Admins cannot place orders.");
    //         return;
    //     }

    //     if (!user) {
    //         toast.error("You must be logged in to add to cart.");
    //         return;
    //     }

    //     const isProductAlreadyAdded = currentMedicinsCard.some((medis: any) => medis?._id === medici?._id);
    //     const subMediPrice = orderQuantity * medici?.price;

    //     if (!isProductAlreadyAdded) {
    //         const toastId = toast.loading("Adding to cart...");

    //         dispatch(
    //             addMedicin({
    //                 _id: medici?._id,
    //                 name: medici?.name,
    //                 description: medici?.description,
    //                 price: medici?.price,
    //                 category: medici?.category,
    //                 quantity: medici?.quantity,
    //                 orderQuantity: orderQuantity,
    //                 stockAvailability: medici?.stockAvailability,
    //                 requiredPrescription: medici?.requiredPrescription,
    //                 mediImage: medici?.mediImage,
    //                 massUnit: medici?.massUnit,
    //                 manufacturerDetails: medici?.manufacturerDetails,
    //                 expiryDate: medici?.expiryDate,
    //                 createdAt: medici?.createdAt,
    //                 updatedAt: medici?.updatedAt,
    //                 length: medici?.length,
    //                 subTotalPrice: subMediPrice,
    //             })
    //         );

    //         toast.success("Added to cart successfully", { id: toastId, duration: 1500 });
    //         setIsDialogOpen?.(false);
    //         if (redirect) {
    //             router.push(redirect);
    //         } else {
    //             router.push("/");
    //         }

    //     } else {
    //         const existingProduct = currentMedicinsCard.find((medis: any) => medis?._id === medici?._id);

    //         if (existingProduct?.orderQuantity === orderQuantity) {
    //             toast.error("Product is already added to cart.");
    //             setIsDialogOpen?.(false);
    //         } else {
    //             dispatch(updateQuantity({ id: medici?._id, orderQuantity }));
    //             toast.success("Product is already added to cart and orderQuantity updated successfully.");
    //             setIsDialogOpen?.(false);
    //         }
    //     }
    // };


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        // <div className="border-2 p-2 rounded-xl">
        //     <div className="group">
        //         <div className="relative h-60 w-full rounded-md bg-cover">
        //             <div className="absolute bottom-5 left-7 z-50 mt-5 flex scale-y-0 items-center font-medium opacity-0 transition-all duration-500 ease-out group-hover:scale-y-100 group-hover:opacity-100">
        //                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        //                     <DialogTrigger asChild>
        //                         {/* <Button className="mr-2 w-fit rounded-[4px] border px-7 py-5 text-sm uppercase leading-4 shadow-2xl duration-500 hover:border-[#DF2626]">
        //                             <Link href={`/medicine/${medici?._id}`}> Quick View</Link>
        //                         </Button> */}
        //                         <div className="z-0">ami</div>
        //                     </DialogTrigger>
        //                     <DialogContent className="sm:max-w-[90%] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl p-4 overflow-y-auto max-h-[90vh]">
        //                         <DialogHeader>
        //                             <DialogTitle className="text-center text-2xl">Medicine Details</DialogTitle>
        //                         </DialogHeader>
        //                         <div className="flex gap-8">
        //                             {/* Medicine Image */}
        //                             {medici?.mediImage && (
        //                                 <div className="relative flex-1 h-96">
        //                                     <Image
        //                                         src={medici.mediImage}
        //                                         alt={medici?.name}
        //                                         layout="fill"
        //                                         objectFit="cover"
        //                                         className="z-0 h-full w-full rounded-md"
        //                                     />
        //                                 </div>
        //                             )}

        //                             {/* Medicine Details */}
        //                             <div className="flex-1">
        //                                 {/* Medicine Name */}
        //                                 <h1 className="text-2xl font-bold uppercase italic text-black mb-2">
        //                                     {medici?.name}
        //                                 </h1>

        //                                 {/* Category */}
        //                                 <h4 className="text-base font-medium mb-2">
        //                                     <span className="uppercase text-gray-500">Category: </span>
        //                                     {medici?.category}
        //                                 </h4>

        //                                 {/* Description */}
        //                                 <h4 className="text-base font-medium mb-2">
        //                                     <span className="uppercase text-gray-500">Description: </span>
        //                                     {medici?.description}
        //                                 </h4>

        //                                 {/* Required Prescription */}
        //                                 <div className="">
        //                                     <h4 className="text-base font-medium mb-2">
        //                                         <span className="uppercase text-gray-500">Required Prescription: </span>
        //                                         {medici?.requiredPrescription}
        //                                     </h4>
        //                                 </div>

        //                                 {/* Price and Quantity */}
        //                                 <div className="grid grid-cols-2 gap-6 mb-2">
        //                                     <div>
        //                                         <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Price:</p>
        //                                         <h5 className="text-2xl font-bold text-[#DF2626]">{medici?.price} TK</h5>
        //                                     </div>
        //                                     <div>
        //                                         <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Quantity:</p>
        //                                         <h5 className="text-2xl font-bold text-black">{medici?.quantity}</h5>
        //                                     </div>
        //                                 </div>

        //                                 {/* Stock Availability and Mass Unit */}
        //                                 <div className="lg:flex justify-between mb-2">
        //                                     <h4 className="text-base font-medium mb-2">
        //                                         <span className="uppercase text-gray-500">Stock Availability: </span>
        //                                         {medici?.stockAvailability}
        //                                     </h4>
        //                                     <h4 className="text-base font-medium mb-2 lg:mr-4">
        //                                         <span className="uppercase text-gray-500">Mass Unit: </span>
        //                                         {medici?.massUnit}
        //                                     </h4>
        //                                 </div>

        //                                 {/* Manufacturer Details */}
        //                                 <div className="mb-2">
        //                                     <p className="text-xl font-bold text-gray-600 uppercase mb-2 underline">
        //                                         Manufacturer Details
        //                                     </p>
        //                                     <div className="">
        //                                         {/* Company Name and Contact */}
        //                                         <div className="lg:flex justify-between">
        //                                             <h4 className="text-base font-medium mb-2">
        //                                                 <span className="uppercase text-gray-500">Company Name: </span>
        //                                                 {medici?.manufacturerDetails?.name}
        //                                             </h4>
        //                                             <h4 className="text-base font-medium mb-2 lg:mr-4">
        //                                                 <span className="uppercase text-gray-500">Contact: </span>
        //                                                 {medici?.manufacturerDetails?.contactNumber}
        //                                             </h4>
        //                                         </div>

        //                                         {/* Manufacture Date and Expire Date */}
        //                                         <div className="lg:flex justify-between">
        //                                             <h4 className="text-base font-medium mb-2">
        //                                                 <span className="uppercase text-gray-500">Manufacture Date: </span>
        //                                                 {formatDate(medici?.createdAt)}
        //                                             </h4>
        //                                             <h4 className="text-base font-medium mb-2 lg:mr-4">
        //                                                 <span className="uppercase text-gray-500">Expire Date: </span>
        //                                                 {formatDate(medici?.expiryDate)}
        //                                             </h4>
        //                                         </div>

        //                                         {/* Address */}
        //                                         <h4 className="text-base font-medium mb-2">
        //                                             <span className="uppercase text-gray-500">Address: </span>
        //                                             {medici?.manufacturerDetails?.address}
        //                                         </h4>
        //                                     </div>
        //                                 </div>

        //                                 {/* Order Quantity */}
        //                                 <div className="mb-4">
        //                                     <div className="lg:flex lg:items-center lg:justify-start lg:gap-2">
        //                                         <label htmlFor="Quantity" className="font-bold text-gray-700 dark:text-gray-300 mr-2">
        //                                             Order Quantity :
        //                                         </label>
        //                                         <div className="flex items-center rounded-sm border w-fit">
        //                                             <button
        //                                                 type="button"
        //                                                 onClick={handleDecrementQuantity}
        //                                                 className="size-10 leading-10 text-gray-600 transition hover:opacity-75 p-2"
        //                                             >
        //                                                 <BadgeMinus />
        //                                             </button>
        //                                             <Input
        //                                                 type="number"
        //                                                 id="orderQuantity"
        //                                                 value={orderQuantity}
        //                                                 onChange={(e) => {
        //                                                     const newQuantity = Number(e.target.value);
        //                                                     if (newQuantity <= medici?.quantity && newQuantity >= 1) {
        //                                                         setOrderQuantity(newQuantity);
        //                                                     } else {
        //                                                         toast.error("Quantity cannot exceed available stock.");
        //                                                     }
        //                                                 }}
        //                                                 className="h-6 w-10 border-blue-600 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none mx-2"
        //                                             />
        //                                             <button
        //                                                 type="button"
        //                                                 onClick={handleIncrementQuantity}
        //                                                 className="size-10 leading-10 text-gray-600 transition hover:opacity-75 p-2"
        //                                             >
        //                                                 <BadgePlus />
        //                                             </button>
        //                                         </div>
        //                                     </div>
        //                                 </div>

        //                                 {/* Buttons */}
        //                                 <div className="flex items-center gap-4">
        //                                     <Button
        //                                         onClick={() => handleAddProduct(medici)}
        //                                         className="flex-1 py-3 text-base font-semibold bg-[#DF2626] text-white hover:bg-[#BF1E1E] transition-all duration-300 shadow-lg hover:shadow-xl"
        //                                     >
        //                                         ADD TO CART
        //                                     </Button>


        //                                     <Link
        //                                         href={`/customer/cart`}
        //                                     >
        //                                         <Button
        //                                             onClick={() => handleAddProduct(medici)}
        //                                             className="flex-1 py-3 text-base font-semibold bg-black text-white hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
        //                                             Buy Now
        //                                         </Button>
        //                                     </Link>


        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </DialogContent>
        //                 </Dialog>
        //             </div>

        //             {/* Medicine Image */}
        //             {medici?.mediImage && (
        //                 <Image
        //                     src={medici.mediImage}
        //                     alt={medici?.name}
        //                     layout="fill"
        //                     objectFit="cover"
        //                     className="z-0 h-full w-full rounded-xl"
        //                 />
        //             )}
        //         </div>

        //         {/* Medicine Name and Price */}
        //         <div className="mt-6">
        //             <h3 className="z-50 w-fit cursor-pointer text-lg font-semibold duration-300 hover:text-[#DF2626]">
        //                 {medici?.name}
        //             </h3>
        //             <div className="flex justify-between p-1">
        //                 <div className="mt-2 flex items-end gap-1">
        //                     <p className="text-xl font-bold text-[#DF2626]">{medici?.price} TK</p>
        //                 </div>
        //                 <div>
        //                     {user?.role === "admin" ? (
        //                         null
        //                     ) : (
        //                         <AddReviewModal medicinId={medici?._id} />
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="border-2 p-2 rounded-xl">
            <div className="group">
                <div className="relative h-60 w-full rounded-md bg-cover">
                    {/* Quick View Button - Always Visible */}
                    <div className="absolute bottom-5 left-7 z-50 mt-5 flex items-center font-medium">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className=" mr-2 w-fit rounded-[4px] border px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm uppercase leading-4 shadow-md sm:shadow-xl duration-300   backdrop-blur-sm transition-all bg-green-300 text-black hover:bg-green-500">
                                    Quick View
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-4xl p-0 overflow-hidden rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    {/* Image Section */}
                                    <div className="bg-gray-50 p-6 flex items-center justify-center">
                                        {medici?.mediImage && (
                                            <div className="relative w-full h-64 md:h-96">
                                                <Image
                                                    src={medici.mediImage}
                                                    alt={medici?.name}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    className="rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Details Section */}
                                    <div className="p-6 overflow-y-auto max-h-[80vh]">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">
                                                {medici?.name}
                                            </DialogTitle>
                                        </DialogHeader>

                                        <div className="mt-4 space-y-4">
                                            {/* Basic Info */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Category</p>
                                                    <p className="text-gray-900">{medici?.category}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Mass Unit</p>
                                                    <p className="text-gray-900">{medici?.massUnit}</p>
                                                </div>
                                            </div>

                                            {/* Price & Stock */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Price</p>
                                                    <p className="text-2xl font-bold text-primary">{medici?.price} TK</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Stock</p>
                                                    <p className={`text-lg font-semibold ${medici?.stockAvailability === 'In Stock'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                        }`}>
                                                        {medici?.stockAvailability}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Description</p>
                                                <p className="text-gray-700">{medici?.description}</p>
                                            </div>

                                            {/* Prescription */}
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Prescription Required</p>
                                                <p className="text-gray-700">{medici?.requiredPrescription}</p>
                                            </div>

                                            {/* Manufacturer */}
                                            <div className="border-t pt-4">
                                                <h4 className="font-medium text-gray-900 mb-2">Manufacturer Details</h4>
                                                <div className="space-y-2">
                                                    <p>
                                                        <span className="text-sm text-gray-500">Company: </span>
                                                        {medici?.manufacturerDetails?.name}
                                                    </p>
                                                    <p>
                                                        <span className="text-sm text-gray-500">Contact: </span>
                                                        {medici?.manufacturerDetails?.contactNumber}
                                                    </p>
                                                    <p>
                                                        <span className="text-sm text-gray-500">Address: </span>
                                                        {medici?.manufacturerDetails?.address}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Dates */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Manufactured</p>
                                                    <p className="text-gray-700">{formatDate(medici?.createdAt)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Expires</p>
                                                    <p className="text-gray-700">{formatDate(medici?.expiryDate)}</p>
                                                </div>
                                            </div>

                                            {/* Quantity Selector */}
                                            <div className="pt-4 border-t">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Order Quantity
                                                </label>
                                                <div className="flex items-center">
                                                    <button
                                                        type="button"
                                                        onClick={handleDecrementQuantity}
                                                        className="p-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
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
                                                        className="w-16 text-center border-t border-b border-gray-300 rounded-none h-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleIncrementQuantity}
                                                        className="p-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                                                    >
                                                        <BadgePlus className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="grid grid-cols-2 gap-4 pt-4">
                                                <Button
                                                    onClick={() => handleAddProduct(medici)}
                                                    className="w-full py-3 bg-primary hover:bg-primary-dark transition-colors"
                                                >
                                                    Add to Cart
                                                </Button>
                                                <Link href={`/customer/cart`} passHref>
                                                    <Button
                                                        onClick={() => handleAddProduct(medici)}
                                                        variant="outline"
                                                        className="w-full py-3 border-gray-300 hover:bg-gray-50"
                                                    >
                                                        Buy Now
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Medicine Image */}
                    {medici?.mediImage && (
                        <Image
                            src={medici.mediImage}
                            alt={medici?.name}
                            layout="fill"
                            objectFit="cover"
                            className="z-0 h-full w-full rounded-xl"
                        />
                    )}
                </div>

                {/* Medicine Name and Price */}
                <div className="mt-6">
                    <h3 className="z-50 w-fit cursor-pointer text-lg font-semibold duration-300 hover:text-[#DF2626]">
                        {medici?.name}
                    </h3>
                    <h4 className="text-base font-medium mb-2">
                        <span className="uppercase text-gray-500">Category: </span>
                        {medici?.category}
                    </h4>
                    <div className="flex justify-between p-1">
                        <div className="mt-2 flex items-end gap-1">
                            <p className="text-xl font-bold text-[#DF2626]">{medici?.price} TK</p>
                        </div>
                        <div>
                            {user?.role === "admin" ? null : <AddReviewModal medicinId={medici?._id} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicinCard;

