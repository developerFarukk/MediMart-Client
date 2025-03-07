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


// All Medicin Data
// export const getAllMedicins = async () => {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicins`, {
//             next: {
//                 tags: ["Medicin"],
//             },
//         });

//         return res.json();
//     } catch (error: any) {
//         return Error(error);
//     }
// };



// export const getAllMedicins = async ( page?: number, limit?: number) => {
//     const params = new URLSearchParams();

//     try {
//         const res = await fetch( `${process.env.NEXT_PUBLIC_BASE_API}/medicins?limit=${limit}&page=${page}&${params}`,
//             {
//                 next: {
//                     tags: ["Medicin"],
//                 },
//             }
//         );
//         const data = await res.json();
//         return data;
//     } catch (error: any) {
//         return Error(error.message);
//     }
// };


export const getAllMedicins = async (page?: number, limit?: number) => {
    const params = new URLSearchParams();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicins?limit=${limit}&page=${page}&${params}`, {
            next: {
                tags: ["Medicin"],
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
