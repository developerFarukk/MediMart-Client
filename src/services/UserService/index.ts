"use server"


// Get All User
export const getAllUser = async (page?: number, limit?: number) => {
    const params = new URLSearchParams();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users?limit=${limit}&page=${page}&${params}`, {
            next: {
                tags: ["User"],
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};