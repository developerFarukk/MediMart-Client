
export interface TUser {
    _id?: string;
    name: string;
    email: string;
    // role: 'admin' | 'customer';
    role: string
    // status: 'in-progress' | 'blocked';
    status: string
    isDeleted: boolean;
    address: string;
    image?: string;
    number: string;
    passwordChangedAt?: Date;
    createdAt: string;
    userId: string;
}


