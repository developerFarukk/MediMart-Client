
export interface TUser {
    _id?: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
    address: string;
    image?: string;
    number: string;
    passwordChangedAt?: Date;
}


