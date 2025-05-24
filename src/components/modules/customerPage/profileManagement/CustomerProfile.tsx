// /* eslint-disable @typescript-eslint/no-unused-vars */


// "use client";

// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useUser } from "@/context/UserContext";
// import { useImageUpload } from "@/hooks/useImageUpload";
// import { updateProfile } from "@/services/UserService";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { PhoneCall, ShieldAlert, ShieldMinus, UserRoundCheck } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

// const MAX_FILE_SIZE = 300 * 1024;

// // Define the schema for validation
// const userSchema = z.object({
//     name: z.string().optional(),
//     address: z.string().optional(),
//     image: z.any()
//         .refine((val) => {
//             if (!val) return true;
//             return typeof val === "string" || val instanceof File;
//         }, {
//             message: "Must be a string (URL/base64) or File object",
//         })
//         .optional(),
// });

// // Define the TUser interface
// interface TUser {
//     userId: string;
//     name: string;
//     address: string;
//     image: string;
//     email: string;
//     number: string;
//     status: string;
//     role: string;
// }

// const CustomerProfile = () => {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const { user, setUser, setIsLoading } = useUser();
//     const { uploadImage, isUploading } = useImageUpload();

//     const form = useForm({
//         resolver: zodResolver(userSchema),
//         defaultValues: {
//             name: user?.name || "",
//             address: user?.address || "",
//             image: user?.image || "",
//         },
//     });

//     const { formState: { isSubmitting, errors } } = form;

//     const onSubmit: SubmitHandler<FieldValues> = async (data) => {

//         const toastId = toast.loading("Loading...");
//         setIsLoading(true);

//         if (!user) {
//             toast.error("User not found");
//             return;
//         }

//         try {


//             let imageUrl = user.image;

//             // Handle image upload

//             if (data.image) {
//                 if (typeof data.image === "string") {
//                     imageUrl = data.image;
//                 } else if (data.image instanceof File) {
//                     imageUrl = await uploadImage(data.image);
//                 }
//             }

//             const updatedData: Partial<TUser> = {
//                 name: data.name || user.name,
//                 address: data.address || user.address,
//                 image: imageUrl || user.image,
//             };

//             // Call the updateProfile API
//             const res = await updateProfile(updatedData, user.userId);

//             if (res.success) {
//                 toast.success(res.message);
//                 form.reset();
//                 setIsDialogOpen(false);

//                 setUser({ ...user, ...updatedData });
//             } else {
//                 toast.error(res.message);
//             }
//         } catch (err: any) {
//             toast.error(err.message || "Something went wrong");
//         } finally {
//             setIsLoading(false);
//             toast.dismiss(toastId);
//         }
//     };

//     return (
//         <div className="flex justify-center p-4 mt-4">
//             <div className="">
//                 <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
//                     <div className="flex justify-center">
//                         <Image
//                             className="rounded-full p-1"
//                             src={user?.image || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"}
//                             alt="No"
//                             height={250}
//                             width={250}
//                         />
//                     </div>

//                     <div className="px-6 py-4">
//                         <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{user?.name}</h1>

//                         <p className="py-2 text-gray-700 dark:text-gray-400">
//                             I am a business person and self-employed.
//                         </p>

//                         {/* Address */}
//                         <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
//                             <svg
//                                 aria-label="location pin icon"
//                                 className="w-6 h-6 fill-current"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     clipRule="evenodd"
//                                     d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
//                                 />
//                                 <path
//                                     fillRule="evenodd"
//                                     clipRule="evenodd"
//                                     d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
//                                 />
//                             </svg>

//                             <h1 className="px-2 text-sm">{user?.address}</h1>
//                         </div>

//                         {/* Email */}
//                         <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
//                             <svg
//                                 aria-label="email icon"
//                                 className="w-6 h-6 fill-current"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     clipRule="evenodd"
//                                     d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
//                                 />
//                             </svg>

//                             <h1 className="px-2 text-sm">{user?.email}</h1>
//                         </div>

//                         {/* Phone */}
//                         <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 gap-3">
//                             <span><PhoneCall /></span>
//                             <h2>{user?.number}</h2>
//                         </div>

