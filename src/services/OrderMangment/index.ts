
"use server";

import { TOrderf } from "@/types/order";
import { revalidateTag } from "next/cache";
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

// get all orders
export const getAllOrders = async (page?: number, limit?: number) => {
    const params = new URLSearchParams();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders?limit=${limit}&page=${page}&${params}`, {
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["Orders"],
                revalidate: 10,
            },
        });
        const data = await res.json();

        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};


// Delete order
export const deleteOrder = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
                next: {
                    tags: ["Order"],
                    revalidate: 10,
                },
            }
        );
        revalidateTag("Order");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
