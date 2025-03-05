


"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import medimart from '@/assets/nextmart.png';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMedicinSchemaValidation } from "./addMedicinSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addmedicin } from "@/services/MedicinManagment";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

const MAX_FILE_SIZE = 300 * 1024;

const AddMedicinPage = () => {
    const form = useForm({
        resolver: zodResolver(addMedicinSchemaValidation),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            category: undefined,
            requiredPrescription: undefined,
            massUnit: 0.1,
            manufacturerDetails: {
                name: "",
                address: "",
                contactNumber: "",
            },
            mediImage: "",
        },
    });

    const { formState: { isSubmitting, errors } } = form;
    const { setIsLoading } = useUser();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        let imageUrl = "";

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


            data.mediImage = imageUrl;


            const res = await addmedicin(data);

            if (res.success) {
                toast.success(res.message);
                form.reset();
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
            <div className='lg:p-10 p-1 flex justify-center items-center mt-4'>
                <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-3xl w-full p-5">
                    <div className="flex items-center justify-center space-x-4 p-4 mb-4">
                        <Image src={medimart} height={40} width={40} alt="medimart" />
                        <div>
                            <h1 className="text-xl font-semibold">Add Medicin</h1>
                        </div>
                    </div>

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
                                            <Input placeholder="Enter medicin name" {...field} />
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
                                            <Input placeholder="Enter description" {...field} />
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
                                                placeholder="Enter price"
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
                                                placeholder="Enter quantity"
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select prescription requirement" />
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
                                                placeholder="Enter mass unit"
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
                                                <Input placeholder="Enter manufacturer name" {...field} />
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
                                                <Input placeholder="Enter address" {...field} />
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
                                                <Input placeholder="Enter contact number" {...field} />
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
                                {isSubmitting ? "Adding..." : "Add Medicin"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddMedicinPage;