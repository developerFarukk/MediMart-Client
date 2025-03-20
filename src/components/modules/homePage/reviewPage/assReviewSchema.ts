import { z } from "zod";


export const addReiewSchemaValidation = z.object({
    title: z.string()
        .trim()
        .min(1, 'Medicin Name is required')
        .max(20, 'Medicin Name can not be more than 20 characters'),
    message: z.string()
        .trim()
        .min(1, 'Medicin description is required'),
    reviewCount: z.number()
        .min(0, 'Price cannot be negative')
        .int('Price must be an integer value')
        .default(0),
});