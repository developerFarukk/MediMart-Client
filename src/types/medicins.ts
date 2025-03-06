
interface ManufacturerDetails {
    manufacturerName: string;
    address: string;
    contact: string;
}

export interface TMedicine {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    stockAvailability: string;
    requiredPrescription: string;
    mediImage: string;
    massUnit: number;
    manufacturerDetails: ManufacturerDetails;
    createdAt: string;
    updatedAt: string;
}