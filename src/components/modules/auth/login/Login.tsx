

"use client"

import medimart from '@/assets/nextmart.png'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema } from './loginValidation';
import { loginUser } from '@/services/AuthService';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

const Login = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
    });

    const { formState: { isSubmitting } } = form;
    const { setIsLoading } = useUser();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");
    const router = useRouter();

    const handleAdminCredentials = () => {
        form.setValue("email", `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`);
        form.setValue("password", `${process.env.NEXT_PUBLIC_ADMIN_PASSWORD}`);
        toast.warning('Admin credentials filled. This is for demo purposes only.');
    };

    const handleUserCredentials = () => {
        form.setValue("email", `${process.env.NEXT_PUBLIC_USER_EMAIL}`);
        form.setValue("password", `${process.env.NEXT_PUBLIC_USER_PASSWORD}`);
        toast.warning('Test user credentials filled. This is for demo purposes only.');
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await loginUser(data);
            setIsLoading(true);
            if (res?.success) {
                toast.success(res?.message);
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push("/");
                }
            } else {
                toast.error(res?.message);
            }
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src={medimart}
                        height={60}
                        width={60}
                        alt="medimart"
                        className="mb-4"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                <div className="flex justify-center gap-4 mb-6">
                    <Button
                        type="button"
                        onClick={handleAdminCredentials}
                        variant="outline"
                        className="border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                        Admin Credential
                    </Button>
                    <Button
                        type="button"
                        onClick={handleUserCredentials}
                        variant="outline"
                        className="border-green-500 text-green-500 hover:bg-green-50"
                    >
                        User Credential
                    </Button>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium text-gray-700">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            {...field}
                                            value={field.value || ""}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs mt-1" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="block text-sm font-medium text-gray-700">Password</FormLabel>
                                        {/* <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                                            Forgot password?
                                        </Link> */}
                                    </div>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            value={field.value || ""}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs mt-1" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-300 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 uppercase"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : "Sign in"}
                        </Button>
                    </form>
                </Form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Do not have an account?{' '}
                        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Register here
                        </Link>
                    </p>
                    <div className="mt-4">
                        <Link href="/" className="font-medium text-gray-600 hover:text-gray-500">
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;