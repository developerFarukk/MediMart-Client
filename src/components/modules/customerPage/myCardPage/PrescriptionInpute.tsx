// "use client"

// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { prescriptionValidation } from "./prescriptionValidation";
// import { useUser } from "@/context/UserContext";
// import { toast } from "sonner";
// import { useAppDispatch } from "@/redux/hooks";
// import { updatePrecriptionImage } from "@/redux/features/cart/cartSlice";
// const MAX_FILE_SIZE = 300 * 1024;




// const PrescriptionInpute = () => {

//     const dispatch = useAppDispatch();

//     const form = useForm({
//         resolver: zodResolver(prescriptionValidation),
//     });

//     const { formState: { isSubmitting } } = form;

//     const { setIsLoading } = useUser();

//     const onSubmit: SubmitHandler<FieldValues> = async (data) => {

//         setIsLoading(true);

//         let imageUrl = "";
//         // let publicId = "";

//         try {

//             if (data.image && typeof data.image === "string") {
//                 const base64Data = data.image.split(',')[1];
//                 const fileSizeInBytes = (base64Data.length * 3) / 4;
//                 if (fileSizeInBytes > MAX_FILE_SIZE) {
//                     throw new Error("Image size must be less than 300KB");
//                 }

//                 const formData = new FormData();
//                 formData.append('file', data.image);
//                 formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

//                 const cloudinaryResponse = await fetch(
//                     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//                     {
//                         method: 'POST',
//                         body: formData,
//                     }
//                 );

//                 const cloudinaryData = await cloudinaryResponse.json();
//                 // console.log("Cloudinary Response:", cloudinaryData);

//                 if (cloudinaryData.secure_url) {
//                     imageUrl = cloudinaryData.secure_url;
//                     // publicId = cloudinaryData.public_id;
//                 } else {
//                     throw new Error("Image upload failed");
//                 }
//             }

//             data.image = imageUrl;

//             // console.log(data.image);
//             const datas = data.image;


//             // const res = await registerUser(data);
//             dispatch(updatePrecriptionImage(datas)

//             // console.log("Registration Response:", res);

//             // if (res?.success) {
//             //     toast.success(res?.message);
//             //     // router.push("/login");
//             // } else {

//             //     // if (publicId) {
//             //     //     await deleteImageFromCloudinary(publicId);
//             //     // }
//             //     toast.error(res?.message);
//             // }
//         } catch (err: any) {
//             // console.error("Error:", err);
//             toast.error(err.message || 'Something went wrong');


//             // if (publicId) {
//             //     await deleteImageFromCloudinary(publicId);
//             // }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div>
//             <div className='mb-4 mt-9 w-full rounded-xl border bg-[#FAFAFA] p-5 text-lg font-medium *:w-full md:w-80'>
//                 <div className="flex flex-col justify-between h-full">
//                     <h1 className="text-2xl font-bold">Upload Prescription</h1>
//                     <div className="mt-5">
//                         <Form {...form}>
//                             <form onSubmit={form.handleSubmit(onSubmit)}>

//                                 {/* Image Field (Optional) */}
//                                 <div className="mt-4">
//                                     <FormField
//                                         name="image"
//                                         control={form.control}
//                                         defaultValue=""
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>Upload Profile Image (Optional)</FormLabel>
//                                                 <FormControl>
//                                                     <Input
//                                                         id="image"
//                                                         type="file"
//                                                         onChange={(e) => {
//                                                             const file = e.target.files?.[0];
//                                                             if (file) {
//                                                                 if (file.size > MAX_FILE_SIZE) {
//                                                                     form.setError("image", {
//                                                                         type: "manual",
//                                                                         message: "Image size must be less than 300KB",
//                                                                     });
//                                                                 } else {
//                                                                     const reader = new FileReader();
//                                                                     reader.onloadend = () => {
//                                                                         field.onChange(reader.result);
//                                                                     };
//                                                                     reader.readAsDataURL(file);
//                                                                 }
//                                                             } else {
//                                                                 field.onChange("");
//                                                             }
//                                                         }}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>

//                                 {/* Submit Button */}
//                                 <Button
//                                     type="submit"
//                                     className="mt-5 w-full"
//                                 >
//                                     {isSubmitting ? "Uploading..." : "Upload"}
//                                 </Button>
//                             </form>
//                         </Form>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default PrescriptionInpute;


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

const MAX_FILE_SIZE = 300 * 1024;

const PrescriptionInpute = () => {
    const dispatch = useAppDispatch();
    const { setIsLoading } = useUser();

    const form = useForm({
        resolver: zodResolver(prescriptionValidation),
    });

    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

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

            data.image = imageUrl;

            // const result = await dispatch(updatePrecriptionImage(data.image));
            dispatch(updatePrecriptionImage(data.image));

            toast.success("Prescription image uploaded successfully!")

            // if (updatePrecriptionImage.fulfilled.match(result)) {
            //     toast.success("Prescription image uploaded successfully!");
            // } else {
            //     toast.error("Failed to upload prescription image.");
            // }
        } catch (err: any) {
            toast.error(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
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
                                                <FormLabel>Upload Profile Image (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                if (file.size > MAX_FILE_SIZE) {
                                                                    form.setError("image", {
                                                                        type: "manual",
                                                                        message: "Image size must be less than 300KB",
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

                                <Button
                                    type="submit"
                                    className="mt-5 w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Uploading..." : "Upload"}
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