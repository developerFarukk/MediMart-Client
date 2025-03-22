"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";



// add Medicin
export const addmedicin = async (data: any): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicins/create-medicin`, {
            method: "POST",
            // body: data,
            body: JSON.stringify(data),
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
                "Content-Type": "application/json",
            },
        });
        revalidateTag("Medicin");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};


// Get All Medicin
export const getAllMedicins = async (page?: number, limit?: number) => {
    const params = new URLSearchParams();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicins?limit=${limit}&page=${page}&${params}`, {
            next: {
                tags: ["Medicin"],
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
export const getAllStockMedicins = async () => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicins/stockmedicin`, {
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["Medicin"],
                revalidate: 10,
            },

        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};


// Delete Medicin
export const deleteMedicin = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicins/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        revalidateTag("Medicin");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};


// // Update Medicin
export const updateMedicin = async (data: any, medicinId: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicins/${medicinId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(data),
        });
        revalidateTag("Medicin");
        return res.json();

    } catch (error: any) {
        return Error(error);
    }
};


// get single medicin
export const getSinglemedicin = async (medicinId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/medicins/${medicinId}`,
            {
                next: {
                    tags: ["Medicin"],
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
