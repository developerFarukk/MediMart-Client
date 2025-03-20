import { z } from "zod";


export const addReiewSchemaValidation = z.object({
    title: z.string()
        .trim()
        .min(1, 'Review title is required')
        .max(20, 'Review title can not be more than 20 characters'),
        message: z.string()
        .trim()
        .min(1, 'Review message is required'),
    reviewCount: z.number()
        .min(0, 'Review count cannot be negative')
        .int('Review count must be an integer value')
        .default(1),
});