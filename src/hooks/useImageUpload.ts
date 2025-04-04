


import { useState } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 300 * 1024; // 300KB

export const useImageUpload = () => {
    const [isUploading, setIsUploading] = useState(false);

    const uploadImage = async (file: File) => {
        if (file.size > MAX_FILE_SIZE) {
            throw new Error("Image size must be less than 300KB");
        }

        setIsUploading(true);
        const toastId = toast.loading("Uploading image...");

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append(
                "upload_preset",
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
            );

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Image upload failed");
            }

            const data = await response.json();
            toast.success("Image uploaded successfully", { id: toastId });
            return data.secure_url;
        } catch (error: any) {
            toast.error(error.message || "Failed to upload image", { id: toastId });
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

    return { uploadImage, isUploading };
};