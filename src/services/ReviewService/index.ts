"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


// add review
export const addReview = async (data: any): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/create-review`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
                "Content-Type": "application/json",
            },
        });
        revalidateTag("Review");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};


// All review
export const getAllReview = async () => {
    // const params = new URLSearchParams();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
            next: {
                tags: ["Review"],
                revalidate: 10,
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};