import { TMedicine } from "./medicins";



export interface TOrderProduct {
    medicins: string | TMedicine;
    orderQuantity: number;
    // subTotalPrice: number;
}
export interface TOrderProductt {
    medicins: string | TMedicine;
    orderQuantity: number;
    subTotalPrice: number;
}


export interface TUserr {
    // userId: string;
    // name: string;
    // email: string;
    // role: "admin" | "customer";
    // image: string;
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: "admin" | "customer";
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
    address: string;
    image?: string;
    number: string;
    passwordChangedAt?: Date;
}

export interface TOrder extends Document {
    user: TUserr;
    products: TOrderProductt[];
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
    _id: string
}



export interface TOrderf extends Document {
    products: TOrderProduct[];
    paymentMethod: 'Cash' | 'Online';
    shippingAddress: string;
    precriptionImage: string;
    city: string;
}