"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { addReiewSchemaValidation } from "./addReviewSchema";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { addReview } from "@/services/ReviewService";


interface TReviews {
    medicinId: string
}

const AddReviewModal = ({ medicinId }: TReviews) => {
    // console.log("id", medicinId);

    const [isOpen, setIsOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(addReiewSchemaValidation),
        defaultValues: {
            title: "",
            message: "",
            reviewCount: 1,
        },
    });

    const { formState: { isSubmitting, errors } } = form;
    const { setIsLoading, user } = useUser();

    // const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    //     console.log(data);


    //     setIsLoading(true);

    //     if ( !user ) {
    //         toast.error("Please login than add review")
    //     }

    //     if ( user?.role === "admin" ) {
    //         toast.error("Admin create review not allowed")
    //     }

    //     // const formData = new FormData();
    //     const products = {
    //         ...data,
    //         product: medicinId
    //     }

    //     // console.log(products);
    //     const formData = new FormData();

    //     formData.append('data', JSON.stringify(products));



    //     try {

    //         const res = await addReview(products);
    //         console.log(res);


    //         if (res.success) {
    //             toast.success(res.message);
    //             form.reset();
    //         } else {
    //             toast.error(res.message);
    //         }
    //     } catch (err: any) {
    //         toast.error(err.message || "Something went wrong");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data);

        setIsLoading(true);

        // ইউজার লগিন না থাকলে
        if (!user) {
            toast.error("Please login than add review");
            return;
        }

        // ইউজার অ্যাডমিন হলে
        if (user?.role === "admin") {
            toast.error("Admin create review not allowed");
            return;
        }

        // প্রোডাক্ট ডেটা প্রস্তুত করা
        const products = {
            ...data,
            product: medicinId
        };

        try {
            // রিভিউ অ্যাড করার API কল
            const res = await addReview(products);
            console.log(res);

            // সফল হলে
            if (res.success) {
                toast.success(res.message);
                form.reset();
                setIsOpen(false) // ফর্ম রিসেট
            } else {
                toast.error(res.message);
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setIsLoading(false); // লোডিং স্টেট বন্ধ
        }
    };



    return (
        <div>
            <div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Add Review</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-center">Add Review</DialogTitle>
                            <DialogDescription className="text-center">
                                Please add this product review
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    {/* Title Field */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Review Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Inpute review title" {...field} />
                                                </FormControl>
                                                <FormMessage>{errors.title?.message as string}</FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Description Field */}
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Review message</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Inpute review massage" {...field} />
                                                </FormControl>
                                                <FormMessage>{errors.message?.message as string}</FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Price Field */}
                                    <FormField
                                        control={form.control}
                                        name="reviewCount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Review Stare</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter review stare"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage>{errors.reviewCount?.message as string}</FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <Button
                                        suppressHydrationWarning
                                        type="submit"
                                        className="mt-5 w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Adding..." : "Add Review"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
};

export default AddReviewModal;
