


"use client";

import medimart from '@/assets/nextmart.png';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from './registerValidation';
import { registerUser } from '@/services/AuthService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const MAX_FILE_SIZE = 300 * 1024;

const Register = () => {
    const form = useForm({
        resolver: zodResolver(registrationSchema),
    });

    const { formState: { isSubmitting } } = form;

    const password = form.watch("password");
    const passwordConfirm = form.watch("passwordConfirm");

    const router = useRouter();
    const { setIsLoading } = useUser();

    // const deleteImageFromCloudinary = async (publicId: string) => {
    //     try {
    //         const response = await fetch(
    //             `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     public_id: publicId,
    //                     api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    //                     api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    //                     timestamp: Date.now(),
    //                     signature: '',
    //                 }),
    //             }
    //         );

    //         const result = await response.json();
    //         if (result.result !== 'ok') {
    //             throw new Error('Failed to delete image from Cloudinary');
    //         }
    //     } catch (error) {
    //         // console.error('Error deleting image:', error);
    //         throw error;
    //     }
    // };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        let imageUrl = "";
        // let publicId = "";

        try {

            if (data.image && typeof data.image === "string") {
                const base64Data = data.image.split(',')[1];
                const fileSizeInBytes = (base64Data.length * 3) / 4;
                if (fileSizeInBytes > MAX_FILE_SIZE) {
                    throw new Error("Image size must be less than 300KB");
                }

                const formData = new FormData();
                formData.append('file', data.image);
                formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

                const cloudinaryResponse = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                const cloudinaryData = await cloudinaryResponse.json();
                // console.log("Cloudinary Response:", cloudinaryData);

                if (cloudinaryData.secure_url) {
                    imageUrl = cloudinaryData.secure_url;
                    // publicId = cloudinaryData.public_id;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            data.image = imageUrl;

        
            const res = await registerUser(data);
            // console.log("Registration Response:", res);

            if (res?.success) {
                toast.success(res?.message);
                router.push("/login");
            } else {
                
                // if (publicId) {
                //     await deleteImageFromCloudinary(publicId);
                // }
                toast.error(res?.message);
            }
        } catch (err: any) {
            // console.error("Error:", err);
            toast.error(err.message || 'Something went wrong');

            
            // if (publicId) {
            //     await deleteImageFromCloudinary(publicId);
            // }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='lg:p-10 p-1 flex justify-center items-center mt-4'>
            <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-lg w-full p-5">
                <div className="flex items-center justify-center space-x-4 p-4 mb-4">
                    <Image src={medimart} height={40} width={40} alt="medimart" />
                    <div>
                        <h1 className="text-xl font-semibold">Registration</h1>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field */}
                        <div className='mt-2'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Password Field */}
                        <div className='mt-2'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className='mt-2'>
                            <FormField
                                control={form.control}
                                name="passwordConfirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} value={field.value || ""} />
                                        </FormControl>
                                        {passwordConfirm && password !== passwordConfirm ? (
                                            <FormMessage>Password does not match</FormMessage>
                                        ) : (
                                            <FormMessage />
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Number Field */}
                        <div className='mt-2'>
                            <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Address Field */}
                        <div className='mt-2'>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Image Field (Optional) */}
                        <div className="mt-4">
                            <FormField
                                name="image"
                                control={form.control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Upload Profile Image (Optional)</FormLabel>
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
                            disabled={isSubmitting || !passwordConfirm || password !== passwordConfirm}
                            type="submit"
                            className="mt-5 w-full"
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </Form>

                <p className="text-sm text-gray-600 text-center my-3">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-700 ml-2 font-semibold">
                        Login
                    </Link>
                    <span className="flex items-center p-2">
                        <span className="h-px flex-1 bg-black"></span>
                        <span className="shrink-0 px-6">OR</span>
                        <span className="h-px flex-1 bg-black"></span>
                    </span>

                    <Link href="/" className="text-blue-400 hover:text-blue-700 font-semibold">
                        Back to Home
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;