

import { z } from "zod";


export const registrationSchema = z.object({
    // body: z.object({

    // })
    name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long.' })
        .max(20, { message: 'Name cannot exceed 20 characters.' }),
    password: z
        .string()
        .min(4, { message: 'Password must be at least 4 characters long.' })
        .max(20, { message: 'Password cannot exceed 20 characters.' }),
    passwordConfirm: z
        .string({ required_error: "Password Confirmation is required" })
        .min(1),
    number: z
        .string()
        .min(11, { message: 'Number must be at least 11 characters long.' }),

    email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Please provide a valid email address.' }),

    address: z
        .string()
        .min(3, { message: 'Address must be at least 3 characters long.' })
        .max(100, { message: 'Address cannot exceed 100 characters.' }),
    image: z
        .string().optional()
});