"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";


interface TReviews {
    medicinId: string
}

const AddReviewModal = ({ medicinId }: TReviews) => {
    const [isOpen, setIsOpen] = useState(false);

    console.log(medicinId);


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
                        <div className="flex items-center space-x-2">
                            ami
                        </div>
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
