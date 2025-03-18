
"use server";

import { TOrderf } from "@/types/order";
import { cookies } from "next/headers";

export const createOrder = async (order: TOrderf) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/create-order`, {
            method: "POST",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        return await res.json();
    } catch (error: any) {
        return Error(error);
    }
};


// get veryfy order
export const veryfyOrder = async (order_id?: string) => {
    // const params = new URLSearchParams();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders/verify?order_id=${order_id}`,
            {
                next: {
                    tags: ["Order"],
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};