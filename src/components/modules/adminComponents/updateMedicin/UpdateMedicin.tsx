/* eslint-disable @typescript-eslint/no-unused-vars */


"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { updateMedicinSchemaValidation } from "./updateMedicinValidation";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { TMedicine } from "@/types/medicins";
import { toast } from "sonner";
import { updateMedicin } from "@/services/MedicinManagment";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useImageUpload } from "@/hooks/useImageUpload";

interface TTitle {
    title: any;
    medicin: TMedicine;
    onUpdateSuccess?: () => void;
}

const UpdateMedicin = ({ title, medicin, onUpdateSuccess }: TTitle) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { uploadImage, isUploading } = useImageUpload();
    const { setIsLoading } = useUser();

    const initialExpiryDate = medicin?.expiryDate ? new Date(medicin.expiryDate) : undefined;

    const form = useForm({
        resolver: zodResolver(updateMedicinSchemaValidation),
        defaultValues: {
            name: medicin?.name || "",
            description: medicin?.description || "",
            price: medicin?.price || 0,
            quantity: medicin?.quantity || 0,
            category: medicin?.category as
                | "Analgesics"
                | "Antibiotics"
                | "Antipyretics"
                | "Antihistamines"
                | "Antidepressants"
                | "Antacids"
                | "Antidiabetics"
                | "Cardiovascular"
                | "Respiratory"
                | "Vitamins & Supplements"
                | undefined,
            requiredPrescription: medicin?.requiredPrescription as "Yes" | "No" | undefined,
            massUnit: medicin?.massUnit || 0,
            manufacturerDetails: {
                name: medicin?.manufacturerDetails?.name || "",
                address: medicin?.manufacturerDetails?.address || "",
                contactNumber: medicin?.manufacturerDetails?.contactNumber || "",
            },
            mediImage: medicin?.mediImage || "",
            expiryDate: initialExpiryDate
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        
        const toastId = toast.loading("Updating medicine...");
        setIsLoading(true);

        if (!medicin?._id) {
            toast.error("Invalid medicine ID", { id: toastId });
            setIsLoading(false);
            return;
        }

        try {
            let imageUrl = medicin?.mediImage;


            if (data.mediImage) {
                if (typeof data.mediImage === "string") {
                    imageUrl = data.mediImage;
                } else if (data.mediImage instanceof File) {
                    imageUrl = await uploadImage(data.mediImage);
                }
            }

            // Prepare the data to be sent to the API
            const updatedData = {
                name: data.name,
                description: data.description,
                price: data.price,
                quantity: data.quantity,
                category: data.category,
                requiredPrescription: data.requiredPrescription,
                massUnit: data.massUnit,
                expiryDate: data.expiryDate,
                mediImage: imageUrl,
                manufacturerDetails: {
                    name: data.manufacturerDetails.name,
                    address: data.manufacturerDetails.address,
                    contactNumber: data.manufacturerDetails.contactNumber,
                },
            };

            // Call the update API
            const res = await updateMedicin(updatedData, medicin._id);         

            if (res.success) {
                toast.success(res.message, { id: toastId });
                form.reset();
                setIsDialogOpen(false);

                // Call the success callback if provided
                if (onUpdateSuccess) {
                    onUpdateSuccess();
                } else {
                    // Default behavior: reload the page
                    window.location.reload();
                }
            } else {
                toast.error(res.message || "Failed to update medicine", { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong", { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{title}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90%] md:max-w-3xl lg:max-w-4xl xl:max-w-3xl p-4 overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">Update Medicine</DialogTitle>
                </DialogHeader>

                <div className="justify-center flex">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Medicine Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description Field */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Price Field */}
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Quantity Field */}
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Category Field */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {[
                                                    "Analgesics",
                                                    "Antibiotics",
                                                    "Antipyretics",
                                                    "Antihistamines",
                                                    "Antidepressants",
                                                    "Antacids",
                                                    "Antidiabetics",
                                                    "Cardiovascular",
                                                    "Respiratory",
                                                    "Vitamins & Supplements",
                                                ].map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Required Prescription Field */}
                            <FormField
                                control={form.control}
                                name="requiredPrescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Requires Prescription</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Yes">Yes</SelectItem>
                                                <SelectItem value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Expiry Date Field */}
                            <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Expiry Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date()}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Mass Unit Field */}
                            <FormField
                                control={form.control}
                                name="massUnit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mass Unit (mg)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Manufacturer Details */}
                            <div className="space-y-4 border p-4 rounded-lg">
                                <h3 className="text-lg font-semibold">Manufacturer Details</h3>

                                {/* Manufacturer Name */}
                                <FormField
                                    control={form.control}
                                    name="manufacturerDetails.name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Manufacturer Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Manufacturer Address */}
                                <FormField
                                    control={form.control}
                                    name="manufacturerDetails.address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Manufacturer Contact Number */}
                                <FormField
                                    control={form.control}
                                    name="manufacturerDetails.contactNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Image Upload */}
                            <FormField
                                control={form.control}
                                name="mediImage"
                                render={({ field: { value: any, onChange, ...fieldProps } }) => (
                                    <FormItem>
                                        <FormLabel>Medicine Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    onChange(file || null);
                                                }}
                                                {...fieldProps}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full mt-6"
                                disabled={form.formState.isSubmitting || isUploading}
                            >
                                {form.formState.isSubmitting || isUploading ? "Updating..." : "Update Medicine"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateMedicin;