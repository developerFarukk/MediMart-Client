



import { z } from "zod";


export const prescriptionValidation = z.object({
   
    image: z
        .string().optional()
});