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


const Login = () => {

    const form = useForm(
        {
            resolver: zodResolver(loginSchema),
        }
    );


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);

        // try {
        //     const res = await loginUser(data);
        //     setIsLoading(true);
        //     if (res?.success) {
        //         toast.success(res?.message);
        //         if (redirect) {
        //             router.push(redirect);
        //         } else {
        //             router.push("/");
        //         }
        //     } else {
        //         toast.error(res?.message);
        //     }
        // } catch (err: any) {
        //     console.error(err);
        // }
    };

    return (
        <div className='flex justify-center mt-4 p-2'>
            <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
                <div className="flex items-center justify-center space-x-4 p-4 mb-4">
                    <Image src={medimart} height={40} width={40} alt="medimart" />
                    <div>
                        <h1 className="text-xl font-semibold">Login</h1>
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

                        {/* <div className="flex mt-3 w-full">
                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
                                onChange={handleReCaptcha}
                                className="mx-auto"
                            />
                        </div> */}

                        <Button
                            // disabled={reCaptchaStatus ? false : true}
                            type="submit"
                            className="mt-5 w-full"
                        >
                            {/* {isSubmitting ? "Logging...." : "Login"} */}
                            Login
                        </Button>
                    </form>
                </Form>
                <p className="text-sm text-gray-600 text-center my-3">
                    Do not have any account ?
                    <Link href="/register" className="text-primary ml-2">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;


