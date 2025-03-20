

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
import StarRating from "./StarRating";


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


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        console.log(data);


        setIsLoading(true);

        if (!user) {
            toast.error("Please login than add review");
            return;
        }

        if (user?.role === "admin") {
            toast.error("Admin create review not allowed");
            return;
        }

        const products = {
            ...data,
            product: medicinId
        };

        try {
            const res = await addReview(products);
            console.log(res);


            if (res.success) {
                toast.success(res.message);
                form.reset();
                setIsOpen(false)
            } else {
                toast.error(res.message);
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
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
                                                    <Input placeholder="Input review title" {...field} />
                                                </FormControl>
                                                <FormMessage>{errors.title?.message as string}</FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Message Field */}
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Review message</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Input review message" {...field} />
                                                </FormControl>
                                                <FormMessage>{errors.message?.message as string}</FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Review Count Field */}
                                    <FormField
                                        control={form.control}
                                        name="reviewCount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Review Rating</FormLabel>
                                                <FormControl>
                                                    <StarRating
                                                        rating={field.value}
                                                        onRatingChange={(rating) => {
                                                            field.onChange(rating);
                                                        }}
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
