import { OrderItem } from "./order-item";
import { User } from "./user";

export class Order {
    id?: string;
    orderItems?: OrderItem[]; 
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    district?: string;
    address?: string;
    phone?: string;
    status?: string;
    totalPrice?: number;
    user?: User;
    dateOrdered?: string;
}