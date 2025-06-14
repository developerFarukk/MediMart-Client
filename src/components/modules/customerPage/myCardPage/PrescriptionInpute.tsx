

"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { prescriptionValidation } from "./prescriptionValidation";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { updatePrecriptionImage } from "@/redux/features/cart/cartSlice";
import { useState } from "react";
import Image from "next/image";

const MAX_FILE_SIZE = 300 * 1024;

const PrescriptionInpute = () => {
    const dispatch = useAppDispatch();
    const { setIsLoading } = useUser();
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(prescriptionValidation),
    });

    const { formState: { isSubmitting, isValid }, watch, } = form;
    const imageValue = watch("image");

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        setUploadProgress(0);
        setIsUploaded(false);
        let imageUrl = "";

        try {
            if (data.image && typeof data.image === "string") {
                const base64Data = data.image.split(',')[1];
                const fileSizeInBytes = (base64Data.length * 3) / 4;
                if (fileSizeInBytes > MAX_FILE_SIZE) {
                    throw new Error("Image size must be less than 300KB");
                }

                const formData = new FormData();
                formData.append('file', data.image);
                formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

                const xhr = new XMLHttpRequest();
                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded * 100) / event.total);
                        setUploadProgress(percentComplete);
                    }
                };

                const cloudinaryResponse = await new Promise((resolve, reject) => {
                    xhr.open(
                        'POST',
                        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                        true
                    );
                    xhr.onload = () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(new Error("Image upload failed"));
                        }
                    };
                    xhr.onerror = () => reject(new Error("Image upload failed"));
                    xhr.send(formData);
                });

                const cloudinaryData = cloudinaryResponse as { secure_url: string };

                if (cloudinaryData.secure_url) {
                    imageUrl = cloudinaryData.secure_url;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            data.image = imageUrl;
            dispatch(updatePrecriptionImage(data.image));
            toast.success("Prescription image uploaded successfully!");
            setIsUploaded(true);
        } catch (err: any) {
            toast.error(err.message || 'Something went wrong');
            setUploadProgress(0);
            setIsUploaded(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                form.setError("image", {
                    type: "manual",
                    message: "Image size must be less than 300KB",
                });
                setPreviewImage(null);
                setIsUploaded(false);
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    field.onChange(reader.result);
                    setPreviewImage(reader.result as string);
                    setIsUploaded(false);
                };
                reader.readAsDataURL(file);
            }
        } else {
            field.onChange("");
            setPreviewImage(null);
            setIsUploaded(false);
        }
    };

    return (
        <div>
            <div className='mb-4 mt-9 w-full rounded-xl border bg-[#FAFAFA] p-5 text-lg font-medium *:w-full md:w-80'>
                <div className="flex flex-col justify-between h-full">
                    <h1 className="text-2xl font-bold">Upload Prescription</h1>
                    <div className="mt-5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="mt-4">
                                    <FormField
                                        name="image"
                                        control={form.control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Upload Prescription</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, field)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Preview and Progress */}
                                <div className="mt-4">
                                    {previewImage && (
                                        <div className="mb-3">
                                            <div className="relative h-40 w-full border rounded-md overflow-hidden">
                                                <Image
                                                    src={previewImage}
                                                    alt="Prescription preview"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {uploadProgress > 0 && uploadProgress < 100 && (
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full"
                                                style={{ width: `${uploadProgress}%` }}
                                            ></div>
                                            <p className="text-xs text-gray-600 mt-1 text-center">
                                                Uploading: {uploadProgress}%
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-5 w-full disabled:cursor-not-allowed bg-green-300 hover:bg-green-500 text-black uppercase"
                                    disabled={isSubmitting || !isValid || !imageValue || uploadProgress > 0 || isUploaded}
                                >
                                    {isUploaded ? "Uploaded" : 
                                     isSubmitting || uploadProgress > 0
                                        ? uploadProgress > 0
                                            ? `Uploading... ${uploadProgress}%`
                                            : "Uploading..."
                                        : "Upload"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionInpute;