

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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);

        try {
            const res = await registerUser(data);
            console.log(res);
            
            setIsLoading(true);
            if (res?.success) {
                toast.success(res?.message);
                router.push("/");
            } else {
                toast.error(res?.message);
            }
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <div className='lg:p-10 p-1 flex justify-center items-center'>
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
                        <div className='mt-2'>
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL (Optional)</FormLabel>
                                        <FormControl>
                                            <Input {...field} value={field.value || ""} />
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
                    <Link href="/login" className="text-primary ml-2">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;