
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
    expiryDate: string;
    createdAt: string;
    updatedAt: string;
    length: number;
    orderQuantity: number;
}


export type TCartItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    orderQuantity: number;
    stockAvailability: string;
    requiredPrescription: string;
    mediImage: string | undefined ;
    massUnit: number;
    manufacturerDetails: ManufacturerDetails;
    expiryDate: string;
    createdAt: string;
    updatedAt: string;
    length: number;
};