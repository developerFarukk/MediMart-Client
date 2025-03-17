import { TMedicine } from "./medicins";



export interface TOrderProduct {
    medicins: string | TMedicine;
    orderQuantity: number;
    subTotalPrice: number;
}

export interface TUserr {
    userId: string
    name: string;
    email: string;
    number: string;
}

export interface TOrder extends Document {
    user: TUserr;
    products: TOrderProduct[];
    totalQuantity: number;
    totalPrice: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentMethod: 'Cash' | 'Online';
    paymentStatus: 'Pending' | 'Paid' | 'Cancelled';
    shippingAddress: string;
    precriptionImage: string;
    city: string;
    createdAt?: Date;
    updatedAt?: Date;
    tranjectionId?: string;
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
}