//                         {/* Status */}
//                         <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 gap-3">
//                             {user?.status === "in-progress" ? (
//                                 <span><ShieldAlert /></span>
//                             ) : (
//                                 <span><ShieldMinus /></span>
//                             )}
//                             <h2>{user?.status}</h2>
//                         </div>

//                         {/* Role */}
//                         <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 gap-3">
//                             <span><UserRoundCheck /></span>
//                             <h2>{user?.role}</h2>
//                         </div>

//                         <div className="flex justify-center mx-auto mt-4">
//                             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                                 <DialogTrigger asChild>
//                                     <Button variant="outline">Edit Profile</Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="sm:max-w-[425px]">
//                                     <DialogHeader>
//                                         <DialogTitle className="flex justify-center">Edit profile</DialogTitle>
//                                         <DialogDescription className="flex justify-center">
//                                             Make changes to your profile here.
//                                         </DialogDescription>
//                                     </DialogHeader>
//                                     <div className="justify-center flex">
//                                         <Form {...form}>
//                                             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                                                 {/* Name Field */}
//                                                 <FormField
//                                                     control={form.control}
//                                                     name="name"
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <FormLabel>Your Name</FormLabel>
//                                                             <FormControl>
//                                                                 <Input {...field} />
//                                                             </FormControl>
//                                                             <FormMessage>{errors.name?.message as string}</FormMessage>
//                                                         </FormItem>
//                                                     )}
//                                                 />

//                                                 {/* Address Field */}
//                                                 <FormField
//                                                     control={form.control}
//                                                     name="address"
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <FormLabel>Your Address</FormLabel>
//                                                             <FormControl>
//                                                                 <Textarea {...field} />
//                                                             </FormControl>
//                                                             <FormMessage>{errors.address?.message as string}</FormMessage>
//                                                         </FormItem>
//                                                     )}
//                                                 />

//                                                 {/* Image Field (Optional) */}
//                                                 <div className="mt-4">
//                                                     {/* <FormField
//                                                         name="image"
//                                                         control={form.control}
//                                                         defaultValue=""
//                                                         render={({ field }) => (
//                                                             <FormItem>
//                                                                 <FormLabel>Upload your image</FormLabel>
//                                                                 <FormControl>
//                                                                     <Input
//                                                                         id="image"
//                                                                         type="file"
//                                                                         onChange={(e) => {
//                                                                             const file = e.target.files?.[0];
//                                                                             if (file) {
//                                                                                 if (file.size > MAX_FILE_SIZE) {
//                                                                                     form.setError("image", {
//                                                                                         type: "manual",
//                                                                                         message: "Image size must be less than 300KB",
//                                                                                     });
//                                                                                 } else {
//                                                                                     const reader = new FileReader();
//                                                                                     reader.onloadend = () => {
//                                                                                         field.onChange(reader.result);
//                                                                                     };
//                                                                                     reader.readAsDataURL(file);
//                                                                                 }
//                                                                             } else {
//                                                                                 field.onChange("");
//                                                                             }
//                                                                         }}
//                                                                     />
//                                                                 </FormControl>
//                                                                 <FormMessage />
//                                                             </FormItem>
//                                                         )}
//                                                     /> */}
//                                                     <FormField
//                                                         control={form.control}
//                                                         name="image"
//                                                         render={({ field: { value: any, onChange, ...fieldProps } }) => (
//                                                             <FormItem>
//                                                                 <FormLabel>Upload your image</FormLabel>
//                                                                 <FormControl>
//                                                                     <Input
//                                                                         type="file"
//                                                                         accept="image/*"
//                                                                         onChange={(e) => {
//                                                                             const file = e.target.files?.[0];
//                                                                             onChange(file || null);
//                                                                         }}
//                                                                         {...fieldProps}
//                                                                     />
//                                                                 </FormControl>
//                                                                 <FormMessage />
//                                                             </FormItem>
//                                                         )}
//                                                     />
//                                                 </div>

//                                                 {/* Submit Button */}
//                                                 <Button
//                                                     suppressHydrationWarning
//                                                     type="submit"
//                                                     className="mt-5 w-full"
//                                                     disabled={isSubmitting || isUploading}
//                                                 >
//                                                     {isSubmitting || isUploading ? "Updating..." : "Update Profile"}
//                                                 </Button>
//                                             </form>
//                                         </Form>
//                                     </div>
//                                 </DialogContent>
//                             </Dialog>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CustomerProfile;



