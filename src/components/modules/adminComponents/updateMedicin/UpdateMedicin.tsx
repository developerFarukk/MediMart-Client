

"use client"

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
const MAX_FILE_SIZE = 300 * 1024;

interface TTitle {
    title: any;
    medicin: TMedicine;
}

const UpdateMedicin = ({ title, medicin }: TTitle) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(updateMedicinSchemaValidation),
        defaultValues: {
            name: medicin?.name,
            description: medicin?.description,
            price: medicin?.price,
            quantity: medicin?.quantity,
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
            massUnit: medicin?.massUnit,
            manufacturerDetails: {
                name: medicin?.manufacturerDetails?.name,
                address: medicin?.manufacturerDetails?.address,
                contactNumber: medicin?.manufacturerDetails?.contactNumber,
            },
            mediImage: "",
        },
    });

    const { formState: { isSubmitting, errors } } = form;
    const { setIsLoading } = useUser();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Loading...");
        setIsLoading(true);

        if (!medicin?._id) {
            toast.error("Invalid product ID", { id: toastId });
            return;
        }

        let imageUrl = medicin?.mediImage; 

        try {
      
            if (data.mediImage && typeof data.mediImage === "string") {
                const base64Data = data.mediImage.split(',')[1];
                const fileSizeInBytes = (base64Data.length * 3) / 4;

                if (fileSizeInBytes > MAX_FILE_SIZE) {
                    throw new Error("Image size must be less than 300KB");
                }

                const formData = new FormData();
                formData.append('file', data.mediImage);
                formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

                const cloudinaryResponse = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                const cloudinaryData = await cloudinaryResponse.json();

                if (cloudinaryData.secure_url) {
                    imageUrl = cloudinaryData.secure_url;
                } else {
                    throw new Error("Image upload failed");
                }
            }


            const updatedData = {
                ...data,
                mediImage: imageUrl,
                manufacturerDetails: {
                    name: data?.manufacturerDetails?.name || medicin?.manufacturerDetails?.name,
                    address: data?.manufacturerDetails?.address || medicin?.manufacturerDetails?.address,
                    contactNumber: data?.manufacturerDetails?.contactNumber || medicin?.manufacturerDetails?.contactNumber,
                },
                category: data?.category || medicin?.category,
                requiredPrescription: data?.requiredPrescription || medicin?.requiredPrescription,
            };

            console.log(updatedData);

            // Call the updateMedicin API
            const res = await updateMedicin(updatedData, medicin?._id);
            console.log(res);

            if (res.success) {
                toast.success(res.message);
                form.reset();
                setIsDialogOpen(false);
          
                window.location.reload();
            } else {
                toast.error(res.message);
                form.reset();
                setIsDialogOpen(false);
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">{title}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[90%] md:max-w-3xl lg:max-w-4xl xl:max-w-3xl p-4 overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl">Update Medicin</DialogTitle>
                    </DialogHeader>

                    <div className=" justify-center flex">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Medicin Name</FormLabel>
                                            <FormControl>
                                                <Input  {...field} />
                                            </FormControl>
                                            <FormMessage>{errors.name?.message as string}</FormMessage>
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
                                                <Input  {...field} />
                                            </FormControl>
                                            <FormMessage>{errors.description?.message as string}</FormMessage>
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
                                            <FormMessage>{errors.price?.message as string}</FormMessage>
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
                                            <FormMessage>{errors.quantity?.message as string}</FormMessage>
                                        </FormItem>
                                    )}
                                />

                                {/* Category Field (Dropdown) */}
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={medicin?.category}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
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
                                            <FormMessage>{errors.category?.message as string}</FormMessage>
                                        </FormItem>
                                    )}
                                />

                                {/* Required Prescription Field (Dropdown) */}
                                <FormField
                                    control={form.control}
                                    name="requiredPrescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Required Prescription</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={medicin?.requiredPrescription}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Yes">Yes</SelectItem>
                                                    <SelectItem value="No">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage>{errors.requiredPrescription?.message as string}</FormMessage>
                                        </FormItem>
                                    )}
                                />

                                {/* Mass Unit Field */}
                                <FormField
                                    control={form.control}
                                    name="massUnit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mass Unit</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage>{errors.massUnit?.message as string}</FormMessage>
                                        </FormItem>
                                    )}
                                />

                                {/* Manufacturer Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Manufacturer Details</h3>

                                    {/* Manufacturer Name */}
                                    <FormField
                                        control={form.control}
                                        name="manufacturerDetails.name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Manufacturer Name</FormLabel>
                                                <FormControl>
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage>{errors.manufacturerDetails?.name?.message as string}</FormMessage>
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
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage>{errors.manufacturerDetails?.address?.message as string}</FormMessage>
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
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage>{errors.manufacturerDetails?.contactNumber?.message as string}</FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Image Field (Optional) */}
                                <div className="mt-4">
                                    <FormField
                                        name="mediImage"
                                        control={form.control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Upload Medicin Image (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="mediImage"
                                                        type="file"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                if (file.size > MAX_FILE_SIZE) {
                                                                    form.setError("mediImage", {
                                                                        type: "manual",
                                                                        message: "Medicin Image size must be less than 300KB",
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
                                    suppressHydrationWarning
                                    type="submit"
                                    className="mt-5 w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "updating..." : "update Medicin"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateMedicin;
