
interface ManufacturerDetails {
    name: string;
    address: string;
    contactNumber: string;
}

export interface TMedicine {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
    stockAvailability: string;
    requiredPrescription: string;
    mediImage: string;
    massUnit: number;
    manufacturerDetails: ManufacturerDetails;
    createdAt: string;
    updatedAt: string;
}