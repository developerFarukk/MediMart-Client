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

    const form = useForm(
        {
            resolver: zodResolver(loginSchema),
        }
    );

    const { formState: { isSubmitting } } = form;

    const { setIsLoading } = useUser();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");
    const router = useRouter();


    const handleAdminCredentials = () => {
        form.setValue("email", `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`);
        // form.setValue("email", "test@user.com");
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
        <div className='flex justify-center mt-4 p-2 items-center'>
            <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">

                <div className="flex items-center justify-center space-x-4 p-4 mb-4">
                    <Image src={medimart} height={40} width={40} alt="medimart" />
                    <div>
                        <h1 className="text-xl font-semibold">Login</h1>
                    </div>

                </div>

                <div className="flex justify-center items-center gap-4">
                    <div>
                        <Button
                            type="button"
                            onClick={handleAdminCredentials}
                            variant="outline"
                        >
                            Admin Credential
                        </Button>
                    </div>

                    <div>
                        <Button
                            type="button"
                            onClick={handleUserCredentials}
                            variant="outline"
                        >
                            User Credential
                        </Button>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        <div className='mt-4'>
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

                        <Button
                            type="submit"
                            className="mt-5 w-full"
                        >
                            {isSubmitting ? "Loading..." : "Login"}
                        </Button>
                    </form>
                </Form>
                <p className="text-sm text-gray-600 text-center my-3">
                    Do not have any account ?
                    <Link href="/register" className="text-blue-400 hover:text-blue-700 ml-2 font-semibold">
                        Register
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

export default Login;


