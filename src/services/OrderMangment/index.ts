
"use server";

import { TOrder } from "@/types/order";
import { cookies } from "next/headers";

export const createOrder = async (order: TOrder) => {
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