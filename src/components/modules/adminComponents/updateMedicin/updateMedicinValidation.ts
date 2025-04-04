

import { z } from 'zod';

// Define enums for MedicinStatus and RequiredPrescriptions
const RequiredPrescriptions = z.enum(['Yes', 'No']);

const medicinsCategory = z.enum(["Analgesics", "Antibiotics", "Antipyretics", "Antihistamines", "Antidepressants", "Antacids", "Antidiabetics", "Cardiovascular", "Respiratory", "Vitamins & Supplements"]);

// Define the schema for manufacturerDetails
const manufacturerDetailsSchema = z.object({
    name: z.string().trim().max(20, 'Medicin manufacturer Name can not be more than 20 characters'),
    address: z.string().trim().max(40, 'Medicin Company address Name can not be more than 40 characters'),
    contactNumber: z.string().trim(),
});

// Define the main schema for the model
export const updateMedicinSchemaValidation = z.object({
    name: z.string()
        .trim()
        .max(20, 'Medicin Name can not be more than 20 characters')
        .optional(),
    description: z.string()
        .trim()
        .optional(),
    price: z.number()
        .int('Price must be an integer value')
        .optional(),
    quantity: z.number()
        .min(0, 'Quantity cannot be negative')
        .int('Price must be an integer value')
        .optional(),
    category: medicinsCategory.optional(),
    requiredPrescription: RequiredPrescriptions.optional(),
    massUnit: z.number().optional(),
    manufacturerDetails: manufacturerDetailsSchema.optional(),
    mediImage: z.any()
        .refine((val) => {
            if (!val) return true;
            return typeof val === "string" || val instanceof File;
        }, {
            message: "Must be a string (URL/base64) or File object",
        })
        .optional(),
    expiryDate: z.date(),
});