/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { useImageUpload } from "@/hooks/useImageUpload";
import { updateProfile } from "@/services/UserService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, ShieldAlert, Shield, User, Mail, MapPin, Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const MAX_FILE_SIZE = 300 * 1024;

const userSchema = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    image: z.any()
        .refine((val) => {
            if (!val) return true;
            return typeof val === "string" || val instanceof File;
        }, {
            message: "Must be a string (URL/base64) or File object",
        })
        .optional(),
});

interface TUser {
    userId: string;
    name: string;
    address: string;
    image: string;
    email: string;
    number: string;
    status: string;
    role: string;
}

const CustomerProfile = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { user, setUser, setIsLoading } = useUser();
    const { uploadImage, isUploading } = useImageUpload();

    const form = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user?.name || "",
            address: user?.address || "",
            image: user?.image || "",
        },
    });

    const { formState: { isSubmitting, errors } } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Loading...");
        setIsLoading(true);

        if (!user) {
            toast.error("User not found");
            return;
        }

        try {
            let imageUrl = user.image;

            if (data.image) {
                if (typeof data.image === "string") {
                    imageUrl = data.image;
                } else if (data.image instanceof File) {
                    imageUrl = await uploadImage(data.image);
                }
            }

            const updatedData: Partial<TUser> = {
                name: data.name || user.name,
                address: data.address || user.address,
                image: imageUrl || user.image,
            };

            const res = await updateProfile(updatedData, user.userId);

            if (res.success) {
                toast.success(res.message);
                form.reset();
                setIsDialogOpen(false);
                setUser({ ...user, ...updatedData });
            } else {
                toast.error(res.message);
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Profile Header - Simple White */}
                    <div className="p-6 border-b">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-4 rounded-full">
                                <Image
                                    className="rounded-full border-4 border-gray-500 shadow-sm h-36 w-36"
                                    src={user?.image || "/default-avatar.png"}
                                    alt="Profile"
                                    width={100}
                                    height={100}
                                    priority
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
                                <p className="text-gray-600 mt-1">{user?.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Info */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
                                
                                <div className="flex items-start space-x-3">
                                    <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-gray-800">{user?.email}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="text-gray-800">{user?.number}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="text-gray-800">{user?.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Account Info */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Account Status</h2>
                                
                                <div className="flex items-start space-x-3">
                                    {user?.status === "in-progress" ? (
                                        <ShieldAlert className="h-5 w-5 text-yellow-500 mt-0.5" />
                                    ) : (
                                        <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-500">Verification Status</p>
                                        <p className="text-gray-800 capitalize">{user?.status}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <User className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Account Type</p>
                                        <p className="text-gray-800 capitalize">{user?.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <div className="mt-8 flex justify-center">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="gap-2">
                                        <Edit className="h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-xl">Edit Profile</DialogTitle>
                                        <DialogDescription className="text-center">
                                            Update your personal information
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Full Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter your name" {...field} />
                                                        </FormControl>
                                                        <FormMessage>{errors.name?.message as string}</FormMessage>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="address"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Address</FormLabel>
                                                        <FormControl>
                                                            <Textarea 
                                                                placeholder="Enter your address" 
                                                                rows={3}
                                                                {...field} 
                                                            />
                                                        </FormControl>
                                                        <FormMessage>{errors.address?.message as string}</FormMessage>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="image"
                                                render={({ field: { value: any, onChange, ...fieldProps } }) => (
                                                    <FormItem>
                                                        <FormLabel>Profile Picture</FormLabel>
                                                        <FormControl>
                                                            <div className="flex items-center gap-4">
                                                                <Input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => {
                                                                        const file = e.target.files?.[0];
                                                                        onChange(file || null);
                                                                    }}
                                                                    {...fieldProps}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="pt-4">
                                                <Button
                                                    type="submit"
                                                    className="w-full"
                                                    disabled={isSubmitting || isUploading}
                                                >
                                                    {isSubmitting || isUploading ? "Saving..." : "Save Changes"}
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
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