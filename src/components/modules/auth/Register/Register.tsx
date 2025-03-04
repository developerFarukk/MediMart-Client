


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

const Register = () => {
    const form = useForm({
        resolver: zodResolver(registrationSchema),
    });

    const { formState: { isSubmitting } } = form;

    const password = form.watch("password");
    const passwordConfirm = form.watch("passwordConfirm");

    const router = useRouter();
    const { setIsLoading } = useUser();

    // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //     setIsLoading(true);

    //     try {
    //         console.log("Form Data:", data); // Log form data

    //         let imageUrl = "";

    //         // Step 1: Upload image to Cloudinary (if image exists)
    //         if (data.image && data.image[0]) {
    //             const imageFile = data.image[0];

    //             const formData = new FormData();
    //             formData.append('file', imageFile);
    //             formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    //             const cloudinaryResponse = await fetch(
    //                 `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    //                 {
    //                     method: 'POST',
    //                     body: formData,
    //                 }
    //             );

    //             const cloudinaryData = await cloudinaryResponse.json();
    //             console.log("Cloudinary Response:", cloudinaryData); // Log Cloudinary response

    //             if (cloudinaryData.secure_url) {
    //                 imageUrl = cloudinaryData.secure_url; // Save the image URL
    //             } else {
    //                 throw new Error("Image upload failed");
    //             }
    //         }

    //         // Step 2: Add the image URL to the registration data
    //         data.image = imageUrl;

    //         // Step 3: Register the user
    //         const res = await registerUser(data);
    //         console.log("Registration Response:", res); // Log registration response

    //         if (res?.success) {
    //             toast.success(res?.message);
    //             router.push("/");
    //         } else {
    //             toast.error(res?.message);
    //         }
    //     } catch (err: any) {
    //         console.error("Error:", err); // Log the error
    //         toast.error(err.message || 'Something went wrong');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            console.log("Form Data:", data); // Log form data

            let imageUrl = "";

            // Step 1: Upload image to Cloudinary (if image exists)
            if (data.image && typeof data.image === "string") { // Check if image is a base64 string
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
                console.log("Cloudinary Response:", cloudinaryData); // Log Cloudinary response

                if (cloudinaryData.secure_url) {
                    imageUrl = cloudinaryData.secure_url; // Save the image URL
                } else {
                    throw new Error("Image upload failed");
                }
            }

            // Step 2: Add the image URL to the registration data
            data.image = imageUrl;

            // Step 3: Register the user
            const res = await registerUser(data);
            console.log("Registration Response:", res); // Log registration response

            if (res?.success) {
                toast.success(res?.message);
                router.push("/");
            } else {
                toast.error(res?.message);
            }
        } catch (err: any) {
            console.error("Error:", err); // Log the error
            toast.error(err.message || 'Something went wrong');
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
                        {/* <div className="mt-4">
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
                                                    field.onChange(file || ""); // শুধুমাত্র ফাইল পাঠান, অ্যারে নয়
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div> */}

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
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            field.onChange(reader.result); // Convert file to base64 string
                                                        };
                                                        reader.readAsDataURL(file);
                                                    } else {
                                                        field.onChange(""); // If no file, set to empty string
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
