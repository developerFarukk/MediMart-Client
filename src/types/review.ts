import { TMedicine } from "./medicins";
import { TUser } from "./user";


export interface TReview {
    _id: string;
    user: TUser;
    product: TMedicine
    title: string;
    message: string;
    reviewCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}