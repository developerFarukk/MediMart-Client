
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


// get all orders
export const getAllOrders = async (page?: number, limit?: number) => {
    const params = new URLSearchParams();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders?limit=${limit}&page=${page}&${params}`, {
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["Order"],
                revalidate: 10,
            },
        });
        const data = await res.json();

        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};


// get My order
export const getAllMyOrders = async (page?: number, limit?: number) => {
    const params = new URLSearchParams();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/me?limit=${limit}&page=${page}&${params}`, {
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["Order"],
                revalidate: 10,
            },
        });
        const data = await res.json();

        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};


// get All Stock medicin
export const getAllPandingPrescription = async () => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/pendingorder`, {
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["Order"],
                revalidate: 10,
            },

        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
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
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }

        );
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


// Update Update
export const updateOrder = async (data: any, orderId: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["Order"],
                revalidate: 10,
            },
            body: JSON.stringify(data),
        });
        revalidateTag("Order");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};



