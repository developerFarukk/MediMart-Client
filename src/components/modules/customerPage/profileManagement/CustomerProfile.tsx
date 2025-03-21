"use client"

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneCall, ShieldAlert, ShieldMinus, UserRoundCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const MAX_FILE_SIZE = 300 * 1024;


// Define the schema for validation
const userSchema = z.object({
    name: z.string().optional(),
    number: z.number().optional(),
    address: z.string().optional(),
    image: z.string().optional()
});


const CustomerProfile = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { user, isLoading } = useUser();

    const form = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user?.name,
            address: user?.address,
            number: user?.number,
            image: user?.image
        },
    });

    const { formState: { isSubmitting, errors } } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        console.log(data);
        

        // const toastId = toast.loading("Loading...");
        // setIsLoading(true);

        // if (!medicin?._id) {
        //     toast.error("Invalid product ID", { id: toastId });
        //     return;
        // }

        // let imageUrl = medicin?.mediImage;

        // try {

        //     if (data.mediImage && typeof data.mediImage === "string") {
        //         const base64Data = data.mediImage.split(',')[1];
        //         const fileSizeInBytes = (base64Data.length * 3) / 4;

        //         if (fileSizeInBytes > MAX_FILE_SIZE) {
        //             throw new Error("Image size must be less than 300KB");
        //         }

        //         const formData = new FormData();
        //         formData.append('file', data.mediImage);
        //         formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        //         const cloudinaryResponse = await fetch(
        //             `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        //             {
        //                 method: 'POST',
        //                 body: formData,
        //             }
        //         );

        //         const cloudinaryData = await cloudinaryResponse.json();

        //         if (cloudinaryData.secure_url) {
        //             imageUrl = cloudinaryData.secure_url;
        //         } else {
        //             throw new Error("Image upload failed");
        //         }
        //     }


        //     const updatedData = {
        //         ...data,
        //         mediImage: imageUrl,
        //         manufacturerDetails: {
        //             name: data?.manufacturerDetails?.name || medicin?.manufacturerDetails?.name,
        //             address: data?.manufacturerDetails?.address || medicin?.manufacturerDetails?.address,
        //             contactNumber: data?.manufacturerDetails?.contactNumber || medicin?.manufacturerDetails?.contactNumber,
        //         },
        //         category: data?.category || medicin?.category,
        //         requiredPrescription: data?.requiredPrescription || medicin?.requiredPrescription,
        //     };

        //     console.log(updatedData);

        //     // Call the updateMedicin API
        //     const res = await updateMedicin(updatedData, medicin?._id);
        //     console.log(res);

        //     if (res.success) {
        //         toast.success(res.message);
        //         form.reset();
        //         setIsDialogOpen(false);

        //         window.location.reload();
        //     } else {
        //         toast.error(res.message);
        //         form.reset();
        //         setIsDialogOpen(false);
        //     }
        // } catch (err: any) {
        //     toast.error(err.message || "Something went wrong");
        // } finally {
        //     setIsLoading(false);
        //     toast.dismiss(toastId);
        // }
    };


    if (isLoading) {
        <div><Loader /></div>
    }


    return (
        <div className="flex justify-center p-4 mt-4">
            <div className="">
                <div className="w-full max-w-sm overflow-hidden  rounded-lg shadow-lg ">
                    <div className="flex justify-center">
                        <Image
                            className="  rounded-full p-1"
                            src={user?.image || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"}
                            alt="No"
                            height={250}
                            width={250}
                        />
                    </div>

                    <div className="px-6 py-4">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{user?.name}</h1>

                        <p className="py-2 text-gray-700 dark:text-gray-400">
                            I am bussnes man. And self employe.
                        </p>

                        {/* Address */}
                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                            <svg
                                aria-label="location pin icon"
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                                />
                            </svg>

                            <h1 className="px-2 text-sm">{user?.address}</h1>
                        </div>

                        {/* Email */}
                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                            <svg
                                aria-label="email icon"
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                                />
                            </svg>

                            <h1 className="px-2 text-sm">{user?.email}</h1>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 gap-3">
                            <span><PhoneCall /></span>
                            <h2>{user?.number}</h2>
                        </div>

                        {/* Status */}
                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 gap-3">
                            {
                                user?.status === "in-progress" ? (
                                    <span><ShieldAlert /></span>
                                ) :
                                    <span><ShieldMinus /></span>
                            }
                            <h2>{user?.status}</h2>
                        </div>

                        {/* Role */}
                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 gap-3">
                            <span><UserRoundCheck /></span>
                            <h2>{user?.role}</h2>
                        </div>

                        <div className="flex justify-center mx-auto mt-4">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="flex justify-center">Edit profile</DialogTitle>
                                        <DialogDescription className="flex justify-center">
                                            Make changes to your profile here.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className=" justify-center flex">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                                                {/* Name Field */}
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Your Name</FormLabel>
                                                            <FormControl>
                                                                <Input  {...field} />
                                                            </FormControl>
                                                            <FormMessage>{errors.name?.message as string}</FormMessage>
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Description Field */}
                                                <FormField
                                                    control={form.control}
                                                    name="address"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Your Address</FormLabel>
                                                            <FormControl>
                                                                <Textarea  {...field} />
                                                            </FormControl>
                                                            <FormMessage>{errors.address?.message as string}</FormMessage>
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Number Field */}
                                                <FormField
                                                    control={form.control}
                                                    name="number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Your Number</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage>{errors.number?.message as string}</FormMessage>
                                                        </FormItem>
                                                    )}
                                                />


                                                {/* Image Field (Optional) */}
                                                <div className="mt-4">
                                                    <FormField
                                                        name="image"
                                                        control={form.control}
                                                        defaultValue=""
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Upload your image</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        id="image"
                                                                        type="file"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                if (file.size > MAX_FILE_SIZE) {
                                                                                    form.setError("image", {
                                                                                        type: "manual",
                                                                                        message: "Image size must be less than 300KB",
                                                                                    });
                                                                                } else {
                                                                                    const reader = new FileReader();
                                                                                    reader.onloadend = () => {
                                                                                        field.onChange(reader.result);
                                                                                    };
                                                                                    reader.readAsDataURL(file);
                                                                                }
                                                                            } else {
                                                                                field.onChange("");
                                                                            }
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {/* Submit Button */}
                                                <Button
                                                    suppressHydrationWarning
                                                    type="submit"
                                                    className="mt-5 w-full"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "updating..." : "Ppdate Profile"}
                                                </Button>
                                            </form>
                                        </Form>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;
