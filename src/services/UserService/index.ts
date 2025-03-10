"use server"

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

// juygjyg