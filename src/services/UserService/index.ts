"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


// Get All User
export const getAllUsers = async (page?: number, limit?: number) => {
    const params = new URLSearchParams();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users?limit=${limit}&page=${page}&${params}`, {
            next: {
                tags: ["User"],
                revalidate: 10,
            },
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

// Update User
export const updateProfile = async (data: any, userId: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(data),
        });
        revalidateTag("User");
        return res.json();

    } catch (error: any) {
        return Error(error);
    }
};


// get single user
// export const getSingleUser = async () => {
//     try {
//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_API}/medicins/singleuser`,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: (await cookies()).get("accessToken")!.value,
//                 },
//                 next: {
//                     tags: ["User"],
//                 },

//             }

//         );
//         const data = await res.json();
//         console.log(data);

//         return data;
//     } catch (error: any) {
//         return Error(error.message);
//     }
// };

